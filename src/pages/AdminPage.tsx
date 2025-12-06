import { useState } from "react";
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
import { mockEvents, mockBookings, mockClients } from "@/data/mockData";
import { format } from "date-fns";
import {
  LayoutDashboard,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Calculate stats
  const totalEvents = mockEvents.length;
  const upcomingEvents = mockEvents.filter((e) => e.date >= new Date()).length;
  const totalBookings = mockBookings.length;
  const totalRevenue = mockBookings
    .filter((b) => b.status === "confirmed")
    .reduce((sum, b) => sum + b.totalPrice, 0);
  const totalClients = mockClients.length;

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
          <Button className="gap-2 gradient-primary text-primary-foreground">
            <Plus className="h-4 w-4" />
            Create Event
          </Button>
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
                      <p className="text-3xl font-bold">${totalRevenue}</p>
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
                    {mockEvents
                      .filter((e) => e.date >= new Date())
                      .slice(0, 4)
                      .map((event) => (
                        <div
                          key={event.id}
                          className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={event.image}
                              alt={event.title}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium">{event.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {format(event.date, "MMM d")} • {event.bookedCount}/
                                {event.capacity} booked
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline">{event.category}</Badge>
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
                    {mockBookings.slice(0, 4).map((booking) => {
                      const client = mockClients.find((c) => c.id === booking.clientId);
                      const event = mockEvents.find((e) => e.id === booking.eventId);
                      return (
                        <div
                          key={booking.id}
                          className="flex items-center justify-between p-3 rounded-lg border border-border"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                              {client?.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium">{client?.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {event?.title}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${booking.totalPrice}</p>
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
                                  ? "bg-success/20 text-success"
                                  : ""
                              }
                            >
                              {booking.status}
                            </Badge>
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
                      <TableHead>Category</TableHead>
                      <TableHead className="text-center">Capacity</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              src={event.image}
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
                            <p>{format(event.date, "MMM d, yyyy")}</p>
                            <p className="text-sm text-muted-foreground">
                              {event.time}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{event.category}</Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="font-medium">{event.bookedCount}</span>
                          <span className="text-muted-foreground">
                            /{event.capacity}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          {event.price ? `$${event.price}` : "Free"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Link to={`/events/${event.id}`}>
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
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
                      <TableHead className="text-center">Tickets</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockBookings.map((booking) => {
                      const client = mockClients.find((c) => c.id === booking.clientId);
                      const event = mockEvents.find((e) => e.id === booking.eventId);
                      return (
                        <TableRow key={booking.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-sm font-semibold text-primary-foreground">
                                {client?.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium">{client?.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {client?.email}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{event?.title}</TableCell>
                          <TableCell>
                            {format(booking.createdAt, "MMM d, yyyy")}
                          </TableCell>
                          <TableCell className="text-center">
                            {booking.ticketCount}
                          </TableCell>
                          <TableCell className="text-center">
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
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            ${booking.totalPrice}
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
