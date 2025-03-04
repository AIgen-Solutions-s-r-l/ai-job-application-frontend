import { NextRequest, NextResponse } from "next/server";
import { listStripePrices } from "@/libs/stripe"; // your server-side function

export async function GET(req: NextRequest) {
  try {
    const prices = await listStripePrices();
    return NextResponse.json({ data: prices }, { status: 200 });
  } catch (error: any) {
    console.error("Error listing Stripe prices:", error);
    return NextResponse.json(
      { error: "Failed to fetch Stripe prices" },
      { status: 500 }
    );
  }
}