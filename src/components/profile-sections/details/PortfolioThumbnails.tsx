
import React from "react";
import { Button } from "@/components/ui/button";
import PortfolioThumbnail from "./PortfolioThumbnail";

type PortfolioItem = {
  id: string;
  name: string;
  url: string;
  type: string;
  description?: string;
};

interface PortfolioThumbnailsProps {
  portfolioList: PortfolioItem[];
  onMainThumbnailClick: () => void;
  onBrowseAllClick: () => void;
  updating?: boolean;
}

const PortfolioThumbnails: React.FC<PortfolioThumbnailsProps> = ({
  portfolioList,
  onMainThumbnailClick,
  onBrowseAllClick,
  updating = false,
}) => {
  const mainItem = portfolioList[0];
  const miniItems = portfolioList.slice(1, 3);

  return (
    <div>
      <div className="flex gap-4 flex-col sm:flex-row">
        {/* Main Thumbnail */}
        {mainItem && (
          <div className="flex flex-col items-center w-full sm:w-28 min-w-20">
            <div
              className="w-full sm:w-28 h-40 relative rounded-lg overflow-hidden border shadow cursor-pointer group hover-scale transition"
              onClick={onMainThumbnailClick}
              tabIndex={updating ? -1 : 0}
              aria-label="Open main project gallery"
              style={{ pointerEvents: updating ? 'none' : 'auto' }}
            >
              <PortfolioThumbnail
                type={mainItem.type}
                url={mainItem.url}
                name={mainItem.name}
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/50 to-transparent px-2 py-1">
                <span className="text-xs text-white font-semibold">{mainItem.name}</span>
              </div>
            </div>
          </div>
        )}
        {/* Two Mini Thumbnails stacked */}
        <div className="flex flex-row sm:flex-col gap-3">
          {miniItems.map(item => (
            <div
              key={item.id}
              className="w-20 h-20 rounded-lg overflow-hidden border shadow relative cursor-pointer group hover-scale transition"
              onClick={onMainThumbnailClick}
              tabIndex={updating ? -1 : 0}
              style={{ pointerEvents: updating ? 'none' : 'auto' }}
              aria-label="Open project gallery"
            >
              <PortfolioThumbnail
                type={item.type}
                url={item.url}
                name={item.name}
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/55 to-transparent px-1 py-0.5">
                <span className="text-xs text-white">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Browse All Button */}
      {portfolioList.length > 0 && (
        <div className="mt-4 text-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onBrowseAllClick}
            disabled={updating}
          >
            Browse All Projects
          </Button>
        </div>
      )}
    </div>
  );
};

export default PortfolioThumbnails;
