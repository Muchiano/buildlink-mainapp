import React from "react";
import { Home, Users, Plus, BookOpen, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AppSidebar = ({ activeTab, onTabChange }: AppSidebarProps) => {
  const items = [
    {
      id: "home",
      title: "Home Feed",
      icon: Home,
    },
    {
      id: "post",
      title: "Create",
      icon: Plus,
    },
    {
      id: "skillup",
      title: "Resource Hub",
      icon: BookOpen,
    },
    {
      id: "profile",
      title: "Profile Board",
      icon: User,
    },
  ];

  return (
    <div className="fixed top-0 h-full pt-14 z-10">
      <div className="flex flex-col p-4">
        <nav className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "flex items-center gap-3 w-full p-3 rounded-md text-left transition-colors",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                    : "text-sidebar-foreground"
                )}
              >
                <Icon size={20} />
                <span>{item.title}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default AppSidebar;