import { useState, useEffect, useRef } from "react";
import { Sparkles, Send, History, RotateCcw, ArrowRight, Mic } from "lucide-react";
import Navbar from "@/components/hotel/Navbar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Message {
    id: string;
    sender: "user" | "ai";
    text?: string;
    type: "text" | "hotel-list" | "booking-form" | "payment-request";
    data?: any;
    timestamp: string;
}

const AISearch = () => {
    const navigate = useNavigate();
    const [hasStarted, setHasStarted] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSendMessage = (text: string = inputText) => {
        if (!text.trim()) return;

        if (!hasStarted) setHasStarted(true);

        const newUserMessage: Message = {
            id: Date.now().toString(),
            sender: "user",
            text: text,
            type: "text",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setInputText("");
        setIsTyping(true);

        // Simulate AI Logic Flow
        setTimeout(() => {
            const newAiMessage: Message = {
                id: (Date.now() + 1).toString(),
                sender: "ai",
                text: "I've found some amazing options for you. Checking availability...",
                type: "text",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages((prev) => [...prev, newAiMessage]);

            // Trigger Hotel Cards after a short delay
            setTimeout(() => {
                const hotelListMessage: Message = {
                    id: (Date.now() + 2).toString(),
                    sender: "ai",
                    type: "hotel-list",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMessages((prev) => [...prev, hotelListMessage]);
                setIsTyping(false);
            }, 1000);

        }, 1500);
    };

    const handleBookHotel = (hotelName: string) => {
        setIsTyping(true);
        setTimeout(() => {
            const formMessage: Message = {
                id: Date.now().toString(),
                sender: "ai",
                type: "booking-form",
                data: { hotelName },
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages((prev) => [...prev, formMessage]);
            setIsTyping(false);
        }, 1000);
    };

    const handleFormSubmit = (details: any) => {
        setIsTyping(true);
        setTimeout(() => {
            const paymentMessage: Message = {
                id: Date.now().toString(),
                sender: "ai",
                type: "payment-request",
                data: details,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages((prev) => [...prev, paymentMessage]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden font-sans text-foreground">
            <Navbar />

            <section className="relative w-full pt-28 pb-12 lg:pt-36 lg:pb-20 overflow-hidden h-screen max-h-screen flex flex-col">
                <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 h-full">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 h-full">

                        {/* LEFT SECTION: Chat Experience */}
                        <div className="w-full lg:w-[50%] flex flex-col relative h-full">

                            {/* Chat Content Area */}
                            <div ref={scrollRef} className="flex-1 overflow-y-auto pr-4 scrollbar-hide space-y-6 pb-32 h-full flex flex-col">
                                {!hasStarted ? (
                                    /* INITIAL STATE: Welcome & Chips */
                                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-fade-in my-auto">
                                        <div className="space-y-4 max-w-lg mx-auto">
                                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Good afternoon</h2>
                                            <p className="text-lg text-muted-foreground leading-relaxed">
                                                Find your perfect hotel, plan a trip, or get travel support just by texting.
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap items-center justify-center gap-3 max-w-xl mx-auto">
                                            {["Explore Destinations", "Trending Trips", "Trip Ideas for Me", "Travel Tips", "Get Support"].map((label) => (
                                                <button
                                                    key={label}
                                                    onClick={() => handleChipClick(label)}
                                                    className="flex items-center gap-2 px-5 py-2.5 bg-card border border-border/50 rounded-full shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 group"
                                                >
                                                    <span className="text-lg">✨</span>
                                                    <span className="font-medium text-foreground">{label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    /* ACTIVE STATE: Chat History */
                                    <>
                                        {messages.map((msg) => (
                                            <div
                                                key={msg.id}
                                                className={cn(
                                                    "flex flex-col max-w-[90%] lg:max-w-[95%] animate-scale-in",
                                                    msg.sender === "user" ? "items-end ml-auto" : "items-start"
                                                )}
                                            >
                                                <div className="flex items-start gap-3">
                                                    {msg.sender === "ai" && (
                                                        <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-lg mt-1">
                                                            <Sparkles className="w-4 h-4" />
                                                        </div>
                                                    )}

                                                    {/* MESSAGE CONTENT SWITCHER */}
                                                    <div className="flex-1">

                                                        {/* 1. TEXT MESSAGE */}
                                                        {msg.type === "text" && (
                                                            <div
                                                                className={cn(
                                                                    "p-5 rounded-3xl text-sm leading-relaxed shadow-sm transition-all hover:shadow-md backdrop-blur-2xl max-w-prose",
                                                                    msg.sender === "user"
                                                                        ? "bg-white/90 backdrop-blur-3xl text-[#1d1d1f] rounded-[1.8rem] rounded-br-[6px] shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-white/50 ring-1 ring-black/5"
                                                                        : "bg-card border border-white/20 text-card-foreground rounded-[1.5rem] rounded-tl-[4px] shadow-black/5"
                                                                )}
                                                            >
                                                                {msg.text}
                                                            </div>
                                                        )}

                                                        {/* 2. HOTEL LIST CARDS */}
                                                        {msg.type === "hotel-list" && (
                                                            <div className="flex gap-4 overflow-x-auto pb-4 pt-2 w-full max-w-[calc(100vw-2rem)] lg:max-w-md scrollbar-hide snap-x">
                                                                {[
                                                                    { name: "The Oberoi Udaivilas", loc: "Udaipur", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070", price: "₹28,000" },
                                                                    { name: "Taj Lake Palace", loc: "Udaipur", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070", price: "₹35,000" },
                                                                    { name: "Leela Palace", loc: "Udaipur", img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070", price: "₹30,000" }
                                                                ].map((hotel, i) => (
                                                                    <div key={i} className="min-w-[260px] bg-white dark:bg-card rounded-[2rem] overflow-hidden border border-border/50 shadow-lg snap-center group">
                                                                        <div className="h-40 overflow-hidden relative">
                                                                            <img src={hotel.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={hotel.name} />
                                                                            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full text-[10px] text-white font-bold">{hotel.price}</div>
                                                                        </div>
                                                                        <div className="p-4">
                                                                            <h4 className="font-bold text-foreground truncate">{hotel.name}</h4>
                                                                            <p className="text-xs text-muted-foreground mb-4">{hotel.loc}</p>
                                                                            <Button onClick={() => handleBookHotel(hotel.name)} className="w-full rounded-xl bg-primary text-white hover:bg-primary/90">Book Now</Button>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}

                                                        {/* 3. BOOKING FORM */}
                                                        {msg.type === "booking-form" && (
                                                            <div className="bg-white/80 dark:bg-card/80 backdrop-blur-xl p-6 rounded-[2rem] border border-white/20 shadow-xl w-full max-w-sm">
                                                                <h4 className="font-bold text-lg mb-4">Confirm Details for {msg.data?.hotelName}</h4>
                                                                <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); handleFormSubmit({ hotel: msg.data?.hotelName, amount: "28000" }); }}>
                                                                    <input required placeholder="Full Name" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/20 border border-border/50 focus:ring-1 focus:ring-primary outline-none" />
                                                                    <input required type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/20 border border-border/50 focus:ring-1 focus:ring-primary outline-none" />
                                                                    <input required type="tel" placeholder="Mobile Number" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/20 border border-border/50 focus:ring-1 focus:ring-primary outline-none" />
                                                                    <Button type="submit" className="w-full rounded-xl mt-2 h-12 text-md">Proceed to Payment</Button>
                                                                </form>
                                                            </div>
                                                        )}

                                                        {/* 4. PAYMENT REQUEST */}
                                                        {msg.type === "payment-request" && (
                                                            <div className="bg-gradient-to-br from-[#1d1d1f] to-[#2c2c2e] p-6 rounded-[2rem] text-white shadow-2xl w-full max-w-sm relative overflow-hidden">
                                                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10" />
                                                                <div className="relative z-10">
                                                                    <div className="flex justify-between items-center mb-6">
                                                                        <span className="text-white/60 text-sm">Total Amount</span>
                                                                        <span className="text-2xl font-bold">₹28,000</span>
                                                                    </div>
                                                                    <div className="space-y-4 mb-6">
                                                                        <div className="flex justify-between text-sm border-b border-white/10 pb-2"><span>Hotel</span> <span className="font-medium">{msg.data?.hotel}</span></div>
                                                                        <div className="flex justify-between text-sm border-b border-white/10 pb-2"><span>Tax</span> <span className="font-medium">Included</span></div>
                                                                    </div>
                                                                    <Button onClick={() => window.open('https://razorpay.com/demo', '_blank')} className="w-full bg-white text-black hover:bg-white/90 h-12 rounded-xl font-bold flex items-center justify-center gap-2">
                                                                        Pay Now <ArrowRight className="w-4 h-4" />
                                                                    </Button>
                                                                    <p className="text-[10px] text-center mt-3 text-white/40">Secure Payment Gateway</p>
                                                                </div>
                                                            </div>
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
                            <div className="absolute bottom-6 left-0 right-0 px-4 animate-slide-up stagger-2">
                                <div className="relative bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-full p-2 flex items-center gap-2 transition-all">
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
                        <div className="w-full lg:w-[50%] h-full flex flex-col justify-center animate-slide-up stagger-3 overflow-y-auto pb-20 scrollbar-hide px-1 perspective-1000 pt-12">



                            {/* 1. Top Horizontal Video Card (Fixed Height ~45%) */}
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
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-150 group-hover:scale-100">
                                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                                </div>
                            </div>

                            {/* 2. Bottom Section (2 Vertical Cards) - Flex-1 */}
                            <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
                                {/* Card 1: Blog */}
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
                                {/* Card 2: Urban */}
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
            </section>
        </div>
    );
};

export default AISearch;
