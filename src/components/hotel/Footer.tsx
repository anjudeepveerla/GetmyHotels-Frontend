import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className={cn(
        "bg-background dark:bg-background",
        "text-foreground",
        "border-t border-border",
        "transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-foreground">Getmyhotels.com</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your trusted partner for finding the perfect stay. Book with confidence and discover amazing destinations worldwide.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about-us"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 inline-block hover:underline underline-offset-4"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 inline-block hover:underline underline-offset-4"
                >
                  Careers
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 inline-block hover:underline underline-offset-4"
                >
                  Press
                </a>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 inline-block hover:underline underline-offset-4"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/faqs"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 inline-block hover:underline underline-offset-4"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 inline-block hover:underline underline-offset-4"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 inline-block hover:underline underline-offset-4"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 inline-block hover:underline underline-offset-4"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Get the App */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">Get the App</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Save more with our mobile app.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-secondary/50 dark:bg-muted/50 backdrop-blur-sm rounded-lg px-4 py-2.5 hover:bg-secondary dark:hover:bg-muted transition-all duration-300 hover:scale-105 hover:-translate-y-1 border border-border"
                aria-label="Download on the App Store"
              >
                <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C1.79 15.25 2.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <span className="text-foreground text-sm font-medium">App Store</span>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-secondary/50 dark:bg-muted/50 backdrop-blur-sm rounded-lg px-4 py-2.5 hover:bg-secondary dark:hover:bg-muted transition-all duration-300 hover:scale-105 hover:-translate-y-1 border border-border"
                aria-label="Get it on Google Play"
              >
                <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L6.05,21.34L14.54,12.85L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <span className="text-foreground text-sm font-medium">Google Play</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            © 2026 Getmyhotels.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
