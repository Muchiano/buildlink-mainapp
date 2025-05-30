
import { Search, Bell } from "lucide-react";
import { Button } from "./ui/button";

const TopBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">BL</span>
          </div>
          <h1 className="text-xl font-bold text-primary hidden sm:block">BUILDLINK</h1>
        </div>

        {/* Search and Notifications */}
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-primary">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-primary relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
