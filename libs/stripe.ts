import Stripe from "stripe";

interface CreateCheckoutParams {
  priceId: string;
  mode: "payment" | "subscription";
  successUrl: string;
  cancelUrl: string;
  couponId?: string | null;
  clientReferenceId?: string;
  user?: {
    customerId?: string;
    email?: string;
  };
}

interface CreateCustomerPortalParams {
  customerId: string;
  returnUrl: string;
}

// Inicializar Stripe con la clave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16", // Usa la versión más reciente disponible
});

export interface CheckoutData {
  priceId: string;
  mode: string;
  successUrl: string;
  cancelUrl: string;
  clientReferenceId: string;
  user: {
    email: string;
  };
}

export async function createCheckout(data: CheckoutData): Promise<string | null> {
  try {
    // Configurar el objeto de metadatos para incluir en la sesión
    const metadata = {
      userId: data.clientReferenceId,
    };

    // Crear la sesión de checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: data.priceId,
          quantity: 1,
        },
      ],
      mode: data.mode as "subscription" | "payment",
      success_url: data.successUrl,
      cancel_url: data.cancelUrl,
      client_reference_id: data.clientReferenceId,
      customer_email: data.user.email,
      metadata: metadata,
      // Solicitar explícitamente que se expanda el objeto payment_intent
      expand: ["payment_intent"],
    });

    // Si es modo "payment", el payment_intent estará disponible inmediatamente
    if (session.payment_intent && typeof session.payment_intent !== 'string') {
      // Añadir el ID del payment_intent a los metadatos de la sesión
      await stripe.checkout.sessions.update(session.id, {
        metadata: {
          ...metadata,
          payment_intent_id: session.payment_intent.id,
        },
      });
    }

    return session.url;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return null;
  }
}

// Nueva función para obtener el transaction ID (Payment Intent ID) a partir del Session ID
export async function getTransactionIdFromSession(sessionId: string): Promise<{ paymentIntentId?: string; subscriptionId?: string }> {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent", "subscription"],
    });

    const result: {
      paymentIntentId?: string;
      subscriptionId?: string;
    } = {};

    if (session.payment_intent) {
      result.paymentIntentId = typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent.id;
    }

    if (session.subscription) {
      result.subscriptionId = typeof session.subscription === "string"
        ? session.subscription
        : session.subscription.id;
    }

    return result;
  } catch (error) {
    console.error("Error getting transaction or subscription ID:", error);
    return {};
  }
}

// This is used to create Customer Portal sessions, so users can manage their subscriptions (payment methods, cancel, etc..)
export const createCustomerPortal = async ({
  customerId,
  returnUrl,
}: CreateCustomerPortalParams): Promise<string> => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-08-16", // TODO: update this when Stripe updates their API
    typescript: true,
  });

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return portalSession.url;
};

// This is used to get the uesr checkout session and populate the data so we get the planId the user subscribed to
export const findCheckoutSession = async (sessionId: string) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-08-16", // TODO: update this when Stripe updates their API
      typescript: true,
    });

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    return session;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export async function listStripePrices() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-08-16",
    typescript: true,
  });

  const prices = await stripe.prices.list({
    active: true,
    limit: 100,
    expand: ["data.product"], // expand product data if you need product details
  });

  return prices.data; // returns an array of Price objects
}