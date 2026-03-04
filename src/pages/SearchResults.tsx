import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import GuestSelector from "@/components/hotel/GuestSelector";
import Footer from "@/components/hotel/Footer";
import HotelMap from "@/components/hotel/HotelMap";
import HorizontalHotelCard from "@/components/hotel/HorizontalHotelCard";
import { hotels, Hotel } from "@/data/hotels";
import {
  MapPin,
  Calendar,
  Users,
  Heart,
  Star,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Map as MapIcon,
  X,
} from "lucide-react";
import { format } from "date-fns";

const RESULTS_PER_PAGE = 10;

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null);
  const [hoveredHotelId, setHoveredHotelId] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const hotelCardRefs = useRef(new Map<string, HTMLDivElement>());

  // Search parameters from URL
  const urlLocation = searchParams.get("location") || "London, United Kingdom";
  const urlCheckIn = searchParams.get("checkIn") || "";
  const urlCheckOut = searchParams.get("checkOut") || "";
  const urlAdults = parseInt(searchParams.get("adults") || "2");
  const urlChildren = parseInt(searchParams.get("children") || "0");
  const urlRooms = parseInt(searchParams.get("rooms") || "1");
  const currentPage = parseInt(searchParams.get("page") || "1");

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

  // Sync with URL params when they change
  useEffect(() => {
    setLocation(urlLocation);
    setCheckInDate(urlCheckIn ? new Date(urlCheckIn) : undefined);
    setCheckOutDate(urlCheckOut ? new Date(urlCheckOut) : undefined);
    setAdults(urlAdults);
    setChildren(urlChildren);
    setRooms(urlRooms);
  }, [urlLocation, urlCheckIn, urlCheckOut, urlAdults, urlChildren, urlRooms]);

  // Filter states
  const [sortBy, setSortBy] = useState("recommended");
  const [selectedRates, setSelectedRates] = useState<string[]>([]);
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedStarRatings, setSelectedStarRatings] = useState<number[]>([]);
  const [propertyName, setPropertyName] = useState("");
  const [minRating, setMinRating] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 4999]);
  const [showTotalPrices, setShowTotalPrices] = useState(false);


  // Filter and sort hotels
  const filteredAndSortedHotels = hotels
    .filter((hotel) => {
      if (selectedRates.length > 0 && !selectedRates.includes(hotel.rateRange)) {
        return false;
      }
      if (propertyName && !hotel.name.toLowerCase().includes(propertyName.toLowerCase())) {
        return false;
      }
      if (minRating && hotel.rating < minRating) {
        return false;
      }
      if (hotel.pricePerNight < priceRange[0] || hotel.pricePerNight > priceRange[1]) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.pricePerNight - b.pricePerNight;
        case "price-high":
          return b.pricePerNight - a.pricePerNight;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0; // Recommended (original order)
      }
    });

  const totalHotels = filteredAndSortedHotels.length;
  const totalPages = Math.ceil(totalHotels / RESULTS_PER_PAGE);
  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
  const endIndex = startIndex + RESULTS_PER_PAGE;
  const currentHotels = filteredAndSortedHotels.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    setSearchParams(newParams);

    // Scroll to top of results
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsLoading(false);
    }, 100);
  };

  const handleUpdateSearch = () => {
    // Update URL params with new search values
    const newParams = new URLSearchParams();
    if (location) newParams.set("location", location);
    if (checkInDate) newParams.set("checkIn", format(checkInDate, "yyyy-MM-dd"));
    if (checkOutDate) newParams.set("checkOut", format(checkOutDate, "yyyy-MM-dd"));
    newParams.set("adults", adults.toString());
    newParams.set("children", children.toString());
    newParams.set("rooms", rooms.toString());
    newParams.set("page", "1"); // Reset to first page

    setSearchParams(newParams);

    // Scroll to top of results
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const getRatingLabel = (rating: number) => {
    if (rating >= 4.5) return "Excellent";
    if (rating >= 4.0) return "Very Good";
    if (rating >= 3.5) return "Good";
    return "Fair";
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      {/* Dynamic Island-Style Filter Bar - Sticky below navbar (64px) */}
      {/* Mobile Filter Bar (Grid + Inline Expansion) */}
      <div className="sticky top-20 z-[90] pt-2 pb-2 bg-transparent lg:hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className={cn(
              "grid grid-cols-2 gap-2 w-full",
              "backdrop-blur-xl bg-background/70 dark:bg-background/70",
              "border border-border/40 rounded-3xl",
              "shadow-lg shadow-black/5 dark:shadow-black/20",
              "p-3",
              "transition-all duration-300 ease-in-out"
            )}
            style={{
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
            }}
          >
            {/* Row 1: Location (Full Width) */}
            <div className="col-span-2 flex items-center gap-2 px-3 py-2 rounded-full bg-muted/50 dark:bg-muted/50 hover:bg-muted dark:hover:bg-muted transition-all duration-200 w-full">
              <MapPin className="w-3.5 h-3.5 text-foreground dark:text-foreground flex-shrink-0" />
              <Input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="h-auto p-0 border-0 bg-transparent text-sm font-medium text-foreground dark:text-foreground placeholder:text-muted-foreground dark:placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
              />
            </div>

            {/* Row 2: Dates & Guests */}
            <button
              onClick={() => setIsDateOpen(!isDateOpen)}
              className={cn(
                "flex items-center justify-center gap-2 px-3 py-2 rounded-full w-full",
                isDateOpen ? "bg-primary text-primary-foreground" : "bg-muted/50 text-foreground hover:bg-muted",
                "text-sm font-medium transition-all duration-200"
              )}
            >
              <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="whitespace-nowrap">
                {checkInDate && checkOutDate ? `${format(checkInDate, "MMM d")} - ${format(checkOutDate, "MMM d")}` : "Dates"}
              </span>
            </button>

            <button
              onClick={() => setIsGuestOpen(!isGuestOpen)}
              className={cn(
                "flex items-center justify-center gap-2 px-3 py-2 rounded-full w-full",
                isGuestOpen ? "bg-primary text-primary-foreground" : "bg-muted/50 text-foreground hover:bg-muted",
                "text-sm font-medium transition-all duration-200"
              )}
            >
              <Users className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="whitespace-nowrap">Guests</span>
            </button>

            {/* Expansion Area for Dates/Guests */}
            {(isDateOpen || isGuestOpen) && (
              <div className="col-span-2 bg-card dark:bg-card border border-border rounded-xl mt-1 overflow-hidden animate-in zoom-in-95 duration-200 p-4">
                {isDateOpen && (
                  <CalendarComponent
                    mode="range"
                    selected={{ from: checkInDate, to: checkOutDate }}
                    onSelect={(range) => {
                      if (range?.from) {
                        setCheckInDate(range.from);
                        if (checkOutDate && range.from >= checkOutDate) setCheckOutDate(undefined);
                      }
                      if (range?.to) setCheckOutDate(range.to);
                    }}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    numberOfMonths={1}
                    className="mx-auto"
                  />
                )}
                {isGuestOpen && (
                  <GuestSelector
                    adults={adults}
                    children={children}
                    rooms={rooms}
                    onAdultsChange={setAdults}
                    onChildrenChange={setChildren}
                    onRoomsChange={setRooms}
                    onClose={() => setIsGuestOpen(false)}
                  />
                )}
              </div>
            )}

            {/* Row 3: Filters & Update */}
            <button
              onClick={() => setIsFiltersDialogOpen(!isFiltersDialogOpen)}
              className={cn(
                "flex items-center justify-center gap-2 px-3 py-2 rounded-full w-full relative",
                isFiltersDialogOpen ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary hover:bg-primary/20",
                "text-sm font-medium transition-all duration-200 border border-primary/20"
              )}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
              {/* Badge Logic */}
              {(selectedRates.length > 0 || selectedNeighborhoods.length > 0 || selectedAmenities.length > 0 || minRating !== null) && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center border border-background">
                  !
                </span>
              )}
            </button>

            <Button
              onClick={handleUpdateSearch}
              className="px-4 py-2 h-auto bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium rounded-full whitespace-nowrap w-full"
            >
              Update
            </Button>

            {/* Expansion Area for Filters */}
            {isFiltersDialogOpen && (
              <div className="col-span-2 bg-card dark:bg-card border border-border rounded-xl mt-1 overflow-hidden animate-in zoom-in-95 duration-200 p-4 max-h-[60vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={() => setIsFiltersDialogOpen(false)}>Close</Button>
                </div>
                <FiltersSidebar
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  selectedRates={selectedRates}
                  onRatesChange={setSelectedRates}
                  selectedNeighborhoods={selectedNeighborhoods}
                  onNeighborhoodsChange={setSelectedNeighborhoods}
                  selectedAmenities={selectedAmenities}
                  onAmenitiesChange={setSelectedAmenities}
                  selectedStarRatings={selectedStarRatings}
                  onStarRatingsChange={setSelectedStarRatings}
                  propertyName={propertyName}
                  onPropertyNameChange={setPropertyName}
                  minRating={minRating}
                  onMinRatingChange={setMinRating}
                  priceRange={priceRange}
                  onPriceRangeChange={setPriceRange}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Filter Bar (Original Popover Behavior) */}
      <div className="sticky top-20 z-[90] pt-2 pb-2 bg-transparent hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              "flex items-center gap-2",
              "backdrop-blur-xl bg-background/70 dark:bg-background/70",
              "border border-border/40 rounded-full",
              "shadow-lg shadow-black/5 dark:shadow-black/20",
              "px-4 py-2.5",
              "transition-all duration-300 ease-in-out",
              "hover:shadow-xl hover:bg-background/80 dark:hover:bg-background/80"
            )}
            style={{
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
            }}
          >
            {/* Location Chip */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 dark:bg-muted/50 hover:bg-muted dark:hover:bg-muted transition-all duration-200">
              <MapPin className="w-3.5 h-3.5 text-foreground dark:text-foreground flex-shrink-0" />
              <Input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="h-auto p-0 border-0 bg-transparent text-sm font-medium text-foreground dark:text-foreground placeholder:text-muted-foreground dark:placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 min-w-[100px] max-w-[200px]"
              />
            </div>

            {/* Dates Chip */}
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full",
                    "bg-muted/50 dark:bg-muted/50 hover:bg-muted dark:hover:bg-muted",
                    "text-sm font-medium text-foreground dark:text-foreground",
                    "transition-all duration-200 whitespace-nowrap"
                  )}
                >
                  <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="whitespace-nowrap">
                    {checkInDate && checkOutDate
                      ? `${format(checkInDate, "MMM d")} – ${format(checkOutDate, "MMM d")}`
                      : "Dates"}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-[100]" align="start">
                <CalendarComponent
                  mode="range"
                  selected={{ from: checkInDate, to: checkOutDate }}
                  onSelect={(range) => {
                    if (range?.from) setCheckInDate(range.from);
                    if (range?.to) setCheckOutDate(range.to);
                  }}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>

            {/* Guests Chip */}
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full",
                    "bg-muted/50 dark:bg-muted/50 hover:bg-muted dark:hover:bg-muted",
                    "text-sm font-medium text-foreground dark:text-foreground",
                    "transition-all duration-200 whitespace-nowrap"
                  )}
                >
                  <Users className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="whitespace-nowrap">
                    {adults} Adult{adults !== 1 ? "s" : ""}
                    {children > 0 && `, ${children} Child${children !== 1 ? "ren" : ""}`}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-4 z-[100]" align="start">
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

            {/* Update Search Button */}
            <Button
              onClick={handleUpdateSearch}
              className="ml-auto px-4 py-1.5 h-auto bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium rounded-full whitespace-nowrap"
            >
              Update Search
            </Button>
          </div>
        </div>
      </div>

      {/* Mandatory Spacer - Prevents overlap with Dynamic Island (88px height) */}
      <div
        className="h-[88px]"
        aria-hidden="true"
        style={{
          minHeight: "88px",
          maxHeight: "88px",
        }}
      />

      {/* Main Content - Split View Layout (3 Columns) */}
      <div className="w-full mb-12">
        <div className="flex flex-col lg:flex-row items-start lg:gap-0">
          {/* Left Sidebar: Filters (Visible on Desktop) */}
          <aside className="hidden lg:block w-[280px] shrink-0 sticky top-36 h-[calc(100vh-6rem)] overflow-y-auto pl-8 pr-4 border-r border-border/40 scrollbar-hide">
            <div className="pb-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedRates([]);
                    setSelectedNeighborhoods([]);
                    setSelectedAmenities([]);
                    setSelectedStarRatings([]);
                    setPropertyName("");
                    setMinRating(null);
                    setPriceRange([0, 4999]);
                    setSortBy("recommended");
                  }}
                  className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear All
                </Button>
              </div>
              <FiltersSidebar
                sortBy={sortBy}
                onSortChange={setSortBy}
                selectedRates={selectedRates}
                onRatesChange={setSelectedRates}
                selectedNeighborhoods={selectedNeighborhoods}
                onNeighborhoodsChange={setSelectedNeighborhoods}
                selectedAmenities={selectedAmenities}
                onAmenitiesChange={setSelectedAmenities}
                selectedStarRatings={selectedStarRatings}
                onStarRatingsChange={setSelectedStarRatings}
                propertyName={propertyName}
                onPropertyNameChange={setPropertyName}
                minRating={minRating}
                onMinRatingChange={setMinRating}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
              />
            </div>
          </aside>

          {/* Center: Hotel List */}
          <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-6">
            {/* Results Header Section - Sticky inside scrollable list */}
            <div className="pt-4 pb-3 sticky top-0 bg-background/95 dark:bg-background/95 backdrop-blur-sm z-[5] mb-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                    Showing <span className="font-semibold text-foreground dark:text-foreground">{currentHotels.length}</span> of{" "}
                    <span className="font-semibold text-foreground dark:text-foreground">{totalHotels}</span> hotels
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="show-total"
                      checked={showTotalPrices}
                      onCheckedChange={(checked) => setShowTotalPrices(checked === true)}
                    />
                    <Label
                      htmlFor="show-total"
                      className="text-sm text-foreground dark:text-foreground cursor-pointer"
                    >
                      Show Total Prices
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Hotel Results - Horizontal Cards */}
            <div ref={resultsRef} className="space-y-4 pb-8">
              {isLoading ? (
                // Skeleton loaders
                Array.from({ length: RESULTS_PER_PAGE }).map((_, i) => (
                  <div key={i} className="bg-card dark:bg-card border border-border rounded-xl h-48 animate-pulse flex">
                    <div className="w-64 h-48 bg-muted dark:bg-muted" />
                    <div className="flex-1 p-5 space-y-3">
                      <div className="h-6 bg-muted dark:bg-muted rounded w-3/4" />
                      <div className="h-4 bg-muted dark:bg-muted rounded w-1/2" />
                      <div className="h-4 bg-muted dark:bg-muted rounded w-1/3" />
                    </div>
                  </div>
                ))
              ) : currentHotels.length > 0 ? (
                currentHotels.map((hotel) => (
                  <div
                    key={hotel.id}
                    ref={(el) => {
                      if (el) hotelCardRefs.current.set(hotel.id, el);
                    }}
                  >
                    <HorizontalHotelCard
                      hotel={hotel}
                      showTotalPrices={showTotalPrices}
                      getRatingLabel={getRatingLabel}
                      isHighlighted={selectedHotelId === hotel.id || hoveredHotelId === hotel.id}
                    />
                  </div>
                ))
              ) : (
                <div className="text-center py-16">
                  <p className="text-lg text-muted-foreground dark:text-muted-foreground">
                    No hotels found matching your criteria.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedRates([]);
                      setPropertyName("");
                      setMinRating(null);
                      setPriceRange([0, 1000]);
                    }}
                    className="mt-4"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>

          {/* Right Column: Map (Fixed width, reduced size, premium aesthetic) */}
          <div className="hidden lg:block w-[30%] shrink-0 sticky top-36 z-[10] pr-6" style={{ height: "calc(100vh - 96px)" }}>
            <div className="h-full w-full rounded-2xl overflow-hidden shadow-2xl border border-border/50 ring-1 ring-black/5 dark:ring-white/10">
              <HotelMap
                hotels={filteredAndSortedHotels}
                selectedHotelId={selectedHotelId || hoveredHotelId}
                onHotelSelect={(hotelId) => {
                  setSelectedHotelId(hotelId);
                  // Scroll hotel card into view
                  const cardElement = hotelCardRefs.current.get(hotelId);
                  if (cardElement) {
                    cardElement.scrollIntoView({ behavior: "smooth", block: "center" });
                  }
                }}
                onHotelHover={setHoveredHotelId}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Map Modal */}
      <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
        <DialogContent
          className="max-w-[100vw] w-[100vw] h-[100vh] m-0 rounded-none p-0 bg-background dark:bg-background"
          style={{
            maxHeight: "100vh",
            maxWidth: "100vw",
            left: 0,
            top: 0,
            transform: "none",
            position: "fixed"
          }}
        >
          <div className="relative w-full h-full">
            <div className="absolute top-4 right-4 z-50">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsMapOpen(false)}
                className="bg-background dark:bg-background"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            {filteredAndSortedHotels.length > 0 ? (
              <HotelMap
                hotels={filteredAndSortedHotels}
                selectedHotelId={selectedHotelId || hoveredHotelId}
                onHotelSelect={(hotelId) => {
                  setSelectedHotelId(hotelId);
                  setIsMapOpen(false);
                  // Scroll hotel card into view
                  const cardElement = hotelCardRefs.current.get(hotelId);
                  if (cardElement) {
                    cardElement.scrollIntoView({ behavior: "smooth", block: "center" });
                  }
                }}
                onHotelHover={setHoveredHotelId}
                className="w-full h-full rounded-none"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">No hotels to display on map</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Floating Map Button (Mobile Only) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 lg:hidden">
        <Button
          onClick={() => setIsMapOpen(true)}
          className="rounded-full shadow-xl bg-foreground text-background hover:bg-foreground/90 px-6 py-6 h-auto text-base font-medium flex items-center gap-2"
        >
          <MapIcon className="w-5 h-5" />
          Map
        </Button>
      </div>

      <Footer />
    </div>
  );
};

// Filters Sidebar Component
interface FiltersSidebarProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  selectedRates: string[];
  onRatesChange: (rates: string[]) => void;
  selectedNeighborhoods: string[];
  onNeighborhoodsChange: (neighborhoods: string[]) => void;
  selectedAmenities: string[];
  onAmenitiesChange: (amenities: string[]) => void;
  selectedStarRatings: number[];
  onStarRatingsChange: (ratings: number[]) => void;
  propertyName: string;
  onPropertyNameChange: (value: string) => void;
  minRating: number | null;
  onMinRatingChange: (rating: number | null) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
}

const FiltersSidebar = ({
  sortBy,
  onSortChange,
  selectedRates,
  onRatesChange,
  selectedNeighborhoods,
  onNeighborhoodsChange,
  selectedAmenities,
  onAmenitiesChange,
  selectedStarRatings,
  onStarRatingsChange,
  propertyName,
  onPropertyNameChange,
  minRating,
  onMinRatingChange,
  priceRange,
  onPriceRangeChange,
}: FiltersSidebarProps) => {
  const [isSortByOpen, setIsSortByOpen] = useState(true);
  const [isNeighborhoodsOpen, setIsNeighborhoodsOpen] = useState(false);
  const [isAmenitiesOpen, setIsAmenitiesOpen] = useState(false);
  const [isStarRatingsOpen, setIsStarRatingsOpen] = useState(false);
  const [isRateRangesOpen, setIsRateRangesOpen] = useState(false);
  const [isPropertyNameOpen, setIsPropertyNameOpen] = useState(false);
  const [isGuestRatingOpen, setIsGuestRatingOpen] = useState(false);
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);

  const neighborhoods = ["Downtown", "Historic District", "Waterfront", "Business District", "Airport Area"];
  const amenities = [
    "Wheelchair Accessible",
    "24-Hour Front Desk",
    "Free Wifi",
    "Luggage Storage",
    "Breakfast Available (Surcharge)",
  ];
  const starRatings = [1, 2, 3, 4, 5];
  const rateRanges = [
    { label: "Budget", range: "$0–$100" },
    { label: "Economy", range: "$101–$200" },
    { label: "Mid-range", range: "$201–$400" },
    { label: "Upscale", range: "$401–$700" },
    { label: "Luxury", range: "$701–$1000" },
    { label: "Premium", range: "$1000+" },
  ];

  return (
    <div className="space-y-4">
      {/* Sort By - Collapsible */}
      <Collapsible open={isSortByOpen} onOpenChange={setIsSortByOpen}>
        <CollapsibleTrigger className="w-full flex items-center justify-between py-2 text-sm font-semibold text-foreground dark:text-foreground hover:text-primary dark:hover:text-primary transition-colors">
          <span>Sort By</span>
          <ChevronDown className={cn("w-4 h-4 transition-transform duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)]", isSortByOpen && "rotate-180")} />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <RadioGroup value={sortBy} onValueChange={onSortChange}>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="recommended" id="sort-recommended" />
                <Label htmlFor="sort-recommended" className="text-sm text-foreground dark:text-foreground cursor-pointer">
                  Recommended
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="price-low" id="sort-price-low" />
                <Label htmlFor="sort-price-low" className="text-sm text-foreground dark:text-foreground cursor-pointer">
                  Lowest to High
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="price-high" id="sort-price-high" />
                <Label htmlFor="sort-price-high" className="text-sm text-foreground dark:text-foreground cursor-pointer">
                  Higher to Lowest
                </Label>
              </div>
            </div>
          </RadioGroup>
        </CollapsibleContent>
      </Collapsible>

      {/* Neighborhoods - Collapsible */}
      <Collapsible open={isNeighborhoodsOpen} onOpenChange={setIsNeighborhoodsOpen}>
        <CollapsibleTrigger className="w-full flex items-center justify-between py-2 text-sm font-semibold text-foreground dark:text-foreground hover:text-primary dark:hover:text-primary transition-colors">
          <span>Neighborhoods</span>
          <ChevronDown className={cn("w-4 h-4 transition-transform duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)]", isNeighborhoodsOpen && "rotate-180")} />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 space-y-2">
          {neighborhoods.map((neighborhood) => (
            <div key={neighborhood} className="flex items-center space-x-2">
              <Checkbox
                id={`neighborhood-${neighborhood}`}
                checked={selectedNeighborhoods.includes(neighborhood)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onNeighborhoodsChange([...selectedNeighborhoods, neighborhood]);
                  } else {
                    onNeighborhoodsChange(selectedNeighborhoods.filter((n) => n !== neighborhood));
                  }
                }}
              />
              <Label
                htmlFor={`neighborhood-${neighborhood}`}
                className="text-sm text-foreground dark:text-foreground cursor-pointer"
              >
                {neighborhood}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Amenities - Collapsible */}
      <Collapsible open={isAmenitiesOpen} onOpenChange={setIsAmenitiesOpen}>
        <CollapsibleTrigger className="w-full flex items-center justify-between py-2 text-sm font-semibold text-foreground dark:text-foreground hover:text-primary dark:hover:text-primary transition-colors">
          <span>Amenities</span>
          <ChevronDown className={cn("w-4 h-4 transition-transform duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)]", isAmenitiesOpen && "rotate-180")} />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <div className="space-y-2">
            {amenities.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={`amenity-${amenity}`}
                  checked={selectedAmenities.includes(amenity)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onAmenitiesChange([...selectedAmenities, amenity]);
                    } else {
                      onAmenitiesChange(selectedAmenities.filter((a) => a !== amenity));
                    }
                  }}
                />
                <Label
                  htmlFor={`amenity-${amenity}`}
                  className="text-sm text-foreground dark:text-foreground cursor-pointer"
                >
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Star Ratings - Collapsible */}
      <Collapsible open={isStarRatingsOpen} onOpenChange={setIsStarRatingsOpen}>
        <CollapsibleTrigger className="w-full flex items-center justify-between py-2 text-sm font-semibold text-foreground dark:text-foreground hover:text-primary dark:hover:text-primary transition-colors">
          <span>Star Ratings</span>
          <ChevronDown className={cn("w-4 h-4 transition-transform duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)]", isStarRatingsOpen && "rotate-180")} />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <div className="space-y-2">
            {starRatings.map((stars) => (
              <div key={stars} className="flex items-center space-x-2">
                <Checkbox
                  id={`star-${stars}`}
                  checked={selectedStarRatings.includes(stars)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onStarRatingsChange([...selectedStarRatings, stars]);
                    } else {
                      onStarRatingsChange(selectedStarRatings.filter((s) => s !== stars));
                    }
                  }}
                />
                <Label
                  htmlFor={`star-${stars}`}
                  className="text-sm text-foreground dark:text-foreground cursor-pointer"
                >
                  {stars} Star{stars !== 1 ? "s" : ""}
                </Label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Rate Ranges - Collapsible */}
      <Collapsible open={isRateRangesOpen} onOpenChange={setIsRateRangesOpen}>
        <CollapsibleTrigger className="w-full flex items-center justify-between py-2 text-sm font-semibold text-foreground dark:text-foreground hover:text-primary dark:hover:text-primary transition-colors">
          <span>Rate Ranges</span>
          <ChevronDown className={cn("w-4 h-4 transition-transform duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)]", isRateRangesOpen && "rotate-180")} />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <div className="space-y-2">
            {rateRanges.map((rate) => (
              <div key={rate.label} className="flex items-center space-x-2">
                <Checkbox
                  id={`rate-${rate.label}`}
                  checked={selectedRates.includes(rate.label)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onRatesChange([...selectedRates, rate.label]);
                    } else {
                      onRatesChange(selectedRates.filter((r) => r !== rate.label));
                    }
                  }}
                />
                <Label
                  htmlFor={`rate-${rate.label}`}
                  className="text-sm text-foreground dark:text-foreground cursor-pointer"
                >
                  {rate.label} ({rate.range})
                </Label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Property Name - Collapsible */}
      <Collapsible open={isPropertyNameOpen} onOpenChange={setIsPropertyNameOpen}>
        <CollapsibleTrigger className="w-full flex items-center justify-between py-2 text-sm font-semibold text-foreground dark:text-foreground hover:text-primary dark:hover:text-primary transition-colors">
          <span>Property Name</span>
          <ChevronDown className={cn("w-4 h-4 transition-transform duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)]", isPropertyNameOpen && "rotate-180")} />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <Input
            type="text"
            placeholder="e.g. Hilton"
            value={propertyName}
            onChange={(e) => onPropertyNameChange(e.target.value)}
            className="bg-background dark:bg-background border-border text-foreground dark:text-foreground placeholder:text-muted-foreground dark:placeholder:text-muted-foreground h-9"
          />
        </CollapsibleContent>
      </Collapsible>

      {/* Guest Rating - Collapsible */}
      <Collapsible open={isGuestRatingOpen} onOpenChange={setIsGuestRatingOpen}>
        <CollapsibleTrigger className="w-full flex items-center justify-between py-2 text-sm font-semibold text-foreground dark:text-foreground hover:text-primary dark:hover:text-primary transition-colors">
          <span>Guest Rating</span>
          <ChevronDown className={cn("w-4 h-4 transition-transform duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)]", isGuestRatingOpen && "rotate-180")} />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((rating) => (
              <button
                key={rating}
                onClick={() => onMinRatingChange(minRating === rating ? null : rating)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                  minRating === rating
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted dark:bg-muted text-foreground dark:text-foreground hover:bg-muted/80 dark:hover:bg-muted/80"
                )}
              >
                {rating}+
              </button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Set Your Budget - Collapsible */}
      <Collapsible open={isBudgetOpen} onOpenChange={setIsBudgetOpen}>
        <CollapsibleTrigger className="w-full flex items-center justify-between py-2 text-sm font-semibold text-foreground dark:text-foreground hover:text-primary dark:hover:text-primary transition-colors">
          <span>Set Your Budget</span>
          <ChevronDown className={cn("w-4 h-4 transition-transform duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)]", isBudgetOpen && "rotate-180")} />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <div className="mb-2">
            <div className="flex justify-between text-xs text-muted-foreground dark:text-muted-foreground mb-1">
              <span>Min: ${priceRange[0]}</span>
              <span>Max: ${priceRange[1]}</span>
            </div>
          </div>
          <Slider
            value={priceRange}
            onValueChange={(value) => onPriceRangeChange(value as [number, number])}
            min={0}
            max={4999}
            step={50}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground dark:text-muted-foreground mt-2">
            <span>$0</span>
            <span>$4999</span>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

// Hotel Card Component
interface HotelCardProps {
  hotel: Hotel;
  showTotalPrices: boolean;
  getRatingLabel: (rating: number) => string;
}

const HotelCard = ({ hotel, showTotalPrices, getRatingLabel }: HotelCardProps) => {
  const [searchParams] = useSearchParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const displayPrice = showTotalPrices
    ? Math.round(hotel.pricePerNight * 1.15) // Add 15% for taxes & fees
    : hotel.pricePerNight;

  return (
    <div className="bg-card dark:bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex flex-col md:flex-row">
        {/* Left: Image */}
        <div className="relative md:w-80 h-64 md:h-auto flex-shrink-0 group">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 dark:bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-white dark:hover:bg-background transition-colors"
            aria-label="Add to favorites"
          >
            <Heart
              className={cn(
                "w-5 h-5 transition-colors",
                isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-muted-foreground dark:text-muted-foreground"
              )}
            />
          </button>
        </div>

        {/* Center: Hotel Info */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-serif font-bold text-foreground dark:text-foreground mb-2">
              {hotel.name}
            </h3>
            <div className="flex items-center gap-2 text-muted-foreground dark:text-muted-foreground text-sm mb-3">
              <MapPin className="w-4 h-4" />
              <span>{hotel.address}, {hotel.city}, {hotel.country}</span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <a
                href="#"
                className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/80"
              >
                <span className="font-semibold">{hotel.rating}</span>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-muted-foreground dark:text-muted-foreground">
                  ({hotel.reviewCount.toLocaleString()} reviews)
                </span>
              </a>
              <span className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary rounded-full text-xs font-medium">
                {getRatingLabel(hotel.rating)}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Price & CTA */}
        <div className="md:w-64 p-6 flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-border">
          <div className="w-full md:text-right">
            <div className="mb-2">
              <span className="text-3xl font-bold text-foreground dark:text-foreground">
                ${displayPrice}
              </span>
              <span className="text-muted-foreground dark:text-muted-foreground text-sm ml-1">
                /night
              </span>
            </div>
            {!showTotalPrices && (
              <p className="text-xs text-muted-foreground dark:text-muted-foreground mb-4">
                Excludes taxes & fees
              </p>
            )}
          </div>
          <Button
            asChild
            className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Link to={`/hotel/${hotel.id}?${new URLSearchParams(searchParams).toString()}`}>
              Choose Your Room
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

// Hotel Card Skeleton
const HotelCardSkeleton = () => {
  return (
    <div className="bg-card dark:bg-card border border-border rounded-2xl overflow-hidden animate-pulse">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-80 h-64 md:h-auto bg-muted dark:bg-muted" />
        <div className="flex-1 p-6 space-y-4">
          <div className="h-6 bg-muted dark:bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted dark:bg-muted rounded w-1/2" />
          <div className="h-4 bg-muted dark:bg-muted rounded w-1/3" />
        </div>
        <div className="md:w-64 p-6 space-y-4">
          <div className="h-8 bg-muted dark:bg-muted rounded w-24 ml-auto" />
          <div className="h-10 bg-muted dark:bg-muted rounded w-full" />
        </div>
      </div>
    </div>
  );
};

// Pagination Component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-12 pb-8">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-background dark:bg-background border-border text-foreground dark:text-foreground"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {getPageNumbers().map((page, index) => (
        <div key={index}>
          {page === "..." ? (
            <span className="px-3 py-2 text-muted-foreground dark:text-muted-foreground">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page as number)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                currentPage === page
                  ? "bg-primary text-primary-foreground"
                  : "bg-background dark:bg-background border border-border text-foreground dark:text-foreground hover:bg-muted dark:hover:bg-muted"
              )}
            >
              {page}
            </button>
          )}
        </div>
      ))}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-background dark:bg-background border-border text-foreground dark:text-foreground"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default SearchResults;
