import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Users, Search, Shield, Headphones, BadgePercent, Zap, Hotel, Plane, Car, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import GuestSelector from "./GuestSelector";

const trustIndicators = [
  { icon: Shield, label: "Secure Payment" },
  { icon: Headphones, label: "Customer Service in Seconds" },
  { icon: BadgePercent, label: "Best Price" },
  { icon: Zap, label: "Instant Booking" },
];

const categories = [
  { id: "hotels", icon: Hotel, label: "Hotels" },
  { id: "flights", icon: Plane, label: "Flights" },
  { id: "cars", icon: Car, label: "Cars" },
];

const heroImages = [
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=3540&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
];

const HotelHeroSection = () => {
  const navigate = useNavigate();
  const [searchMode, setSearchMode] = useState<"traditional" | "ai">("traditional");
  const [activeCategory, setActiveCategory] = useState("hotels");
  const [location, setLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [isGuestOpen, setIsGuestOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (checkInDate) params.set("checkIn", format(checkInDate, "yyyy-MM-dd"));
    if (checkOutDate) params.set("checkOut", format(checkOutDate, "yyyy-MM-dd"));
    params.set("adults", adults.toString());
    params.set("children", children.toString());
    params.set("rooms", rooms.toString());

    navigate(`/search?${params.toString()}`);
  };

  return (
    <section className="relative w-full pt-32 pb-12 lg:pt-40 lg:pb-20 overflow-hidden bg-background">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left Content (60%) */}
          <div className="w-full lg:w-[60%] space-y-8 relative z-10">
            {/* Heading */}
            <div className="space-y-4 animate-slide-up stagger-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-foreground leading-tight tracking-tight whitespace-nowrap">
                Find Your <span className="text-primary italic relative">
                  Perfect
                  <svg className="absolute w-full h-3 -bottom-1 left-0 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="#1da1f2" strokeWidth="8" fill="none" />
                  </svg>
                </span> Stay
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl font-light leading-relaxed">
                Discover luxury hotels, flights, and unique experiences curated just for you.
              </p>
            </div>

            {/* Highlight Container */}
            <div className="bg-muted/60 border border-border/60 rounded-[2.5rem] p-6 sm:p-8 backdrop-blur-md animate-slide-up stagger-2 shadow-sm">

              {/* Search Mode Toggle & Tabs */}
              <div className="flex flex-col items-start gap-4 mb-6">
                <div className="inline-flex bg-muted/50 rounded-full p-1 border border-border">
                  <button
                    onClick={() => setSearchMode("traditional")}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                      searchMode === "traditional"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Search className="w-4 h-4" />
                    Traditional
                  </button>
                  <button
                    onClick={() => navigate("/ai-search")}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                      "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Sparkles className="w-4 h-4 text-primary" />
                    AI Search
                  </button>
                </div>

                {searchMode === "traditional" && (
                  <div className="flex gap-2 animate-fade-in">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                          activeCategory === category.id
                            ? "bg-primary/10 border-primary/20 text-primary"
                            : "bg-transparent border-transparent text-muted-foreground hover:bg-muted"
                        )}
                      >
                        <category.icon className="w-4 h-4" />
                        {category.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Box - Refined for Left Column */}
              <div className="relative mb-6">
                {/* Soft Glow centered behind search */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-[2.5rem] blur-2xl opacity-50 -z-10" />

                <div className="bg-background/80 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl p-3 ring-1 ring-black/5">
                  <div className="flex flex-col gap-2">

                    {/* Inputs Row 1: Location & Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {/* Location */}
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="Where to?"
                          className="w-full h-16 pl-14 pr-4 bg-muted/30 hover:bg-muted/50 focus:bg-background border-none rounded-2xl text-base font-medium placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>

                      {/* Dates */}
                      <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
                        <PopoverTrigger asChild>
                          <button className="w-full h-16 flex items-center gap-4 px-4 bg-muted/30 hover:bg-muted/50 focus:bg-background rounded-2xl text-left transition-all group">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                              <Calendar className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col justify-center overflow-hidden">
                              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Dates</span>
                              <span className={cn(
                                "text-sm font-medium truncate",
                                checkInDate ? "text-foreground" : "text-muted-foreground"
                              )}>
                                {checkInDate && checkOutDate
                                  ? `${format(checkInDate, "MMM d")} - ${format(checkOutDate, "MMM d")}`
                                  : "Add dates"
                                }
                              </span>
                            </div>
                          </button>
                        </PopoverTrigger>
                        {/* Keep Popover Content Logic Same */}
                        <PopoverContent className="w-auto p-0 bg-popover border border-border" align="start">
                          <div className="flex flex-col sm:flex-row">
                            <div className="p-3 border-b sm:border-b-0 sm:border-r border-border">
                              <p className="text-xs font-medium text-foreground mb-2 px-1">Check-in</p>
                              <CalendarComponent
                                mode="single"
                                selected={checkInDate}
                                onSelect={(date) => {
                                  setCheckInDate(date);
                                  if (date && checkOutDate && date >= checkOutDate) {
                                    setCheckOutDate(undefined);
                                  }
                                }}
                                disabled={(date) => date < new Date()}
                                className="pointer-events-auto"
                              />
                            </div>
                            <div className="p-3">
                              <p className="text-xs font-medium text-foreground mb-2 px-1">Check-out</p>
                              <CalendarComponent
                                mode="single"
                                selected={checkOutDate}
                                onSelect={(date) => {
                                  setCheckOutDate(date);
                                  setIsDateOpen(false);
                                }}
                                disabled={(date) => date < new Date() || (checkInDate ? date <= checkInDate : false)}
                                className="pointer-events-auto"
                              />
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Inputs Row 2: Guests & Search Button */}
                    <div className="grid grid-cols-1 md:grid-cols-[1.5fr,1fr] gap-2">
                      {/* Guests */}
                      <Popover open={isGuestOpen} onOpenChange={setIsGuestOpen}>
                        <PopoverTrigger asChild>
                          <button className="w-full h-16 flex items-center gap-4 px-4 bg-muted/30 hover:bg-muted/50 focus:bg-background rounded-2xl text-left transition-all group">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                              <Users className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col justify-center overflow-hidden">
                              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Travelers</span>
                              <span className="text-sm font-medium text-foreground truncate">
                                {adults} Adult, {children} Child, {rooms} Room
                              </span>
                            </div>
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-72 p-4 bg-popover border border-border" align="start">
                          <GuestSelector
                            adults={adults}
                            children={children}
                            rooms={rooms}
                            onAdultsChange={setAdults}
                            onChildrenChange={setChildren}
                            onRoomsChange={setRooms}
                            onClose={() => setIsGuestOpen(false)}
                          />
                        </PopoverContent>
                      </Popover>

                      {/* Search Button */}
                      <Button
                        onClick={handleSearch}
                        className="h-16 w-full rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg hover:shadow-lg transition-all"
                      >
                        Search
                      </Button>
                    </div>

                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-nowrap overflow-x-auto scrollbar-hide items-center gap-4 md:gap-6 pt-2">
                {trustIndicators.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-muted-foreground text-sm"
                  >
                    <item.icon className="w-4 h-4 text-primary" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content (40%) - Image */}
          {/* Right Content (40%) - Image Stack Animation */}
          <div className="w-full lg:w-[40%] relative aspect-[4/5] perspective-1000 hidden lg:block">
            {heroImages.map((image, index) => {
              const position = (index - currentImageIndex + heroImages.length) % heroImages.length;
              const isFront = position === 0;
              const isRight = position === 1;
              const isLeft = position === 2;

              return (
                <div
                  key={index}
                  className={cn(
                    "absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 ease-in-out bg-background border border-border/10",
                    isFront && "z-30 scale-100 translate-x-0 rotate-0 opacity-100",
                    isRight && "z-20 scale-95 translate-x-12 translate-y-4 rotate-[5deg] opacity-60",
                    isLeft && "z-10 scale-95 -translate-x-12 translate-y-4 -rotate-[5deg] opacity-60"
                  )}
                >
                  <img
                    src={image}
                    alt="Luxury Hotel"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              );
            })}

            {/* Decorative Elements */}
            <div className="absolute -z-10 top-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50" />
            <div className="absolute -z-10 -bottom-10 -left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl opacity-50" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HotelHeroSection;
