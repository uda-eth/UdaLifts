import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/hooks/use-analytics";

export default function Hero() {
  const { trackButtonClick } = useAnalytics();

  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 py-16 md:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                Level Up Your{" "}
                <span className="text-primary">Fitness Journey</span> Now!
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-3xl">
                We will help you transform your weakness into strengths through
                personalized coaching, expert guidance, and unwavering support.
              </p>
              <div className="mt-8">
                <Button 
                  size="lg" 
                  asChild 
                  onClick={() => trackButtonClick('consultation', 'hero')}
                >
                  <a href="https://g8th2cgw71l.typeform.com/to/rFQiFFcO" target="_blank" rel="noopener noreferrer">
                    Apply for a Free Consultation
                  </a>
                </Button>
              </div>
            </div>
            <div className="lg:relative lg:h-full">
              <img
                src="/images/backpose.jpg"
                alt="Fitness transformation journey"
                className="rounded-lg shadow-xl w-full h-auto lg:h-full lg:w-full lg:object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}