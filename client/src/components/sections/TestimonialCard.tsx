import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialProps {
  name: string;
  image: string;
  quote: string;
  rating: number;
}

export default function TestimonialCard({ name, image, quote, rating }: TestimonialProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={image}
            alt={name}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <h4 className="text-lg font-semibold">{name}</h4>
            <div className="flex">
              {Array.from({ length: rating }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 text-yellow-400 fill-current"
                />
              ))}
            </div>
          </div>
        </div>
        <p className="text-gray-600 italic">"{quote}"</p>
      </CardContent>
    </Card>
  );
}
