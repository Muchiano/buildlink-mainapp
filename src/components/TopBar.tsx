
import { Bell, Menu, Search, BarChart3, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import UserProfileButton from "@/components/UserProfileButton";
import SearchDialog from "@/components/SearchDialog";
import NotificationsDropdown from "@/components/NotificationsDropdown";
import { useIsAdmin } from "@/hooks/useIsAdmin";

interface TopBarProps {
  onLogoClick: () => void;
  onMenuClick?: () => void;
}

const TopBar = ({ onLogoClick, onMenuClick }: TopBarProps) => {
  const { isAdmin } = useIsAdmin();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4 max-w-7xl mx-auto">
        {/* Left side - Menu + Logo */}
        <div className="flex items-center space-x-3">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={onLogoClick}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="font-semibold text-lg">BuildLink</span>
          </div>
        </div>

        {/* Center - Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <SearchDialog>
            <div className="relative w-full cursor-pointer">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search posts, mentors, courses..."
                className="pl-10 w-full cursor-pointer"
                readOnly
              />
            </div>
          </SearchDialog>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-2">
          <SearchDialog>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>
          </SearchDialog>
          {isAdmin && (
            <>
              <Link to="/admin-analytics">
                <Button variant="ghost" size="icon" title="Analytics">
                  <BarChart3 className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/admin-resources">
                <Button variant="ghost" size="icon" title="Admin Panel">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
            </>
          )}
          <NotificationsDropdown />
          <UserProfileButton />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
