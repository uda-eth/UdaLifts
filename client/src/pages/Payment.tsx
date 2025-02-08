import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

// Initialize Stripe
const initializeStripe = () => {
  const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  if (!key) {
    console.error('Stripe publishable key is missing');
    return null;
  }
  return loadStripe(key);
};

const stripePromise = initializeStripe();

// Plan configurations
const plans = {
  basic: {
    id: 'price_1234', 
    name: 'Basic Plan',
    price: '29.99',
    features: [
      'Personalized workout plan',
      'Monthly check-ins',
      'Basic nutrition guidance'
    ]
  },
  premium: {
    id: 'price_5678', 
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
    id: 'price_9012', 
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

export default function PaymentPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const handlePayment = async (planId: string) => {
    if (!stripePromise) {
      toast({
        title: "Configuration Error",
        description: "Payment system is not properly configured. Please try again later.",
        variant: "destructive",
      });
      return;
    }

    setLoading(planId);
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: plans[planId as keyof typeof plans].id,
          mode: 'test'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Payment setup failed');
      }

      const session = await response.json();
      const stripe = await stripePromise;

      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Setup Failed",
        description: error instanceof Error ? error.message : "Failed to initiate payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  // If Stripe is not initialized, show a message
  if (!stripePromise) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Payment System Unavailable</h1>
        <p className="text-lg text-gray-600">
          Our payment system is currently unavailable. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Fitness Journey</h1>
        <p className="text-lg text-gray-600">
          Select the plan that best fits your goals and commitment level
        </p>
        {/* Add test mode banner */}
        <div className="mt-4 p-2 bg-yellow-100 text-yellow-800 rounded-md">
          Test Mode - Use card number 4242 4242 4242 4242 for testing
        </div>
      </div>
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
}