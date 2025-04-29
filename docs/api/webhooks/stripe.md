# Stripe Webhook Handler

## Overview

This webhook handler processes Stripe subscription-related events, specifically focusing on successful invoice payments (`invoice.payment_succeeded`) to manage subscription renewals. It ensures secure event verification, proper data extraction, and reliable communication with the backend for credit updates.

## Endpoint Details

- **URL**: `/api/webhook/stripe`
- **Method**: POST
- **Content-Type**: `application/json`

## Security

The webhook implements Stripe's recommended security practices:

1. **Signature Verification**: Every incoming webhook is verified using the Stripe signature header and webhook secret
2. **Environment Variables Required**:
   - `STRIPE_SECRET_KEY`: Your Stripe API secret key
   - `STRIPE_WEBHOOK_SECRET`: Webhook signing secret from Stripe Dashboard

## Event Handling

### Supported Events

Currently handles:

- `invoice.payment_succeeded`: Processes successful subscription renewal payments

### Event Processing

For `invoice.payment_succeeded` events:

1. Extracts key information:
   - Subscription ID
   - Customer ID
   - Amount Due

2. Forwards to backend:
   - Endpoint: `/credits/add`
   - Payload:
     ```json
     {
       "userId": "<customer_id>",
       "amount": "<amount_due>",
       "referenceId": "<invoice_id>",
       "description": "Stripe subscription renewal"
     }
     ```

### Idempotency

- Uses the Stripe invoice ID as a reference ID when calling the backend
- Backend is expected to handle idempotency based on this reference ID
- Prevents duplicate processing of the same event

## Error Handling

1. **Missing Signature Header**:
   - Returns 400 status code
   - Response: `{ "message": "No stripe-signature header" }`

2. **Invalid Signature**:
   - Returns 400 status code
   - Response: `{ "message": "Webhook Error: <error_message>" }`
   - Logs error details to console

3. **Backend Processing Errors**:
   - Logs error details to console
   - Returns 200 to Stripe (prevents automatic retries)
   - Backend errors are logged but don't trigger webhook retries

4. **Unhandled Event Types**:
   - Logs warning message
   - Returns 200 status code
   - Response: `{ "received": true }`

## Testing

Integration tests cover:

1. Successful event processing
2. Backend API failure scenarios
3. Invalid signature handling
4. Missing signature header
5. Unhandled event types

To test locally:

1. Use the [Stripe CLI](https://stripe.com/docs/stripe-cli) to forward webhooks
2. Configure test webhook secret in environment variables
3. Run integration tests: `npm test tests/integration/api/webhook/stripe.test.ts`

## Configuration

1. Set required environment variables:
   ```env
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

2. Configure Stripe webhook endpoint in Stripe Dashboard:
   - Add endpoint URL
   - Select `invoice.payment_succeeded` event
   - Save endpoint secret as `STRIPE_WEBHOOK_SECRET`

## Best Practices

1. Always return 200 status for received webhooks (prevents Stripe retries)
2. Implement proper logging for debugging and monitoring
3. Use idempotency keys (invoice ID) to prevent duplicate processing
4. Verify Stripe signatures for security
5. Handle errors gracefully without exposing internal details

## Related Files

- Implementation: `app/api/webhook/stripe/route.ts`
- Tests: `tests/integration/api/webhook/stripe.test.ts`