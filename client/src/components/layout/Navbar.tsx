import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/payment" },
];

export default function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <span className="text-xl font-bold text-primary">UdaLifts</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <a
                  className={cn(
                    "inline-flex items-center px-1 pt-1 text-sm font-medium",
                    location === item.href
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  )}
                >
                  {item.name}
                </a>
              </Link>
            ))}
            <div className="flex items-center">
              <Button 
                asChild
                onClick={() => trackButtonClick('get_started', 'navbar')}
              >
                <a href="https://g8th2cgw71l.typeform.com/to/rFQiFFcO" target="_blank" rel="noopener noreferrer">
                  Get Started Now
                </a>
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          <div className="flex items-center md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-4">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a
                        className={cn(
                          "px-3 py-2 rounded-md text-base font-medium",
                          location === item.href
                            ? "text-primary bg-primary/10"
                            : "text-gray-700 hover:text-primary hover:bg-primary/5"
                        )}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                  <Button 
                    asChild 
                    className="w-full"
                    onClick={() => trackButtonClick('get_started', 'navbar_mobile')}
                  >
                    <a href="https://g8th2cgw71l.typeform.com/to/rFQiFFcO" target="_blank" rel="noopener noreferrer">
                      Get Started Now
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}