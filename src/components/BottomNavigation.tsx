
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, Users, PlusCircle, BookOpen, User } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const tabs = [
    { key: 'home', label: 'Home', icon: Home },
    { key: 'mentorship', label: 'Mentorship', icon: Users },
    { key: 'post', label: 'Post', icon: PlusCircle },
    { key: 'skillup', label: 'SkillUp', icon: BookOpen },
    { key: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex items-center justify-around py-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          
          return (
            <Button
              key={tab.key}
              variant="ghost"
              size="sm"
              onClick={() => onTabChange(tab.key)}
              className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 ${
                isActive ? 'text-primary' : 'text-gray-600'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-gray-600'}`} />
              <span className="text-xs">{tab.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
