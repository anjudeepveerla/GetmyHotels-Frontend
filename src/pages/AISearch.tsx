import { useState, useEffect, useRef } from "react";
import { Sparkles, Send, History, RotateCcw, ArrowRight, Mic, Plane, Calendar, Info } from "lucide-react";
import Navbar from "@/components/hotel/Navbar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Hotel, HotelCard } from "@/components/chat/HotelCard";
import { BookingForm, BookingData } from "@/components/chat/BookingForm";
import { BookingConfirmation } from "@/components/chat/BookingConfirmation";
import { PaymentModal } from "@/components/chat/PaymentModal";

// --- Mock Data ---
const MOCK_HOTELS: Hotel[] = [
    {
        id: "h1",
        name: "Azure Paradise Resort",
        image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1000&auto=format&fit=crop",
        rating: 4.8,
        price: 250,
        location: "Phuket, Thailand",
        description: "Luxury beachfront resort with infinity pools and private villas.",
    },
    {
        id: "h2",
        name: "Bangkok Sky Hotel",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop",
        rating: 4.5,
        price: 120,
        location: "Bangkok, Thailand",
        description: "Modern city hotel with rooftop bar and panoramic views.",
    },
    {
        id: "h3",
        name: "Jungle Retreat",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1000&auto=format&fit=crop",
        rating: 4.7,
        price: 180,
        location: "Chiang Mai, Thailand",
        description: "Eco-friendly wooden cabins nestled in the lush jungle.",
    },
];

interface Message {
    id: string;
    sender: "user" | "ai";
    text: string;
    timestamp: string;
    type?: "text" | "hotel-list" | "booking-form" | "confirmation" | "payment-request";
    payload?: any;
}

const AISearch = () => {
    const navigate = useNavigate();
    const [hasStarted, setHasStarted] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Booking Flow State
    const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
    const [pendingBookingData, setPendingBookingData] = useState<BookingData | null>(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [activeBookingId, setActiveBookingId] = useState<string | null>(null);

    const { user } = useAuth();

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return "Good morning";
        if (hour >= 12 && hour < 17) return "Good afternoon";
        return "Good evening";
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const addMessage = (sender: "user" | "ai", text: string, type: Message["type"] = "text", payload?: any) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            sender,
            text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type,
            payload
        };
        setMessages((prev) => [...prev, newMessage]);
    };

    const handleSendMessage = (text: string = inputText) => {
        if (!text.trim()) return;

        if (!hasStarted) setHasStarted(true);

        addMessage("user", text);
        setInputText("");
        setIsTyping(true);

        // Simple Bot Logic
        setTimeout(() => {
            processUserMessage(text);
            setIsTyping(false);
        }, 1500);
    };

    const processUserMessage = (text: string) => {
        const lowerText = text.toLowerCase();

        if (lowerText.includes("thailand") || lowerText.includes("hotel") || lowerText.includes("stay")) {
            addMessage("ai", "I've found top-rated hotels in Thailand for you:");
            // Add hotel cards
            setTimeout(() => {
                addMessage("ai", "", "hotel-list", { hotels: MOCK_HOTELS });
            }, 500);
            return;
        }

        if (lowerText.includes("cancel") && activeBookingId) {
            addMessage("ai", `Your booking #${activeBookingId} has been successfully cancelled. The refund will be processed within 5-7 business days.`);
            setActiveBookingId(null);
            return;
        }

        if (lowerText.includes("reschedule") && activeBookingId) {
            addMessage("ai", "Certainly! Please select new dates for your reservation.");
            // In a real app, we would re-trigger the date picker flow here
            return;
        }

        addMessage("ai", "I can help you find hotels, book rooms, and manage reservations. Try asking 'Suggest hotels in Thailand'.");
    };

    const handleHotelSelect = (hotel: Hotel) => {
        setSelectedHotel(hotel);
        addMessage("user", `I'd like to book ${hotel.name}`);
        setTimeout(() => {
            addMessage("ai", `Great choice! Please provide your details for ${hotel.name}.`, "booking-form", { hotel });
        }, 1000);
    };

    const handleBookingSubmit = (data: BookingData) => {
        setPendingBookingData(data);
        // Remove the form message or disable it? For now just append next step.
        // In a real chat, we might update the previous message to be "read-only".

        addMessage("ai", `Booking Summary: ${data.guests} guests, ${data.roomType} room from ${data.checkIn.toLocaleDateString()} to ${data.checkOut.toLocaleDateString()}. Total: $${data.totalPrice}.`);

        setTimeout(() => {
            setShowPaymentModal(true);
        }, 1000);
    };

    const handlePaymentComplete = () => {
        if (!selectedHotel || !pendingBookingData) return;

        const bookingId = Math.random().toString(36).substr(2, 9).toUpperCase();
        setActiveBookingId(bookingId);

        addMessage("ai", "Payment successful! Here is your booking confirmation.", "confirmation", {
            bookingId,
            hotel: selectedHotel,
            bookingData: pendingBookingData
        });

        setSelectedHotel(null);
        setPendingBookingData(null);
    };

    const handleChipClick = (label: string) => {
        handleSendMessage(label);
    };

    const handleClearHistory = () => {
        setMessages([]);
        setHasStarted(false);
        setIsTyping(false);
        setInputText("");
        setSelectedHotel(null);
        setPendingBookingData(null);
        setActiveBookingId(null);
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden font-sans text-foreground">
            <Navbar />

            <section className="relative w-full pt-28 pb-12 lg:pt-36 lg:pb-20 overflow-hidden h-screen max-h-screen flex flex-col">
                <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 h-full">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 h-full">

                        {/* LEFT SECTION: Chat Experience */}
                        <div className="w-full lg:w-[50%] flex flex-col relative h-full">

                            {/* Top Controls */}
                            <div className={cn("flex items-center gap-6 mb-8 px-4 transition-opacity duration-500", hasStarted ? "opacity-100" : "opacity-0 pointer-events-none")}>
                                <button className="flex items-center gap-2 text-primary hover:text-primary/70 transition-colors text-sm font-medium">
                                    <History className="w-4 h-4" />
                                    View History
                                </button>
                                <button
                                    onClick={handleClearHistory}
                                    className="flex items-center gap-2 text-primary hover:text-primary/70 transition-colors text-sm font-medium"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    Clear History
                                </button>
                            </div>

                            {/* Chat Content Area */}
                            <div ref={scrollRef} className="flex-1 overflow-y-auto pr-4 scrollbar-hide space-y-8 pb-32 h-full flex flex-col">
                                {!hasStarted ? (
                                    /* INITIAL STATE: Welcome & Chips */
                                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-fade-in my-auto">
                                        <div className="space-y-4 max-w-lg mx-auto">
                                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                                                {getGreeting()}, {user?.name || "Traveler"}
                                            </h2>
                                            <p className="text-lg text-muted-foreground leading-relaxed">
                                                Find your perfect hotel, plan a trip, or get travel support just by texting.
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap items-center justify-center gap-3 max-w-xl mx-auto">
                                            <button
                                                onClick={() => handleChipClick("Suggest hotels in Thailand")}
                                                className="flex items-center gap-2 px-5 py-2.5 bg-card border border-border/50 rounded-full shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 group"
                                            >
                                                <Plane className="w-5 h-5 text-blue-500" />
                                                <span className="font-medium text-foreground">Book a Trip to Thailand</span>
                                            </button>
                                            <button
                                                onClick={() => handleChipClick("Trending Trips")}
                                                className="flex items-center gap-2 px-5 py-2.5 bg-card border border-border/50 rounded-full shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 group"
                                            >
                                                <span className="text-lg">🔥</span>
                                                <span className="font-medium text-foreground">Trending Trips</span>
                                            </button>
                                            <button
                                                onClick={() => handleChipClick("My Bookings")}
                                                className="flex items-center gap-2 px-5 py-2.5 bg-card border border-border/50 rounded-full shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 group"
                                            >
                                                <Calendar className="w-5 h-5 text-green-500" />
                                                <span className="font-medium text-foreground">My Bookings</span>
                                            </button>
                                            <button
                                                onClick={() => handleChipClick("Support")}
                                                className="flex items-center gap-2 px-5 py-2.5 bg-card border border-border/50 rounded-full shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 group"
                                            >
                                                <Info className="w-5 h-5 text-orange-500" />
                                                <span className="font-medium text-foreground">Help</span>
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    /* ACTIVE STATE: Chat History */
                                    <>
                                        {messages.map((msg) => (
                                            <div
                                                key={msg.id}
                                                className={cn(
                                                    "flex flex-col max-w-[90%] lg:max-w-[85%] animate-scale-in",
                                                    msg.sender === "user" ? "items-end ml-auto" : "items-start"
                                                )}
                                            >
                                                <div className="flex items-start gap-4">
                                                    {msg.sender === "ai" && (
                                                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-lg mt-1">
                                                            <Sparkles className="w-5 h-5" />
                                                        </div>
                                                    )}

                                                    {/* Message Bubble Content */}
                                                    <div className="space-y-4">
                                                        {msg.text && (
                                                            <div
                                                                className={cn(
                                                                    "p-6 rounded-3xl text-lg leading-relaxed shadow-sm transition-all hover:shadow-md backdrop-blur-2xl",
                                                                    msg.sender === "user"
                                                                        ? "bg-white/90 backdrop-blur-3xl text-[#1d1d1f] rounded-[1.8rem] rounded-br-[6px] shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-white/50 ring-1 ring-black/5"
                                                                        : "bg-card border border-white/20 text-card-foreground rounded-[1.5rem] rounded-tl-[4px] shadow-black/5"
                                                                )}
                                                            >
                                                                {msg.text}
                                                            </div>
                                                        )}

                                                        {/* Specialized Modules */}
                                                        {msg.type === "hotel-list" && msg.payload?.hotels && (
                                                            <div className="flex gap-4 overflow-x-auto pb-4 snap-x pr-2">
                                                                {msg.payload.hotels.map((hotel: Hotel) => (
                                                                    <div key={hotel.id} className="snap-center shrink-0">
                                                                        <HotelCard hotel={hotel} onSelect={handleHotelSelect} />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}

                                                        {msg.type === "booking-form" && msg.payload?.hotel && (
                                                            <BookingForm
                                                                hotel={msg.payload.hotel}
                                                                onSubmit={handleBookingSubmit}
                                                                onCancel={() => addMessage("user", "Cancel Flow")}
                                                            />
                                                        )}

                                                        {msg.type === "confirmation" && msg.payload && (
                                                            <BookingConfirmation
                                                                bookingId={msg.payload.bookingId}
                                                                hotel={msg.payload.hotel}
                                                                bookingData={msg.payload.bookingData}
                                                            />
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Meta/Timestamp */}
                                                <div className="flex items-center gap-4 mt-2 px-2 opacity-60 text-xs">
                                                    <span>{msg.timestamp}</span>
                                                </div>
                                            </div>
                                        ))}

                                        {isTyping && (
                                            <div className="flex items-start gap-4 animate-fade-in">
                                                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 mt-1">
                                                    <Sparkles className="w-5 h-5" />
                                                </div>
                                                <div className="bg-card border border-border/40 p-6 rounded-3xl rounded-tl-sm w-fit shadow-sm">
                                                    <div className="flex gap-1.5">
                                                        <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                                        <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                                        <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>

                            {/* Floating Input Bar */}
                            <div className="absolute bottom-6 left-4 right-4 z-20 animate-slide-up stagger-2 max-w-2xl mx-auto">
                                <div className="relative bg-white/80 dark:bg-zinc-900/80 backdrop-blur-3xl border border-white/20 dark:border-white/10 shadow-2xl rounded-[2rem] p-2 flex items-center gap-2 transition-all ring-1 ring-black/5">
                                    <input
                                        type="text"
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                                        placeholder="Ask Penny a question..."
                                        className="flex-1 bg-transparent border-none text-foreground dark:text-white text-base px-6 py-3 focus:ring-0 placeholder:text-muted-foreground/60 dark:placeholder:text-white/40 focus:outline-none focus-visible:ring-0"
                                    />

                                    <div className="flex items-center gap-2 pr-2">
                                        <button className="w-10 h-10 flex items-center justify-center rounded-full text-foreground/70 hover:bg-black/5 transition-colors">
                                            <Mic className="w-5 h-5" />
                                        </button>
                                        <Button
                                            onClick={() => handleSendMessage()}
                                            size="icon"
                                            className="w-12 h-12 rounded-full shadow-lg"
                                        >
                                            <Send className="w-5 h-5 ml-0.5" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* RIGHT SECTION: "The Travel Orbit" Bento Grid */}
                        <div className="hidden lg:flex w-full lg:w-[50%] h-full flex-col justify-center animate-slide-up stagger-3 overflow-y-auto pb-20 scrollbar-hide px-1 perspective-1000 pt-12">
                            {/* Retaining original Bento Grid Content */}
                            <div className="relative w-full h-[45%] min-h-[220px] rounded-[2rem] overflow-hidden group shadow-xl cursor-pointer mb-6" onClick={() => navigate("/blog")}>
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s] ease-out"
                                >
                                    <source src="https://videos.pexels.com/video-files/2519660/2519660-hd_1920_1080_24fps.mp4" type="video/mp4" />
                                    <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80" alt="Travel" className="w-full h-full object-cover" />
                                </video>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                <div className="absolute bottom-6 left-0 right-0 text-center">
                                    <p className="text-white/80 text-[10px] font-medium tracking-[0.3em] uppercase mb-1">Cinematic</p>
                                    <h2 className="text-3xl font-serif font-bold text-white tracking-widest drop-shadow-lg">JOURNEY</h2>
                                </div>
                            </div>

                            <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
                                <div className="relative rounded-[2rem] overflow-hidden group shadow-lg bg-white dark:bg-card border border-border/40 cursor-pointer flex flex-col" onClick={() => navigate("/blog")}>
                                    <div className="h-[65%] overflow-hidden relative">
                                        <img src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2070&auto=format&fit=crop" alt="Nature" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">New</div>
                                    </div>
                                    <div className="flex-1 p-4 flex flex-col items-center justify-center text-center">
                                        <h4 className="text-lg font-bold text-foreground">Wilderness</h4>
                                        <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2">Untamed landscapes.</p>
                                        <div className="mt-2 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors"><ArrowRight className="w-4 h-4" /></div>
                                    </div>
                                </div>
                                <div className="relative rounded-[2rem] overflow-hidden group shadow-lg bg-white dark:bg-card border border-border/40 cursor-pointer flex flex-col" onClick={() => navigate("/blog")}>
                                    <div className="h-[65%] overflow-hidden relative">
                                        <img src="https://images.unsplash.com/photo-1540331547168-8b63109225b7?q=80&w=1919&auto=format&fit=crop" alt="Urban" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md border border-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">2026</div>
                                    </div>
                                    <div className="flex-1 p-4 flex flex-col items-center justify-center text-center">
                                        <h4 className="text-lg font-bold text-foreground">Urban Pulse</h4>
                                        <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2">Cities that never sleep.</p>
                                        <div className="mt-2 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors"><ArrowRight className="w-4 h-4" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Modal */}
                <PaymentModal
                    isOpen={showPaymentModal}
                    onClose={() => setShowPaymentModal(false)}
                    onPaymentComplete={handlePaymentComplete}
                    amount={pendingBookingData?.totalPrice || 0}
                />
            </section>
        </div>
    );
};

export default AISearch;
