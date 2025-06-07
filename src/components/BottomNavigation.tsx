
import { Home, Users, Plus, BookOpen, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "mentorship", icon: Users, label: "Mentorship" },
    { id: "post", icon: Plus, label: "Post" },
    { id: "skillup", icon: BookOpen, label: "Skill Up" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 safe-area-pb">
      <div className="flex items-center justify-around py-1 px-2 max-w-6xl mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center p-2 min-w-[56px] transition-colors touch-manipulation",
                isActive 
                  ? "text-primary" 
                  : "text-gray-500 hover:text-primary active:text-primary"
              )}
            >
              <Icon className={cn(
                "h-5 w-5 mb-0.5",
                tab.id === "post" && isActive && "bg-primary text-white rounded-full p-1 h-7 w-7"
              )} />
              <span className="text-xs font-medium leading-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
