
import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "@/components/hotel/Navbar";
import Footer from "@/components/hotel/Footer";

const FAQs = () => {
    const faqCategories = [
        {
            title: "Booking & Reservations",
            items: [
                {
                    question: "How do I make a reservation?",
                    answer: "You can make a reservation directly through our website by searching for your desired destination and dates. Once you find a hotel you like, simply click 'Book Now' and follow the instructions."
                },
                {
                    question: "Can I cancel my booking?",
                    answer: "Yes, you can cancel your booking depending on the cancellation policy of the specific hotel. You can view the cancellation policy on the booking details page or in your confirmation email."
                },
                {
                    question: "Do I need to pay a deposit?",
                    answer: "Some hotels require a deposit to secure your booking, while others allow you to pay upon arrival. This information will be clearly displayed during the booking process."
                }
            ]
        },
        {
            title: "Account & Payments",
            items: [
                {
                    question: "What payment methods do you accept?",
                    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay."
                },
                {
                    question: "How can I update my account information?",
                    answer: "You can update your personal details, including your email and password, by logging into your account and visiting the 'My Account' section."
                },
                {
                    question: "Is my payment information secure?",
                    answer: "Yes, we use industry-standard encryption to protect your payment information. We do not store your credit card details on our servers."
                }
            ]
        },
        {
            title: "General Inquiries",
            items: [
                {
                    question: "Do you offer customer support?",
                    answer: "Yes, our customer support team is available 24/7 to assist you. You can contact us via email, phone, or live chat."
                },
                {
                    question: "Where can I find your terms and conditions?",
                    answer: "You can find our full Terms of Service and Privacy Policy linked in the footer of every page on our website."
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-background font-sans text-foreground">
            <Navbar />

            <main className="pt-24 pb-16 px-4 md:px-8">
                <div className="container mx-auto max-w-4xl">
                    <div
                        className="text-center mb-12 animate-in fade-in slide-in-from-bottom-5 duration-500"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Find answers to common questions about our services and policies.
                        </p>
                    </div>

                    {faqCategories.map((category, index) => (
                        <div
                            key={index}
                            className={`mb - 10 animate -in fade -in slide -in -from - bottom - 5 duration - 500 fill - mode - backwards`}
                            style={{ animationDelay: `${(index * 100) + 200} ms` }}
                        >
                            <h2 className="text-2xl font-semibold mb-6 pb-2 border-b">{category.title}</h2>
                            <Accordion type="single" collapsible className="w-full">
                                {category.items.map((item, i) => (
                                    <AccordionItem key={i} value={`item - ${index} -${i} `}>
                                        <AccordionTrigger className="text-lg text-left hover:text-primary transition-colors">
                                            {item.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground leading-relaxed">
                                            {item.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    ))}

                    <div className="mt-12 text-center">
                        <p className="text-muted-foreground">
                            Still have questions?{" "}
                            <a href="/contact-us" className="text-primary hover:underline font-medium">
                                Contact Support
                            </a>
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default FAQs;
