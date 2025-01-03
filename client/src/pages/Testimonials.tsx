import TestimonialCard from "@/components/sections/TestimonialCard";

const testimonials = [
  {
    name: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1493770348161-369560ae357d",
    quote: "Working with this coach has completely transformed my approach to fitness. I've achieved results I never thought possible!",
    rating: 5,
  },
  {
    name: "Mike Chen",
    image: "https://images.unsplash.com/photo-1556911073-a517e752729c",
    quote: "The personalized attention and expert guidance have made all the difference in my fitness journey.",
    rating: 5,
  },
  {
    name: "Emma Davis",
    image: "https://images.unsplash.com/photo-1692369608035-08cad6e41f0e",
    quote: "Not only did I reach my fitness goals, but I also learned sustainable habits that will last a lifetime.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            What Our Clients Say
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Real stories from real people who have transformed their lives
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
}
