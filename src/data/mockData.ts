export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  category: string;
  image: string;
  price: number | null;
  capacity: number;
  bookedCount: number;
  isFeatured?: boolean;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  totalBookings: number;
  totalSpent: number;
}

export interface Booking {
  id: string;
  eventId: string;
  clientId: string;
  ticketCount: number;
  totalPrice: number;
  status: "confirmed" | "pending" | "cancelled";
  createdAt: Date;
}

export interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
}

export const categories = [
  "Music",
  "Art",
  "Tech",
  "Food",
  "Sports",
  "Wellness",
  "Business",
  "Community",
];

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Summer Music Festival",
    description: "Join us for an incredible day of live music featuring local and international artists. Food trucks, art installations, and good vibes guaranteed!",
    date: new Date(2025, 0, 15),
    time: "14:00",
    location: "Central Park Amphitheater",
    category: "Music",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
    price: 45,
    capacity: 500,
    bookedCount: 342,
    isFeatured: true,
  },
  {
    id: "2",
    title: "Contemporary Art Exhibition",
    description: "Explore cutting-edge works from emerging artists pushing the boundaries of visual expression.",
    date: new Date(2025, 0, 20),
    time: "10:00",
    location: "Downtown Gallery",
    category: "Art",
    image: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800",
    price: null,
    capacity: 100,
    bookedCount: 67,
  },
  {
    id: "3",
    title: "Tech Startup Pitch Night",
    description: "Watch innovative startups present their ideas to a panel of investors. Network with entrepreneurs and tech enthusiasts.",
    date: new Date(2025, 0, 22),
    time: "18:30",
    location: "Innovation Hub",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    price: 25,
    capacity: 150,
    bookedCount: 89,
  },
  {
    id: "4",
    title: "Gourmet Food Festival",
    description: "Taste dishes from the city's top chefs. Live cooking demos, wine pairings, and culinary workshops.",
    date: new Date(2025, 0, 28),
    time: "11:00",
    location: "Waterfront Plaza",
    category: "Food",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
    price: 35,
    capacity: 300,
    bookedCount: 215,
    isFeatured: true,
  },
  {
    id: "5",
    title: "Sunrise Yoga in the Park",
    description: "Start your day with a peaceful yoga session surrounded by nature. All levels welcome. Mats provided.",
    date: new Date(2025, 1, 1),
    time: "06:30",
    location: "Riverside Park",
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
    price: null,
    capacity: 50,
    bookedCount: 38,
  },
  {
    id: "6",
    title: "5K Charity Run",
    description: "Run for a cause! All proceeds go to local children's hospitals. Medals for all finishers.",
    date: new Date(2025, 1, 5),
    time: "08:00",
    location: "City Stadium",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800",
    price: 20,
    capacity: 1000,
    bookedCount: 567,
  },
  {
    id: "7",
    title: "Entrepreneurs Networking Mixer",
    description: "Connect with fellow business owners and industry leaders. Complimentary refreshments and keynote speaker.",
    date: new Date(2025, 1, 10),
    time: "17:00",
    location: "Grand Hotel Ballroom",
    category: "Business",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
    price: 15,
    capacity: 200,
    bookedCount: 124,
  },
  {
    id: "8",
    title: "Community Garden Workshop",
    description: "Learn sustainable gardening techniques. Take home seedlings and connect with your neighbors.",
    date: new Date(2025, 1, 14),
    time: "09:00",
    location: "Green Thumb Community Center",
    category: "Community",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
    price: null,
    capacity: 30,
    bookedCount: 22,
  },
  {
    id: "9",
    title: "Jazz Night Under the Stars",
    description: "An evening of smooth jazz with the city's finest musicians. Bring your own blanket and picnic.",
    date: new Date(2025, 1, 18),
    time: "19:00",
    location: "Botanical Gardens",
    category: "Music",
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800",
    price: 30,
    capacity: 250,
    bookedCount: 178,
    isFeatured: true,
  },
  {
    id: "10",
    title: "Digital Art Workshop",
    description: "Learn digital illustration techniques from professional artists. Tablets and software provided.",
    date: new Date(2025, 1, 22),
    time: "13:00",
    location: "Creative Studio",
    category: "Art",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
    price: 50,
    capacity: 20,
    bookedCount: 15,
  },
];

export const mockClients: Client[] = [
  {
    id: "c1",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 (555) 123-4567",
    createdAt: new Date(2024, 8, 15),
    totalBookings: 5,
    totalSpent: 175,
  },
  {
    id: "c2",
    name: "Michael Chen",
    email: "m.chen@email.com",
    phone: "+1 (555) 234-5678",
    createdAt: new Date(2024, 9, 3),
    totalBookings: 3,
    totalSpent: 95,
  },
  {
    id: "c3",
    name: "Emily Rodriguez",
    email: "emily.r@email.com",
    phone: "+1 (555) 345-6789",
    createdAt: new Date(2024, 9, 20),
    totalBookings: 8,
    totalSpent: 320,
  },
  {
    id: "c4",
    name: "David Kim",
    email: "david.kim@email.com",
    phone: "+1 (555) 456-7890",
    createdAt: new Date(2024, 10, 5),
    totalBookings: 2,
    totalSpent: 70,
  },
  {
    id: "c5",
    name: "Jessica Williams",
    email: "j.williams@email.com",
    phone: "+1 (555) 567-8901",
    createdAt: new Date(2024, 10, 18),
    totalBookings: 6,
    totalSpent: 245,
  },
  {
    id: "c6",
    name: "Robert Taylor",
    email: "r.taylor@email.com",
    phone: "+1 (555) 678-9012",
    createdAt: new Date(2024, 11, 1),
    totalBookings: 4,
    totalSpent: 160,
  },
];

export const mockBookings: Booking[] = [
  { id: "b1", eventId: "1", clientId: "c1", ticketCount: 2, totalPrice: 90, status: "confirmed", createdAt: new Date(2024, 11, 10) },
  { id: "b2", eventId: "3", clientId: "c1", ticketCount: 1, totalPrice: 25, status: "confirmed", createdAt: new Date(2024, 11, 12) },
  { id: "b3", eventId: "4", clientId: "c2", ticketCount: 3, totalPrice: 105, status: "confirmed", createdAt: new Date(2024, 11, 15) },
  { id: "b4", eventId: "1", clientId: "c3", ticketCount: 4, totalPrice: 180, status: "confirmed", createdAt: new Date(2024, 11, 18) },
  { id: "b5", eventId: "6", clientId: "c3", ticketCount: 2, totalPrice: 40, status: "pending", createdAt: new Date(2024, 11, 20) },
  { id: "b6", eventId: "9", clientId: "c4", ticketCount: 2, totalPrice: 60, status: "confirmed", createdAt: new Date(2024, 11, 22) },
  { id: "b7", eventId: "7", clientId: "c5", ticketCount: 1, totalPrice: 15, status: "confirmed", createdAt: new Date(2024, 11, 25) },
  { id: "b8", eventId: "4", clientId: "c6", ticketCount: 2, totalPrice: 70, status: "cancelled", createdAt: new Date(2024, 11, 28) },
];

export const ticketTypes: TicketType[] = [
  { id: "t1", name: "General Admission", price: 0, description: "Standard entry" },
  { id: "t2", name: "VIP", price: 25, description: "Priority seating & welcome drink" },
  { id: "t3", name: "Premium", price: 50, description: "VIP benefits + meet & greet" },
];
