import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, Heart, Target, MessageCircle } from "lucide-react";
import { useAnalytics } from "@/hooks/use-analytics";

const services = [
  {
    title: "Personalized Training Programs",
    description: "Custom workout plans tailored to your goals, fitness level, and schedule",
    icon: Dumbbell,
  },
  {
    title: "One-on-one Coaching",
    description: "Direct guidance and support through in-person or virtual sessions",
    icon: Target,
  },
  {
    title: "Nutrition Planning",
    description: "Detailed meal plans and nutritional guidance for optimal results",
    icon: Heart,
  },
  {
    title: "24/7 Messaging Support",
    description: "Always available to answer your questions and provide motivation when needed",
    icon: MessageCircle,
  },
];

export default function Services() {
  const { trackButtonClick } = useAnalytics();

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Our Services</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive fitness solutions designed to help you reach your goals
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <service.icon className="h-8 w-8 text-primary mb-4" />
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button 
            size="lg" 
            asChild
            onClick={() => trackButtonClick('consultation', 'services')}
          >
            <a href="https://g8th2cgw71l.typeform.com/to/rFQiFFcO" target="_blank" rel="noopener noreferrer">
              Apply for a Free Consultation
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}