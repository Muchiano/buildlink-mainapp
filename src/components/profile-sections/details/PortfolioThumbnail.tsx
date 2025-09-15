
import React from "react";
import { FileText, Images, Link2, File } from "lucide-react";
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
    case "pdf":
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-red-100 rounded-lg border-2 border-red-200 p-4">
          <FileText className="h-12 w-12 text-red-600 mb-2" />
          <span className="text-xs font-medium text-red-900 text-center truncate w-full px-2">
            {name.replace(/\.[^/.]+$/, "")}
          </span>
          <Badge variant="outline" className="mt-2 text-xs bg-red-100 text-red-700 border-red-300">
            PDF
          </Badge>
        </div>
      );
    case "doc":
    case "docx":
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-2 border-blue-200 p-4">
          <File className="h-12 w-12 text-blue-600 mb-2" />
          <span className="text-xs font-medium text-blue-900 text-center truncate w-full px-2">
            {name.replace(/\.[^/.]+$/, "")}
          </span>
          <Badge variant="outline" className="mt-2 text-xs bg-blue-100 text-blue-700 border-blue-300">
            DOC
          </Badge>
        </div>
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
