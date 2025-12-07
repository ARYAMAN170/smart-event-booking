import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, LayoutGrid, Settings, LogIn, Menu, X, LogOut, User, Ticket } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const navItems = [
  { label: "Events", href: "/", icon: LayoutGrid },
  { label: "Calendar", href: "/calendar", icon: Calendar },
  { label: "My Tickets", href: "/my-bookings", icon: Ticket },
  { label: "Admin", href: "/admin", icon: Settings },
];

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const filteredNavItems = navItems.filter(item => {
    if (item.href === "/admin") {
      return user?.role === "admin";
    }
    if (item.href === "/my-bookings") {
      return !!token;
    }
    return true;
  });

  return (
    <header className="absolute top-0 z-50 w-full bg-transparent border-none pt-6">
      <div className="container flex h-16 items-center justify-between relative">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-bold text-white tracking-tight">
            Graviti
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {filteredNavItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link 
                key={item.href} 
                to={item.href}
                className={cn(
                  "text-lg font-medium transition-colors duration-200",
                  isActive ? "text-accent" : "text-white hover:text-accent"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {token ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-white">
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">
                  {user?.firstName || user?.email?.split('@')[0] || 'User'}
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-white hover:text-white hover:bg-white/20"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="lg" className="gap-2 rounded-full bg-white text-purple-700 font-semibold hover:bg-white/90 hover:text-purple-800 border-none shadow-md transition-all">
                <LogIn className="h-5 w-5" />
                Sign In
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <nav className="container py-4 flex flex-col gap-2">
            {filteredNavItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-2",
                      isActive ? "bg-accent text-accent-foreground" : "text-white hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
            {token ? (
              <>
                <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium">
                  <User className="h-4 w-4" />
                  {user?.firstName || user?.email?.split('@')[0] || 'User'}
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-2 text-red-200 hover:text-red-100 hover:bg-red-500/20"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full gap-2 mt-2 bg-white text-purple-700 hover:bg-white/90 border-none">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
