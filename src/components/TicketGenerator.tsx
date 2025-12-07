import React, { useRef } from 'react';
import QRCode from 'react-qr-code';
import { toPng } from 'html-to-image';
import { Button } from "@/components/ui/button";
import { X, Download } from "lucide-react";

interface TicketGeneratorProps {
  bookingData: {
    bookingId: number;
    eventName: string;
    quantity: number;
    totalAmount: number;
  };
  onClose: () => void;
}

const TicketGenerator: React.FC<TicketGeneratorProps> = ({ bookingData, onClose }) => {
  const ticketRef = useRef<HTMLDivElement>(null);

  const downloadTicket = async () => {
    if (ticketRef.current === null) return;
    try {
      const dataUrl = await toPng(ticketRef.current);
      const link = document.createElement('a');
      link.download = `ticket-${bookingData.bookingId}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to download ticket', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm text-center relative animate-in fade-in zoom-in duration-300">
        <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            onClick={onClose}
        >
            <X className="h-5 w-5" />
        </Button>

        <h2 className="text-2xl font-bold text-purple-900 mb-1">Your E-Ticket</h2>
        <p className="text-gray-400 text-sm mb-6">Scan this at the entrance</p>

        {/* --- TICKET CARD --- */}
        <div ref={ticketRef} className="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-300">
          <div className="bg-white p-2 rounded-xl shadow-sm mb-4 inline-block">
             <QRCode 
                size={160} 
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={JSON.stringify({ id: bookingData.bookingId, event: bookingData.eventName })} 
                viewBox={`0 0 256 256`}
             />
          </div>
          <div className="text-left border-t pt-4">
            <h3 className="font-bold text-lg text-purple-900 leading-tight">{bookingData.eventName}</h3>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>Tickets: {bookingData.quantity}</span>
                <span className="font-bold text-black">₹{bookingData.totalAmount}</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">Booking ID: #{bookingData.bookingId}</p>
          </div>
        </div>
        {/* ------------------- */}

        <div className="flex gap-3 mt-6">
            <Button onClick={onClose} variant="outline" className="flex-1 rounded-full">
                Close
            </Button>
            <Button onClick={downloadTicket} className="flex-1 rounded-full bg-yellow-400 text-black hover:bg-yellow-500">
                <Download className="mr-2 h-4 w-4" />
                Download
            </Button>
        </div>
      </div>
    </div>
  );
};

export default TicketGenerator;
