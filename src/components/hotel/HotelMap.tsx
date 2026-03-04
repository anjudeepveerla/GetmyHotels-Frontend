import { useEffect, useRef, useState } from "react";
import { Hotel } from "@/data/hotels";
import { cn } from "@/lib/utils";

interface HotelMapProps {
  hotels: Hotel[];
  selectedHotelId: string | null;
  onHotelSelect: (hotelId: string) => void;
  onHotelHover?: (hotelId: string | null) => void;
  className?: string;
}

// Type declarations for Leaflet
declare global {
  interface Window {
    L: any;
  }
}

const HotelMap = ({ hotels, selectedHotelId, onHotelSelect, onHotelHover, className }: HotelMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<Map<string, any>>(new Map());
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    // Dynamically load Leaflet CSS and JS
    const loadLeaflet = async () => {
      try {
        // Load CSS
        if (!document.querySelector('link[href*="leaflet"]')) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
          link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
          link.crossOrigin = "";
          document.head.appendChild(link);
        }

      // Load JS
      if (!window.L) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
          script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
          script.crossOrigin = "";
          script.onload = () => {
            setTimeout(() => resolve(), 50);
          };
          script.onerror = () => {
            console.error("Failed to load Leaflet");
            setIsMapLoading(false);
            reject(new Error("Failed to load Leaflet"));
          };
          document.head.appendChild(script);
        }).catch(() => {
          // Error already handled
        });
      }

      if (!mapContainerRef.current || !window.L) {
        setIsMapLoading(false);
        return;
      }

      const L = window.L;
      const validHotels = hotels.filter(h => h.latitude != null && h.longitude != null);
      
      if (validHotels.length === 0) {
        setIsMapLoading(false);
        return;
      }

      // Initialize map
      if (!mapRef.current) {
        const centerLat = validHotels.reduce((sum, h) => sum + h.latitude, 0) / validHotels.length;
        const centerLng = validHotels.reduce((sum, h) => sum + h.longitude, 0) / validHotels.length;

        mapRef.current = L.map(mapContainerRef.current, {
          center: [centerLat, centerLng],
          zoom: 12,
          scrollWheelZoom: true,
          zoomControl: true,
        });
        
        // Ensure map container has proper size after render
        setTimeout(() => {
          if (mapRef.current) {
            mapRef.current.invalidateSize();
          }
        }, 100);

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(mapRef.current);
      }

      // Clear existing markers
      markersRef.current.forEach((marker) => {
        mapRef.current?.removeLayer(marker);
      });
      markersRef.current.clear();

      // Add markers for each hotel
      validHotels.forEach((hotel) => {
        const isSelected = selectedHotelId === hotel.id;
        
        // Create custom price marker
        const priceMarker = L.divIcon({
          className: "custom-price-marker",
          html: `
            <div class="price-marker ${isSelected ? "selected" : ""}" style="
              background: ${isSelected ? "#3b82f6" : "#ef4444"};
              color: white;
              padding: 6px 10px;
              border-radius: 20px;
              font-weight: bold;
              font-size: 12px;
              white-space: nowrap;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              border: 2px solid white;
              cursor: pointer;
              transition: all 0.2s;
              z-index: ${isSelected ? "1001" : "1000"};
            ">
              $${hotel.pricePerNight}
            </div>
          `,
          iconSize: [60, 30],
          iconAnchor: [30, 15],
        });

        const marker = L.marker([hotel.latitude, hotel.longitude], {
          icon: priceMarker,
        }).addTo(mapRef.current!);

        marker.on("click", () => {
          onHotelSelect(hotel.id);
        });

        if (onHotelHover) {
          marker.on("mouseover", () => {
            onHotelHover(hotel.id);
            // Bring to front visually
            marker.setZIndexOffset(1000);
          });
          
          marker.on("mouseout", () => {
            onHotelHover(null);
            marker.setZIndexOffset(0);
          });
        }

        markersRef.current.set(hotel.id, marker);
      });

      // Fit bounds to show all hotels
      if (validHotels.length > 0 && mapRef.current) {
        const bounds = L.latLngBounds(
          validHotels.map(h => [h.latitude, h.longitude] as [number, number])
        );
        mapRef.current.fitBounds(bounds, { padding: [50, 50] });
        
        // Ensure map is properly sized
        setTimeout(() => {
          if (mapRef.current) {
            mapRef.current.invalidateSize();
          }
        }, 200);
      }

      // Center on selected hotel
      if (selectedHotelId) {
        const selectedHotel = validHotels.find(h => h.id === selectedHotelId);
        if (selectedHotel && mapRef.current) {
          mapRef.current.setView([selectedHotel.latitude, selectedHotel.longitude], mapRef.current.getZoom(), {
            animate: true,
          });
        }
      }
      
      setIsMapLoading(false);
      } catch (error: any) {
        console.error("Error loading map:", error);
        setMapError(error?.message || "Failed to load map");
        setIsMapLoading(false);
      }
    };

    loadLeaflet();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      markersRef.current.clear();
    };
  }, [hotels, selectedHotelId, onHotelSelect, onHotelHover]);

  const validHotels = hotels.filter(h => h.latitude != null && h.longitude != null);

  if (mapError) {
    return (
      <div
        className={cn(
          "relative w-full h-full bg-muted dark:bg-muted rounded-xl overflow-hidden",
          "border border-border flex items-center justify-center",
          className
        )}
      >
        <div className="text-center p-4">
          <p className="text-sm text-muted-foreground dark:text-muted-foreground mb-2">
            Map unavailable
          </p>
          <p className="text-xs text-muted-foreground/70 dark:text-muted-foreground/70">
            {validHotels.length} hotel{validHotels.length !== 1 ? "s" : ""} available
          </p>
        </div>
      </div>
    );
  }

  if (validHotels.length === 0) {
    return (
      <div
        className={cn(
          "relative w-full h-full bg-muted dark:bg-muted rounded-xl overflow-hidden",
          "border border-border flex items-center justify-center",
          className
        )}
      >
        <div className="text-center">
          <p className="text-sm text-muted-foreground dark:text-muted-foreground">
            No hotels to display on map
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .custom-price-marker {
          background: transparent !important;
          border: none !important;
        }
        .price-marker:hover {
          transform: scale(1.1);
          z-index: 1000 !important;
        }
        .price-marker.selected {
          transform: scale(1.15);
          z-index: 1001 !important;
        }
        .leaflet-container {
          background: hsl(var(--muted)) !important;
          font-family: inherit;
          height: 100% !important;
          width: 100% !important;
        }
        .leaflet-popup-content-wrapper {
          background: hsl(var(--card)) !important;
          color: hsl(var(--foreground)) !important;
          border-radius: 8px;
        }
        .leaflet-popup-tip {
          background: hsl(var(--card)) !important;
        }
      `}</style>
      <div
        ref={mapContainerRef}
        className={cn("relative w-full h-full rounded-xl overflow-hidden border border-border bg-muted dark:bg-muted", className)}
        style={{ minHeight: "400px", height: "100%", width: "100%" }}
      >
        {isMapLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/80 dark:bg-muted/80 z-10 rounded-xl">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground">Loading map...</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HotelMap;
