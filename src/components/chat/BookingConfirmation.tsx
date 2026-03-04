import { CheckCircle2, Calendar, MapPin, User, BedDouble } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Hotel } from "./HotelCard";
import { BookingData } from "./BookingForm";

interface BookingConfirmationProps {
    bookingId: string;
    hotel: Hotel;
    bookingData: BookingData;
}

export function BookingConfirmation({ bookingId, hotel, bookingData }: BookingConfirmationProps) {
    return (
        <Card className="w-full max-w-sm border-green-500/20 bg-green-500/5 shadow-lg animate-scale-in">
            <CardHeader className="pb-2 text-center">
                <div className="mx-auto w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-xl text-green-700">Booking Confirmed!</CardTitle>
                <p className="text-sm text-muted-foreground">Booking ID: #{bookingId}</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="bg-card/50 p-4 rounded-lg space-y-3 border border-border/50">
                    <h4 className="font-semibold text-foreground">{hotel.name}</h4>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 shrink-0" />
                        <span>{hotel.location}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-primary" />
                            <div>
                                <p className="text-xs text-muted-foreground">Check-in</p>
                                <p className="font-medium">{format(bookingData.checkIn, "MMM dd")}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-primary" />
                            <div>
                                <p className="text-xs text-muted-foreground">Check-out</p>
                                <p className="font-medium">{format(bookingData.checkOut, "MMM dd")}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="flex items-center gap-2 text-sm">
                            <User className="w-4 h-4 text-primary" />
                            <div>
                                <p className="text-xs text-muted-foreground">Guests</p>
                                <p className="font-medium">{bookingData.guests} Adults</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <BedDouble className="w-4 h-4 text-primary" />
                            <div>
                                <p className="text-xs text-muted-foreground">Room</p>
                                <p className="font-medium capitalize">{bookingData.roomType}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center px-2">
                    <span className="text-sm text-muted-foreground">Total Amount Paid</span>
                    <span className="text-lg font-bold text-primary">${bookingData.totalPrice}</span>
                </div>
            </CardContent>
        </Card>
    );
}
