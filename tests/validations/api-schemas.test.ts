import { describe, it, expect } from 'vitest';
import {
  createCheckoutSchema,
  createPaymentIntentSchema,
  getTransactionIdSchema,
} from '@/libs/validations/api-schemas';

describe('createCheckoutSchema', () => {
  const validCheckout = {
    priceId: 'price_1234567890abcdef',
    userId: 'user-123',
    userEmail: 'test@example.com',
  };

  it('should validate correct checkout data', () => {
    const result = createCheckoutSchema.safeParse(validCheckout);
    expect(result.success).toBe(true);
  });

  it('should reject invalid Stripe price ID format', () => {
    const result = createCheckoutSchema.safeParse({
      ...validCheckout,
      priceId: 'invalid_price_id',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('Invalid Stripe price ID');
    }
  });

  it('should reject invalid email format', () => {
    const result = createCheckoutSchema.safeParse({
      ...validCheckout,
      userEmail: 'not-an-email',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('Invalid email');
    }
  });

  it('should reject missing required fields', () => {
    const result = createCheckoutSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it('should accept optional mode field', () => {
    const result = createCheckoutSchema.safeParse({
      ...validCheckout,
      mode: 'subscription',
    });
    expect(result.success).toBe(true);
  });

  it('should reject invalid mode value', () => {
    const result = createCheckoutSchema.safeParse({
      ...validCheckout,
      mode: 'invalid_mode',
    });
    expect(result.success).toBe(false);
  });

  it('should accept valid URLs for successUrl and cancelUrl', () => {
    const result = createCheckoutSchema.safeParse({
      ...validCheckout,
      successUrl: 'https://example.com/success',
      cancelUrl: 'https://example.com/cancel',
    });
    expect(result.success).toBe(true);
  });

  it('should reject invalid URLs', () => {
    const result = createCheckoutSchema.safeParse({
      ...validCheckout,
      successUrl: 'not-a-url',
    });
    expect(result.success).toBe(false);
  });
});

describe('createPaymentIntentSchema', () => {
  it('should validate correct payment intent data', () => {
    const result = createPaymentIntentSchema.safeParse({ amount: 1000 });
    expect(result.success).toBe(true);
  });

  it('should reject negative amounts', () => {
    const result = createPaymentIntentSchema.safeParse({ amount: -100 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('positive');
    }
  });

  it('should reject zero amount', () => {
    const result = createPaymentIntentSchema.safeParse({ amount: 0 });
    expect(result.success).toBe(false);
  });

  it('should reject non-integer amounts', () => {
    const result = createPaymentIntentSchema.safeParse({ amount: 10.5 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('integer');
    }
  });

  it('should reject amounts exceeding maximum', () => {
    const result = createPaymentIntentSchema.safeParse({ amount: 999999999 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('maximum');
    }
  });

  it('should reject missing amount', () => {
    const result = createPaymentIntentSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

describe('getTransactionIdSchema', () => {
  it('should validate correct Stripe session ID', () => {
    const result = getTransactionIdSchema.safeParse({
      session_id: 'cs_test_a1b2c3d4e5f6g7h8i9j0',
    });
    expect(result.success).toBe(true);
  });

  it('should reject invalid session ID format', () => {
    const result = getTransactionIdSchema.safeParse({
      session_id: 'invalid_session',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('Invalid Stripe session ID');
    }
  });

  it('should reject empty session ID', () => {
    const result = getTransactionIdSchema.safeParse({
      session_id: '',
    });
    expect(result.success).toBe(false);
  });

  it('should reject missing session ID', () => {
    const result = getTransactionIdSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});
