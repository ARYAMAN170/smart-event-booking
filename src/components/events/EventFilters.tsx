import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
import { categories } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface EventFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function EventFilters({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: EventFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search events..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-10"
        />
        {search && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            onClick={() => onSearchChange("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge
          variant={selectedCategory === null ? "default" : "outline"}
          className={cn(
            "cursor-pointer transition-all",
            selectedCategory === null
              ? "gradient-primary text-primary-foreground"
              : "hover:border-primary hover:text-primary"
          )}
          onClick={() => onCategoryChange(null)}
        >
          All
        </Badge>
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className={cn(
              "cursor-pointer transition-all",
              selectedCategory === category
                ? "gradient-primary text-primary-foreground"
                : "hover:border-primary hover:text-primary"
            )}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
    </div>
  );
}
