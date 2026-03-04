import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { hotels } from "@/data/hotels";
import { format } from "date-fns";
import { CreditCard, Smartphone, Building2, Wallet, ChevronRight, Lock, Calendar } from "lucide-react";
import Navbar from "@/components/hotel/Navbar";
import Footer from "@/components/hotel/Footer";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Get booking data from URL params
  const hotelId = searchParams.get("hotelId") || "";
  const roomId = searchParams.get("roomId") || "";
  const location = searchParams.get("location") || "";
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const adults = parseInt(searchParams.get("adults") || "2");
  const children = parseInt(searchParams.get("children") || "0");
  const rooms = parseInt(searchParams.get("rooms") || "1");
  const nights = parseInt(searchParams.get("nights") || "0");
  const subtotal = parseFloat(searchParams.get("subtotal") || "0");
  const taxes = parseFloat(searchParams.get("taxes") || "0");
  const fees = parseFloat(searchParams.get("fees") || "0");
  const total = parseFloat(searchParams.get("total") || "0");
  const firstName = searchParams.get("firstName") || "";
  const lastName = searchParams.get("lastName") || "";
  const email = searchParams.get("email") || "";

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Card payment fields
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");

  // UPI fields
  const [upiId, setUpiId] = useState("");

  // Net Banking
  const [selectedBank, setSelectedBank] = useState("");

  // Wallet
  const [selectedWallet, setSelectedWallet] = useState("");

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

  // If no hotel found or missing critical data, show error
  if (!hotel || !hotelId) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-4">Booking Information Missing</h2>
            <p className="text-muted-foreground mb-6">Please start your booking from the hotel page.</p>
            <Button onClick={() => navigate("/")}>Go to Home</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    setExpiryDate(value);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 3) value = value.slice(0, 3);
    setCvv(value);
  };

  const handlePayAndConfirm = async () => {
    // Demo validation
    if (paymentMethod === "card") {
      if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
        alert("Please fill in all card details");
        return;
      }
      if (cardNumber.replace(/\s/g, "").length !== 16) {
        alert("Please enter a valid 16-digit card number");
        return;
      }
      if (expiryDate.length !== 5) {
        alert("Please enter a valid expiry date (MM/YY)");
        return;
      }
      if (cvv.length !== 3) {
        alert("Please enter a valid CVV");
        return;
      }
    } else if (paymentMethod === "upi") {
      if (!upiId || !upiId.includes("@")) {
        alert("Please enter a valid UPI ID");
        return;
      }
    } else if (paymentMethod === "netbanking") {
      if (!selectedBank) {
        alert("Please select a bank");
        return;
      }
    } else if (paymentMethod === "wallet") {
      if (!selectedWallet) {
        alert("Please select a wallet");
        return;
      }
    }

    // Show processing state
    setIsProcessing(true);

    // Simulate payment processing delay (demo)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate demo booking ID
    const bookingId = `GMH${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    // Navigate to confirmation page with all data
    const params = new URLSearchParams();
    params.set("bookingId", bookingId);
    params.set("hotelId", hotelId);
    params.set("roomId", roomId);
    params.set("location", location);
    params.set("checkIn", checkIn);
    params.set("checkOut", checkOut);
    params.set("adults", adults.toString());
    params.set("children", children.toString());
    params.set("rooms", rooms.toString());
    params.set("nights", nights.toString());
    params.set("total", total.toString());
    params.set("firstName", firstName);
    params.set("lastName", lastName);
    params.set("email", email);

    setIsProcessing(false);
    navigate(`/booking-confirmation?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
            Payment
          </h1>
          <p className="text-muted-foreground">Complete your booking with secure payment</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Section - Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method Selection */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Select Payment Method</h2>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                {/* Credit/Debit Card */}
                <div className={`flex items-center space-x-3 p-4 border-2 rounded-xl transition-all cursor-pointer ${paymentMethod === "card"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-muted/50"
                  }`}>
                  <RadioGroupItem value="card" id="card" className="border-2" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <span className="text-foreground font-medium block">Credit/Debit Card</span>
                      <span className="text-xs text-muted-foreground">Visa, Mastercard, Amex</span>
                    </div>
                  </Label>
                </div>

                {/* UPI */}
                <div className={`flex items-center space-x-3 p-4 border-2 rounded-xl transition-all cursor-pointer ${paymentMethod === "upi"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-muted/50"
                  }`}>
                  <RadioGroupItem value="upi" id="upi" className="border-2" />
                  <Label htmlFor="upi" className="flex-1 cursor-pointer flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <span className="text-foreground font-medium block">UPI</span>
                      <span className="text-xs text-muted-foreground">Paytm, PhonePe, Google Pay</span>
                    </div>
                  </Label>
                </div>

                {/* Net Banking */}
                <div className={`flex items-center space-x-3 p-4 border-2 rounded-xl transition-all cursor-pointer ${paymentMethod === "netbanking"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-muted/50"
                  }`}>
                  <RadioGroupItem value="netbanking" id="netbanking" className="border-2" />
                  <Label htmlFor="netbanking" className="flex-1 cursor-pointer flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <span className="text-foreground font-medium block">Net Banking</span>
                      <span className="text-xs text-muted-foreground">All major banks</span>
                    </div>
                  </Label>
                </div>

                {/* Wallet */}
                <div className={`flex items-center space-x-3 p-4 border-2 rounded-xl transition-all cursor-pointer ${paymentMethod === "wallet"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-muted/50"
                  }`}>
                  <RadioGroupItem value="wallet" id="wallet" className="border-2" />
                  <Label htmlFor="wallet" className="flex-1 cursor-pointer flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-purple-500" />
                    </div>
                    <div className="flex-1">
                      <span className="text-foreground font-medium block">Digital Wallet</span>
                      <span className="text-xs text-muted-foreground">Paytm, PhonePe, Amazon Pay</span>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Payment Form */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              {paymentMethod === "card" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-foreground">Card Details</h2>
                    <div className="flex gap-2">
                      <div className="w-10 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                      <div className="w-10 h-6 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cardNumber" className="text-foreground">
                      Card Number
                    </Label>
                    <div className="relative mt-2">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="cardNumber"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        className="pl-10 bg-background"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="expiryDate" className="text-foreground">
                        Expiry Date
                      </Label>
                      <Input
                        id="expiryDate"
                        value={expiryDate}
                        onChange={handleExpiryChange}
                        className="mt-2 bg-background"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="text-foreground">
                        CVV
                      </Label>
                      <Input
                        id="cvv"
                        type="password"
                        value={cvv}
                        onChange={handleCvvChange}
                        className="mt-2 bg-background"
                        placeholder="123"
                        maxLength={3}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cardholderName" className="text-foreground">
                      Cardholder Name
                    </Label>
                    <Input
                      id="cardholderName"
                      value={cardholderName}
                      onChange={(e) => setCardholderName(e.target.value)}
                      className="mt-2 bg-background"
                      placeholder={`${firstName} ${lastName}`}
                    />
                  </div>
                  <div className="bg-muted/50 border border-border rounded-lg p-3 text-xs text-muted-foreground">
                    💡 Demo Mode: Use any card number (16 digits), expiry date (MM/YY), and CVV (3 digits) to proceed.
                  </div>
                </div>
              )}

              {paymentMethod === "upi" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-foreground mb-6">UPI Details</h2>
                  <div>
                    <Label htmlFor="upiId" className="text-foreground">
                      UPI ID
                    </Label>
                    <div className="relative mt-2">
                      <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="upiId"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="pl-10 bg-background"
                        placeholder="yourname@paytm"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Enter your UPI ID (e.g., yourname@paytm, yourname@phonepe)
                    </p>
                  </div>
                  <div className="bg-muted/50 border border-border rounded-lg p-3 text-xs text-muted-foreground">
                    💡 Demo Mode: Use any valid UPI ID format (e.g., demo@paytm) to proceed.
                  </div>
                </div>
              )}

              {paymentMethod === "netbanking" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-foreground mb-6">Select Bank</h2>
                  <div>
                    <Label htmlFor="bank" className="text-foreground">
                      Bank
                    </Label>
                    <Select value={selectedBank} onValueChange={setSelectedBank}>
                      <SelectTrigger className="mt-2 bg-background">
                        <SelectValue placeholder="Select a bank" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hdfc">HDFC Bank</SelectItem>
                        <SelectItem value="icici">ICICI Bank</SelectItem>
                        <SelectItem value="sbi">State Bank of India</SelectItem>
                        <SelectItem value="axis">Axis Bank</SelectItem>
                        <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {paymentMethod === "wallet" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-foreground mb-6">Select Wallet</h2>
                  <div>
                    <Label htmlFor="wallet" className="text-foreground">
                      Wallet
                    </Label>
                    <Select value={selectedWallet} onValueChange={setSelectedWallet}>
                      <SelectTrigger className="mt-2 bg-background">
                        <SelectValue placeholder="Select a wallet" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paytm">Paytm</SelectItem>
                        <SelectItem value="phonepe">PhonePe</SelectItem>
                        <SelectItem value="gpay">Google Pay</SelectItem>
                        <SelectItem value="amazonpay">Amazon Pay</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>

            {/* Security Notice */}
            <div className="bg-muted/50 border border-border rounded-xl p-4 flex items-start gap-3">
              <Lock className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-foreground font-medium mb-1">Secure Payment</p>
                <p className="text-xs text-muted-foreground">
                  Your payment information is encrypted and secure. This is a demo booking system.
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Booking Summary */}
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
                    <span>{nights} night{nights !== 1 ? "s" : ""}</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-border pt-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taxes & Fees</span>
                  <span className="text-foreground">${taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span className="text-foreground">${fees.toFixed(2)}</span>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-foreground">${total.toFixed(2)}</span>
                  </div>
                  <Button
                    onClick={handlePayAndConfirm}
                    disabled={isProcessing}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        Pay & Confirm Booking
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
