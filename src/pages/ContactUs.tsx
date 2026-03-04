
import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/hotel/Navbar";
import Footer from "@/components/hotel/Footer";

const ContactUs = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logic to handle form submission (e.g., API call or toast)
        console.log("Form submitted");
    };

    return (
        <div className="min-h-screen bg-background flex flex-col font-sans text-foreground">
            <Navbar />

            <main className="flex-grow pt-24 pb-16 px-4 md:px-8">
                <div className="container mx-auto max-w-6xl">
                    <div
                        className="text-center mb-12 animate-in fade-in slide-in-from-bottom-5 duration-500"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                            Get in Touch
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            We'd love to hear from you. Whether you have a question about a booking, need assistance, or just want to say hello, our team is here to help.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Contact Information & Map Placeholder */}
                        <div
                            className="space-y-8 animate-in fade-in slide-in-from-left-5 duration-500 delay-200 fill-mode-backwards"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="hover:shadow-lg transition-shadow duration-300 border-primary/10">
                                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                                        <div className="bg-primary/10 p-4 rounded-full text-primary">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">Phone</h3>
                                            <p className="text-muted-foreground">+1 (555) 123-4567</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="hover:shadow-lg transition-shadow duration-300 border-primary/10">
                                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                                        <div className="bg-primary/10 p-4 rounded-full text-primary">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">Email</h3>
                                            <p className="text-muted-foreground">support@mylifestyle.com</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <Card className="hover:shadow-lg transition-shadow duration-300 border-primary/10">
                                <CardContent className="p-6 flex items-start space-x-4">
                                    <div className="bg-primary/10 p-3 rounded-full text-primary mt-1">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Our Office</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            123 Luxury Lane, Suite 100<br />
                                            Beverly Hills, CA 90210<br />
                                            United States
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Map Integration (Placeholder for now) */}
                            <div className="w-full h-64 bg-muted rounded-xl overflow-hidden relative group">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105913.68267232306!2d-118.47547006856002!3d34.07221650378625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d147ab%3A0xd6c7c379fd081ed1!2sBeverly%20Hills%2C%20CA!5e0!3m2!1sen!2sus!4v1706198000000!5m2!1sen!2sus"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={false}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Office Location"
                                    className="grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            </div>

                        </div>

                        {/* Contact Form */}
                        <div
                            className="animate-in fade-in slide-in-from-right-5 duration-500 delay-300 fill-mode-backwards"
                        >
                            <Card className="shadow-2xl border-primary/5 w-full">
                                <CardContent className="p-8">
                                    <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label htmlFor="name" className="text-sm font-medium ml-1">Name</label>
                                                <Input id="name" placeholder="John Doe" required className="bg-muted/30" />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="email" className="text-sm font-medium ml-1">Email</label>
                                                <Input id="email" type="email" placeholder="john@example.com" required className="bg-muted/30" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="subject" className="text-sm font-medium ml-1">Subject</label>
                                            <Input id="subject" placeholder="Booking Inquiry" required className="bg-muted/30" />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="message" className="text-sm font-medium ml-1">Message</label>
                                            <Textarea
                                                id="message"
                                                placeholder="How can we help you today?"
                                                required
                                                className="min-h-[150px] bg-muted/30 resize-none"
                                            />
                                        </div>

                                        <Button type="submit" size="lg" className="w-full text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                                            <Send className="w-4 h-4 mr-2" /> Send Message
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ContactUs;
