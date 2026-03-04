import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface City {
  id: string;
  name: string;
  stays: number;
  image: string;
}

const cities: City[] = [
  {
    id: "1",
    name: "London",
    stays: 1243,
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
  },
  {
    id: "2",
    name: "Dubai",
    stays: 892,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop",
  },
  {
    id: "3",
    name: "Barcelona",
    stays: 756,
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&h=600&fit=crop",
  },
  {
    id: "4",
    name: "Rome",
    stays: 634,
    image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=800&h=600&fit=crop",
  },
  {
    id: "5",
    name: "Amsterdam",
    stays: 521,
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&h=600&fit=crop",
  },
  {
    id: "6",
    name: "Singapore",
    stays: 489,
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop",
  },
  {
    id: "7",
    name: "Sydney",
    stays: 432,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
  },
  {
    id: "8",
    name: "Istanbul",
    stays: 398,
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=600&fit=crop",
  },
  {
    id: "9",
    name: "New York",
    stays: 1540,
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
  },
  {
    id: "10",
    name: "Tokyo",
    stays: 1100,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
  },
];

const ExploreByCity = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const container = document.getElementById("explore-by-city-section");
    if (container) {
      observer.observe(container);
    }

    return () => observer.disconnect();
  }, []);

  // Duplicate items for infinite scroll
  // We need enough items to fill the screen and then some to loop smoothly
  const carouselItems = [...cities, ...cities, ...cities];

  return (
    <section
      id="explore-by-city-section"
      className="py-16 md:py-24 bg-background dark:bg-background overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Header */}
        <div
          className={cn(
            "text-center transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground dark:text-foreground mb-3">
            Explore by City
          </h2>
          <p className="text-muted-foreground dark:text-muted-foreground text-lg">
            Discover amazing stays in cities around the world
          </p>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full">
        {/* Gradient Masks for fading edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-scroll-left-to-right hover:[animation-play-state:paused] py-8">
          {carouselItems.map((city, index) => (
            <CityCard key={`${city.id}-${index}`} city={city} />
          ))}
        </div>
      </div>
    </section>
  );
};

// City Card Component - Circular
const CityCard = ({ city }: { city: City }) => {
  return (
    <div className="mx-4 md:mx-6 group cursor-pointer">
      <div
        className={cn(
          "relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden",
          "border-4 border-background shadow-lg",
          "transition-transform duration-500 ease-out",
          "group-hover:scale-105 group-hover:shadow-2xl"
        )}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-110"
          style={{ backgroundImage: `url(${city.image})` }}
        />

        {/* Overlay - Always visible for text legibility, darkens on hover */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

        {/* Helper for centering content if needed, but we'll use a flex overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          {/* We can hide text initially and show on hover, or keep it visible. 
                User asked for "circles", usually this implies visible labels. 
                Let's keep them visible but styled nicely. 
            */}
        </div>
      </div>

      {/* Label outside the circle? Or inside? 
          User image example showed text INSIDE the card (rectangular).
          For circles, text inside is standard for "stories" style, or text below.
          I'll put text BELOW the circle for a clean look, or CENTERED inside.
          Let's try CENTERED inside with a strong shadow/blur backdrop or just bold text.
      */}
      <div className="mt-4 text-center">
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
          {city.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          {city.stays.toLocaleString()} stays
        </p>
      </div>
    </div>
  );
};

export default ExploreByCity;
