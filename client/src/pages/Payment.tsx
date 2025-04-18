import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const plans = [
  {
    id: 'basic-plan',
    name: 'Basic Plan',
    price: 29.99,
    features: [
      'Personalized workout plan',
      'Monthly check-ins',
      'Basic nutrition guidance',
    ],
  },
  {
    id: 'premium-plan',
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
    id: 'elite-plan',
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

  const handlePayment = async (plan: typeof plans[0]) => {
    try {
      setLoading(plan.id);
      
      // For now, we just show a success message since we've removed the payment processing
      setTimeout(() => {
        toast({
          title: 'Coming Soon',
          description: `The ${plan.name} subscription will be available soon. Thank you for your interest!`,
          variant: 'default',
        });
        setLoading(null);
      }, 1000);
    } catch (error) {
      console.error('Payment action error:', error);
      toast({
        title: 'Error',
        description: 'We encountered an error. Please try again later.',
        variant: 'destructive',
      });
      setLoading(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Fitness Journey</h1>
        <p className="text-lg text-gray-600">
          Select the plan that best fits your goals and commitment level
        </p>
        <div className="mt-4 p-2 bg-yellow-100 text-yellow-800 rounded-md">
          Payment system currently unavailable - New payment system coming soon
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative ${plan.popular ? 'border-2 border-primary' : ''}`}
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
                onClick={() => handlePayment(plan)}
                disabled={loading === plan.id}
              >
                {loading === plan.id ? 'Processing...' : 'Subscribe Now'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}