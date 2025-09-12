import { Home, Plus, BookOpen, User, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

interface ResponsiveNavigationProps {
  loading?: boolean;
}

const ResponsiveNavigation = ({ loading }: ResponsiveNavigationProps) => {
  const location = useLocation();

  const navigationItems = [
    { id: "home", title: "Home Feed", icon: Home, path: "/" },
    // { id: "mentorship", title: "Mentorship", icon: Users, path: "/mentorship" },
    { id: "post", title: "Create", icon: Plus, path: "/create-post" },
    { id: "skillup", title: "Resource Hub", icon: BookOpen, path: "/resource-hub" },
    { id: "profile", title: "Profile Board", icon: User, path: "/profile" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="md:block hidden">
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.id}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 w-full p-3 rounded-md text-left transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  active 
                    ? "bg-accent text-accent-foreground font-medium" 
                    : "text-foreground",
                  loading && "opacity-50 cursor-not-allowed"
                )}
              >
                <Icon size={20} />
                <span>{item.title}</span>
                {loading && active && (
                  <div className="ml-auto animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>


      {/* Mobile Bottom Navigation */}
      <div className="md:hidden block fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
        <div className="flex items-center justify-around py-2 max-w-6xl mx-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.id}
                to={item.path}
                className={cn(
                  "flex flex-col items-center p-2 min-w-[60px] transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-primary",
                  loading && "opacity-50 cursor-not-allowed"
                )}
              >
                <Icon
                  className={cn(
                    "h-6 w-6 mb-1",
                    item.id === "post" &&
                      active &&
                      "bg-primary text-primary-foreground rounded-full p-1 h-8 w-8"
                  )}
                />
                <span className="text-xs font-medium">{item.title}</span>
                {loading && active && (
                  <div className="absolute -top-1 -right-1 animate-spin rounded-full h-3 w-3 border-b-2 border-primary"></div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ResponsiveNavigation;