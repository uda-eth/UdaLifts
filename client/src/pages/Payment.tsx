import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

// Initialize Stripe with proper error handling
let stripePromise: Promise<any> | null = null;

const getStripe = () => {
  if (!stripePromise) {
    const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    if (!key) {
      console.error('Missing Stripe publishable key');
      return null;
    }
    stripePromise = loadStripe(key);
  }
  return stripePromise;
};

const plans = [
  {
    name: 'Basic Plan',
    price: 29.99,
    features: [
      'Personalized workout plan',
      'Monthly check-ins',
      'Basic nutrition guidance',
    ],
  },
  {
    name: 'Premium Plan',
    price: 49.99,
    features: [
      'Everything in Basic',
      'Weekly check-ins',
      'Advanced nutrition planning',
      'Video form checks',
    ],
    popular: true,
  },
  {
    name: 'Elite Plan',
    price: 99.99,
    features: [
      'Everything in Premium',
      'Daily check-ins',
      '1-on-1 video calls',
      'Custom meal plans',
      'Priority support',
    ],
  },
];

export default function PaymentPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();
  const [stripeInitialized, setStripeInitialized] = useState(false);

  useEffect(() => {
    // Check if Stripe is properly initialized
    const stripe = getStripe();
    setStripeInitialized(!!stripe);

    if (!stripe) {
      toast({
        title: "Configuration Error",
        description: "Payment system is not properly configured. Please try again later.",
        variant: "destructive",
      });
    }
  }, []);

  const handlePayment = async (planName: string) => {
    try {
      setLoading(planName);

      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error occurred' }));
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setLoading(null);
    }
  };

  if (!stripeInitialized) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Loading Payment System...</h1>
        <p className="text-lg text-gray-600">
          Please wait while we initialize the payment system.
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
        <div className="mt-4 p-2 bg-yellow-100 text-yellow-800 rounded-md">
          Test Mode - Use card number 4242 4242 4242 4242 for testing
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`${plan.popular ? 'border-2 border-primary relative' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm">
                  Most Popular
                </span>
              </div>
            )}
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">{plan.name}</h2>
              <p className="text-3xl font-bold mb-4">
                ${plan.price}
                <span className="text-sm font-normal">/month</span>
              </p>
              <ul className="mb-6 space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-primary mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                onClick={() => handlePayment(plan.name)}
                disabled={loading === plan.name}
              >
                {loading === plan.name ? 'Processing...' : 'Subscribe Now'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}