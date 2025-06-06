
import { Bell, Search, User, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SidebarTrigger } from "./ui/sidebar";

interface TopBarProps {
  onLogoClick?: () => void;
}

const TopBar = ({ onLogoClick }: TopBarProps) => {
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
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
