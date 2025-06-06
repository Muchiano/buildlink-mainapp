
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface ContentFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const ContentFilters = ({ activeFilter, onFilterChange }: ContentFiltersProps) => {
  const filters = [
    { id: "latest", label: "Latest" },
    { id: "news", label: "News" },
    { id: "jobs", label: "Jobs" },
    { id: "portfolios", label: "Portfolios" },
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-16 z-40">
      <div className="flex space-x-1 overflow-x-auto">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? "default" : "ghost"}
            onClick={() => onFilterChange(filter.id)}
            className={cn(
              "whitespace-nowrap",
              activeFilter === filter.id 
                ? "bg-primary text-white" 
                : "text-gray-600 hover:text-primary hover:bg-gray-100"
            )}
          >
            {filter.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ContentFilters;
