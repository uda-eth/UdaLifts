import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Dedicated to helping you achieve your fitness goals through personalized coaching
          </p>
        </div>

        <div className="lg:relative lg:h-full">
          <img
            src="/images/transformation_pic.jpg"
            alt="Fitness transformation journey"
            className="rounded-lg shadow-xl w-full h-auto lg:h-full lg:w-full lg:object-cover"
          />
        </div>
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            <p className="mt-4 text-lg text-gray-600">
              The true purpose behind my guide is for you to improve your physique, increase the quality AND length of your life, and become the person you were meant to be. 

              Even if you choose to implement only 1% of my suggestions, you will become 1% better than you were before and that’s all that matters.	

            </p>

            <h2 className="mt-8 text-3xl font-bold text-gray-900">
              Your Coach's Story
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              With over a decade of experience in fitness and nutrition, I've helped
              hundreds of clients achieve their goals. My approach combines science-based
              training methods with personalized attention to ensure sustainable results.
            </p>

            <div className="mt-8">
              <Button size="lg">Learn More About Our Services</Button>
            </div>
          </div>

          <div className="grid grid-//cols-2 gap-4">
            <img
              //src="https://images.unsplash.com/photo-1617336581611-0afe60655091"
              //alt="Fitness coach"
              //className="lg:relative lg:h-full"
            />
            
          </div>
        </div>
      </div>
    </div>
  );
}
