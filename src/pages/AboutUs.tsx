import { useState, useEffect } from "react";
import Footer from "@/components/hotel/Footer";
import { cn } from "@/lib/utils";

const SECTIONS = [
    { id: "about", title: "About GetmyHotel" },
    { id: "accommodations", title: "1. Accommodations" },
    { id: "attractions", title: "2. Attractions" },
    { id: "car-rentals", title: "3. Car Rentals" },
    { id: "flights", title: "4. Flights" },
    { id: "transport", title: "5. Transport" },
];

const AboutUs = () => {
    const [activeSection, setActiveSection] = useState("about");

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100; // Sticky header offset
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            setActiveSection(id);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;

            for (const section of SECTIONS) {
                const element = document.getElementById(section.id);
                if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
                    setActiveSection(section.id);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Header */}
            <section className="bg-muted/30 pt-32 pb-16 px-4 border-b border-border">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">About Us</h1>
                    <p className="text-muted-foreground text-lg">Updated September 2025</p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12">

                {/* Sticky Sidebar Navigation */}
                <aside className="lg:w-1/4 hidden lg:block">
                    <div className="sticky top-32 space-y-1">
                        <p className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4 px-3">Contents</p>
                        {SECTIONS.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={cn(
                                    "block w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200",
                                    activeSection === section.id
                                        ? "bg-primary/10 text-primary font-medium"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                )}
                            >
                                {section.title}
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Main Content */}
                <div className="lg:w-3/4 space-y-20">

                    {/* Intro Section */}
                    <section id="about" className="space-y-8 animate-fade-in">
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <h3>About GetmyHotel.com</h3>
                            <p>GetmyHotel.com is a leading travel platform that helps you discover and book accommodations, attractions, car rentals, flights, and transport services worldwide.</p>

                            <h3>How We Work</h3>
                            <p>Our platform connects travelers with service providers, offering a seamless booking experience with competitive prices and comprehensive information.</p>

                            <h3>Our Values</h3>
                            <p>We are committed to transparency, customer satisfaction, and providing reliable travel services that meet your needs and expectations.</p>
                        </div>
                    </section>

                    {/* 1. Accommodations */}
                    <section id="accommodations" className="space-y-8 animate-fade-in">
                        <h2 className="text-3xl font-serif font-bold pt-4 border-t border-border">1. Accommodations</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert space-y-8">
                            <div>
                                <h4>1A. Definitions and About Us</h4>
                                <p>Some terms used here have specific meanings, which you can find in our GetmyHotel.com dictionary included in the Terms of Service.</p>
                                <p>When you book an accommodation, GetmyHotel.com provides and operates the booking platform, but we are not the provider of the travel experience itself (see section 1B). GetmyHotel.com is incorporated in India.</p>
                            </div>
                            <div>
                                <h4>1B. How Our Service Works</h4>
                                <p>Our platform makes it simple to compare options from hotels, property owners, and other service providers.</p>
                                <p>When you make a booking, you enter into a contract directly with the service provider (unless stated otherwise). The information displayed on our platform is provided by the service providers, and while we strive to keep it updated, there may be occasional delays in reflecting changes such as property descriptions or available amenities.</p>
                            </div>
                            <div>
                                <h4>1C. Who We Work With</h4>
                                <p>Only service providers who have a contractual agreement with us are shown on our platform. They may also offer their services independently outside our platform.</p>
                                <p>We do not own any accommodations ourselves; each provider is a separate entity that partners with us to display their offerings worldwide. Our search results help you find accommodations that match your preferences.</p>
                            </div>
                            <div>
                                <h4>1D. How We Make Money</h4>
                                <p>We do not buy or resell accommodations. After your stay, the service provider pays us a commission. Properties in our Preferred Partner Program pay a higher commission, which may be indicated by a badge.</p>
                                <p>If an accommodation listing shows a badge labeled 'Ad', it means the service provider has paid for a prominent placement in search results.</p>
                            </div>
                            <div>
                                <h4>1E. Recommendation Systems</h4>
                                <p>Our platform uses recommendation systems to help you discover accommodations you may like. Examples include trending destinations, homes guests love, and suggested stays.</p>
                                <p>We rank results based on click-through rates, bookings, and availability. You can filter by price, rating, reviews, and more.</p>
                            </div>
                            <div>
                                <h4>1F. Reviews</h4>
                                <p>Review scores range from 1–10. We check for fake reviews and allow guests to rate location, cleanliness, staff, and more.</p>
                            </div>
                            <div>
                                <h4>1G. Prices</h4>
                                <p>Rates are set by service providers. Taxes and fees may vary. Detailed pricing is provided during booking.</p>
                            </div>
                            <div>
                                <h4>1H. Payments</h4>
                                <p>You can pay at the accommodation, prepay via us, or prepay directly to the provider. Cancellation policies apply.</p>
                            </div>
                            <div>
                                <h4>1L. Overbooking</h4>
                                <p>If a confirmed booking is overbooked, the provider must find a solution or offer a full refund. We can assist in finding alternatives.</p>
                            </div>
                        </div>
                    </section>

                    {/* 2. Attractions */}
                    <section id="attractions" className="space-y-8 animate-fade-in">
                        <h2 className="text-3xl font-serif font-bold pt-4 border-t border-border">2. Attractions</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert space-y-8">
                            <p>When you book an attraction, GetmyHotel.com provides the platform but does not deliver the travel experience itself. You enter a contract with the service provider or a third-party aggregator.</p>
                            <p>We earn a commission when you book. 'Ad' labels indicate paid placements.</p>
                            <p>Reviews are ranked by relevance. Prices include all applicable extras and taxes.</p>
                            <p>If issues arise, contact us via your booking or our Help Centre.</p>
                        </div>
                    </section>

                    {/* 3. Car Rentals */}
                    <section id="car-rentals" className="space-y-8 animate-fade-in">
                        <h2 className="text-3xl font-serif font-bold pt-4 border-t border-border">3. Car Rentals</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert space-y-8">
                            <p>Compare bookings from multiple car rental companies. You enter a contract with the rental company at pickup.</p>
                            <p>We rank cars based on price, ratings, and availability. Sorting options include Price, Top Reviewed, and Genius discounts.</p>
                            <p>GetmyHotel.com organizes your payment. Contact us for any issues during your rental.</p>
                        </div>
                    </section>

                    {/* 4. Flights */}
                    <section id="flights" className="space-y-8 animate-fade-in">
                        <h2 className="text-3xl font-serif font-bold pt-4 border-t border-border">4. Flights</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert space-y-8">
                            <p>GetmyHotel.com B.V. provides the platform but does not operate the flight. We partner with third-party aggregators and flight providers.</p>
                            <p>We earn a commission on bookings/extras. Search results are sorted by Best, Cheapest, or Fastest.</p>
                            <p>Prices are set by providers. We may organize payment or the aggregator might.</p>
                        </div>
                    </section>

                    {/* 5. Transport */}
                    <section id="transport" className="space-y-8 animate-fade-in">
                        <h2 className="text-3xl font-serif font-bold pt-4 border-t border-border">5. Private & Public Transport</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert space-y-8">
                            <p>GetmyHotel.com Transport Limited helps you compare ground transport options. We do not own or operate vehicles.</p>
                            <p>Options are ranked by price, convenience, and provider performance.</p>
                            <p>Prices include the base rate plus commission. Booking payments are organized by GetmyHotel.com.</p>
                        </div>
                    </section>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AboutUs;
