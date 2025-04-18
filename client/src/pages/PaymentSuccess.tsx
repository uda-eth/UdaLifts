import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function PaymentSuccessPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { toast } = useToast();
  const [_, setLocation] = useLocation();

  useEffect(() => {
    // Get the session ID from the URL
    const params = new URLSearchParams(window.location.search);
    const session = params.get('session_id');
    
    if (session) {
      setSessionId(session);
      toast({
        title: 'Payment Successful',
        description: 'Thank you for subscribing to our fitness coaching service!',
        variant: 'default',
      });
    } else {
      // If there's no session ID, redirect to the payment page
      setLocation('/payment');
    }
  }, [toast, setLocation]);

  const handleGoHome = () => {
    setLocation('/');
  };

  const handleGoToServices = () => {
    setLocation('/services');
  };

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 p-4">
              <svg
                className="h-12 w-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <p className="text-lg font-medium">Thank you for your subscription!</p>
            <p className="text-gray-500">
              Your fitness journey begins now. We've sent you a confirmation email with all the details.
            </p>
            {sessionId && (
              <p className="text-xs text-gray-400">Order reference: {sessionId}</p>
            )}
          </div>
          
          <div className="flex flex-col space-y-2">
            <Button onClick={handleGoHome} className="w-full">
              Return to Home
            </Button>
            <Button 
              onClick={handleGoToServices} 
              variant="outline" 
              className="w-full"
            >
              View All Services
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}