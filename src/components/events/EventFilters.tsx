import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X, Filter, MapPin, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EventFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  locations: string[];
  selectedLocations: string[];
  onLocationChange: (locations: string[]) => void;
  priceRange: number[];
  onPriceChange: (range: number[]) => void;
  maxPrice: number;
}

export function EventFilters({
  search,
  onSearchChange,
  locations,
  selectedLocations,
  onLocationChange,
  priceRange,
  onPriceChange,
  maxPrice,
}: EventFiltersProps) {
  const handleLocationToggle = (location: string) => {
    if (selectedLocations.includes(location)) {
      onLocationChange(selectedLocations.filter((l) => l !== location));
    } else {
      onLocationChange([...selectedLocations, location]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative max-w-2xl mx-auto flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70" />
          <Input
            placeholder="Search events..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 pr-12 py-6 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent/50 focus:ring-accent/20 rounded-full backdrop-blur-sm transition-all hover:bg-white/20"
          />
          {search && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 text-white/70 hover:text-white hover:bg-white/10 rounded-full"
              onClick={() => onSearchChange("")}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-auto px-6 rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white gap-2">
              <Filter className="h-4 w-4" />
              Filters
              {(selectedLocations.length > 0 || priceRange[0] < maxPrice) && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full text-[10px]">
                  {selectedLocations.length + (priceRange[0] < maxPrice ? 1 : 0)}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4 bg-white/95 backdrop-blur-xl border-white/20 shadow-xl rounded-xl">
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2 text-purple-900">
                  <MapPin className="h-4 w-4" />
                  Locations
                </h4>
                <ScrollArea className="h-32 rounded-md border p-2">
                  <div className="space-y-2">
                    {locations.map((location) => (
                      <div key={location} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`loc-${location}`} 
                          checked={selectedLocations.includes(location)}
                          onCheckedChange={() => handleLocationToggle(location)}
                        />
                        <Label 
                          htmlFor={`loc-${location}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {location}
                        </Label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium flex items-center gap-2 text-purple-900">
                    <DollarSign className="h-4 w-4" />
                    Max Price
                  </h4>
                  <span className="text-sm text-muted-foreground font-medium">
                    ₹{priceRange[0]}
                  </span>
                </div>
                <Slider
                  value={priceRange}
                  max={maxPrice}
                  step={10}
                  onValueChange={onPriceChange}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₹0</span>
                  <span>₹{maxPrice}</span>
                </div>
              </div>

              {(selectedLocations.length > 0 || priceRange[0] < maxPrice) && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full text-muted-foreground hover:text-purple-900"
                  onClick={() => {
                    onLocationChange([]);
                    onPriceChange([maxPrice]);
                  }}
                >
                  Reset Filters
                </Button>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
