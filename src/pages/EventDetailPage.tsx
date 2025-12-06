import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockEvents, ticketTypes } from "@/data/mockData";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Share2,
  Heart,
  ChevronLeft,
  Ticket,
  Minus,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const EventDetailPage = () => {
  const { id } = useParams();
  const event = mockEvents.find((e) => e.id === id);
  const [ticketCount, setTicketCount] = useState(1);
  const [selectedTicketType, setSelectedTicketType] = useState(ticketTypes[0]);

  if (!event) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <Link to="/">
            <Button>Back to Events</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const spotsLeft = event.capacity - event.bookedCount;
  const totalPrice = event.price
    ? (event.price + selectedTicketType.price) * ticketCount
    : selectedTicketType.price * ticketCount;

  const handleBooking = () => {
    toast.success("Booking added to cart!", {
      description: `${ticketCount}x ${event.title}`,
    });
  };

  return (
    <Layout>
      {/* Hero Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute top-4 left-4">
          <Link to="/">
            <Button variant="secondary" size="sm" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>
      </div>

      <div className="container -mt-24 relative z-10 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Event Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/50">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="gradient-primary text-primary-foreground">
                    {event.category}
                  </Badge>
                  {event.isFeatured && (
                    <Badge className="bg-accent text-accent-foreground">
                      Featured
                    </Badge>
                  )}
                  {!event.price && (
                    <Badge className="bg-success text-success-foreground">
                      Free Event
                    </Badge>
                  )}
                </div>

                <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  {event.title}
                </h1>

                <div className="flex flex-wrap gap-4 text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    {format(event.date, "EEEE, MMMM d, yyyy")}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-secondary" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-accent" />
                    {event.location}
                  </div>
                </div>

                <div className="flex gap-2 mb-8">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Heart className="h-4 w-4" />
                    Save
                  </Button>
                </div>

                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <h3 className="font-display text-xl font-bold mb-3">About This Event</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Location Card */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-accent" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{event.location}</p>
                <div className="aspect-video rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                  Map placeholder
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-border/50">
              <CardHeader className="border-b border-border">
                <CardTitle className="font-display flex items-center justify-between">
                  <span>Get Tickets</span>
                  <div className="flex items-center gap-2 text-sm font-normal text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {spotsLeft} spots left
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Ticket Type Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Ticket Type</label>
                  {ticketTypes.map((type) => (
                    <div
                      key={type.id}
                      onClick={() => setSelectedTicketType(type)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedTicketType.id === type.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{type.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {type.description}
                          </p>
                        </div>
                        <span className="font-bold">
                          {type.price === 0 ? "Free" : `+$${type.price}`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quantity */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Quantity</label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                      disabled={ticketCount <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-xl font-bold w-8 text-center">
                      {ticketCount}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setTicketCount(Math.min(10, ticketCount + 1))}
                      disabled={ticketCount >= 10 || ticketCount >= spotsLeft}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="border-t border-border pt-4 space-y-2">
                  {event.price && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Base price × {ticketCount}
                      </span>
                      <span>${event.price * ticketCount}</span>
                    </div>
                  )}
                  {selectedTicketType.price > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {selectedTicketType.name} upgrade × {ticketCount}
                      </span>
                      <span>${selectedTicketType.price * ticketCount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                    <span>Total</span>
                    <span className="text-gradient-primary">
                      {totalPrice === 0 ? "Free" : `$${totalPrice}`}
                    </span>
                  </div>
                </div>

                <Link to={`/booking/${event.id}`}>
                  <Button
                    className="w-full gap-2 gradient-primary text-primary-foreground hover:opacity-90"
                    size="lg"
                    onClick={handleBooking}
                  >
                    <Ticket className="h-5 w-5" />
                    Book Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetailPage;
