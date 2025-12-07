import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchEvents, fetchAllBookings, deleteEvent, EventData, BookingResponse } from "@/utils/api";
import { CreateEventDialog } from "@/components/admin/CreateEventDialog";
import { EditEventDialog } from "@/components/admin/EditEventDialog";
import { format } from "date-fns";
import {
  LayoutDashboard,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Edit,
  Trash2,
  Eye,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [events, setEvents] = useState<EventData[]>([]);
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [eventsData, bookingsData] = await Promise.all([
        fetchEvents(),
        fetchAllBookings(),
      ]);
      setEvents(eventsData);
      setBookings(bookingsData);
    } catch (error) {
      console.error("Failed to fetch data", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(id);
        toast.success("Event deleted successfully");
        loadData();
      } catch (error) {
        console.error("Failed to delete event", error);
        toast.error("Failed to delete event");
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Calculate stats
  const activeBookings = bookings.filter(b => b.status !== 'cancelled');
  
  const totalEvents = events.length;
  const upcomingEvents = events.filter((e) => new Date(e.date) >= new Date()).length;
  const totalBookings = activeBookings.length;
  const totalRevenue = activeBookings.reduce((sum, b) => sum + Number(b.total_amount), 0);
  // Unique clients based on email (from active bookings)
  const totalClients = new Set(activeBookings.map(b => b.email)).size;

  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-accent" />
          <p className="text-muted-foreground">Loading Dashboard...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your events, bookings, and attendees
            </p>
          </div>
          <CreateEventDialog onEventCreated={loadData} />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="dashboard" className="gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="events" className="gap-2">
              <Calendar className="h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="bookings" className="gap-2">
              <Users className="h-4 w-4" />
              Bookings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Events</p>
                      <p className="text-3xl font-bold">{totalEvents}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {upcomingEvents} upcoming
                      </p>
                    </div>
                    <div className="p-3 rounded-xl gradient-primary">
                      <Calendar className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Bookings</p>
                      <p className="text-3xl font-bold">{totalBookings}</p>
                      <p className="text-xs text-success mt-1 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" /> +12% this month
                      </p>
                    </div>
                    <div className="p-3 rounded-xl gradient-cool">
                      <Users className="h-6 w-6 text-secondary-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                      <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
                      <p className="text-xs text-success mt-1 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" /> +8% this month
                      </p>
                    </div>
                    <div className="p-3 rounded-xl gradient-warm">
                      <DollarSign className="h-6 w-6 text-warning-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Clients</p>
                      <p className="text-3xl font-bold">{totalClients}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Active attendees
                      </p>
                    </div>
                    <div className="p-3 rounded-xl gradient-accent">
                      <Users className="h-6 w-6 text-accent-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="font-display text-lg">
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events
                      .filter((e) => new Date(e.date) >= new Date())
                      .slice(0, 4)
                      .map((event) => (
                        <div
                          key={event.id}
                          className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={event.img}
                              alt={event.title}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium">{event.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {format(new Date(event.date), "MMM d")} • {event.available_seats} seats left
                              </p>
                            </div>
                          </div>
                          {/* Category removed as not in API */}
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="font-display text-lg">
                    Recent Bookings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bookings.slice(0, 5).map((booking) => {
                      return (
                        <div
                          key={booking.id}
                          className="flex items-center justify-between p-3 rounded-lg border border-border"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                              {(booking.name || "?").charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium">{booking.name || "Unknown User"}</p>
                              <p className="text-sm text-muted-foreground">
                                {booking.event_title}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-medium ${booking.status === 'cancelled' ? 'text-muted-foreground line-through' : ''}`}>
                              ${booking.total_amount}
                            </p>
                            {booking.status === 'cancelled' ? (
                              <span className="text-xs text-destructive font-medium">Cancelled</span>
                            ) : (
                              <p className="text-xs text-muted-foreground">
                                {new Date(booking.booking_date).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events">
            <Card className="border-border/50">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-center">Available Seats</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              src={event.img}
                              alt={event.title}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium">{event.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {event.location}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p>{format(new Date(event.date), "MMM d, yyyy")}</p>
                            {/* Time not in API yet */}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="font-medium">{event.available_seats}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          {event.price ? `₹${event.price}` : "Free"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Link to={`/events/${event.id}`}>
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <EditEventDialog event={event} onEventUpdated={loadData} />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                              onClick={() => handleDeleteEvent(event.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card className="border-border/50">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => {
                      return (
                        <TableRow key={booking.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-sm font-semibold text-primary-foreground">
                                {(booking.name || "?").charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium">{booking.name || "Unknown User"}</p>
                                <p className="text-sm text-muted-foreground">
                                  {booking.email}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{booking.event_title}</TableCell>
                          <TableCell>
                            {new Date(booking.booking_date).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-center">
                            {booking.status === 'cancelled' ? (
                              <Badge variant="destructive" className="text-[10px] px-2 py-0.5 h-5">Cancelled</Badge>
                            ) : (
                              <Badge variant="secondary" className="text-[10px] px-2 py-0.5 h-5 bg-green-100 text-green-700 hover:bg-green-100">Confirmed</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {booking.quantity}
                          </TableCell>
                          <TableCell className={`text-right font-medium ${booking.status === 'cancelled' ? 'text-muted-foreground line-through' : ''}`}>
                            ${booking.total_amount}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminPage;
