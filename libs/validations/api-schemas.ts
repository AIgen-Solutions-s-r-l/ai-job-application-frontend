import { z } from 'zod';

// Stripe checkout session creation
export const createCheckoutSchema = z.object({
  priceId: z.string()
    .min(1, 'Price ID is required')
    .regex(/^price_[a-zA-Z0-9]+$/, 'Invalid Stripe price ID format'),
  userId: z.string()
    .min(1, 'User ID is required'),
  userEmail: z.string()
    .email('Invalid email format'),
  mode: z.enum(['payment', 'subscription']).optional(),
  successUrl: z.string().url('Invalid success URL').optional(),
  cancelUrl: z.string().url('Invalid cancel URL').optional(),
});

// Stripe payment intent creation
export const createPaymentIntentSchema = z.object({
  amount: z.number()
    .int('Amount must be an integer')
    .positive('Amount must be positive')
    .max(99999999, 'Amount exceeds maximum allowed'),
});

// Stripe session ID query parameter
export const getTransactionIdSchema = z.object({
  session_id: z.string()
    .min(1, 'Session ID is required')
    .regex(/^cs_[a-zA-Z0-9_]+$/, 'Invalid Stripe session ID format'),
});

// Mailgun webhook form data
export const mailgunWebhookSchema = z.object({
  From: z.string().email('Invalid sender email'),
  Subject: z.string().min(1, 'Subject is required').max(998, 'Subject too long'),
  'body-html': z.string().min(1, 'Email body is required').max(1000000, 'Email body too large'),
});

// Helper function to create validation response
export const createValidationErrorResponse = (error: z.ZodError) => {
  const isDev = process.env.NODE_ENV === 'development';
  return {
    error: 'Validation failed',
    ...(isDev && { details: error.flatten() }),
  };
};

export type CreateCheckoutInput = z.infer<typeof createCheckoutSchema>;
export type CreatePaymentIntentInput = z.infer<typeof createPaymentIntentSchema>;
export type GetTransactionIdInput = z.infer<typeof getTransactionIdSchema>;
