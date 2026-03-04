import { Star, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Hotel {
    id: string;
    name: string;
    image: string;
    rating: number;
    price: number;
    location: string;
    description: string;
}

interface HotelCardProps {
    hotel: Hotel;
    onSelect: (hotel: Hotel) => void;
}

export function HotelCard({ hotel, onSelect }: HotelCardProps) {
    return (
        <Card className="w-full max-w-sm overflow-hidden border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 group bg-card/50 backdrop-blur-sm">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3">
                    <Badge className="bg-black/60 backdrop-blur-md text-white border-none hover:bg-black/70">
                        ${hotel.price}/night
                    </Badge>
                </div>
            </div>

            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold">{hotel.name}</CardTitle>
                    <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium text-foreground">{hotel.rating}</span>
                    </div>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <MapPin className="w-3.5 h-3.5" />
                    {hotel.location}
                </div>
            </CardHeader>

            <CardContent className="pb-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {hotel.description}
                </p>
            </CardContent>

            <CardFooter>
                <Button
                    onClick={() => onSelect(hotel)}
                    className="w-full group-hover:bg-primary/90 transition-colors"
                >
                    View & Book
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
            </CardFooter>
        </Card>
    );
}
