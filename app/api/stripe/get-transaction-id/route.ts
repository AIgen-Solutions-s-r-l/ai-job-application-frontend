import { NextRequest, NextResponse } from "next/server";
import { getTransactionIdFromSession } from "@/libs/stripe";

export async function GET(req: NextRequest) {
    try {
      const session_id = req.nextUrl.searchParams.get("session_id");
      if (!session_id) {
        return NextResponse.json({ error: "session_id is required" }, { status: 400 });
      }
  
      const { paymentIntentId, subscriptionId } = await getTransactionIdFromSession(session_id);
  
      return NextResponse.json({ 
        paymentIntentId, 
        subscriptionId 
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }