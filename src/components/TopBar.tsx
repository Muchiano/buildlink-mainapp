
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
    <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Navigation Menu Trigger */}
          <SidebarTrigger />
          
          {/* Logo - clickable home button */}
          <div className="flex items-center">
            <button 
              onClick={onLogoClick}
              className="text-xl font-bold text-primary hover:text-primary/80 transition-colors"
            >
              BUILDLINK
            </button>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {notifications.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
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
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
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
