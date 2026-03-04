import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MapPin, Star, ChevronLeft, ChevronRight, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { hotels, Hotel } from "@/data/hotels";

interface Deal {
  hotelId: string;
  discount: number;
  oldPrice: number;
  newPrice: number;
}

// Map deals to actual hotels from the dataset
// Using hotel IDs 2, 6, 9, 4, 22, 7 for variety
const dealMappings: Deal[] = [
  {
    hotelId: "2", // Oceanview Resort, Dubai
    discount: 30,
    oldPrice: 425,
    newPrice: 298,
  },
  {
    hotelId: "6", // Skyline Tower, Singapore
    discount: 25,
    oldPrice: 320,
    newPrice: 240,
  },
  {
    hotelId: "9", // Eiffel View Suites, Paris
    discount: 20,
    oldPrice: 295,
    newPrice: 236,
  },
  {
    hotelId: "4", // Historic Palace Hotel, Rome
    discount: 35,
    oldPrice: 275,
    newPrice: 179,
  },
  {
    hotelId: "22", // Desert Oasis Resort, Dubai
    discount: 15,
    oldPrice: 550,
    newPrice: 468,
  },
  {
    hotelId: "7", // Harbor Lights Hotel, Sydney
    discount: 40,
    oldPrice: 245,
    newPrice: 147,
  },
];

// Get deal data with hotel information
const getDealsWithHotels = (): Array<Deal & { hotel: Hotel }> => {
  return dealMappings
    .map((deal) => {
      const hotel = hotels.find((h) => h.id === deal.hotelId);
      return hotel ? { ...deal, hotel } : null;
    })
    .filter((deal): deal is Deal & { hotel: Hotel } => deal !== null);
};

const DealsOfTheDay = () => {
  const [searchParams] = useSearchParams();
  const [showLocationBanner, setShowLocationBanner] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const dealsWithHotels = getDealsWithHotels();

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

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-background dark:bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={cn(
          "mb-8 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground dark:text-foreground mb-3">
            Deals of the Day
          </h2>
          <p className="text-muted-foreground dark:text-muted-foreground text-lg">
            Exclusive offers handpicked for you. Book now and save big!
          </p>
        </div>

        {/* Location Permission Banner */}
        {showLocationBanner && (
          <div className={cn(
            "flex items-center justify-between gap-4 bg-muted/50 dark:bg-muted/50 border border-border rounded-xl p-4 mb-8 transition-all duration-500",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Navigation className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground dark:text-foreground text-sm">Enable location</p>
                <p className="text-muted-foreground dark:text-muted-foreground text-xs">Get personalized deals near you</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLocationBanner(false)}
                className="text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground"
              >
                Not now
              </Button>
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Allow
              </Button>
            </div>
          </div>
        )}

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-background dark:bg-background border border-border rounded-full shadow-lg flex items-center justify-center hover:bg-muted dark:hover:bg-muted transition-all duration-300 hover:scale-110 hidden md:flex"
          >
            <ChevronLeft className="w-5 h-5 text-foreground dark:text-foreground" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-background dark:bg-background border border-border rounded-full shadow-lg flex items-center justify-center hover:bg-muted dark:hover:bg-muted transition-all duration-300 hover:scale-110 hidden md:flex"
          >
            <ChevronRight className="w-5 h-5 text-foreground dark:text-foreground" />
          </button>

          {/* Cards Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {dealsWithHotels.map((deal, index) => (
              <div
                key={deal.hotelId}
                className={cn(
                  "flex-shrink-0 w-[300px] snap-start transition-all duration-700",
                  isVisible 
                    ? "opacity-100 translate-x-0" 
                    : "opacity-0 translate-x-12"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-card dark:bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.02] group">
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={deal.hotel.image}
                      alt={deal.hotel.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Discount Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-3 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-full animate-pulse">
                        {deal.discount}% OFF
                      </span>
                    </div>
                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-background/90 dark:bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground dark:text-foreground">
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                        {deal.hotel.rating}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-semibold text-foreground dark:text-foreground text-lg mb-1 line-clamp-1">
                      {deal.hotel.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-muted-foreground dark:text-muted-foreground text-sm mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{deal.hotel.city}, {deal.hotel.country}</span>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <span className="text-muted-foreground dark:text-muted-foreground text-sm line-through">
                          ${deal.oldPrice}
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold text-foreground dark:text-foreground">
                            ${deal.newPrice}
                          </span>
                          <span className="text-muted-foreground dark:text-muted-foreground text-sm">/night</span>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground dark:text-muted-foreground">
                        {deal.hotel.reviewCount.toLocaleString()} reviews
                      </span>
                    </div>

                    {/* Book Button */}
                    <Button
                      asChild
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer"
                    >
                      <Link to={`/hotel/${deal.hotelId}?${searchParams.toString()}`}>
                        Book Now
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsOfTheDay;
