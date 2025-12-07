import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockEvents } from "@/data/mockData";
import { format } from "date-fns";
import { Calendar, MapPin, ChevronLeft, CreditCard, Lock, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const BookingPage = () => {
  const { id } = useParams();
  const event = mockEvents.find((e) => e.id === id);
  const [step, setStep] = useState<"details" | "payment" | "confirmation">("details");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

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

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Processing payment...");
    setTimeout(() => {
      setStep("confirmation");
    }, 1500);
  };

  if (step === "confirmation") {
    return (
      <Layout>
        <div className="container max-w-2xl py-16">
          <Card className="border-border/50 text-center">
            <CardContent className="p-8 md:p-12">
              <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-primary-foreground" />
              </div>
              <h1 className="font-display text-3xl font-bold mb-4">
                Booking Confirmed!
              </h1>
              <p className="text-muted-foreground mb-8">
                Your tickets for <strong>{event.title}</strong> have been booked
                successfully. A confirmation email has been sent to{" "}
                <strong>{formData.email}</strong>.
              </p>

              <Card className="bg-muted/50 border-border/50 mb-8">
                <CardContent className="p-6 text-left">
                  <h3 className="font-semibold mb-4">Booking Details</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Event</span>
                      <span className="font-medium">{event.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date</span>
                      <span>{format(event.date, "MMMM d, yyyy")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time</span>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location</span>
                      <span>{event.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Confirmation #</span>
                      <span className="font-mono">GRV-{Math.random().toString(36).substring(2, 8).toUpperCase()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button variant="outline">Browse More Events</Button>
                </Link>
                <Button className="gradient-primary text-primary-foreground">
                  Download Ticket
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-4xl py-8">
        <Link to={`/events/${event.id}`}>
          <Button variant="ghost" className="gap-2 mb-6">
            <ChevronLeft className="h-4 w-4" />
            Back to Event
          </Button>
        </Link>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Booking Form */}
          <div className="md:col-span-3">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-display">
                  {step === "details" ? "Your Details" : "Payment Information"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {step === "details" ? (
                  <form onSubmit={handleSubmitDetails} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({ ...formData, firstName: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({ ...formData, lastName: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full gradient-primary text-primary-foreground"
                    >
                      Continue to Payment
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleSubmitPayment} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          className="pl-10"
                          required
                        />
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" placeholder="John Doe" required />
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                      <Lock className="h-4 w-4" />
                      Your payment is secured with SSL encryption
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep("details")}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 gradient-primary text-primary-foreground"
                      >
                        Complete Booking
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-2">
            <Card className="sticky top-24 border-border/50">
              <CardHeader>
                <CardTitle className="font-display text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{event.title}</h3>
                    <div className="text-sm text-muted-foreground space-y-1 mt-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(event.date, "MMM d, yyyy")}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">1 × General Admission</span>
                    <span>{event.price ? `₹${event.price}` : "Free"}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                    <span>Total</span>
                    <span className="text-gradient-primary">
                      {event.price ? `₹${event.price}` : "Free"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;
