
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
}

const PortfolioThumbnails: React.FC<PortfolioThumbnailsProps> = ({
  portfolioList,
  onMainThumbnailClick,
  onBrowseAllClick
}) => {
  const mainItem = portfolioList[0];
  const miniItems = portfolioList.slice(1, 3);

  return (
    <div>
      <div className="flex gap-4">
        {/* Main Thumbnail */}
        {mainItem && (
          <div className="flex flex-col items-center w-32">
            <div
              className="w-32 h-40 relative rounded-lg overflow-hidden border shadow cursor-pointer group"
              onClick={onMainThumbnailClick}
            >
              <PortfolioThumbnail
                type={mainItem.type}
                url={mainItem.url}
                name={mainItem.name}
              />
              {/* Caption over image */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/50 to-transparent px-2 py-1">
                <span className="text-xs text-white font-semibold">{mainItem.name}</span>
              </div>
            </div>
          </div>
        )}
        {/* Two Mini Thumbnails stacked */}
        <div className="flex flex-col gap-3">
          {miniItems.map(item => (
            <div
              key={item.id}
              className="w-32 h-19 rounded-lg overflow-hidden border shadow relative cursor-pointer group"
              style={{ height: "84px", width: "84px" }}
              onClick={onMainThumbnailClick}
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
        <div className="mt-4">
          <Button variant="outline" size="sm" onClick={onBrowseAllClick}>
            Browse All Projects
          </Button>
        </div>
      )}
    </div>
  );
};

export default PortfolioThumbnails;
