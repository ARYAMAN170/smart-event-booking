import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Ticket } from "lucide-react";
import { Event } from "@/data/mockData";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

export function EventCard({ event, featured }: EventCardProps) {
  const spotsLeft = event.capacity - event.bookedCount;
  const almostFull = spotsLeft < event.capacity * 0.2;

  return (
    <Link to={`/events/${event.id}`}>
      <Card
        className={cn(
          "group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10",
          featured && "md:col-span-2 md:row-span-2"
        )}
      >
        <div className={cn("relative overflow-hidden", featured ? "h-64 md:h-80" : "h-48")}>
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className="bg-primary/90 hover:bg-primary text-primary-foreground">
              {event.category}
            </Badge>
            {event.isFeatured && (
              <Badge className="bg-accent/90 hover:bg-accent text-accent-foreground">
                Featured
              </Badge>
            )}
          </div>

          <div className="absolute bottom-3 right-3">
            {event.price ? (
              <Badge variant="secondary" className="text-lg font-bold bg-background/90">
                ${event.price}
              </Badge>
            ) : (
              <Badge className="bg-success/90 text-success-foreground font-bold">
                Free
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className={cn(
            "font-display font-bold mb-2 group-hover:text-primary transition-colors",
            featured ? "text-2xl" : "text-lg"
          )}>
            {event.title}
          </h3>

          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
            {event.description}
          </p>

          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-primary" />
              {format(event.date, "MMM d, yyyy")}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-secondary" />
              {event.location}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-1 text-sm">
              <Users className="h-4 w-4" />
              <span className={almostFull ? "text-accent font-medium" : ""}>
                {spotsLeft} spots left
              </span>
            </div>
            <Button size="sm" className="gap-2 gradient-primary text-primary-foreground hover:opacity-90">
              <Ticket className="h-4 w-4" />
              Book Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
