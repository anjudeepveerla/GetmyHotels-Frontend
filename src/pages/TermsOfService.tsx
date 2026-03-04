import { useState, useEffect } from "react";
import Footer from "@/components/hotel/Footer";
import { cn } from "@/lib/utils";

const SECTIONS = [
    { id: "intro", title: "Introduction" },
    { id: "general", title: "A. General Terms" },
    { id: "accommodations", title: "B. Accommodations" },
    { id: "attractions", title: "C. Attractions" },
    { id: "car-rentals", title: "D. Car Rentals" },
    { id: "flights", title: "E. Flights" },
    { id: "transport", title: "F. Transport" },
];

const TermsOfService = () => {
    const [activeSection, setActiveSection] = useState("intro");

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
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
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Terms of Service</h1>
                    <p className="text-muted-foreground text-lg">Updated September 2025</p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12">

                {/* Sticky Sidebar Navigation */}
                <aside className="lg:w-1/4 hidden lg:block">
                    <div className="sticky top-32 space-y-1">
                        <p className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4 px-3">Table of Contents</p>
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

                    {/* Introduction */}
                    <section id="intro" className="space-y-8 animate-fade-in">
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <h3>Contractual Documents</h3>
                            <p>When you use GetmyHotel.com, your contract with us includes "How We Work" and "Content Standards and Guidelines". By accepting our Terms, you agree to these documents. If you do not agree, please do not use our platform.</p>

                            <h3>Why This Matters</h3>
                            <p>Together with your booking confirmation, these form the legal terms under which Service Providers offer travel experiences. For issues, refer to Section A16 or our Content Standards.</p>
                        </div>
                    </section>

                    {/* A. General Terms */}
                    <section id="general" className="space-y-8 animate-fade-in">
                        <h2 className="text-3xl font-serif font-bold pt-4 border-t border-border">A. General Terms for All Travel Experiences</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert space-y-4">
                            <div>
                                <h4>A1. Definitions</h4>
                                <p>Words have specific meanings found in the GetmyHotel.com Dictionary.</p>
                            </div>
                            <div>
                                <h4>A2. About These Terms</h4>
                                <p>By booking, you agree to these Terms. Specific terms (B-F) override general terms if there's a conflict.</p>
                            </div>
                            <div>
                                <h4>A3. About GetmyHotel.com</h4>
                                <p>We provide the platform. Service Providers deliver the actual experience. Local partners do not operate the platform or contract on our behalf.</p>
                            </div>
                            <div>
                                <h4>A4. Our Platform</h4>
                                <p>Information comes from Service Providers. We don't guarantee all details. You must be 18+ to use the platform.</p>
                            </div>
                            <div>
                                <h4>A5. Our Values</h4>
                                <p>Adhere to laws, avoid fraud, and treat providers respectfully.</p>
                            </div>
                            <div>
                                <h4>A7. Prices & A8. Payment</h4>
                                <p>Pay displayed prices including taxes. We may collect payment for the Provider. Upfront payments may be non-refundable.</p>
                            </div>
                            <div>
                                <h4>A9. Policies</h4>
                                <p>You agree to cancellation, age, and deposit policies shown during booking.</p>
                            </div>
                            <div>
                                <h4>A15. Intellectual Property</h4>
                                <p>All rights belong to us. No automated use (AI/scraping) without consent.</p>
                            </div>
                            <div>
                                <h4>A16. What If Something Goes Wrong?</h4>
                                <p>Contact Customer Service. Liability is limited to foreseeable losses.</p>
                            </div>
                        </div>
                    </section>

                    {/* B. Accommodations */}
                    <section id="accommodations" className="space-y-8 animate-fade-in">
                        <h2 className="text-3xl font-serif font-bold pt-4 border-t border-border">B. Accommodations</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert space-y-4">
                            <div>
                                <h4>B2. Contractual Relationship</h4>
                                <p>Your contract is directly with the Service Provider. We are not a party to it.</p>
                            </div>
                            <div>
                                <h4>B7. Price Match Guarantee</h4>
                                <p>We refund the difference if you find a lower price with identical conditions (exclusions apply).</p>
                            </div>
                            <div>
                                <h4>B11. Damage Policy</h4>
                                <p>Providers can request payment for damage within 14 days. We facilitate payment but don't cover fines or crimes.</p>
                            </div>
                        </div>
                    </section>

                    {/* C. Attractions */}
                    <section id="attractions" className="space-y-8 animate-fade-in">
                        <h2 className="text-3xl font-serif font-bold pt-4 border-t border-border">C. Attractions</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <p>See General Terms. You contract with the attraction provider.</p>
                        </div>
                    </section>

                    {/* D. Car Rentals */}
                    <section id="car-rentals" className="space-y-8 animate-fade-in">
                        <h2 className="text-3xl font-serif font-bold pt-4 border-t border-border">D. Car Rentals</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert space-y-4">
                            <p>Offered via GetmyHotel.com Transport Services. You have a booking contract with us and a rental agreement with the company.</p>
                            <p><strong>Responsibilities:</strong> Provide accurate info, eligible driver, and arrive on time.</p>
                            <p><strong>Cancellations:</strong> Full refund &gt;48h before pickup.</p>
                        </div>
                    </section>

                    {/* E. Flights */}
                    <section id="flights" className="space-y-8 animate-fade-in">
                        <h2 className="text-3xl font-serif font-bold pt-4 border-t border-border">E. Flights</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert space-y-4">
                            <p>Booked via aggregators. You have an intermediation contract and a contract of carriage with the airline.</p>
                            <p><strong>Rights:</strong> EU/UK passengers have rights for delays/cancellations.</p>
                        </div>
                    </section>

                    {/* F. Transport */}
                    <section id="transport" className="space-y-8 animate-fade-in">
                        <h2 className="text-3xl font-serif font-bold pt-4 border-t border-border">F. Private & Public Transport</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert space-y-4">
                            <p><strong>Private:</strong> Contract with provider. Free cancellation up to 24h before pickup.</p>
                            <p><strong>Public:</strong> Governed by provider terms. Generally non-refundable.</p>
                        </div>
                    </section>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TermsOfService;
