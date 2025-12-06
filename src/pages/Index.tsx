import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { EventCard } from "@/components/events/EventCard";
import { EventFilters } from "@/components/events/EventFilters";
import { Button } from "@/components/ui/button";
import { mockEvents } from "@/data/mockData";
import { Sparkles, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredEvents = useMemo(() => {
    return mockEvents.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase()) ||
        event.location.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !selectedCategory || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const featuredEvents = filteredEvents.filter((e) => e.isFeatured);
  const regularEvents = filteredEvents.filter((e) => !e.isFeatured);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.15),transparent_50%)]" />
        
        <div className="container relative py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Discover Amazing Events
            </div>
            
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              Find Events That
              <span className="block text-gradient-primary">Move You</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Explore curated events from local organizers. From music festivals to workshops,
              find your next unforgettable experience.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="gap-2 gradient-primary text-primary-foreground hover:opacity-90">
                Explore Events
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Link to="/calendar">
                <Button size="lg" variant="outline" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  View Calendar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="container py-12">
        <div className="mb-8">
          <EventFilters
            search={search}
            onSearchChange={setSearch}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No events found matching your criteria</p>
            <Button
              variant="link"
              onClick={() => {
                setSearch("");
                setSelectedCategory(null);
              }}
              className="mt-2"
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <>
            {/* Featured Events */}
            {featuredEvents.length > 0 && (
              <div className="mb-12">
                <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  Featured Events
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {featuredEvents.map((event) => (
                    <EventCard key={event.id} event={event} featured />
                  ))}
                </div>
              </div>
            )}

            {/* All Events */}
            <div>
              <h2 className="font-display text-2xl font-bold mb-6">
                {selectedCategory ? `${selectedCategory} Events` : "All Events"}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </Layout>
  );
};

export default Index;
