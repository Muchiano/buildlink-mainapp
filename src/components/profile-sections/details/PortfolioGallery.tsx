import React, { useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import PortfolioThumbnail from "./PortfolioThumbnail";
import MediaPreview from "@/components/ui/media-preview";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

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
    
    // For PDFs, open in MediaPreview dialog
    if (item.type === 'pdf') {
      // The MediaPreview component will handle the PDF viewing
      return;
    }
    
    // For other files, you might want to handle them differently
    if (item.type === 'link') {
      window.open(item.url, '_blank');
      return;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl shadow-lg rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Portfolio Projects</DialogTitle>
        </DialogHeader>
        <div ref={scrollRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 my-3 max-h-[68vh] overflow-y-auto">
          {portfolio.map((item, i) => (
            <div
              key={item.id}
              className={`portfolio-gallery-item rounded-xl overflow-hidden border-2 ${i === activeIndex ? "border-primary ring-2 ring-primary" : "border-muted-foreground"} shadow-md relative group bg-white hover:scale-105 transition`}
              tabIndex={0}
              style={{ cursor: "pointer" }}
            >
              {item.type === 'pdf' ? (
                <MediaPreview 
                  url={item.url}
                  type="pdf"
                  name={item.name}
                  size="md"
                  showActions={true}
                />
              ) : (
                <div onClick={() => handleItemClick(item, i)}>
                  <PortfolioThumbnail
                    type={item.type}
                    url={item.url}
                    name={item.name}
                    thumbnailUrl={item.thumbnailUrl}
                  />
                </div>
              )}
              <div className="px-3 py-3 border-t bg-muted/40 relative min-h-[68px]">
                <div className="font-semibold text-sm text-gray-900 truncate">{item.name}</div>
                {item.description && (
                  <div className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</div>
                )}
                {canEdit && typeof onRemove === "function" && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        className="absolute top-2 right-2 opacity-70 hover:opacity-100 transition bg-white/80 rounded-full p-1 hover:bg-white shadow"
                        onClick={(e) => { e.stopPropagation(); onRemove(item.id); }}
                        title="Remove this entry"
                        aria-label="Remove"
                        disabled={updating}
                        tabIndex={updating ? -1 : 0}
                        style={{ pointerEvents: updating ? 'none' : 'auto' }}
                      >
                        <Trash className="w-5 h-5 text-red-500" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      Remove
                    </TooltipContent>
                  </Tooltip>
                )}
                {i === 0 && (
                  <span className="absolute bottom-2 left-3 bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-semibold shadow">Main</span>
                )}
                {(i === 1 || i === 2) && (
                  <span className="absolute bottom-2 left-3 bg-gray-900 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold shadow">Preview</span>
                )}
              </div>
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
