
import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContentFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  filterType?: string;
}

const ContentFilters = ({ activeFilter, onFilterChange, filterType = "home" }: ContentFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const homeFilters = [
    { id: "latest", label: "Latest" },
    { id: "news", label: "News" },
    { id: "jobs", label: "Jobs" },
    { id: "portfolios", label: "Portfolios" },
  ];

  const skillUpFilters = [
    { id: "courses", label: "Courses" },
    { id: "webinars", label: "Webinars" },
    { id: "articles", label: "Articles" },
    { id: "certifications", label: "Certifications" },
  ];

  const filters = filterType === "skillup" ? skillUpFilters : homeFilters;

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40 w-full">
      <div className={cn(
        "py-2 md:py-3 w-full",
        // Mobile: minimal padding for max content width
        "px-3",
        // Desktop: Instagram-like max width
        "md:px-5 md:max-w-[935px] md:mx-auto"
      )}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700">Filters</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-6 w-6 p-0"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        {isExpanded && (
          <div className="flex space-x-1 overflow-x-auto pb-1 scrollbar-hide">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "ghost"}
                onClick={() => onFilterChange(filter.id)}
                size="sm"
                className={cn(
                  "whitespace-nowrap flex-shrink-0 text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2",
                  activeFilter === filter.id 
                    ? "bg-primary text-white" 
                    : "text-gray-600 hover:text-primary hover:bg-gray-100"
                )}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentFilters;
