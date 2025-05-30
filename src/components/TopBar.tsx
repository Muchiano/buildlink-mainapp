
import { Search, Bell } from "lucide-react";
import { Button } from "./ui/button";

const TopBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">BL</span>
          </div>
          <h1 className="text-xl font-bold text-primary hidden sm:block">BuildLink Kenya</h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search professionals, projects, skills..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-gray-50"
            />
          </div>
        </div>

        {/* Notifications */}
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-primary relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">5</span>
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
