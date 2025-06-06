
import { Home, Users, Plus, BookOpen, User, X } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ activeTab, onTabChange, isOpen, onClose }: SidebarProps) => {
  const tabs = [
    { id: "home", icon: Home, label: "Home Feed" },
    { id: "mentorship", icon: Users, label: "Mentorship Hub" },
    { id: "post", icon: Plus, label: "Post/Create" },
    { id: "skillup", icon: BookOpen, label: "Skill Up" },
    { id: "profile", icon: User, label: "Profile Board" },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "md:translate-x-0 md:static md:z-auto"
      )}>
        <div className="flex flex-col h-full pt-20">
          {/* Close button for mobile */}
          <div className="flex justify-end p-4 md:hidden">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Navigation Items */}
          <nav className="flex-1 px-4 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    onTabChange(tab.id);
                    onClose(); // Close sidebar on mobile after selection
                  }}
                  className={cn(
                    "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left",
                    isActive 
                      ? "bg-primary text-white" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <Icon className={cn(
                    "h-5 w-5",
                    tab.id === "post" && isActive && "bg-white text-primary rounded-full p-1 h-6 w-6"
                  )} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
