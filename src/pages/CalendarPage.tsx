import { Layout } from "@/components/layout/Layout";
import { EventCalendar } from "@/components/calendar/EventCalendar";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const CalendarPage = () => {
  return (
    <Layout>
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold mb-2">Event Calendar</h1>
            <p className="text-muted-foreground">
              Browse events by date and find your next experience
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/">
              <Button variant="outline" className="gap-2">
                <LayoutGrid className="h-4 w-4" />
                List View
              </Button>
            </Link>
            <Button className="gap-2 gradient-primary text-primary-foreground">
              <Calendar className="h-4 w-4" />
              Calendar
            </Button>
          </div>
        </div>

        <EventCalendar />
      </div>
    </Layout>
  );
};

export default CalendarPage;
