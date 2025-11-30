import { createCheckout } from "@/libs/stripe";
import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSchema } from "@/libs/validations/api-schemas";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate request body
    const result = createCheckoutSchema.safeParse(body);
    if (!result.success) {
      const errorDetails = 'error' in result ? result.error.flatten() : null;
      return NextResponse.json(
        { error: 'Validation failed', details: errorDetails },
        { status: 400 }
      );
    }

    const { priceId, mode, successUrl, cancelUrl, userId, userEmail } = result.data;

    const checkoutData = {
      priceId,
      mode: mode ?? 'payment',
      successUrl: successUrl ?? `${process.env.NEXTAUTH_URL}/dashboard`,
      cancelUrl: cancelUrl ?? `${process.env.NEXTAUTH_URL}/`,
      clientReferenceId: userId,
      user: {
        email: userEmail,
      },
    };

    const stripeSessionURL = await createCheckout(checkoutData);

    if (!stripeSessionURL) {
      return NextResponse.json(
        { error: "Failed to create checkout session" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: stripeSessionURL }, { status: 200 });
  } catch (e: unknown) {
    console.error("Error creating checkout session:", e);
    const message = e instanceof Error ? e.message : "Internal Server Error";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
