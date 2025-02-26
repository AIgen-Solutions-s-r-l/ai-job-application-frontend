import { createCheckout } from "@/libs/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.priceId || !body.userId || !body.userEmail) {
    return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
  }

  try {
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
    return NextResponse.json({ url: stripeSessionURL });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e?.message || "Internal Server Error" }, { status: 500 });
  }
}