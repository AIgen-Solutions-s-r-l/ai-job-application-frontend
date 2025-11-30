import { createCheckout } from "@/libs/stripe";
import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSchema, createValidationErrorResponse } from "@/libs/validations/api-schemas";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate request body
    const result = createCheckoutSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        createValidationErrorResponse(result.error),
        { status: 400 }
      );
    }

    const { priceId, mode, successUrl, cancelUrl, userId, userEmail } = result.data;

    const checkoutData = {
      priceId,
      mode,
      successUrl,
      cancelUrl,
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
