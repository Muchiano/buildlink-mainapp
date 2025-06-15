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
  if (thumbnailUrl) {
    return (
      <img
        src={thumbnailUrl}
        alt={name}
        className="w-full h-full object-cover rounded-md border"
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
          className="w-full h-full object-cover rounded-md border"
          loading="lazy"
        />
      );
    default:
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-md border">
          <Images className="h-8 w-8 text-gray-400" />
        </div>
      );
  }
};

export default PortfolioThumbnail;
