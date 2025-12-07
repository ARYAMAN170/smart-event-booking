import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { fetchEvents, createBooking, EventData } from "@/utils/api";
import { TicketGenerator } from "@/components/events/TicketGenerator";
import { MapViewer } from "@/components/events/MapViewer";
import { format } from "date-fns";
import {
  Calendar,
  MapPin,
  Users,
  Share2,
  Heart,
  ChevronLeft,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [ticketCount, setTicketCount] = useState(1);
  const [mobile, setMobile] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const events = await fetchEvents();
        const foundEvent = events.find((e) => e.id.toString() === id);
        setEvent(foundEvent || null);
      } catch (error) {
        console.error("Failed to load event", error);
        toast.error("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };
    loadEvent();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader2 className="h-10 w-10 animate-spin text-accent" />
        </div>
      </Layout>
    );
  }

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

  if (bookingSuccess && bookingId && event) {
    return (
      <Layout>
        <div className="container py-16">
          <TicketGenerator bookingId={bookingId} event={event} quantity={ticketCount} />
        </div>
      </Layout>
    );
  }

  const spotsLeft = event.available_seats;
  const totalPrice = event.price * ticketCount;

  const handleBooking = async () => {
    if (!mobile) {
      toast.error("Please enter your mobile number");
      return;
    }

    setIsBooking(true);
    try {
      const response = await createBooking({
        event_id: event.id,
        quantity: ticketCount,
        mobile: mobile,
      });
      
      setBookingId(response.bookingId || "BK-" + Date.now());
      setBookingSuccess(true);
      toast.success("Booking confirmed!");
    } catch (error: any) {
      console.error("Booking failed", error);
      if (error.response && error.response.status === 401) {
        toast.error("Please login to book tickets");
      } else {
        toast.error("Booking failed. Please try again.");
      }
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <Layout>
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img
          src={event.img}
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
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/50">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-wrap gap-2 mb-4">
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
                    {format(new Date(event.date), "EEEE, MMMM d, yyyy")}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-accent" />
                    {event.location}
                  </div>
                </div>

                <div className="flex gap-2 mb-8">
                  <Button variant="outline" size="sm" className="gap-2 bg-white border-gray-200 text-purple-700 hover:bg-purple-50">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 bg-white border-gray-200 text-purple-700 hover:bg-purple-50">
                    <Heart className="h-4 w-4" />
                    Save
                  </Button>
                </div>

                <div className="prose prose-gray dark:prose-invert max-w-none mb-8">
                  <h3 className="font-display text-xl font-bold mb-3">About This Event</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-display text-lg font-bold flex items-center gap-2">
                    📍 Event Location
                  </h3>
                  <MapViewer location={event.location} />
                </div>
              </CardContent>
            </Card>
          </div>

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
                
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Mobile Number</label>
                  <Input 
                    placeholder="Enter your mobile number" 
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="bg-white text-black border-gray-200 placeholder:text-gray-400 focus-visible:ring-purple-500"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Quantity</label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                      disabled={ticketCount <= 1}
                      className="bg-white border-gray-200 text-black hover:bg-gray-50 disabled:opacity-50"
                    >
                      -
                    </Button>
                    <span className="text-xl font-bold w-8 text-center text-gray-900">
                      {ticketCount}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setTicketCount(Math.min(10, ticketCount + 1))}
                      disabled={ticketCount >= 10}
                      className="bg-white border-gray-200 text-black hover:bg-gray-50 disabled:opacity-50"
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-muted-foreground">Total</span>
                    <span className="text-2xl font-bold">
                      ₹{totalPrice}
                    </span>
                  </div>
                  <Button 
                    className="w-full text-lg py-6" 
                    onClick={handleBooking}
                    disabled={isBooking || spotsLeft === 0}
                  >
                    {isBooking ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : spotsLeft === 0 ? (
                      "Sold Out"
                    ) : (
                      "Confirm Booking"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetailPage;
