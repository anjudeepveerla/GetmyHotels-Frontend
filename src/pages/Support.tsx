import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MessageSquare, Phone, Mail, ArrowRight } from "lucide-react";

const Support = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto" ref={sectionRef}>
          {/* Header */}
          <div
            className={cn(
              "text-center mb-12 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4">
              Welcome to Customer Support
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Sign in to contact Customer Service — we're available 24 hours a day
            </p>
          </div>

          {/* Support Option Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Send Us a Message */}
            <div
              className={cn(
                "group rounded-2xl bg-card border border-border p-8",
                "hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
                "cursor-pointer",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: "100ms" }}
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Send Us a Message
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Fill out our contact form and we'll get back to you within 24 hours.
              </p>
              <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                Get Started
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Call Us */}
            <div
              className={cn(
                "group rounded-2xl bg-card border border-border p-8",
                "hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
                "cursor-pointer",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Phone className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Call Us
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Speak directly with our support team. Available Mon-Fri, 9am-5pm PST.
              </p>
              <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                <a href="tel:+15551234567" className="flex items-center">
                  +1 (555) 123-4567
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Email Us */}
            <div
              className={cn(
                "group rounded-2xl bg-card border border-border p-8",
                "hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
                "cursor-pointer",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Mail className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Email Us
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Send us an email and we'll respond as soon as possible.
              </p>
              <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                <a href="mailto:support@getmyhotels.com" className="flex items-center">
                  support@getmyhotels.com
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            className={cn(
              "flex flex-col sm:flex-row gap-4 justify-center items-center",
              "transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
            style={{ transitionDelay: "400ms" }}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 py-6 text-base font-semibold rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Sign In
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-8 py-6 text-base font-semibold rounded-full border-2 hover:bg-muted"
            >
              Continue without an account
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Support;
