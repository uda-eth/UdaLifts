import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import express from 'express';
import request from 'supertest';
import Stripe from 'stripe';
import stripeRouter from '../stripe';

// Mock Stripe
vi.mock('stripe', () => {
  return {
    default: vi.fn(() => ({
      checkout: {
        sessions: {
          create: vi.fn(),
        },
      },
      webhooks: {
        constructEvent: vi.fn(),
      },
    })),
  };
});

describe('Stripe Router', () => {
  let app: express.Express;
  let mockStripe: Stripe;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api/stripe', stripeRouter);
    mockStripe = new Stripe('mock_key', { apiVersion: '2025-01-27.acacia' });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/stripe/create-checkout-session', () => {
    it('should create a checkout session for valid plan', async () => {
      const mockSession = {
        url: 'https://checkout.stripe.com/mock-session',
      };

      (mockStripe.checkout.sessions.create as any).mockResolvedValueOnce(mockSession);

      const response = await request(app)
        .post('/api/stripe/create-checkout-session')
        .send({ planName: 'Basic Plan' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ url: mockSession.url });
    });

    it('should return 400 for invalid plan name', async () => {
      const response = await request(app)
        .post('/api/stripe/create-checkout-session')
        .send({ planName: 'Invalid Plan' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Invalid plan selected' });
    });

    it('should handle Stripe API errors', async () => {
      (mockStripe.checkout.sessions.create as any).mockRejectedValueOnce(
        new Error('Stripe API Error')
      );

      const response = await request(app)
        .post('/api/stripe/create-checkout-session')
        .send({ planName: 'Basic Plan' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Stripe API Error' });
    });
  });

  describe('POST /api/stripe/webhook', () => {
    it('should handle checkout.session.completed event', async () => {
      const mockEvent = {
        type: 'checkout.session.completed',
        data: {
          object: {
            id: 'mock_session_id',
          },
        },
      };

      (mockStripe.webhooks.constructEvent as any).mockReturnValueOnce(mockEvent);

      const response = await request(app)
        .post('/api/stripe/webhook')
        .set('stripe-signature', 'mock_signature')
        .send(mockEvent);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ received: true });
    });

    it('should handle invalid webhook signatures', async () => {
      (mockStripe.webhooks.constructEvent as any).mockImplementationOnce(() => {
        throw new Error('Invalid signature');
      });

      const response = await request(app)
        .post('/api/stripe/webhook')
        .set('stripe-signature', 'invalid_signature')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toMatch(/Webhook Error: Invalid signature/);
    });
  });
});