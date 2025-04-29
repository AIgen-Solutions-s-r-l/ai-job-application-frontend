import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { POST } from '@/app/api/webhook/stripe/route'; // Assuming POST is exported
import { apiClient } from '@/libs/api/client';

// Mock Next.js server components
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((body, options) => ({ body, options, json: () => Promise.resolve(body) })),
  },
}));

// Mock Stripe
jest.mock('stripe', () => ({
  webhooks: {
    constructEvent: jest.fn(),
  },
}));

// Mock apiClient
jest.mock('@/libs/api/client', () => ({
  apiClient: {
    post: jest.fn(),
  },
}));

// Mock environment variables
const mockStripeSecretKey = 'sk_test_mock';
const mockStripeWebhookSecret = 'whsec_mock';

describe('Stripe Webhook Handler (Integration)', () => {
  let mockRequest: Partial<NextRequest>;
  let mockConstructEvent: jest.Mock;
  let mockApiClientPost: jest.Mock;
  let mockConsoleError: jest.SpyInstance;
  let mockConsoleWarn: jest.SpyInstance;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Set mock environment variables
    process.env.STRIPE_SECRET_KEY = mockStripeSecretKey;
    process.env.STRIPE_WEBHOOK_SECRET = mockStripeWebhookSecret;

    // Mock NextRequest
    mockRequest = {
      headers: {
        get: jest.fn(),
      } as any,
      text: jest.fn(),
    };

    // Get mock instances
    mockConstructEvent = (Stripe as any).webhooks.constructEvent;
    mockApiClientPost = apiClient.post as jest.Mock;

    // Spy on console methods
    mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockConsoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console spies
    mockConsoleError.mockRestore();
    mockConsoleWarn.mockRestore();

    // Clean up mock environment variables
    delete process.env.STRIPE_SECRET_KEY;
    delete process.env.STRIPE_WEBHOOK_SECRET;
  });

  it('should handle invoice.payment_succeeded event successfully', async () => {
    const mockSignature = 't=12345,v1=mock_signature';
    const mockRequestBody = '{"id":"evt_test","type":"invoice.payment_succeeded","data":{"object":{"id":"in_test","customer":"cus_test","subscription":"sub_test","amount_due":1000}}}';
    const mockInvoiceEvent = {
      id: 'evt_test',
      type: 'invoice.payment_succeeded',
      data: {
        object: {
          id: 'in_test',
          customer: 'cus_test',
          subscription: 'sub_test',
          amount_due: 1000,
        },
      },
    } as Stripe.Event;

    // Mock request headers and body
    (mockRequest.headers!.get as jest.Mock).mockReturnValue(mockSignature);
    (mockRequest.text as jest.Mock).mockResolvedValue(mockRequestBody);

    // Mock Stripe constructEvent
    mockConstructEvent.mockReturnValue(mockInvoiceEvent);

    // Mock apiClient.post success
    mockApiClientPost.mockResolvedValue({ data: { success: true } });

    // Call the handler
    const response = await POST(mockRequest as NextRequest);

    // Assertions
    expect(mockRequest.headers!.get).toHaveBeenCalledWith('stripe-signature');
    expect(mockRequest.text).toHaveBeenCalled();
    expect(mockConstructEvent).toHaveBeenCalledWith(mockRequestBody, mockSignature, mockStripeWebhookSecret);
    expect(mockApiClientPost).toHaveBeenCalledWith('/api/auth/credits/add', {
      userId: 'cus_test',
      amount: 1000,
      referenceId: 'in_test',
      description: 'Stripe subscription renewal',
    });
    expect(response.json()).resolves.toEqual({ received: true });
    expect(response.status).toBe(200);

    // Ensure console.error and console.warn were not called
    expect(mockConsoleError).not.toHaveBeenCalled();
    expect(mockConsoleWarn).not.toHaveBeenCalled();
  });
it('should handle invoice.payment_succeeded event when backend API call fails', async () => {
    const mockSignature = 't=12345,v1=mock_signature';
    const mockRequestBody = '{"id":"evt_test","type":"invoice.payment_succeeded","data":{"object":{"id":"in_test_fail","customer":"cus_test_fail","subscription":"sub_test_fail","amount_due":2000}}}';
    const mockInvoiceEvent = {
      id: 'evt_test_fail',
      type: 'invoice.payment_succeeded',
      data: {
        object: {
          id: 'in_test_fail',
          customer: 'cus_test_fail',
          subscription: 'sub_test_fail',
          amount_due: 2000,
        },
      },
    } as Stripe.Event;

    // Mock request headers and body
    (mockRequest.headers!.get as jest.Mock).mockReturnValue(mockSignature);
    (mockRequest.text as jest.Mock).mockResolvedValue(mockRequestBody);

    // Mock Stripe constructEvent
    mockConstructEvent.mockReturnValue(mockInvoiceEvent);

    // Mock apiClient.post to throw an error
    const mockBackendError = new Error('Backend API failed');
    mockApiClientPost.mockRejectedValue(mockBackendError);

    // Call the handler
    const response = await POST(mockRequest as NextRequest);

    // Assertions
    expect(mockConstructEvent).toHaveBeenCalledWith(mockRequestBody, mockSignature, mockStripeWebhookSecret);
    expect(mockApiClientPost).toHaveBeenCalledWith('/api/auth/credits/add', {
      userId: 'cus_test_fail',
      amount: 2000,
      referenceId: 'in_test_fail',
      description: 'Stripe subscription renewal',
    });
    expect(mockConsoleError).toHaveBeenCalledWith('Error calling backend /credits/add:', mockBackendError);
    expect(response.json()).resolves.toEqual({ received: true });
    expect(response.status).toBe(200);

    // Ensure console.warn was not called
    expect(mockConsoleWarn).not.toHaveBeenCalled();
  });
it('should return 400 for invalid Stripe signature', async () => {
    const mockSignature = 't=12345,v1=invalid_signature';
    const mockRequestBody = '{"id":"evt_test_invalid_sig","type":"invoice.payment_succeeded","data":{}}';

    // Mock request headers and body
    (mockRequest.headers!.get as jest.Mock).mockReturnValue(mockSignature);
    (mockRequest.text as jest.Mock).mockResolvedValue(mockRequestBody);

    // Mock Stripe constructEvent to throw an error
    const mockSignatureError = new Error('No signatures found matching the expected signature for payload.');
    mockConstructEvent.mockImplementation(() => {
      throw mockSignatureError;
    });

    // Call the handler
    const response = await POST(mockRequest as NextRequest);

    // Assertions
    expect(mockRequest.headers!.get).toHaveBeenCalledWith('stripe-signature');
    expect(mockRequest.text).toHaveBeenCalled();
    expect(mockConstructEvent).toHaveBeenCalledWith(mockRequestBody, mockSignature, mockStripeWebhookSecret);
    expect(mockConsoleError).toHaveBeenCalledWith('Webhook signature verification failed:', mockSignatureError.message);
    expect(response.json()).resolves.toEqual({ message: `Webhook Error: ${mockSignatureError.message}` });
    expect(response.status).toBe(400);

    // Ensure apiClient.post and console.warn were not called
    expect(mockApiClientPost).not.toHaveBeenCalled();
    expect(mockConsoleWarn).not.toHaveBeenCalled();
  });
it('should return 400 if stripe-signature header is missing', async () => {
    // Mock request headers.get to return null for stripe-signature
    (mockRequest.headers!.get as jest.Mock).mockReturnValue(null);

    // Call the handler
    const response = await POST(mockRequest as NextRequest);

    // Assertions
    expect(mockRequest.headers!.get).toHaveBeenCalledWith('stripe-signature');
    expect(mockRequest.text).not.toHaveBeenCalled(); // Should not proceed to read body
    expect(mockConstructEvent).not.toHaveBeenCalled(); // Should not attempt to construct event
    expect(mockConsoleError).not.toHaveBeenCalled(); // Should not log signature error
    expect(mockConsoleWarn).not.toHaveBeenCalled(); // Should not log unhandled event
    expect(mockApiClientPost).not.toHaveBeenCalled(); // Should not call backend API

    expect(response.json()).resolves.toEqual({ message: 'No stripe-signature header' });
    expect(response.status).toBe(400);
  });
it('should log a warning and return 200 for unhandled event types', async () => {
    const mockSignature = 't=12345,v1=mock_signature';
    const mockRequestBody = '{"id":"evt_test_unhandled","type":"customer.created","data":{}}';
    const mockUnhandledEvent = {
      id: 'evt_test_unhandled',
      type: 'customer.created', // Unhandled type
      data: {},
    } as Stripe.Event;

    // Mock request headers and body
    (mockRequest.headers!.get as jest.Mock).mockReturnValue(mockSignature);
    (mockRequest.text as jest.Mock).mockResolvedValue(mockRequestBody);

    // Mock Stripe constructEvent
    mockConstructEvent.mockReturnValue(mockUnhandledEvent);

    // Call the handler
    const response = await POST(mockRequest as NextRequest);

    // Assertions
    expect(mockRequest.headers!.get).toHaveBeenCalledWith('stripe-signature');
    expect(mockRequest.text).toHaveBeenCalled();
    expect(mockConstructEvent).toHaveBeenCalledWith(mockRequestBody, mockSignature, mockStripeWebhookSecret);
    expect(mockConsoleWarn).toHaveBeenCalledWith('Unhandled event type customer.created');
    expect(mockConsoleError).not.toHaveBeenCalled(); // Should not log error
    expect(mockApiClientPost).not.toHaveBeenCalled(); // Should not call backend API

    expect(response.json()).resolves.toEqual({ received: true });
    expect(response.status).toBe(200);
  });
});