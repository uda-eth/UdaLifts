import express from 'express';
import Stripe from 'stripe';

const router = express.Router();

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

// Test mode price IDs - these should match the IDs in the frontend
const TEST_PRICE_IDS = {
  'price_1234': {
    amount: 2999,
    currency: 'usd',
    recurring: { interval: 'month' },
    product_data: { name: 'Basic Plan' },
  },
  'price_5678': {
    amount: 4999,
    currency: 'usd',
    recurring: { interval: 'month' },
    product_data: { name: 'Premium Plan' },
  },
  'price_9012': {
    amount: 9999,
    currency: 'usd',
    recurring: { interval: 'month' },
    product_data: { name: 'Elite Plan' },
  },
};

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { priceId, mode } = req.body;

    // Verify the price ID exists in our test mode configuration
    if (!TEST_PRICE_IDS[priceId as keyof typeof TEST_PRICE_IDS]) {
      return res.status(400).json({
        error: 'Invalid price ID. Please select a valid subscription plan.',
      });
    }

    // Create a price for test mode
    const price = await stripe.prices.create({
      ...TEST_PRICE_IDS[priceId as keyof typeof TEST_PRICE_IDS],
      lookup_key: priceId, // Use the test price ID as lookup key
    });

    // Create the checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: price.id,
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