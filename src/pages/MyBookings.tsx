import { useEffect, useState } from 'react';
import { fetchMyBookings, cancelBooking } from '@/utils/api';
import TicketGenerator from '@/components/TicketGenerator';
import { Layout } from "@/components/layout/Layout";
import { Loader2, Ticket, Calendar, MapPin, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface MyBooking {
    booking_id: number;
    title: string;
    event_date: string;
    location: string;
    img: string;
    quantity: number;
    total_amount: number;
    status: string;
}

const MyBookings = () => {
    const [bookings, setBookings] = useState<MyBooking[]>([]);
    const [selectedTicket, setSelectedTicket] = useState<MyBooking | null>(null);
    const [loading, setLoading] = useState(true);

    const loadBookings = async () => {
        try {
            const data = await fetchMyBookings();
            setBookings(data);
        } catch (err) {
            console.error("Failed to fetch bookings", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBookings();
    }, []);

    const handleCancel = async (bookingId: number) => {
        if (window.confirm("Are you sure you want to cancel this booking? This action cannot be undone.")) {
            try {
                await cancelBooking(bookingId);
                toast.success("Booking cancelled successfully");
                loadBookings();
            } catch (error) {
                console.error("Failed to cancel booking", error);
                toast.error("Failed to cancel booking");
            }
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
                    <Loader2 className="h-10 w-10 animate-spin text-accent" />
                    <p className="text-muted-foreground">Loading your tickets...</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 py-10">
                <h2 className="text-3xl font-display font-bold mb-8 flex items-center gap-3">
                    <Ticket className="h-8 w-8 text-accent" />
                    My Tickets
                </h2>

                {bookings.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                        <Ticket className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-bold text-gray-300">No bookings found</h3>
                        <p className="text-gray-500 mt-2">You haven't booked any events yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookings.map((booking) => (
                            <div key={booking.booking_id} className={cn(
                                "bg-card text-card-foreground border border-border rounded-2xl p-6 transition-all shadow-sm",
                                booking.status === 'cancelled' && "opacity-75 bg-muted/50"
                            )}>
                                {/* Status Badge & ID */}
                                <div className="flex justify-between items-start mb-4">
                                    <span className={cn(
                                        "px-2 py-1 rounded text-xs font-bold uppercase",
                                        booking.status === 'cancelled' 
                                            ? "bg-destructive/10 text-destructive" 
                                            : "bg-green-500/10 text-green-600"
                                    )}>
                                        {booking.status || 'confirmed'}
                                    </span>
                                    <span className="text-muted-foreground text-xs">#{booking.booking_id}</span>
                                </div>

                                {/* Event Info */}
                                <div className="flex gap-4 mb-4">
                                    <img 
                                        src={booking.img} 
                                        alt={booking.title} 
                                        className={cn(
                                            "w-20 h-20 rounded-lg object-cover bg-muted",
                                            booking.status === 'cancelled' && "grayscale"
                                        )}
                                    />
                                    <div>
                                        <h3 className="font-bold text-lg leading-tight line-clamp-2">{booking.title}</h3>
                                        <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(booking.event_date).toDateString()}
                                        </div>
                                        <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
                                            <MapPin className="h-3 w-3" />
                                            {booking.location}
                                        </div>
                                    </div>
                                </div>

                                {/* Booking Info */}
                                <div className="flex justify-between items-center border-t border-border pt-4 mb-4">
                                    <div>
                                        <span className="block text-muted-foreground text-xs">Quantity</span>
                                        <span className="font-bold">{booking.quantity} Tickets</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-muted-foreground text-xs">Total</span>
                                        <span className={cn(
                                            "font-bold",
                                            booking.status === 'cancelled' ? "text-muted-foreground line-through" : "text-primary"
                                        )}>
                                            ₹{booking.total_amount}
                                        </span>
                                    </div>
                                </div>

                                {booking.status === 'cancelled' ? (
                                    <div className="w-full bg-destructive/10 text-destructive font-bold py-2 rounded-xl flex items-center justify-center gap-2 border border-destructive/20">
                                        <Ban className="h-4 w-4" />
                                        Booking Cancelled & Refunded
                                    </div>
                                ) : (
                                    <div className="flex gap-2">
                                        <Button 
                                            onClick={() => setSelectedTicket(booking)}
                                            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 rounded-xl transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Ticket className="h-4 w-4" />
                                            View Ticket
                                        </Button>
                                        <Button 
                                            variant="destructive"
                                            onClick={() => handleCancel(booking.booking_id)}
                                            className="flex-1 font-bold py-2 rounded-xl transition-colors flex items-center justify-center gap-2"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Render the QR Modal if a ticket is selected */}
                {selectedTicket && (
                    <TicketGenerator 
                        bookingData={{
                            bookingId: selectedTicket.booking_id,
                            eventName: selectedTicket.title,
                            quantity: selectedTicket.quantity,
                            totalAmount: selectedTicket.total_amount
                        }} 
                        onClose={() => setSelectedTicket(null)} 
                    />
                )}
            </div>
        </Layout>
    );
};

export default MyBookings;
