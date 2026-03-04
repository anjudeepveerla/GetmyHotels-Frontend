import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { hotels } from "@/data/hotels";
import { format } from "date-fns";
import { CheckCircle, Calendar, Users, MapPin, Mail, Download } from "lucide-react";
import Navbar from "@/components/hotel/Navbar";
import Footer from "@/components/hotel/Footer";

const BookingConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get booking data from URL params
  const bookingId = searchParams.get("bookingId") || "";
  const hotelId = searchParams.get("hotelId") || "";
  const roomId = searchParams.get("roomId") || "";
  const location = searchParams.get("location") || "";
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const adults = parseInt(searchParams.get("adults") || "2");
  const children = parseInt(searchParams.get("children") || "0");
  const rooms = parseInt(searchParams.get("rooms") || "1");
  const nights = parseInt(searchParams.get("nights") || "0");
  const total = parseFloat(searchParams.get("total") || "0");
  const firstName = searchParams.get("firstName") || "";
  const lastName = searchParams.get("lastName") || "";
  const email = searchParams.get("email") || "";

  // Find hotel data
  const hotel = hotels.find((h) => h.id === hotelId);
  const checkInDate = checkIn ? new Date(checkIn) : null;
  const checkOutDate = checkOut ? new Date(checkOut) : null;

  // Mock room data
  const roomTypes = [
    { id: "1", name: "Deluxe King Room" },
    { id: "2", name: "Executive Suite" },
    { id: "3", name: "Family Room" },
  ];
  const selectedRoom = roomTypes.find((r) => r.id === roomId) || roomTypes[0];

  if (!hotel) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Booking not found</h2>
          <Button onClick={() => navigate("/")}>Go to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
        </div>

        {/* Confirmation Message */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Booking Confirmed!
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            Your booking has been successfully confirmed.
          </p>
          <p className="text-muted-foreground">
            A confirmation email has been sent to <span className="font-medium text-foreground">{email}</span>
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-foreground">Booking Details</h2>
            <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
              <span className="text-sm text-muted-foreground">Booking ID:</span>
              <span className="text-sm font-mono font-semibold text-foreground">{bookingId}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Hotel Image */}
            <div className="md:col-span-2">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
            </div>

            {/* Hotel Name */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-2">{hotel.name}</h3>
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <MapPin className="w-4 h-4" />
                <span>{hotel.address}, {hotel.city}, {hotel.country}</span>
              </div>
            </div>

            {/* Room Type */}
            <div>
              <p className="text-sm text-muted-foreground mb-1">Room Type</p>
              <p className="text-foreground font-medium">{selectedRoom.name}</p>
            </div>

            {/* Dates */}
            <div>
              <p className="text-sm text-muted-foreground mb-1">Check-in – Check-out</p>
              <div className="flex items-center gap-2 text-foreground">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">
                  {checkInDate && checkOutDate
                    ? `${format(checkInDate, "MMM d, yyyy")} – ${format(checkOutDate, "MMM d, yyyy")}`
                    : "Not selected"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{nights} night{nights !== 1 ? "s" : ""}</p>
            </div>

            {/* Guests */}
            <div>
              <p className="text-sm text-muted-foreground mb-1">Guests</p>
              <div className="flex items-center gap-2 text-foreground">
                <Users className="w-4 h-4" />
                <span className="font-medium">
                  {adults} Adult{adults !== 1 ? "s" : ""}
                  {children > 0 && `, ${children} Child${children !== 1 ? "ren" : ""}`}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{rooms} Room{rooms !== 1 ? "s" : ""}</p>
            </div>

            {/* Guest Name */}
            <div>
              <p className="text-sm text-muted-foreground mb-1">Guest Name</p>
              <div className="flex items-center gap-2 text-foreground">
                <Mail className="w-4 h-4" />
                <span className="font-medium">{firstName} {lastName}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{email}</p>
            </div>
          </div>

          {/* Total Amount */}
          <div className="border-t border-border pt-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-foreground">Total Paid</span>
              <span className="text-3xl font-bold text-foreground">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-muted/50 border border-border rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-foreground mb-4">Important Information</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Please arrive at the hotel on the check-in date between 2:00 PM and 11:00 PM</li>
            <li>• Check-out time is 11:00 AM on the check-out date</li>
            <li>• A valid government-issued ID is required at check-in</li>
            <li>• The hotel may require a security deposit upon arrival</li>
            <li>• Cancellation policies apply as per the room type selected</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate(`/hotel/${hotelId}`)}
            variant="outline"
            className="flex-1 sm:flex-none px-8 h-12"
          >
            View Booking
          </Button>
          <Button
            onClick={() => navigate("/")}
            className="flex-1 sm:flex-none px-8 h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Go to Home
          </Button>
          <Button
            variant="outline"
            className="flex-1 sm:flex-none px-8 h-12"
            onClick={() => {
              // Demo: Download booking confirmation
              alert("Booking confirmation will be downloaded (demo)");
            }}
          >
            <Download className="w-4 h-4 mr-2" />
            Download Receipt
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingConfirmation;
