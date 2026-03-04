import { useState, useEffect } from "react";
import Navbar from "@/components/hotel/Navbar";
import Footer from "@/components/hotel/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CreditCard, Heart, Lock, Luggage, User, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const MyAccount = () => {
    const { user, isAuthenticated, login } = useAuth(); // Assuming login or a new updateProfile method exists, or we just mock local state for now
    const navigate = useNavigate();

    // Auth Check
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/signin");
        }
    }, [isAuthenticated, navigate]);

    // Profile State
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");

    // Reservations State
    const [activeFilter, setActiveFilter] = useState<"upcoming" | "past" | "cancelled">("upcoming");
    const [reservations, setReservations] = useState({
        upcoming: [
            {
                id: 1,
                hotel: "Grand Hyatt Mumbai",
                location: "Mumbai, India",
                checkIn: "12 Feb 2026",
                checkOut: "15 Feb 2026",
                status: "CONFIRMED",
                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80",
                isCancelled: false
            }
        ],
        past: [
            {
                id: 2,
                hotel: "Taj Lake Palace",
                location: "Udaipur, India",
                checkIn: "10 Jan 2025",
                checkOut: "15 Jan 2025",
                status: "COMPLETED",
                image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80",
                isCancelled: false
            },
            {
                id: 3,
                hotel: "Ritz Paris",
                location: "Paris, France",
                checkIn: "24 Dec 2025",
                checkOut: "01 Jan 2026",
                status: "COMPLETED",
                image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80",
                isCancelled: false
            }
        ],
        cancelled: [
            {
                id: 4,
                hotel: "Burj Al Arab",
                location: "Dubai, UAE",
                checkIn: "05 Mar 2026",
                checkOut: "10 Mar 2026",
                status: "CANCELLED",
                image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80",
                isCancelled: true
            }
        ]
    });

    if (!user) return null;

    const handleSaveProfile = () => {
        // In a real app, this would call an API
        // For now, update local storage / context if possible, or just mock success
        // login(email, name); // This might be a hack if login is the only way to update user
        toast.success("Profile updated successfully!");
    };

    const handleChangePassword = () => {
        toast.success("Password changed successfully!");
    };

    const handleCancelReservation = (id: number) => {
        // Find the reservation in upcoming
        const reservationToCancel = reservations.upcoming.find(r => r.id === id);

        if (reservationToCancel) {
            const updatedReservation = { ...reservationToCancel, status: "CANCELLED", isCancelled: true };

            setReservations(prev => ({
                ...prev,
                upcoming: prev.upcoming.filter(r => r.id !== id),
                cancelled: [updatedReservation, ...prev.cancelled]
            }));

            toast.success("Reservation cancelled successfully.");
        }
    };

    const currentReservations = reservations[activeFilter];
    const hasReservations = currentReservations.length > 0;

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <div className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-serif font-bold">Hello, {name}</h1>
                        <p className="text-muted-foreground">{email}</p>
                    </div>
                </div>

                <Tabs defaultValue="reservations" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto rounded-xl bg-muted/50 p-1 mb-8">
                        <TabsTrigger value="reservations" className="py-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                            <Luggage className="mr-2 h-4 w-4" /> My Reservations
                        </TabsTrigger>
                        <TabsTrigger value="favorites" className="py-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                            <Heart className="mr-2 h-4 w-4" /> Favorites
                        </TabsTrigger>
                        <TabsTrigger value="profile" className="py-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                            <User className="mr-2 h-4 w-4" /> Account Info
                        </TabsTrigger>
                        <TabsTrigger value="security" className="py-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                            <Lock className="mr-2 h-4 w-4" /> Security
                        </TabsTrigger>
                    </TabsList>

                    {/* Reservations */}
                    <TabsContent value="reservations" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div
                                onClick={() => setActiveFilter("upcoming")}
                                className={`bg-card border p-4 rounded-xl cursor-pointer transition-all hover:shadow-md ${activeFilter === "upcoming" ? "ring-2 ring-primary border-transparent" : "hover:border-primary/50"}`}
                            >
                                <h3 className="text-muted-foreground text-sm font-medium">Upcoming Trips</h3>
                                <p className="text-2xl font-bold">{reservations.upcoming.length}</p>
                            </div>
                            <div
                                onClick={() => setActiveFilter("past")}
                                className={`bg-card border p-4 rounded-xl cursor-pointer transition-all hover:shadow-md ${activeFilter === "past" ? "ring-2 ring-primary border-transparent" : "hover:border-primary/50"}`}
                            >
                                <h3 className="text-muted-foreground text-sm font-medium">Past Trips</h3>
                                <p className="text-2xl font-bold">{reservations.past.length}</p>
                            </div>
                            <div
                                onClick={() => setActiveFilter("cancelled")}
                                className={`bg-card border p-4 rounded-xl cursor-pointer transition-all hover:shadow-md ${activeFilter === "cancelled" ? "ring-2 ring-primary border-transparent" : "hover:border-primary/50"}`}
                            >
                                <h3 className="text-muted-foreground text-sm font-medium">Cancelled</h3>
                                <p className="text-2xl font-bold">{reservations.cancelled.length}</p>
                            </div>
                        </div>

                        <div className="space-y-4 animate-in fade-in duration-500">
                            <h3 className="text-xl font-semibold capitalize bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 w-fit">
                                {activeFilter} Reservations
                            </h3>

                            {hasReservations ? (
                                currentReservations.map((booking) => (
                                    <div key={booking.id} className="bg-card border rounded-xl overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-md transition-shadow">
                                        <div className="h-48 md:h-auto w-full md:w-1/3 bg-muted relative">
                                            <img src={booking.image} alt={booking.hotel} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h4 className="text-lg font-bold">{booking.hotel}</h4>
                                                        <div className="flex items-center text-muted-foreground text-sm mt-1">
                                                            <MapPin className="h-3 w-3 mr-1" /> {booking.location}
                                                        </div>
                                                    </div>
                                                    <span className={`text-xs font-semibold px-2 py-1 rounded ${booking.status === 'CONFIRMED' ? 'bg-primary/10 text-primary' :
                                                        booking.status === 'CANCELLED' ? 'bg-destructive/10 text-destructive' :
                                                            'bg-muted text-muted-foreground'
                                                        }`}>
                                                        {booking.status}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 mt-4 text-sm">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                                        <span>Check-in: <strong>{booking.checkIn}</strong></span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                                        <span>Check-out: <strong>{booking.checkOut}</strong></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-3 mt-6">
                                                <Button variant="outline" className="flex-1">View Details</Button>
                                                {!booking.isCancelled && booking.status !== 'COMPLETED' && (
                                                    <Button
                                                        variant="destructive"
                                                        className="flex-1 bg-destructive/10 text-destructive hover:bg-destructive/20 border-0"
                                                        onClick={() => handleCancelReservation(booking.id)}
                                                    >
                                                        Cancel Booking
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 border-2 border-dashed rounded-xl border-muted">
                                    <Luggage className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-lg font-medium">No {activeFilter} reservations</h3>
                                    <p className="text-muted-foreground text-sm mt-1">You don't have any bookings in this category yet.</p>
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    {/* Favorites */}
                    <TabsContent value="favorites">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="bg-card border rounded-xl overflow-hidden group hover:shadow-lg transition-all">
                                    <div className="h-48 relative">
                                        <img src={`https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=${500 + item}`} alt="Hotel" className="w-full h-full object-cover" />
                                        <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-red-500 hover:scale-110 transition-transform">
                                            <Heart className="h-4 w-4 fill-current" />
                                        </button>
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-bold">Luxury Villa Retreat</h4>
                                        <p className="text-sm text-muted-foreground mt-1">Maldives</p>
                                        <div className="mt-4 flex justify-between items-center">
                                            <span className="font-semibold">$450 <span className="text-xs font-normal text-muted-foreground">/ night</span></span>
                                            <Button size="sm" variant="secondary">View</Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Profile */}
                    <TabsContent value="profile" className="max-w-2xl">
                        <div className="bg-card border rounded-xl p-6 space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold mb-1">Personal Information</h3>
                                <p className="text-sm text-muted-foreground">Update your personal details here.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Full Name</label>
                                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Email Address</label>
                                        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Phone Number</label>
                                    <Input defaultValue="+1 (555) 123-4567" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Address</label>
                                    <Input defaultValue="" placeholder="e.g. 123 Main St, New York, NY" />
                                </div>
                            </div>
                            <Button onClick={handleSaveProfile} className="w-full md:w-auto">Save Changes</Button>
                        </div>
                    </TabsContent>

                    {/* Security */}
                    <TabsContent value="security" className="max-w-2xl">
                        <div className="bg-card border rounded-xl p-6 space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold mb-1">Password & Security</h3>
                                <p className="text-sm text-muted-foreground">Manage your password and account security.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Current Password</label>
                                    <Input type="password" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">New Password</label>
                                    <Input type="password" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Confirm New Password</label>
                                    <Input type="password" />
                                </div>
                            </div>
                            <Button onClick={handleChangePassword} variant="default" className="w-full md:w-auto">Change Password</Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
            <Footer />
        </div>
    );
};

export default MyAccount;
