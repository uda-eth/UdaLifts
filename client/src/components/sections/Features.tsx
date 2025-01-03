import { Card, CardContent } from "@/components/ui/card";
import { Dumbbell, Heart, MessageCircle, Target } from "lucide-react";

const features = [
  {
    name: "Customized Workout Plans",
    description: "Tailored fitness programs designed specifically for your goals and needs",
    icon: Dumbbell,
  },
  {
    name: "Nutrition Guidance",
    description: "Expert advice on nutrition to complement your fitness journey",
    icon: Heart,
  },
  {
    name: "One-on-one Coaching",
    description: "Personal attention and guidance throughout your transformation",
    icon: Target,
  },
  {
    name: "24/7 Messaging Support",
    description: "Always available to answer your questions and provide motivation",
    icon: MessageCircle,
  },
];

export default function Features() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Transform Your Life With Expert Guidance
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Comprehensive support to help you achieve your fitness goals
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.name} className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6">
                <feature.icon className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {feature.name}
                </h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
