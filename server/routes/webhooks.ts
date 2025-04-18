// server/routes/webhooks.ts
import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import { db } from '../../db';
import { payments } from '../../db/schema';

const router = express.Router();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY must be set');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-01-27.acacia',
  typescript: true,
});

router.post('/api/webhooks/stripe', express.raw({ type: 'application/json' }), async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('Missing STRIPE_WEBHOOK_SECRET');
    return res.status(500).send('Webhook configuration error');
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log('Checkout session completed:', session);
    
    // Add to the database
    try {
      await handleSuccessfulPayment(session);
    } catch (err) {
      console.error('Error processing payment:', err);
      // Don't return an error status to Stripe, just log it
    }
  }

  res.json({ received: true });
});

// Handle successful payments
async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  // Make sure we have the data we need
  if (!session.amount_total) {
    throw new Error('No amount in session');
  }

  // Save to database
  await db.insert(payments).values({
    stripeId: session.id,
    amount: session.amount_total,
    // Add additional fields as needed
  });

  console.log(`Payment recorded in database: ${session.id}`);
}

export default router;