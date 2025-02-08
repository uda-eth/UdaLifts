import express from 'express';
import Stripe from 'stripe';

const router = express.Router();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY must be set');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16'
});

// Create a checkout session
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { planName } = req.body;

    // Define plan prices
    const planPrices = {
      'Basic Plan': 2999,
      'Premium Plan': 4999,
      'Elite Plan': 9999
    };

    const amount = planPrices[planName as keyof typeof planPrices];
    if (!amount) {
      return res.status(400).json({ error: 'Invalid plan selected' });
    }

    // Create the checkout session
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

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to create checkout session',
    });
  }
});

// Webhook to handle subscription events
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig || '',
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        // Handle successful payment
        console.log('Payment successful:', session);
        break;
      // Add other webhook events as needed
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Webhook Error:', err instanceof Error ? err.message : err);
    res.status(400).send(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }
});

export default router;