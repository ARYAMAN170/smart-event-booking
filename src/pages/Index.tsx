import { useState, useMemo, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { EventCard } from "@/components/events/EventCard";
import { EventFilters } from "@/components/events/EventFilters";
import { Button } from "@/components/ui/button";
import { fetchEvents, EventData } from "@/utils/api";
import { Sparkles, Calendar, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const heroTitleVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
} as const;

const heroTaglineVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: 0.3 },
  },
} as const;

const heroParagraphVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: 0.6 },
  },
} as const;

const heroGlowVariants = {
  glow: {
    textShadow: [
      "0 0 0px rgba(254,240,138,0.0)",
      "0 0 25px rgba(254,240,138,0.45)",
      "0 0 0px rgba(254,240,138,0.0)",
    ],
    transition: { duration: 5.5, repeat: Infinity, repeatType: "mirror" as const },
  },
};

const Index = () => {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // New Filter States
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([1000]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
        // Set initial max price
        const max = Math.max(...data.map(e => e.price), 0);
        if (max > 0) setPriceRange([max]);
      } catch (err) {
        setError("Failed to load events. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const locations = useMemo(() => Array.from(new Set(events.map(e => e.location))).sort(), [events]);
  const maxPrice = useMemo(() => Math.max(...events.map(e => e.price), 0) || 1000, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase()) ||
        event.location.toLowerCase().includes(search.toLowerCase());
      
      const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(event.location);
      const matchesPrice = event.price <= priceRange[0];

      // Category filtering removed as API doesn't support it yet, or we can infer it
      // const matchesCategory = !selectedCategory || event.category === selectedCategory;
      return matchesSearch && matchesLocation && matchesPrice;
    });
  }, [search, events, selectedLocations, priceRange]);

  // Featured logic removed or adapted. Assuming no featured flag in API for now.
  const featuredEvents: EventData[] = []; 
  const regularEvents = filteredEvents;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[100vh] rounded-b-[15vw] flex items-center justify-center bg-gradient-to-br from-violet-500 to-purple-700">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="absolute inset-0 bg-[length:200%_200%] bg-gradient-to-r from-violet-400 via-purple-500 to-fuchsia-900 opacity-50 mix-blend-soft-light animate-gradient-slow" />
        <div className="absolute top-0 left-0  w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
        
        <div className="container relative z-10 py-16 md:py-24 ">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-6xl mx-auto text-center"
          >
           
            <motion.h1
              className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold mb-8 tracking-tight leading-tight text-yellow-200"
              variants={heroTitleVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.span
                className="whitespace-nowrap"
                variants={heroGlowVariants}
                initial={false}
                animate="glow"
              >
                Your Next Big Event
              </motion.span>
              <motion.span
                className="block text-yellow-200 drop-shadow-md mt-2"
                variants={heroTaglineVariants}
                initial="hidden"
                animate="visible"
              >
                Starts Here.
              </motion.span>
            </motion.h1>
            
            <motion.p
              className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
              variants={heroParagraphVariants}
              initial="hidden"
              animate="visible"
            >
              Explore curated events from local organizers. From music festivals to workshops,
              find your next unforgettable experience.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-6"
            >
              <Button size="lg" className="h-14 px-8 text-lg gap-2 bg-white text-purple-700 hover:bg-white/90 shadow-lg transition-all duration-300 rounded-full font-semibold">
                Explore Events
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Link to="/calendar">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50 rounded-full backdrop-blur-sm transition-all duration-300">
                  <Calendar className="h-5 w-5" />
                  View Calendar
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Events Section */}
      <section className="container py-12">
        <div className="mb-8">
          <EventFilters
            search={search}
            onSearchChange={setSearch}
            locations={locations}
            selectedLocations={selectedLocations}
            onLocationChange={setSelectedLocations}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            maxPrice={maxPrice}
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-accent" />
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-400">
            <p>{error}</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No events found matching your criteria</p>
            <Button
              variant="link"
              onClick={() => {
                setSearch("");
                setSelectedLocations([]);
                setPriceRange([maxPrice]);
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
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  Featured Events
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {featuredEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <EventCard event={event} featured />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* All Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="font-display text-2xl font-bold mb-6">
                All Events
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                  >
                    <EventCard event={event} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </section>
    </Layout>
  );
};

export default Index;
