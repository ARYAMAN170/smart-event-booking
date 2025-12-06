import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockClients, mockBookings, mockEvents } from "@/data/mockData";
import { format } from "date-fns";
import { Search, Users, DollarSign, Calendar, Plus, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const ClientsPage = () => {
  const [search, setSearch] = useState("");

  const filteredClients = mockClients.filter(
    (client) =>
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalClients = mockClients.length;
  const totalRevenue = mockClients.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgBookingsPerClient = (
    mockClients.reduce((sum, c) => sum + c.totalBookings, 0) / totalClients
  ).toFixed(1);

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold mb-2">Client Database</h1>
            <p className="text-muted-foreground">
              Manage your attendees and track booking history
            </p>
          </div>
          <Button className="gap-2 gradient-primary text-primary-foreground">
            <Plus className="h-4 w-4" />
            Add Client
          </Button>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl gradient-primary">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Clients</p>
                  <p className="text-2xl font-bold">{totalClients}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl gradient-cool">
                  <DollarSign className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">${totalRevenue}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl gradient-accent">
                  <Calendar className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Bookings</p>
                  <p className="text-2xl font-bold">{avgBookingsPerClient}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clients by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 max-w-md"
          />
        </div>

        {/* Clients Table */}
        <Card className="border-border/50">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-center">Bookings</TableHead>
                  <TableHead className="text-right">Total Spent</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id} className="group">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                          {client.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{client.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {client.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {client.phone}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {format(client.createdAt, "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{client.totalBookings}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${client.totalSpent}
                    </TableCell>
                    <TableCell>
                      <Link to={`/clients/${client.id}`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ClientsPage;
