import { NextRequest, NextResponse } from "next/server";
import { getTransactionIdFromSession } from "@/libs/stripe";
import { getTransactionIdSchema, createValidationErrorResponse } from "@/libs/validations/api-schemas";

export async function GET(req: NextRequest) {
  try {
    const session_id = req.nextUrl.searchParams.get("session_id");

    // Validate query parameter
    const result = getTransactionIdSchema.safeParse({ session_id });
    if (!result.success) {
      return NextResponse.json(
        createValidationErrorResponse(result.error),
        { status: 400 }
      );
    }

    const { paymentIntentId, subscriptionId } = await getTransactionIdFromSession(result.data.session_id);

    return NextResponse.json({
      paymentIntentId,
      subscriptionId
    });
  } catch (error: unknown) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
