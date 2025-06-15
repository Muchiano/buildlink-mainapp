
import React from "react";
import { Image, Images, Link2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PortfolioThumbnailProps {
  type: string;
  url: string;
  name: string;
}

const PortfolioThumbnail: React.FC<PortfolioThumbnailProps> = ({ type, url, name }) => {
  switch (type) {
    case "image":
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img
            src={url}
            alt={name}
            className="w-14 h-14 object-cover rounded-md border"
            loading="lazy"
          />
        </a>
      );
    case "video":
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <video
            src={url}
            className="w-14 h-14 rounded border object-cover"
            style={{ background: "#f3f4f6" }}
            muted
            playsInline
            preload="metadata"
          />
        </a>
      );
    case "pdf":
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <div className="w-14 h-14 flex items-center justify-center bg-red-50 rounded-md border">
            <Badge className="bg-red-100 text-red-600">PDF</Badge>
          </div>
        </a>
      );
    case "doc":
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <div className="w-14 h-14 flex items-center justify-center bg-blue-50 rounded-md border">
            <Badge className="bg-blue-200 text-blue-800">DOC</Badge>
          </div>
        </a>
      );
    case "ppt":
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <div className="w-14 h-14 flex items-center justify-center bg-orange-50 rounded-md border">
            <Badge className="bg-orange-200 text-orange-800">PPT</Badge>
          </div>
        </a>
      );
    case "sheet":
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <div className="w-14 h-14 flex items-center justify-center bg-green-50 rounded-md border">
            <Badge className="bg-green-200 text-green-800">XLS</Badge>
          </div>
        </a>
      );
    case "link":
      return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="block w-14 h-14">
          <div className="w-14 h-14 flex items-center justify-center bg-blue-50 rounded-md border">
            <Link2 className="h-8 w-8 text-blue-500" />
          </div>
        </a>
      );
    default:
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <div className="w-14 h-14 flex items-center justify-center bg-gray-50 rounded-md border">
            <Images className="h-8 w-8 text-gray-400" />
          </div>
        </a>
      );
  }
};

export default PortfolioThumbnail;
