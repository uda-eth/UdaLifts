import { Link } from "wouter";
import { SiInstagram, SiX } from "react-icons/si";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/">
              <span className="text-xl font-bold text-primary">UdaLifts</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Transforming lives through personalized fitness coaching and expert guidance.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {["About", "Services", "Contact", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(" ", "-")}`}>
                    <a className="text-sm text-gray-600 hover:text-primary">
                      {item}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Follow Us</h3>
            <div className="mt-4 flex space-x-4">
              <a
                href="#"
                className="text-gray-600 hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiInstagram className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiX className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-600 text-center">
            © {currentYear} UdaLifts. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}