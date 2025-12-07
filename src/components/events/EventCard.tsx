import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Ticket } from "lucide-react";
import { EventData } from "@/utils/api";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: EventData;
  featured?: boolean;
}

export function EventCard({ event, featured }: EventCardProps) {
  const spotsLeft = event.available_seats;
  const almostFull = spotsLeft < 10; // Simplified logic since we don't have total capacity

  return (
    <Link to={`/events/${event.id}`}>
      <div
        className={cn(
          "group relative overflow-hidden rounded-xl border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-purple-900/20",
          featured && "md:col-span-2 md:row-span-2"
        )}
      >
        <div className={cn("relative overflow-hidden", featured ? "h-64 md:h-80" : "h-48")}>
          <img
            src={event.img}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          <div className="absolute top-3 left-3 flex gap-2">
            {/* Category is not in API, removing or mocking if needed. For now, removing. */}
            {/* Featured is not in API, removing logic or keeping prop but not using event.isFeatured */}
          </div>

          <div className="absolute bottom-3 right-3">
            {event.price ? (
              <span className="text-lg font-bold text-white drop-shadow-md">
                ₹{event.price}
              </span>
            ) : (
              <span className="text-lg font-bold text-accent drop-shadow-md">
                Free
              </span>
            )}
          </div>
        </div>

        <div className="p-5">
          <h3 className={cn(
            "font-display font-bold mb-2 text-white group-hover:text-accent transition-colors",
            featured ? "text-2xl" : "text-xl"
          )}>
            {event.title}
          </h3>

          <p className="text-white/80 text-sm line-clamp-2 mb-4">
            {event.description}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-white/70">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-accent" />
              {format(new Date(event.date), "MMM d, yyyy")}
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-accent" />
              {event.location}
            </div>
          </div>

          <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10">
            <div className="flex items-center gap-1.5 text-sm text-white/70">
              <Users className="h-4 w-4" />
              <span className={almostFull ? "text-red-300 font-medium" : ""}>
                {spotsLeft} spots left
              </span>
            </div>
            <Button size="sm" className="gap-2 p-6 bg-white text-purple-700 hover:bg-white/90 font-semibold rounded-full transition-transform group-hover:translate-x-1">
              <Ticket className="h-6 w-6 " />
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
