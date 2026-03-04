import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GuestSelectorProps {
  adults: number;
  children: number;
  rooms: number;
  onAdultsChange: (value: number) => void;
  onChildrenChange: (value: number) => void;
  onRoomsChange: (value: number) => void;
  onClose: () => void;
}

interface CounterRowProps {
  label: string;
  subtitle?: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

const CounterRow = ({ label, subtitle, value, min, max, onChange }: CounterRowProps) => {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-8 text-center text-sm font-medium">{value}</span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const GuestSelector = ({
  adults,
  children,
  rooms,
  onAdultsChange,
  onChildrenChange,
  onRoomsChange,
  onClose,
}: GuestSelectorProps) => {
  return (
    <div className="space-y-1">
      <CounterRow
        label="Adults"
        subtitle="Age 18+"
        value={adults}
        min={1}
        max={10}
        onChange={onAdultsChange}
      />
      <div className="border-t border-border" />
      <CounterRow
        label="Children"
        subtitle="Age 0-17"
        value={children}
        min={0}
        max={10}
        onChange={onChildrenChange}
      />
      <div className="border-t border-border" />
      <CounterRow
        label="Rooms"
        value={rooms}
        min={1}
        max={10}
        onChange={onRoomsChange}
      />
      <div className="pt-3">
        <Button
          onClick={onClose}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl"
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default GuestSelector;
