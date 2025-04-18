// server/routes/payments.ts
import express, { Request, Response } from 'express';
import Stripe from 'stripe';

const router = express.Router();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY must be set');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // @ts-ignore - Using a stable API version
  apiVersion: '2023-10-16', 
  typescript: true,
});

// Create checkout session
router.post('/api/payments/create-checkout-session', async (req: Request, res: Response) => {
  try {
    const { planName } = req.body;
    
    // Get plan details
    const planPrices: Record<string, number> = {
      'Basic Plan': 2999,    // $29.99
      'Premium Plan': 4999,  // $49.99
      'Elite Plan': 9999     // $99.99
    };
    
    const amount = planPrices[planName];
    if (!amount) {
      return res.status(400).json({ error: 'Invalid plan selected' });
    }
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: planName,
              description: 'Monthly fitness coaching subscription',
            },
            unit_amount: amount,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.protocol}://${req.get('host')}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.protocol}://${req.get('host')}/payment`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to create checkout session',
    });
  }
});

export default router;