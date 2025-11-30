import { NextRequest, NextResponse } from "next/server";
import { createPaymentIntentSchema, createValidationErrorResponse } from "@/libs/validations/api-schemas";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate request body
    const result = createPaymentIntentSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        createValidationErrorResponse(result.error),
        { status: 400 }
      );
    }

    const { amount } = result.data;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'eur',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: unknown) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
