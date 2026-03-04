import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Destination {
  id: string;
  name: string;
  subtitle: string;
  image: string;
}

const destinations: Destination[] = [
  {
    id: "1",
    name: "Santorini",
    subtitle: "Aegean Paradise",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=1200&fit=crop",
  },
  {
    id: "2",
    name: "Tokyo",
    subtitle: "Modern Metropolis",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=1200&fit=crop",
  },
  {
    id: "3",
    name: "Paris",
    subtitle: "City of Light",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=1200&fit=crop",
  },
  {
    id: "4",
    name: "New York",
    subtitle: "The Big Apple",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=1200&fit=crop",
  },
  {
    id: "5",
    name: "Bali",
    subtitle: "Tropical Escape",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=1200&fit=crop",
  },
];

const TrendingDestinations = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // null = default state (first card primary)
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  // Mobile: Track scroll position to determine center card
  useEffect(() => {
    if (!scrollContainerRef.current || !isMobile) return;

    const container = scrollContainerRef.current;
    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const gap = 16; // gap-4 = 16px
      const activeCardWidth = 280;
      const inactiveCardWidth = 200;
      const centerIndex = Math.round(scrollLeft / (activeCardWidth + gap));
      setScrollPosition(Math.min(centerIndex, destinations.length - 1));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-background dark:bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={cn(
            "mb-12 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground dark:text-foreground mb-3">
            Trending Destinations
          </h2>
          <p className="text-muted-foreground dark:text-muted-foreground text-lg">
            Discover the world's most sought-after travel destinations
          </p>
        </div>

        {/* Destinations Container */}
        <div
          ref={scrollContainerRef}
          className={cn(
            "flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide",
            !isMobile && "md:overflow-x-visible md:justify-center",
            isMobile && "snap-x snap-mandatory pb-4 -mx-4 px-4"
          )}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {destinations.map((destination, index) => {
            const isHovered = hoveredIndex === index;
            const isActive = isMobile ? scrollPosition === index : hoveredIndex === null ? index === 0 : isHovered;
            const distance = isMobile
              ? Math.abs(scrollPosition - index)
              : hoveredIndex !== null
              ? Math.abs(hoveredIndex - index)
              : index;

            // Desktop: Calculate flex-basis based on state
            const getFlexBasis = () => {
              if (isMobile) return undefined;
              if (hoveredIndex === null) {
                // Default state: first card larger
                return index === 0 ? "28%" : "18%";
              }
              if (isHovered) {
                return "35%";
              }
              if (distance === 1) {
                return "12%"; // Adjacent cards compress
              }
              if (distance > 2) {
                return "10%"; // Far cards compress more
              }
              return "15%";
            };

            const getMinWidth = () => {
              if (isMobile) return undefined;
              return "200px"; // Prevent cards from getting too small
            };

            return (
              <div
                key={destination.id}
                className={cn(
                  "destination-card flex-shrink-0 transition-all duration-[400ms] ease-in-out",
                  // Mobile: fixed widths with snap
                  isMobile && [
                    "snap-start",
                    isActive ? "w-[280px]" : "w-[200px]",
                  ],
                  // Desktop: flex-basis control
                  !isMobile && "md:flex-shrink",
                  // Opacity for far cards (desktop only)
                  !isMobile && distance > 2 && "md:opacity-70",
                  // Smooth transitions
                )}
                style={{
                  flexBasis: getFlexBasis(),
                  minWidth: getMinWidth(),
                  transition: "flex-basis 400ms ease-in-out, opacity 400ms ease-in-out",
                }}
                onMouseEnter={() => !isMobile && setHoveredIndex(index)}
                onMouseLeave={() => !isMobile && setHoveredIndex(null)}
              >
                <div
                  className={cn(
                    "relative rounded-2xl overflow-hidden group cursor-pointer h-[500px] md:h-[600px]",
                    "transition-all duration-[400ms] ease-in-out",
                    // Hover lift effect (desktop only)
                    !isMobile && isHovered && "md:shadow-2xl md:-translate-y-2"
                  )}
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[400ms] ease-in-out"
                    style={{
                      backgroundImage: `url(${destination.image})`,
                      transform: isHovered && !isMobile ? "scale(1.05)" : "scale(1)",
                    }}
                  />

                  {/* Dark Bottom Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h3
                      className={cn(
                        "font-serif font-bold text-white mb-2 transition-all duration-[400ms]",
                        isActive ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                      )}
                    >
                      {destination.name}
                    </h3>
                    <p
                      className={cn(
                        "text-white/90 mb-4 transition-all duration-[400ms]",
                        isActive ? "text-base md:text-lg" : "text-sm md:text-base"
                      )}
                    >
                      {destination.subtitle}
                    </p>

                    {/* CTA Button - Only visible on active card */}
                    <div
                      className={cn(
                        "transition-all duration-[400ms] ease-in-out",
                        isActive
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4 pointer-events-none"
                      )}
                    >
                      <Button
                        variant="default"
                        size="lg"
                        className="bg-white dark:bg-white text-black dark:text-black hover:bg-white/90 dark:hover:bg-white/90 rounded-full px-6 shadow-lg"
                      >
                        Explore
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrendingDestinations;
