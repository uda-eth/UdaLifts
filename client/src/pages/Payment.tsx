import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

// Initialize Stripe with the publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const plans = {
  basic: {
    id: 'price_basic',
    name: 'Basic Plan',
    price: '29.99',
    features: [
      'Personalized workout plan',
      'Monthly check-ins',
      'Basic nutrition guidance'
    ]
  },
  premium: {
    id: 'price_premium',
    name: 'Premium Plan',
    price: '49.99',
    features: [
      'Everything in Basic',
      'Weekly check-ins',
      'Advanced nutrition planning',
      'Video form checks'
    ]
  },
  elite: {
    id: 'price_elite',
    name: 'Elite Plan',
    price: '99.99',
    features: [
      'Everything in Premium',
      'Daily check-ins',
      '1-on-1 video calls',
      'Custom meal plans',
      'Priority support'
    ]
  }
};

const PaymentPage = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const handlePayment = async (planId: string) => {
    setLoading(planId);
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: plans[planId as keyof typeof plans].id,
        }),
      });

      if (!response.ok) {
        throw new Error('Payment setup failed');
      }

      const session = await response.json();
      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Error",
        description: "Failed to initiate payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Choose Your Fitness Plan</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {Object.entries(plans).map(([key, plan]) => (
          <Card key={key} className={`p-6 ${key === 'premium' ? 'border-2 border-primary relative' : ''}`}>
            {key === 'premium' && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm">
                  Most Popular
                </span>
              </div>
            )}
            <h2 className="text-xl font-semibold mb-4">{plan.name}</h2>
            <p className="text-3xl font-bold mb-4">${plan.price}<span className="text-sm font-normal">/month</span></p>
            <ul className="mb-6 space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index}>✓ {feature}</li>
              ))}
            </ul>
            <Button 
              onClick={() => handlePayment(key)}
              disabled={loading === key}
              className="w-full"
            >
              {loading === key ? 'Processing...' : 'Subscribe Now'}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PaymentPage;