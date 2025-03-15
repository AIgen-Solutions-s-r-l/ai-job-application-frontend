import { createCheckout } from "@/libs/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.priceId || !body.userId || !body.userEmail) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    const { priceId, mode, successUrl, cancelUrl, userId, userEmail } = body;
    
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
  } catch (e: any) {
    console.error("Error creating checkout session:", e);
    return NextResponse.json(
      { error: e?.message || "Internal Server Error" }, 
      { status: 500 }
    );
  }
}