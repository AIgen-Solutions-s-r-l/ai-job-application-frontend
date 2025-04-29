import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { apiClient } from '@/libs/api/client';
import API_BASE_URLS from '@/libs/api/config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16', // Use the API version compatible with installed types
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');
  const text = await req.text(); // Get the raw body as text

  if (!sig) {
    return NextResponse.json({ message: 'No stripe-signature header' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(text, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ message: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'invoice.payment_succeeded':
      const invoice = event.data.object as Stripe.Invoice;

      const subscriptionId = typeof invoice.subscription === 'string' ? invoice.subscription : invoice.subscription?.id;
      const customerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id;
      const amountDue = invoice.amount_due;

      console.log(`Invoice payment succeeded: ${invoice.id}`);
      console.log(`Subscription ID: ${subscriptionId}`);
      console.log(`Customer ID: ${customerId}`);
      console.log(`Amount Due: ${amountDue}`);

      try {
        // Call backend to add credits or update subscription status.
        // Assuming the backend handles idempotency using the 'referenceId' (invoice.id).
        const backendResponse = await apiClient.post(`${API_BASE_URLS.auth}/credits/add`, {
          userId: customerId, // Assuming Stripe Customer ID is used as internal User ID
          amount: amountDue, // Amount in the smallest currency unit (e.g., cents)
          referenceId: invoice.id, // Used for idempotency on the backend side
          description: 'Stripe subscription renewal',
        });
        console.log('Backend /credits/add response:', backendResponse.data);
      } catch (backendError: any) {
        console.error('Error calling backend /credits/add:', backendError); // Log the full error object for more details
        // Log and continue to return 200 to Stripe as per standard webhook practice,
        // unless specific retry logic is required by the backend.
      }

      break;
    // Handle other event types as needed
    default:
      console.warn(`Unhandled event type ${event.type}`); // Use warn for unhandled types
  }

  // Return a 200 response to acknowledge receipt of the event
  // This tells Stripe that the webhook was received successfully,
  // even if backend processing failed. Stripe will not retry on 200.
  // If backend processing MUST succeed for Stripe to retry, a non-200 status
  // should be returned, but this requires careful consideration of retry logic.
  return NextResponse.json({ received: true });
}