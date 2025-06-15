
import React from "react";
import { Image, Images, Link2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PortfolioThumbnailProps {
  type: string;
  url: string;
  name: string;
  thumbnailUrl?: string;
}

const PortfolioThumbnail: React.FC<PortfolioThumbnailProps> = ({ type, url, name, thumbnailUrl }) => {
  const className = "w-full h-full object-cover rounded-lg border-2 border-muted-foreground bg-gray-100 transition group-hover:scale-105";
  if (thumbnailUrl) {
    return (
      <img
        src={thumbnailUrl}
        alt={name}
        className={className}
        loading="lazy"
      />
    );
  }
  switch (type) {
    case "image":
    case "gif":
      return (
        <img
          src={url}
          alt={name}
          className={className}
          loading="lazy"
        />
      );
    default:
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg border-2 border-muted-foreground">
          <Images className="h-8 w-8 text-gray-400" />
        </div>
      );
  }
};

export default PortfolioThumbnail;
