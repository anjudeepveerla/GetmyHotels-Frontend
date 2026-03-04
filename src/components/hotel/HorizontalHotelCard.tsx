import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Hotel } from "@/data/hotels";
import { Heart, Star, MapPin } from "lucide-react";

interface HorizontalHotelCardProps {
  hotel: Hotel;
  showTotalPrices: boolean;
  getRatingLabel: (rating: number) => string;
  isHighlighted?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
}

const HorizontalHotelCard = ({
  hotel,
  showTotalPrices,
  getRatingLabel,
  isHighlighted = false,
  onHover,
  onLeave,
}: HorizontalHotelCardProps) => {
  const [searchParams] = useSearchParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const displayPrice = showTotalPrices
    ? Math.round(hotel.pricePerNight * 1.15) // Add 15% for taxes & fees
    : hotel.pricePerNight;

  return (
    <div
      className={cn(
        "bg-card dark:bg-card border border-border rounded-xl overflow-hidden",
        "transition-all duration-300",
        isHighlighted
          ? "shadow-xl border-primary/50 scale-[1.01]"
          : "hover:shadow-lg hover:border-primary/30"
      )}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="flex flex-col sm:flex-row h-full">
        {/* Left: Image */}
        <div className="relative w-full h-48 sm:w-64 sm:h-auto flex-shrink-0 group">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 dark:bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-white dark:hover:bg-background transition-colors z-10"
            aria-label="Add to favorites"
          >
            <Heart
              className={cn(
                "w-4 h-4 transition-colors",
                isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-muted-foreground dark:text-muted-foreground"
              )}
            />
          </button>
        </div>

        {/* Center: Details */}
        <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between min-w-0 bg-card">
          <div>
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-semibold text-foreground dark:text-foreground mb-1 line-clamp-1">
                  {hotel.name}
                </h3>
                <div className="flex items-center gap-1.5 text-muted-foreground dark:text-muted-foreground text-sm mb-3">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{hotel.address}, {hotel.city}, {hotel.country}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-foreground dark:text-foreground text-sm">
                  {hotel.rating}
                </span>
              </div>
              <span className="text-muted-foreground dark:text-muted-foreground text-sm">
                ({hotel.reviewCount.toLocaleString()} reviews)
              </span>
              <span className="px-2 py-0.5 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary rounded-full text-xs font-medium">
                {getRatingLabel(hotel.rating)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto pt-2 sm:pt-0">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl sm:text-2xl font-bold text-foreground dark:text-foreground">
                  ${displayPrice}
                </span>
                <span className="text-muted-foreground dark:text-muted-foreground text-sm">/night</span>
              </div>
              {showTotalPrices && (
                <p className="text-xs text-muted-foreground dark:text-muted-foreground mt-1">
                  Includes taxes & fees
                </p>
              )}
            </div>
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap h-10 px-4 sm:h-11 sm:px-8"
            >
              <Link to={`/hotel/${hotel.id}?${searchParams.toString()}`}>
                Choose Room
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalHotelCard;
