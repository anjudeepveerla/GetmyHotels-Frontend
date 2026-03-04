import { useState, useEffect } from "react";
import Footer from "@/components/hotel/Footer";
import { cn } from "@/lib/utils";

const SECTIONS = [
    { id: "intro", title: "About this Statement" },
    { id: "terms", title: "Terms Definition" },
    { id: "collection", title: "Personal Data Collection" },
    { id: "purposes", title: "Purposes of Processing" },
    { id: "legal-basis", title: "Legal Basis" },
    { id: "sharing-internal", title: "Sharing (Internal)" },
    { id: "sharing-external", title: "Sharing (Third Parties)" },
    { id: "markets", title: "Specific Markets" },
    { id: "protection", title: "Data Protection" },
    { id: "cookies", title: "Cookies" },
    { id: "ai", title: "AI & Automation" },
    { id: "minors", title: "Minors" },
    { id: "rights", title: "Your Rights" },
    { id: "company", title: "Our Company" }
];

const PrivacyPolicy = () => {
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
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Privacy Policy</h1>
                    <p className="text-muted-foreground text-lg">Updated September 2015</p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12">

                {/* Sticky Sidebar Navigation */}
                <aside className="lg:w-1/4 hidden lg:block">
                    <div className="sticky top-32 space-y-1 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
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

                    {/* About this privacy statement */}
                    <section id="intro" className="space-y-8 animate-fade-in">
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <h3>About this privacy statement</h3>
                            <p>GetmyHotel.com issues this Privacy Statement for the benefit of individuals who are using, or considering the use of, our products and services.</p>
                            <p>The protection of your privacy is of fundamental importance to GetmyHotel.com. By engaging with our services, you entrust us with your personal data, and we acknowledge and value that trust. Accordingly, we are committed to the lawful, fair, and secure collection, processing, and safeguarding of your personal data.</p>
                            <p>This Privacy Statement sets forth how GetmyHotel.com collects, uses, and otherwise processes personal data in connection with your use of our websites, mobile applications, and travel-related products and services. It also outlines your rights with respect to such data, as well as the methods by which you may contact us in relation to privacy matters.</p>
                            <p>GetmyHotel.com reserves the right to amend or update this Privacy Statement from time to time. Travelers are encouraged to review the Privacy Statement periodically to remain informed of any modifications. In the event of material changes likely to significantly affect Travelers, GetmyHotel.com shall take reasonable measures to notify the affected persons in advance of such changes taking effect.</p>
                        </div>
                    </section>

                    {/* Terms Definition */}
                    <section id="terms" className="space-y-8 animate-fade-in">
                        <h2 className="text-3xl font-serif font-bold pt-4 border-t border-border">Terms we may use</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <p>For the purposes of these Privacy Statements, GetmyHotel.com adopts and applies certain defined terms:</p>
                            <ul className="list-none space-y-4 pl-0">
                                <li><strong>GetmyHotel.com:</strong> References to “we,” “us,” or “our” refer collectively to GetmyHotel.com group entities and Booking Holdings Inc.</li>
                                <li><strong>GetmyHotel Holdings Inc. (GMH):</strong> The parent company of GetmyHotel.com is Booking Holdings Inc. (“BHI”), which also owns Agoda and Priceline.</li>
                                <li><strong>Platform:</strong> Websites, mobile applications, and other interfaces for travel-related services.</li>
                                <li><strong>Traveler:</strong> Any natural person using our products or services.</li>
                                <li><strong>Trip:</strong> Travel-related products or services procured from Trip Providers.</li>
                                <li><strong>Trip Provider:</strong> Third-party entities supplying accommodation, attractions, transportation, etc.</li>
                                <li><strong>Trip Service:</strong> Reservation and payment facilitation services provided by GetmyHotel.com.</li>
                                <li><strong>Trip Reservation:</strong> Any online reservation, order, purchase, or payment made in connection with a Trip.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Personal Data Collection */}
                    <section id="collection" className="space-y-8 animate-fade-in">
                        <h2 className="text-3xl font-serif font-bold pt-4 border-t border-border">Personal data we collect and process</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <h4>Personal data you give to us</h4>
                            <p>When you make a Trip Reservation, you provide your name, email, address, phone number, payment details, and potentially government ID for flights. We also collect data when you contact customer service or use personalized lists.</p>

                            <h4>Personal data you give us about others</h4>
                            <p>If you book for others, you provide their details. Business accounts can use address books.</p>

                            <h4>Personal data we collect automatically</h4>
                            <p>We collect IP address, device info, browser type, and app performance metrics whenever you access our platform.</p>

                            <h4>Personal data we receive from other sources</h4>
                            <p>We may receive data from within our ecosystem to improve services. Processing includes Reservation Activity, Customer Service Interactions, Communication Tools, Platform Analytics, Account Preferences, and Complaints.</p>
                        </div>
                    </section>

                    {/* Purposes of Processing */}
                    <section id="purposes" className="space-y-8 animate-fade-in">
                        <h2 className="text-3xl font-serif font-bold pt-4 border-t border-border">Purposes of Processing</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert space-y-4">
                            <p>GetmyHotel.com collects and processes personal data solely for the operation and improvement of our platform and services.</p>
                            <ul className="space-y-2">
                                <li><strong>A. Trip reservation:</strong> To complete and administer your online reservation.</li>
                                <li><strong>B. Customer Service:</strong> To provide 24/7 global support.</li>
                                <li><strong>C. User Accounts:</strong> To manage bookings, offers, and settings.</li>
                                <li><strong>D. Marketing Activities:</strong> Direct marketing, insurance offers, and promotions.</li>
                                <li><strong>E. Communications with you:</strong> Support, updates, administrative notices, and security alerts.</li>
                                <li><strong>F. Market Research:</strong> Voluntary participation in research.</li>
                                <li><strong>G. Improving Our Services:</strong> Analytics, machine learning, and testing to optimize the platform.</li>
                                <li><strong>H. Showing applicable pricing:</strong> Based on location (IP address).</li>
                                <li><strong>I. Customer reviews:</strong> To help other travelers make informed decisions.</li>
                                <li><strong>J. Call Monitoring:</strong> For quality assurance, training, and fraud prevention.</li>
                                <li><strong>K. Safety & Fraud Prevention:</strong> To detect and prevent illegal activities and protect users.</li>
                                <li><strong>L. Legal Purposes:</strong> To handling claims, regulatory inquiries, and compliance.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Legal Basis */}
                    <section id="legal-basis" className="space-y-8 animate-fade-in">
                        <h2 className="text-3xl font-serif font-bold pt-4 border-t border-border">Legal basis for processing</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <p>We process data based on contractual necessity (e.g., reservations), legitimate interests (e.g., fraud prevention, marketing), legal compliance, and consent (e.g., market research).</p>
                        </div>
                    </section>

                    {/* Sharing Internal */}
                    <section id="sharing-internal" className="space-y-8 animate-fade-in">
                        <h2 className="text-3xl font-serif font-bold pt-4 border-t border-border">Sharing within GetmyHotel.com</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <p>We share data within our corporate group (including Booking Holdings Inc.) for service delivery, technical operations, business operations, product development, and marketing. All entities adhere to this Privacy Statement.</p>
                        </div>
                    </section>

                    {/* Sharing External */}
                    <section id="sharing-external" className="space-y-8 animate-fade-in">
                        <h2 className="text-3xl font-serif font-bold pt-4 border-t border-border">Sharing with Third Parties</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <ul className="space-y-2">
                                <li><strong>Trip Providers:</strong> To complete your reservation.</li>
                                <li><strong>Payment Service Providers:</strong> To process payments securely.</li>
                                <li><strong>Customer Service Partners:</strong> To assist in support.</li>
                                <li><strong>Marketing Partners:</strong> For personalized advertising (with consent).</li>
                                <li><strong>Legal Authorities:</strong> When required by law.</li>
                                <li><strong>Business Transfers:</strong> In case of mergers or acquisitions.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Specific Markets */}
                    <section id="markets" className="space-y-8 animate-fade-in">
                        <h2 className="text-3xl font-serif font-bold pt-4 border-t border-border">Specific Markets & Products</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <p>Practices vary by region (EEA, US, etc.) and product (Flights requiring passports, Insurance requiring health info). International transfers are safeguarded by standard contractual clauses or adequacy decisions.</p>
                        </div>
                    </section>

                    {/* Data Protection */}
                    <section id="protection" className="space-y-8 animate-fade-in">
                        <h2 className="text-3xl font-serif font-bold pt-4 border-t border-border">How we protect your personal data</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <p><strong>Technical:</strong> Encryption, secure servers, firewalls.</p>
                            <p><strong>Organizational:</strong> Access controls, training, data minimization.</p>
                            <p>We retain data only as long as necessary for its purpose.</p>
                        </div>
                    </section>

                    {/* Cookies */}
                    <section id="cookies" className="space-y-8 animate-fade-in">
                        <h2 className="text-3xl font-serif font-bold pt-4 border-t border-border">Cookies & Tracking</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <p>We use essential, performance, functionality, and marketing cookies to enhance experience and analyze traffic. You can manage preferences through browser settings.</p>
                        </div>
                    </section>

                    {/* AI */}
                    <section id="ai" className="space-y-8 animate-fade-in">
                        <h2 className="text-3xl font-serif font-bold pt-4 border-t border-border">AI & Automated Decisions</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <p>We use AI for recommendations, dynamic pricing, fraud detection, and support. If automated decisions significantly affect you, you have the right to request human review.</p>
                        </div>
                    </section>

                    {/* Minors */}
                    <section id="minors" className="space-y-8 animate-fade-in">
                        <h2 className="text-3xl font-serif font-bold pt-4 border-t border-border">Minors</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <p>Services are for 18+. Minors must be included by an adult. We limit collection and implement special protections for minors' data.</p>
                        </div>
                    </section>

                    {/* Rights */}
                    <section id="rights" className="space-y-8 animate-fade-in">
                        <h2 className="text-3xl font-serif font-bold pt-4 border-t border-border">Your Rights</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <ul className="space-y-2">
                                <li><strong>Access & Portability:</strong> Request copies of your data.</li>
                                <li><strong>Correction & Deletion:</strong> Fix or erase data.</li>
                                <li><strong>Control:</strong> Restrict or object to processing.</li>
                                <li><strong>Automated Decision-Making:</strong> Request human review.</li>
                            </ul>
                            <p>To exercise rights, contact customer service or check your account settings.</p>
                        </div>
                    </section>

                    {/* Company */}
                    <section id="company" className="space-y-8 animate-fade-in">
                        <h2 className="text-3xl font-serif font-bold pt-4 border-t border-border">Our Company</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <p>GetmyHotel.com is part of Booking Holdings Inc. We comply with GDPR, CCPA, and other global laws. We maintain a privacy governance program and may update this statement periodically.</p>
                        </div>
                    </section>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
