import { EventData } from "@/utils/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download } from "lucide-react";
import { Link } from "react-router-dom";

interface TicketGeneratorProps {
  bookingId: string;
  event: EventData;
  quantity: number;
}

export function TicketGenerator({ bookingId, event, quantity }: TicketGeneratorProps) {
  return (
    <div className="max-w-md mx-auto text-center space-y-6 py-8">
      <div className="flex justify-center">
        <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
        <p className="text-muted-foreground">
          Your booking ID is <span className="font-mono font-bold text-foreground">{bookingId}</span>
        </p>
      </div>

      <Card className="text-left border-dashed border-2">
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg">{event.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date</span>
            <span className="font-medium">{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Location</span>
            <span className="font-medium">{event.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Quantity</span>
            <span className="font-medium">{quantity} Tickets</span>
          </div>
          <div className="pt-4 border-t flex justify-between items-center">
            <span className="text-muted-foreground">Total Paid</span>
            <span className="text-xl font-bold">${event.price * quantity}</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 justify-center">
        <Link to="/">
          <Button variant="outline">Back to Events</Button>
        </Link>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Download Ticket
        </Button>
      </div>
    </div>
  );
}
