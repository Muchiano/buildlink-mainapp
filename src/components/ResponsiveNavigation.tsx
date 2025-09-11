import { useState } from "react";
import { Home, Users, Plus, BookOpen, User, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface ResponsiveNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  loading?: boolean;
}

const ResponsiveNavigation = ({ activeTab, onTabChange, loading }: ResponsiveNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { id: "home", title: "Home Feed", icon: Home },
    { id: "post", title: "Create", icon: Plus },
    { id: "skillup", title: "Resource Hub", icon: BookOpen },
    { id: "profile", title: "Profile Board", icon: User },
  ];

  const handleTabChange = (tab: string) => {
    onTabChange(tab);
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="">
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                disabled={loading}
                className={cn(
                  "flex items-center gap-3 w-full p-3 rounded-md text-left transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive 
                    ? "bg-accent text-accent-foreground font-medium" 
                    : "text-foreground",
                  loading && "opacity-50 cursor-not-allowed"
                )}
              >
                <Icon size={20} />
                <span>{item.title}</span>
                {loading && isActive && (
                  <div className="ml-auto animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Navigation</h2>
            </div>
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    disabled={loading}
                    className={cn(
                      "flex items-center gap-3 w-full p-3 rounded-md text-left transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      isActive 
                        ? "bg-accent text-accent-foreground font-medium" 
                        : "text-foreground",
                      loading && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <Icon size={20} />
                    <span>{item.title}</span>
                    {loading && isActive && (
                      <div className="ml-auto animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
        <div className="flex items-center justify-around py-2 max-w-6xl mx-auto">
          {navigationItems.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                disabled={loading}
                className={cn(
                  "flex flex-col items-center p-2 min-w-[60px] transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-primary",
                  loading && "opacity-50 cursor-not-allowed"
                )}
              >
                <Icon
                  className={cn(
                    "h-6 w-6 mb-1",
                    tab.id === "post" &&
                      isActive &&
                      "bg-primary text-primary-foreground rounded-full p-1 h-8 w-8"
                  )}
                />
                <span className="text-xs font-medium">{tab.title}</span>
                {loading && isActive && (
                  <div className="absolute -top-1 -right-1 animate-spin rounded-full h-3 w-3 border-b-2 border-primary"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ResponsiveNavigation;