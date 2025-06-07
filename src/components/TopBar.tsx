
import { Bell, Search, User, Menu, Settings, HelpCircle, Globe, Activity, LogOut, MessageSquare, Heart, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SidebarTrigger } from "./ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";

interface TopBarProps {
  onLogoClick?: () => void;
}

const TopBar = ({ onLogoClick }: TopBarProps) => {
  const notifications = [
    { id: 1, type: "message", text: "New message from Dr. Sarah Mwangi", time: "2m ago" },
    { id: 2, type: "like", text: "James Omondi liked your post", time: "1h ago" },
    { id: 3, type: "comment", text: "Jane Wanjiku commented on your project", time: "3h ago" },
    { id: 4, type: "reminder", text: "Structural Analysis webinar starts in 30 minutes", time: "5h ago" },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-4 w-4" />;
      case "like":
        return <Heart className="h-4 w-4" />;
      case "reminder":
        return <Calendar className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 w-full">
      <div className="flex items-center justify-between px-3 py-2 md:px-4 md:py-3">
        {/* Left Section */}
        <div className="flex items-center space-x-2 md:space-x-4 min-w-0">
          {/* Navigation Menu Trigger - Only visible on mobile */}
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
          
          {/* Logo - clickable home button */}
          <div className="flex items-center min-w-0">
            <button 
              onClick={onLogoClick}
              className="text-lg md:text-xl font-bold text-primary hover:text-primary/80 transition-colors truncate"
            >
              BUILDLINK
            </button>
          </div>
        </div>

        {/* Center Section - Search (Hidden on very small screens) */}
        <div className="hidden sm:flex flex-1 max-w-xs md:max-w-md mx-2 md:mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 bg-gray-50 border-gray-200 text-sm"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-1 md:space-x-2">
          {/* Search button for mobile */}
          <div className="sm:hidden">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-8 w-8 md:h-10 md:w-10">
                <Bell className="h-4 w-4 md:h-5 md:w-5" />
                {notifications.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {notifications.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 md:w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex items-start space-x-3 p-3">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{notification.text}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-primary font-medium">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Account Menu Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 md:h-10 md:w-10">
                <User className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 md:w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings & Privacy</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Globe className="mr-2 h-4 w-4" />
                <span>Language</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Activity className="mr-2 h-4 w-4" />
                <span>Activity</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
