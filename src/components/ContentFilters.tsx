
import React from 'react';
import { Button } from '@/components/ui/button';

interface ContentFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  filterType: 'home' | 'skillup';
}

const ContentFilters = ({ activeFilter, onFilterChange, filterType }: ContentFiltersProps) => {
  const homeFilters = [
    { key: 'latest', label: 'Latest' },
    { key: 'trending', label: 'Trending' },
    { key: 'following', label: 'Following' }
  ];

  const skillupFilters = [
    { key: 'all', label: 'All Courses' },
    { key: 'beginner', label: 'Beginner' },
    { key: 'intermediate', label: 'Intermediate' },
    { key: 'advanced', label: 'Advanced' },
    { key: 'free', label: 'Free' },
    { key: 'in-progress', label: 'In Progress' }
  ];

  const filters = filterType === 'skillup' ? skillupFilters : homeFilters;

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex space-x-2 overflow-x-auto">
          {filters.map(filter => (
            <Button
              key={filter.key}
              variant={activeFilter === filter.key ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onFilterChange(filter.key)}
              className="whitespace-nowrap"
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentFilters;
