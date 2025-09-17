
import React from "react";
import { Button } from "@/components/ui/button";
import PortfolioThumbnail from "./PortfolioThumbnail";
import MediaPreview from "@/components/ui/media-preview";

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
  // Show up to 3: one "main", two "preview"
  const displayed = portfolioList.slice(0, 3);

  return (
    <div>
      <div className="flex gap-4 flex-col sm:flex-row">
        {displayed[0] && (
          <div className="flex flex-col items-center w-full sm:w-32 min-w-20">
            <div
              className="w-full sm:w-32 h-44 relative rounded-xl shadow-lg overflow-hidden border-2 border-primary bg-white transition cursor-pointer group hover:scale-105"
              onClick={() => !updating && onThumbnailClick(0)}
              tabIndex={updating ? -1 : 0}
              aria-label="Open main project gallery"
              style={{ pointerEvents: updating ? 'none' : 'auto' }}
            >
              <MediaPreview
                type={displayed[0].type as "image" | "pdf" | "video" | "document"}
                url={displayed[0].url}
                name={displayed[0].name}
                size="lg"
                thumbnailUrl={displayed[0].thumbnailUrl}
                className="w-full h-full"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-primary/80 to-transparent px-2 py-1">
                <span className="text-xs text-white font-semibold">{displayed[0].name}</span>
              </div>
              <div className="absolute top-2 left-2">
                <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-semibold shadow">Main</span>
              </div>
            </div>
          </div>
        )}
        {/* Preview Thumbnails */}
        <div className="flex flex-row sm:flex-col gap-3">
          {displayed.slice(1, 3).map((item, idx) =>
            item ? (
              <div
                key={item.id}
                className="w-20 h-20 rounded-lg overflow-hidden border shadow-md bg-white relative cursor-pointer group hover:scale-105 transition"
                onClick={() => !updating && onThumbnailClick(idx + 1)}
                tabIndex={updating ? -1 : 0}
                style={{ pointerEvents: updating ? 'none' : 'auto' }}
                aria-label="Open project gallery"
              >
                <MediaPreview
                  type={item.type as "image" | "pdf" | "video" | "document"}
                  url={item.url}
                  name={item.name}
                  size="sm"
                  thumbnailUrl={item.thumbnailUrl}
                  className="w-full h-full"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent px-1 py-0.5">
                  <span className="text-xs text-white truncate">{item.name}</span>
                </div>
                <div className="absolute top-2 left-2">
                  <span className="bg-gray-900 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold shadow">Preview</span>
                </div>
              </div>
            ) : null
          )}
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
