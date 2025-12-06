import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockClients, mockBookings, mockEvents } from "@/data/mockData";
import { format } from "date-fns";
import {
  ChevronLeft,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Ticket,
  Edit,
} from "lucide-react";

const ClientDetailPage = () => {
  const { id } = useParams();
  const client = mockClients.find((c) => c.id === id);

  if (!client) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Client not found</h1>
          <Link to="/clients">
            <Button>Back to Clients</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const clientBookings = mockBookings.filter((b) => b.clientId === client.id);
  const clientEvents = clientBookings.map((booking) => ({
    ...booking,
    event: mockEvents.find((e) => e.id === booking.eventId)!,
  }));

  return (
    <Layout>
      <div className="container py-8">
        <Link to="/clients">
          <Button variant="ghost" className="gap-2 mb-6">
            <ChevronLeft className="h-4 w-4" />
            Back to Clients
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Client Profile */}
          <div className="lg:col-span-1">
            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center text-3xl font-bold text-primary-foreground mx-auto mb-4">
                    {client.name.charAt(0)}
                  </div>
                  <h1 className="font-display text-2xl font-bold">{client.name}</h1>
                  <p className="text-muted-foreground">
                    Client since {format(client.createdAt, "MMMM yyyy")}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-secondary" />
                    <span>{client.phone}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-6 gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="border-border/50 mt-4">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Ticket className="h-4 w-4" />
                    Total Bookings
                  </div>
                  <span className="font-bold">{client.totalBookings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    Total Spent
                  </div>
                  <span className="font-bold">${client.totalSpent}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Member Since
                  </div>
                  <span className="font-bold">
                    {format(client.createdAt, "MMM yyyy")}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking History */}
          <div className="lg:col-span-2">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-display">Booking History</CardTitle>
              </CardHeader>
              <CardContent>
                {clientEvents.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No bookings yet
                  </div>
                ) : (
                  <div className="space-y-4">
                    {clientEvents.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                      >
                        <img
                          src={booking.event.image}
                          alt={booking.event.title}
                          className="w-24 h-24 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold">
                                {booking.event.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {format(booking.event.date, "MMMM d, yyyy")} at{" "}
                                {booking.event.time}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {booking.event.location}
                              </p>
                            </div>
                            <Badge
                              variant={
                                booking.status === "confirmed"
                                  ? "default"
                                  : booking.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                              }
                              className={
                                booking.status === "confirmed"
                                  ? "bg-success text-success-foreground"
                                  : ""
                              }
                            >
                              {booking.status}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                            <span className="text-sm text-muted-foreground">
                              {booking.ticketCount} ticket
                              {booking.ticketCount > 1 ? "s" : ""}
                            </span>
                            <span className="font-bold">
                              ${booking.totalPrice}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ClientDetailPage;
