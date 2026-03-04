import { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams, useNavigate, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import GuestSelector from "@/components/hotel/GuestSelector";
import Footer from "@/components/hotel/Footer";
import { hotels, Hotel } from "@/data/hotels";
import {
  MapPin,
  Calendar,
  Users,
  Heart,
  Star,
  Share2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Waves,
  Coffee,
  Shield,
  Check,
  X,
} from "lucide-react";
import { format } from "date-fns";

const HotelDetail = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isStickyCollapsed, setIsStickyCollapsed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const overviewRef = useRef<HTMLDivElement>(null);
  const roomsRef = useRef<HTMLDivElement>(null);
  const amenitiesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const mapsRef = useRef<HTMLDivElement>(null);

  // Search parameters from URL
  const urlLocation = searchParams.get("location") || "London, United Kingdom";
  const urlCheckIn = searchParams.get("checkIn") || "";
  const urlCheckOut = searchParams.get("checkOut") || "";
  const urlAdults = parseInt(searchParams.get("adults") || "2");
  const urlChildren = parseInt(searchParams.get("children") || "0");
  const urlRooms = parseInt(searchParams.get("rooms") || "1");

  // Interactive search state
  const [location, setLocation] = useState(urlLocation);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(
    urlCheckIn ? new Date(urlCheckIn) : undefined
  );
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(
    urlCheckOut ? new Date(urlCheckOut) : undefined
  );
  const [adults, setAdults] = useState(urlAdults);
  const [children, setChildren] = useState(urlChildren);
  const [rooms, setRooms] = useState(urlRooms);
  const [isGuestOpen, setIsGuestOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);

  // Find hotel by ID
  const hotel = hotels.find((h) => h.id === hotelId);

  // Sync with URL params
  useEffect(() => {
    setLocation(urlLocation);
    setCheckInDate(urlCheckIn ? new Date(urlCheckIn) : undefined);
    setCheckOutDate(urlCheckOut ? new Date(urlCheckOut) : undefined);
    setAdults(urlAdults);
    setChildren(urlChildren);
    setRooms(urlRooms);
  }, [urlLocation, urlCheckIn, urlCheckOut, urlAdults, urlChildren, urlRooms]);

  // Sticky bar scroll behavior
  useEffect(() => {
    let lastScrollY = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsStickyCollapsed(currentScrollY > lastScrollY && currentScrollY > 100);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to section
  const scrollToSection = (section: string) => {
    setActiveTab(section);
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {
      overview: overviewRef,
      rooms: roomsRef,
      amenities: amenitiesRef,
      about: aboutRef,
      reviews: reviewsRef,
      maps: mapsRef,
    };
    refs[section]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleUpdateSearch = () => {
    const newParams = new URLSearchParams();
    if (location) newParams.set("location", location);
    if (checkInDate) newParams.set("checkIn", format(checkInDate, "yyyy-MM-dd"));
    if (checkOutDate) newParams.set("checkOut", format(checkOutDate, "yyyy-MM-dd"));
    newParams.set("adults", adults.toString());
    newParams.set("children", children.toString());
    newParams.set("rooms", rooms.toString());

    // Navigate to search results
    navigate(`/search?${newParams.toString()}`);
  };

  if (!hotel) {
    return (
      <div className="min-h-screen bg-background dark:bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground dark:text-foreground mb-4">Hotel Not Found</h1>
          <Button onClick={() => navigate("/search")}>Back to Search</Button>
        </div>
      </div>
    );
  }

  // Demo room data
  const roomTypes = [
    {
      id: "1",
      name: "Deluxe King Room",
      bedType: "1 King Bed",
      capacity: "2 Guests",
      availability: 3,
      features: ["Free WiFi", "City View", "Air Conditioning", "Mini Bar"],
      price: hotel.pricePerNight,
      refundable: true,
      images: [
        hotel.image,
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop",
      ],
    },
    {
      id: "2",
      name: "Executive Suite",
      bedType: "1 King Bed + Sofa Bed",
      capacity: "4 Guests",
      availability: 2,
      features: ["Free WiFi", "Balcony", "Living Area", "Premium Amenities"],
      price: hotel.pricePerNight * 1.5,
      refundable: true,
      images: [
        hotel.image,
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
      ],
    },
    {
      id: "3",
      name: "Standard Twin Room",
      bedType: "2 Twin Beds",
      capacity: "2 Guests",
      availability: 5,
      features: ["Free WiFi", "City View", "Air Conditioning"],
      price: hotel.pricePerNight * 0.8,
      refundable: false,
      images: [hotel.image],
    },
  ];

  // Demo amenities
  const generalAmenities = ["Free WiFi", "Parking", "24-Hour Front Desk", "Airport Shuttle", "Business Center"];
  const roomAmenities = ["Air Conditioning", "TV", "Mini Bar", "Safe", "Room Service"];
  const propertyAmenities = ["Swimming Pool", "Fitness Center", "Restaurant", "Bar", "Spa"];

  // Demo related hotels
  const relatedHotels = hotels.filter((h) => h.id !== hotel.id && h.city === hotel.city).slice(0, 4);

  const getRatingLabel = (rating: number) => {
    if (rating >= 4.5) return "Excellent";
    if (rating >= 4.0) return "Very Good";
    if (rating >= 3.5) return "Good";
    return "Fair";
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      {/* Combined Sticky Navigation Bar */}
      <div className="sticky top-20 z-[90] py-4 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Section Tabs */}
            <div className="pointer-events-auto flex items-center gap-1 overflow-x-auto scrollbar-hide w-full sm:w-auto p-1.5 bg-background/80 dark:bg-neutral-900/80 backdrop-blur-md border border-border/50 rounded-full shadow-sm">
              {[
                { id: "overview", label: "Overview" },
                { id: "rooms", label: "Rooms" },
                { id: "amenities", label: "Amenities" },
                { id: "about", label: "About" },
                { id: "reviews", label: "Reviews" },
                { id: "maps", label: "Maps" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full transition-all duration-300",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Update Search Button */}
            <Button
              onClick={() => setIsSearchDialogOpen(true)}
              className="pointer-events-auto px-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg whitespace-nowrap h-11"
            >
              Update Search
            </Button>
          </div>
        </div>
      </div>

      {/* Search Dialog */}
      {/* Search Dialog */}
      <Dialog open={isSearchDialogOpen} onOpenChange={setIsSearchDialogOpen}>
        <DialogContent className="sm:max-w-5xl bg-background dark:bg-background overflow-visible">
          <DialogHeader>
            <DialogTitle>Update Search</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col lg:flex-row gap-4 py-4 items-start">
            {/* Location */}
            <div className="flex-1 space-y-2 w-full lg:w-auto">
              <Label htmlFor="location">Location</Label>
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-input bg-transparent">
                <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border-0 p-0 h-auto focus-visible:ring-0 bg-transparent placeholder:text-muted-foreground w-full"
                  placeholder="Where are you going?"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="flex-1 space-y-2 w-full lg:w-auto">
              <Label>Dates</Label>
              <Popover modal={true}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal h-[42px] px-3",
                      !checkInDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {checkInDate ? (
                      checkOutDate ? (
                        <>
                          {format(checkInDate, "LLL dd, y")} -{" "}
                          {format(checkOutDate, "LLL dd, y")}
                        </>
                      ) : (
                        format(checkInDate, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="range"
                    defaultMonth={checkInDate}
                    selected={{
                      from: checkInDate,
                      to: checkOutDate,
                    }}
                    onSelect={(range) => {
                      if (range?.from) {
                        setCheckInDate(range.from);
                        // If selecting a new start date after current end date, reset end date
                        if (checkOutDate && range.from > checkOutDate) {
                          setCheckOutDate(undefined);
                        }
                      }
                      if (range?.to) setCheckOutDate(range.to);
                    }}
                    numberOfMonths={2}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today;
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Guests */}
            <div className="flex-1 space-y-2 w-full lg:w-auto">
              <Label>Guests</Label>
              <Popover modal={true}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal h-[42px] px-3"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    <span>
                      {adults} Adult{adults !== 1 ? "s" : ""} · {children} Child{children !== 1 ? "ren" : ""} · {rooms} Room{rooms !== 1 ? "s" : ""}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4" align="start">
                  <GuestSelector
                    adults={adults}
                    children={children}
                    rooms={rooms}
                    onAdultsChange={setAdults}
                    onChildrenChange={setChildren}
                    onRoomsChange={setRooms}
                    onClose={() => { }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Search Button (Aligned with inputs) */}
            <div className="space-y-2 w-full lg:w-auto pt-8 lg:pt-0 mt-auto">
              <Button
                className="w-full lg:w-auto h-[42px] bg-primary text-primary-foreground hover:bg-primary/90 mt-6"
                onClick={() => {
                  handleUpdateSearch();
                  setIsSearchDialogOpen(false);
                }}
              >
                Search
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8">
        {/* Overview Section */}
        <section ref={overviewRef} id="overview" className="scroll-mt-32 mb-16">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-serif font-bold text-foreground dark:text-foreground mb-3">
                {hotel.name}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground dark:text-muted-foreground mb-4">
                <MapPin className="w-4 h-4" />
                <span>{hotel.address}, {hotel.city}, {hotel.country}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-foreground dark:text-foreground">{hotel.rating}</span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-muted-foreground dark:text-muted-foreground text-sm">
                    ({hotel.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>
                <span className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary rounded-full text-xs font-medium">
                  {getRatingLabel(hotel.rating)}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsFavorite(!isFavorite)}
                className="h-10 w-10"
              >
                <Heart className={cn("w-5 h-5", isFavorite && "fill-red-500 text-red-500")} />
              </Button>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-4 gap-2 mb-8 rounded-2xl overflow-hidden">
            <div className="col-span-2 row-span-2">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1">
              <img
                src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop"
                alt="Hotel"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1">
              <img
                src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop"
                alt="Hotel"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-2 relative group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop"
                alt="Hotel"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/60 transition-colors">
                <span className="text-white font-medium">View All Photos</span>
              </div>
            </div>
          </div>

          {/* Top Reason to Book */}
          <div className="bg-card dark:bg-card border border-border rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-foreground dark:text-foreground mb-2">Top Reason to Book</h3>
            <p className="text-muted-foreground dark:text-muted-foreground">
              Located in the heart of {hotel.city}, this {hotel.rateRange.toLowerCase()} hotel offers exceptional service and modern amenities.
              Perfect for both business and leisure travelers.
            </p>
          </div>

          {/* Top Amenities */}
          <div className="mb-8">
            <h3 className="font-semibold text-foreground dark:text-foreground mb-4">Top Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {generalAmenities.slice(0, 5).map((amenity) => (
                <span
                  key={amenity}
                  className="px-4 py-2 bg-muted dark:bg-muted text-foreground dark:text-foreground rounded-full text-sm"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Rooms Section */}
        <section ref={roomsRef} id="rooms" className="scroll-mt-32 mb-16">
          <h2 className="text-3xl font-serif font-bold text-foreground dark:text-foreground mb-8">Available Rooms</h2>
          <div className="space-y-6">
            {roomTypes.map((room, index) => (
              <div
                key={room.id}
                className="bg-card dark:bg-card border border-border rounded-2xl overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Room Images */}
                  <div className="md:w-80 h-64 md:h-auto relative group">
                    <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide h-full">
                      {room.images.map((img, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={img}
                          alt={room.name}
                          className="w-full h-full object-cover snap-center flex-shrink-0"
                        />
                      ))}
                    </div>
                    {room.images.length > 1 && (
                      <div className="absolute bottom-4 right-4 flex gap-2">
                        <button
                          onClick={() => {
                            const newIndex = selectedRoomIndex === index
                              ? Math.max(0, (selectedRoomIndex === index ? 0 : selectedRoomIndex) - 1)
                              : 0;
                            setSelectedRoomIndex(newIndex);
                          }}
                          className="w-8 h-8 rounded-full bg-white/90 dark:bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-white dark:hover:bg-background transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            const newIndex = selectedRoomIndex === index
                              ? Math.min(room.images.length - 1, (selectedRoomIndex === index ? 0 : selectedRoomIndex) + 1)
                              : 0;
                            setSelectedRoomIndex(newIndex);
                          }}
                          className="w-8 h-8 rounded-full bg-white/90 dark:bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-white dark:hover:bg-background transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Room Details */}
                  <div className="flex-1 p-6">
                    <h3 className="text-2xl font-serif font-bold text-foreground dark:text-foreground mb-2">
                      {room.name}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground dark:text-muted-foreground mb-4">
                      <span>{room.bedType}</span>
                      <span>•</span>
                      <span>{room.capacity}</span>
                      <span>•</span>
                      <span>{room.availability} available</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {room.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 bg-muted dark:bg-muted text-foreground dark:text-foreground rounded-lg text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      {room.refundable ? (
                        <>
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-foreground dark:text-foreground">Fully refundable</span>
                        </>
                      ) : (
                        <>
                          <X className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-foreground dark:text-foreground">Non-refundable</span>
                        </>
                      )}
                    </div>
                    <a
                      href="#"
                      className="text-sm text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/80 mb-4 inline-block"
                    >
                      Room Details and Photos →
                    </a>
                  </div>

                  {/* Price & Reserve */}
                  <div className="md:w-64 p-6 flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-border">
                    <div className="w-full md:text-right mb-4">
                      <div className="mb-2">
                        <span className="text-3xl font-bold text-foreground dark:text-foreground">
                          ${Math.round(room.price)}
                        </span>
                        <span className="text-muted-foreground dark:text-muted-foreground text-sm ml-1">
                          /night
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground dark:text-muted-foreground">
                        Excludes taxes & fees
                      </p>
                    </div>
                    <Button
                      onClick={() => {
                        const params = new URLSearchParams();
                        params.set("hotelId", hotelId || "");
                        params.set("roomId", room.id);
                        params.set("location", location);
                        if (checkInDate) params.set("checkIn", format(checkInDate, "yyyy-MM-dd"));
                        if (checkOutDate) params.set("checkOut", format(checkOutDate, "yyyy-MM-dd"));
                        params.set("adults", adults.toString());
                        params.set("children", children.toString());
                        params.set("rooms", rooms.toString());
                        params.set("pricePerNight", Math.round(room.price).toString());
                        navigate(`/booking-details?${params.toString()}`);
                      }}
                      className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Reserve
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Amenities Section */}
        <section ref={amenitiesRef} id="amenities" className="scroll-mt-32 mb-16">
          <h2 className="text-3xl font-serif font-bold text-foreground dark:text-foreground mb-8">Amenities</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground dark:text-foreground mb-4">General</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {generalAmenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground dark:text-foreground">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground dark:text-foreground mb-4">Room</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {roomAmenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground dark:text-foreground">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground dark:text-foreground mb-4">Property</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {propertyAmenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground dark:text-foreground">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section ref={aboutRef} id="about" className="scroll-mt-32 mb-16">
          <h2 className="text-3xl font-serif font-bold text-foreground dark:text-foreground mb-8">About This Property</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground dark:text-foreground mb-2">Guest Policies</h3>
              <p className="text-muted-foreground dark:text-muted-foreground">
                Check-in: 3:00 PM - 11:00 PM<br />
                Check-out: 11:00 AM<br />
                Children are welcome. Extra beds may be available upon request.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground dark:text-foreground mb-2">Payment & ID</h3>
              <p className="text-muted-foreground dark:text-muted-foreground">
                A valid government-issued photo ID is required at check-in. Credit card required for incidentals.
              </p>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section ref={reviewsRef} id="reviews" className="scroll-mt-32 mb-16">
          <h2 className="text-3xl font-serif font-bold text-foreground dark:text-foreground mb-8">Guest Reviews</h2>
          <div className="bg-card dark:bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl font-bold text-foreground dark:text-foreground">{hotel.rating}</div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "w-5 h-5",
                        star <= Math.round(hotel.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      )}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                  Based on {hotel.reviewCount.toLocaleString()} reviews
                </p>
              </div>
            </div>
            <p className="text-muted-foreground dark:text-muted-foreground">
              This hotel has received excellent reviews from guests. Most guests appreciate the location,
              cleanliness, and friendly staff.
            </p>
          </div>
        </section>

        {/* Maps Section */}
        <section ref={mapsRef} id="maps" className="scroll-mt-32 mb-16">
          <h2 className="text-3xl font-serif font-bold text-foreground dark:text-foreground mb-8">Location</h2>
          <div className="bg-muted dark:bg-muted rounded-xl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-muted-foreground dark:text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground dark:text-muted-foreground">
                Map view for {hotel.name}
              </p>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground mt-1">
                {hotel.address}, {hotel.city}, {hotel.country}
              </p>
            </div>
          </div>
        </section>

        {/* You May Also Like */}
        {relatedHotels.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-foreground dark:text-foreground mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedHotels.map((relatedHotel) => (
                <Link
                  key={relatedHotel.id}
                  to={`/hotel/${relatedHotel.id}?${searchParams.toString()}`}
                  className="bg-card dark:bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all group"
                >
                  <img
                    src={relatedHotel.image}
                    alt={relatedHotel.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground dark:text-foreground mb-1 group-hover:text-primary transition-colors">
                      {relatedHotel.name}
                    </h3>
                    <p className="text-sm text-muted-foreground dark:text-muted-foreground mb-2">
                      {relatedHotel.city}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-foreground dark:text-foreground">
                          {relatedHotel.rating}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-foreground dark:text-foreground">
                        ${relatedHotel.pricePerNight}/night
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default HotelDetail;
