import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Shield, Award, Heart } from "lucide-react";

interface TrustCard {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const trustCards: TrustCard[] = [
  {
    icon: Shield,
    title: "Secure & Trusted",
    description: "Your bookings are protected with industry-leading security and encryption.",
  },
  {
    icon: Award,
    title: "Best Price Guarantee",
    description: "Find a lower price elsewhere? We'll match it and give you 10% back.",
  },
  {
    icon: Heart,
    title: "24/7 Support",
    description: "Our dedicated team is always here to help, whenever you need us.",
  },
];

const TrustValueCards = () => {
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
    <section ref={sectionRef} className="py-16 md:py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {trustCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className={cn(
                  "group bg-muted/80 rounded-2xl p-8 md:p-10 text-center transition-all duration-500",
                  "hover:shadow-xl hover:-translate-y-2",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 mb-6 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="w-8 h-8 md:w-10 md:h-10 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-3">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustValueCards;
