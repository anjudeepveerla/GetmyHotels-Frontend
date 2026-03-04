import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Users, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Hotel } from "./HotelCard";

interface BookingFormProps {
    hotel: Hotel;
    onSubmit: (data: BookingData) => void;
    onCancel: () => void;
}

export interface BookingData {
    guestName: string;
    checkIn: Date;
    checkOut: Date;
    guests: number;
    roomType: string;
    totalPrice: number;
}

export function BookingForm({ hotel, onSubmit, onCancel }: BookingFormProps) {
    const [guestName, setGuestName] = useState("");
    const [date, setDate] = useState<{ from: Date; to: Date } | undefined>();
    const [guests, setGuests] = useState("2");
    const [roomType, setRoomType] = useState("deluxe");

    const handleSubmit = () => {
        if (!guestName || !date?.from || !date?.to) return;

        // Calculate nights
        const nights = Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24));
        const pricePerNight = hotel.price * (roomType === "suite" ? 1.5 : 1);
        const totalPrice = pricePerNight * nights;

        onSubmit({
            guestName,
            checkIn: date.from,
            checkOut: date.to,
            guests: parseInt(guests),
            roomType,
            totalPrice
        });
    };

    return (
        <Card className="w-full max-w-md border-border/50 shadow-xl bg-card/80 backdrop-blur-sm animate-scale-in">
            <CardHeader>
                <CardTitle className="text-lg">Booking Details for {hotel.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="guestName">Full Name</Label>
                    <Input
                        id="guestName"
                        placeholder="John Doe"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <Label>Dates</Label>
                    <div className="grid gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    id="date"
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date?.from ? (
                                        date.to ? (
                                            <>
                                                {format(date.from, "LLL dd, y")} -{" "}
                                                {format(date.to, "LLL dd, y")}
                                            </>
                                        ) : (
                                            format(date.from, "LLL dd, y")
                                        )
                                    ) : (
                                        <span>Pick a date range</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    initialFocus
                                    mode="range"
                                    defaultMonth={date?.from}
                                    selected={date}
                                    onSelect={(range: any) => setDate(range)}
                                    numberOfMonths={2}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="guests">Guests</Label>
                        <Select value={guests} onValueChange={setGuests}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select guests" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">1 Guest</SelectItem>
                                <SelectItem value="2">2 Guests</SelectItem>
                                <SelectItem value="3">3 Guests</SelectItem>
                                <SelectItem value="4">4 Guests</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="roomType">Room Type</Label>
                        <Select value={roomType} onValueChange={setRoomType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select room" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="standard">Standard</SelectItem>
                                <SelectItem value="deluxe">Deluxe (+20%)</SelectItem>
                                <SelectItem value="suite">Suite (+50%)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-4">
                <Button variant="ghost" onClick={onCancel} className="w-full">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} className="w-full" disabled={!guestName || !date?.from || !date?.to}>
                    Proceed to Payment <CreditCard className="w-4 h-4 ml-2" />
                </Button>
            </CardFooter>
        </Card>
    );
}
