import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { hotels } from "@/data/hotels";
import { format, differenceInDays } from "date-fns";
import { MapPin, Calendar, Users, ChevronRight } from "lucide-react";
import Navbar from "@/components/hotel/Navbar";
import Footer from "@/components/hotel/Footer";

const BookingDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get booking data from URL params
  const hotelId = searchParams.get("hotelId") || "";
  const roomId = searchParams.get("roomId") || "";
  const location = searchParams.get("location") || "";
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const adults = parseInt(searchParams.get("adults") || "2");
  const children = parseInt(searchParams.get("children") || "0");
  const rooms = parseInt(searchParams.get("rooms") || "1");
  const pricePerNight = parseFloat(searchParams.get("pricePerNight") || "0");

  // Guest information form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  // Find hotel and room data
  const hotel = hotels.find((h) => h.id === hotelId);
  const checkInDate = checkIn ? new Date(checkIn) : null;
  const checkOutDate = checkOut ? new Date(checkOut) : null;
  const nights = checkInDate && checkOutDate ? differenceInDays(checkOutDate, checkInDate) : 0;

  // Mock room data
  const roomTypes = [
    { id: "1", name: "Deluxe King Room", bedType: "1 King Bed", capacity: "2 Guests" },
    { id: "2", name: "Executive Suite", bedType: "1 King Bed", capacity: "2 Guests" },
    { id: "3", name: "Family Room", bedType: "2 Queen Beds", capacity: "4 Guests" },
  ];
  const selectedRoom = roomTypes.find((r) => r.id === roomId) || roomTypes[0];

  // Price calculations
  const subtotal = pricePerNight * nights * rooms;
  const taxes = subtotal * 0.12; // 12% taxes
  const fees = 25; // Service fee
  const total = subtotal + taxes + fees;

  const handleProceedToPayment = () => {
    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !country) {
      alert("Please fill in all required fields");
      return;
    }

    // Navigate to payment page with all data
    const params = new URLSearchParams();
    params.set("hotelId", hotelId);
    params.set("roomId", roomId);
    params.set("location", location);
    params.set("checkIn", checkIn);
    params.set("checkOut", checkOut);
    params.set("adults", adults.toString());
    params.set("children", children.toString());
    params.set("rooms", rooms.toString());
    params.set("pricePerNight", pricePerNight.toString());
    params.set("nights", nights.toString());
    params.set("subtotal", subtotal.toString());
    params.set("taxes", taxes.toString());
    params.set("fees", fees.toString());
    params.set("total", total.toString());
    params.set("firstName", firstName);
    params.set("lastName", lastName);
    params.set("email", email);
    params.set("phone", phone);
    params.set("country", country);
    if (specialRequests) params.set("specialRequests", specialRequests);

    navigate(`/payment?${params.toString()}`);
  };

  if (!hotel) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Hotel not found</h2>
          <Button onClick={() => navigate("/")}>Go to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
            Complete Your Booking
          </h1>
          <p className="text-muted-foreground">Please provide your details to proceed</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Section - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Guest Information Form */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Guest Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="text-foreground">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-2 bg-background"
                    placeholder="John"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-foreground">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-2 bg-background"
                    placeholder="Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-foreground">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 bg-background"
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-foreground">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-2 bg-background"
                    placeholder="+1 234 567 8900"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="country" className="text-foreground">
                    Country <span className="text-red-500">*</span>
                  </Label>
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger className="mt-2 bg-background">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="AU">Australia</SelectItem>
                      <SelectItem value="IN">India</SelectItem>
                      <SelectItem value="DE">Germany</SelectItem>
                      <SelectItem value="FR">France</SelectItem>
                      <SelectItem value="IT">Italy</SelectItem>
                      <SelectItem value="ES">Spain</SelectItem>
                      <SelectItem value="JP">Japan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="specialRequests" className="text-foreground">
                    Special Requests (Optional)
                  </Label>
                  <Textarea
                    id="specialRequests"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="mt-2 bg-background"
                    placeholder="Any special requests or preferences..."
                    rows={4}
                  />
                </div>
              </div>
            </div>

            {/* Stay Details */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Stay Details</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Hotel</p>
                    <p className="text-foreground font-medium">{hotel.name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-foreground font-medium">{hotel.address}, {hotel.city}, {hotel.country}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 text-muted-foreground mt-0.5 flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-muted-foreground rounded" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Room Type</p>
                    <p className="text-foreground font-medium">{selectedRoom.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedRoom.bedType} • {selectedRoom.capacity}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Check-in – Check-out</p>
                    <p className="text-foreground font-medium">
                      {checkInDate && checkOutDate
                        ? `${format(checkInDate, "MMM d, yyyy")} – ${format(checkOutDate, "MMM d, yyyy")}`
                        : "Not selected"}
                    </p>
                    <p className="text-sm text-muted-foreground">{nights} night{nights !== 1 ? "s" : ""}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Guests</p>
                    <p className="text-foreground font-medium">
                      {adults} Adult{adults !== 1 ? "s" : ""}
                      {children > 0 && `, ${children} Child${children !== 1 ? "ren" : ""}`}
                    </p>
                    <p className="text-sm text-muted-foreground">{rooms} Room{rooms !== 1 ? "s" : ""}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Price Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    ${pricePerNight.toFixed(2)} × {nights} night{nights !== 1 ? "s" : ""} × {rooms} room{rooms !== 1 ? "s" : ""}
                  </span>
                  <span className="text-foreground font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes & Fees</span>
                  <span className="text-foreground font-medium">${taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span className="text-foreground font-medium">${fees.toFixed(2)}</span>
                </div>
                <div className="border-t border-border pt-4 flex justify-between">
                  <span className="text-lg font-semibold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-foreground">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Sticky Summary */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 bg-card border border-border rounded-2xl p-6 space-y-6">
              <div>
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <h3 className="text-xl font-semibold text-foreground mb-2">{hotel.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{selectedRoom.name}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {checkInDate && checkOutDate
                        ? `${format(checkInDate, "MMM d")} – ${format(checkOutDate, "MMM d")}`
                        : "Not selected"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>
                      {adults} Adult{adults !== 1 ? "s" : ""}
                      {children > 0 && `, ${children} Child${children !== 1 ? "ren" : ""}`}
                    </span>
                  </div>
                </div>
              </div>
              <div className="border-t border-border pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-foreground">${total.toFixed(2)}</span>
                </div>
                <Button
                  onClick={handleProceedToPayment}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-semibold"
                >
                  Proceed to Payment
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingDetails;
