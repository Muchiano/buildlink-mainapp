
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserProfileButton from "@/components/UserProfileButton";

interface TopBarProps {
  onLogoClick: () => void;
}

const TopBar = ({ onLogoClick }: TopBarProps) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4 max-w-6xl mx-auto">
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer" 
          onClick={onLogoClick}
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          <span className="font-semibold text-lg hidden sm:block">LearnHub</span>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <UserProfileButton />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
