
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import PortfolioThumbnail from "./PortfolioThumbnail";
import { Button } from "@/components/ui/button";

interface PortfolioGalleryProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  portfolio: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
    description?: string;
  }>;
}

const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  open,
  setOpen,
  portfolio,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Portfolio Projects</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-2">
          {portfolio.map((item) => (
            <div key={item.id} className="rounded overflow-hidden border shadow">
              <PortfolioThumbnail type={item.type} url={item.url} name={item.name} />
              <div className="px-2 py-2 border-t bg-muted">
                <div className="font-medium text-sm text-gray-900 truncate">{item.name}</div>
                {item.description && (
                  <div className="text-xs text-gray-500">{item.description}</div>
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
