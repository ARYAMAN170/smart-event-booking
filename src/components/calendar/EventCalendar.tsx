import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Event } from "@/data/mockData";
import { format, isSameDay } from "date-fns";
import { CalendarDays, MapPin, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface EventCalendarProps {
  events: Event[];
}

export function EventCalendar({ events }: EventCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const eventsOnSelectedDate = selectedDate
    ? events.filter((event) => isSameDay(event.date, selectedDate))
    : [];

  const eventDates = events.map((event) => event.date);

  const modifiers = {
    hasEvent: (date: Date) => eventDates.some((eventDate) => isSameDay(date, eventDate)),
  };

  const modifiersStyles = {
    hasEvent: {
      fontWeight: "bold",
    },
  };

  return (
    <div className="grid lg:grid-cols-[1fr_400px] gap-6">
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 font-display">
            <CalendarDays className="h-5 w-5 text-primary" />
            Event Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="pointer-events-auto w-full"
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 w-full",
              month: "space-y-4 w-full",
              table: "w-full border-collapse",
              head_row: "flex w-full",
              head_cell: "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] text-center",
              row: "flex w-full mt-2",
              cell: cn(
                "flex-1 h-12 sm:h-16 text-center text-sm p-0 relative",
                "[&:has([aria-selected])]:bg-primary/10 rounded-lg"
              ),
              day: cn(
                "h-full w-full p-0 font-normal flex flex-col items-center justify-center rounded-lg",
                "hover:bg-muted transition-colors cursor-pointer",
                "aria-selected:opacity-100"
              ),
              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
              day_today: "bg-accent/20 text-accent-foreground font-bold",
              day_outside: "text-muted-foreground opacity-50",
              day_disabled: "text-muted-foreground opacity-50",
            }}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            components={{
              DayContent: ({ date }) => {
                const hasEvents = eventDates.some((d) => isSameDay(d, date));
                const eventCount = events.filter((e) => isSameDay(e.date, date)).length;
                return (
                  <div className="flex flex-col items-center gap-1">
                    <span>{date.getDate()}</span>
                    {hasEvents && (
                      <div className="flex gap-0.5">
                        {eventCount <= 3 ? (
                          Array.from({ length: eventCount }).map((_, i) => (
                            <div
                              key={i}
                              className="w-1.5 h-1.5 rounded-full gradient-primary"
                            />
                          ))
                        ) : (
                          <>
                            <div className="w-1.5 h-1.5 rounded-full gradient-primary" />
                            <span className="text-[10px] text-primary font-medium">
                              +{eventCount}
                            </span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              },
            }}
          />
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="font-display text-lg">
            {selectedDate ? (
              <span>
                Events on{" "}
                <span className="text-primary">
                  {format(selectedDate, "MMMM d, yyyy")}
                </span>
              </span>
            ) : (
              "Select a date"
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {eventsOnSelectedDate.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CalendarDays className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No events on this date</p>
            </div>
          ) : (
            <div className="space-y-3">
              {eventsOnSelectedDate.map((event) => (
                <Link key={event.id} to={`/events/${event.id}`}>
                  <div className="group p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium group-hover:text-primary transition-colors truncate">
                          {event.title}
                        </h4>
                        <div className="flex flex-wrap gap-2 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {event.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {event.category}
                          </Badge>
                          {event.price ? (
                            <Badge variant="secondary" className="text-xs">
                              ${event.price}
                            </Badge>
                          ) : (
                            <Badge className="bg-success/20 text-success text-xs">
                              Free
                            </Badge>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
