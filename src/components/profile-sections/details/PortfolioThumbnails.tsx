
import React from "react";
import { Button } from "@/components/ui/button";
import PortfolioThumbnail from "./PortfolioThumbnail";

type PortfolioItem = {
  id: string;
  name: string;
  url: string;
  type: string;
  description?: string;
  thumbnailUrl?: string;
};

interface PortfolioThumbnailsProps {
  portfolioList: PortfolioItem[];
  onThumbnailClick: (index: number) => void;
  onBrowseAllClick: () => void;
  updating?: boolean;
}

const PortfolioThumbnails: React.FC<PortfolioThumbnailsProps> = ({
  portfolioList,
  onThumbnailClick,
  onBrowseAllClick,
  updating = false,
}) => {
  // Thumbnails displayed: first 3 (main + two mini)
  const mainIndex = 0;
  const miniIndices = [1, 2].filter(i => i < portfolioList.length);

  return (
    <div>
      <div className="flex gap-4 flex-col sm:flex-row">
        {/* Main Thumbnail */}
        {portfolioList[mainIndex] && (
          <div className="flex flex-col items-center w-full sm:w-32 min-w-20">
            <div
              className="w-full sm:w-32 h-44 relative rounded-xl shadow-lg overflow-hidden border-2 border-primary bg-white hover-scale transition cursor-pointer group"
              onClick={() => onThumbnailClick(mainIndex)}
              tabIndex={updating ? -1 : 0}
              aria-label="Open main project gallery"
              style={{ pointerEvents: updating ? 'none' : 'auto' }}
            >
              <PortfolioThumbnail
                type={portfolioList[mainIndex].type}
                url={portfolioList[mainIndex].url}
                name={portfolioList[mainIndex].name}
                thumbnailUrl={portfolioList[mainIndex].thumbnailUrl}
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-primary/80 to-transparent px-2 py-1">
                <span className="text-xs text-white font-semibold">{portfolioList[mainIndex].name}</span>
              </div>
              <div className="absolute top-2 left-2">
                <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-semibold shadow">Main</span>
              </div>
            </div>
          </div>
        )}
        {/* Two Mini Thumbnails stacked */}
        <div className="flex flex-row sm:flex-col gap-3">
          {miniIndices.map(index => (
            portfolioList[index] ? (
              <div
                key={portfolioList[index].id}
                className="w-20 h-20 rounded-lg overflow-hidden border shadow-md bg-white relative cursor-pointer group hover-scale transition"
                onClick={() => onThumbnailClick(index)}
                tabIndex={updating ? -1 : 0}
                style={{ pointerEvents: updating ? 'none' : 'auto' }}
                aria-label="Open project gallery"
              >
                <PortfolioThumbnail
                  type={portfolioList[index].type}
                  url={portfolioList[index].url}
                  name={portfolioList[index].name}
                  thumbnailUrl={portfolioList[index].thumbnailUrl}
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent px-1 py-0.5">
                  <span className="text-xs text-white truncate">{portfolioList[index].name}</span>
                </div>
                <div className="absolute top-2 left-2">
                  <span className="bg-gray-900 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold shadow">Preview</span>
                </div>
              </div>
            ) : null
          ))}
        </div>
      </div>
      {/* Browse All Button */}
      {portfolioList.length > 0 && (
        <div className="mt-6 text-center">
          <Button 
            variant="outline" 
            size="lg" 
            className="font-semibold border-primary hover:bg-primary/10"
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
