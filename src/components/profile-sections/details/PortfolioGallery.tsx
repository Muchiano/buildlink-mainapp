
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import PortfolioThumbnail from "./PortfolioThumbnail";
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
}

const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  open,
  setOpen,
  portfolio,
  canEdit = false,
  onRemove,
  updating = false,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Portfolio Projects</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-2">
          {portfolio.map((item) => (
            <div key={item.id} className="rounded overflow-hidden border shadow relative group">
              <PortfolioThumbnail
                type={item.type}
                url={item.url}
                name={item.name}
                thumbnailUrl={item.thumbnailUrl}
              />
              <div className="px-2 py-2 border-t bg-muted relative min-h-[68px]">
                <div className="font-medium text-sm text-gray-900 truncate">{item.name}</div>
                {item.description && (
                  <div className="text-xs text-gray-500">{item.description}</div>
                )}
                {canEdit && onRemove && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        className="absolute top-2 right-2 opacity-70 hover:opacity-100 transition"
                        onClick={() => onRemove(item.id)}
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
              </div>
            </div>
          ))}
        </div>
        <DialogClose asChild>
          <Button variant="outline" className="w-full">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioGallery;

