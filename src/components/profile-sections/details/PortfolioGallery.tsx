import React, { useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import PortfolioThumbnail from "./PortfolioThumbnail";
import { Button } from "@/components/ui/button";
import { Trash, FileText, ExternalLink } from "lucide-react";

interface PortfolioGalleryProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  portfolio: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
    description?: string;
    thumbnailUrl?: string;
  }>;
  canEdit?: boolean;
  onRemove?: (id: string) => void;
  updating?: boolean;
  activeIndex?: number;
  setActiveIndex?: (i: number) => void;
}

const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  open,
  setOpen,
  portfolio,
  canEdit = false,
  onRemove,
  updating = false,
  activeIndex = 0,
  setActiveIndex
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    setTimeout(() => {
      if (scrollRef.current) {
        const items = scrollRef.current.querySelectorAll(".portfolio-gallery-item");
        if (items[activeIndex]) {
          (items[activeIndex] as HTMLElement).scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }, 100);
  }, [open, activeIndex, portfolio.length]);

  const handleItemClick = (item: any, index: number) => {
    if (setActiveIndex) setActiveIndex(index);
    
    // For PDFs and links, just open in new tab
    if (item.type === 'pdf' || item.type === 'link') {
      window.open(item.url, '_blank');
      return;
    }
  };

  const renderPortfolioCard = (item: any, index: number) => {
    // For PDFs and links, show simple card
    if (item.type === 'pdf' || item.type === 'link') {
      return (
        <div
          className="cursor-pointer hover:bg-gray-50 transition-colors p-6 border-2 border-gray-200 rounded-xl bg-white"
          onClick={() => handleItemClick(item, index)}
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              {item.type === 'pdf' ? (
                <FileText className="h-8 w-8 text-red-500" />
              ) : (
                <ExternalLink className="h-8 w-8 text-blue-500" />
              )}
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 text-sm line-clamp-2">
                {item.type === 'pdf' 
                  ? item.name.replace(/\.(pdf|PDF)$/, "") 
                  : item.name
                }
              </h4>
              {item.description && (
                <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
              )}
              <span
                className={`inline-block text-xs px-2 py-1 rounded-md font-medium ${
                  item.type === "pdf"
                    ? "bg-red-100 text-red-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {item.type === "pdf" ? "PDF" : "Link"}
              </span>
            </div>
          </div>
        </div>
      );
    }

    // For other types (images, etc.), use the thumbnail
    return (
      <div
        className="cursor-pointer hover:scale-105 transition-transform"
        onClick={() => handleItemClick(item, index)}
      >
        <PortfolioThumbnail
          type={item.type}
          url={item.url}
          name={item.name}
          thumbnailUrl={item.thumbnailUrl}
        />
        <div className="px-3 py-3 border-t bg-muted/40 min-h-[68px]">
          <div className="font-semibold text-sm text-gray-900 truncate">{item.name}</div>
          {item.description && (
            <div className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</div>
          )}
          <span className="inline-block text-xs px-2 py-1 rounded-full font-medium bg-green-100 text-green-800 mt-2">
            {item.type.toUpperCase()}
          </span>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl shadow-lg rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Portfolio Projects</DialogTitle>
        </DialogHeader>
        <div ref={scrollRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-3 max-h-[68vh] overflow-y-auto">
          {portfolio.map((item, i) => (
            <div key={item.id} className="portfolio-gallery-item space-y-3">
              <div className={`rounded-xl overflow-hidden`}>
                {renderPortfolioCard(item, i)}
              
              </div>
              
              {/* Delete button below each item */}
              {canEdit && typeof onRemove === "function" && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-red-600 border-red-600 hover:bg-red-50 hover:border-red-300"
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    onRemove(item.id); 
                  }}
                  disabled={updating}
                >
                  <Trash className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              )}
            </div>
          ))}
        </div>
        <DialogClose asChild>
          <Button variant="outline" size="lg" className="w-full mt-3 font-semibold">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioGallery;