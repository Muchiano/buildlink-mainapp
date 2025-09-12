import React, { useState } from "react";
import { Image, FileText, Download, Eye, ExternalLink } from "lucide-react";
import { Button } from "./button";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";
import { Badge } from "./badge";
import { cn } from "@/lib/utils";

interface MediaPreviewProps {
  url: string;
  type: "image" | "pdf" | "video" | "document";
  name?: string;
  size?: "sm" | "md" | "lg";
  showActions?: boolean;
  thumbnailUrl?: string;
  className?: string;
}

const MediaPreview = ({ 
  url, 
  type, 
  name, 
  size = "md", 
  showActions = true,
  thumbnailUrl,
  className 
}: MediaPreviewProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-32 h-32",
    lg: "w-48 h-48"
  };

  const getFileIcon = () => {
    switch (type) {
      case "pdf":
        return <FileText className="h-8 w-8 text-red-500" />;
      case "image":
        return <Image className="h-8 w-8 text-blue-500" />;
      case "video":
        return <Image className="h-8 w-8 text-purple-500" />;
      default:
        return <FileText className="h-8 w-8 text-gray-500" />;
    }
  };

  const renderThumbnail = () => {
    if (type === "image") {
      return (
        <img
          src={thumbnailUrl || url}
          alt={name || "Image preview"}
          className="w-full h-full object-cover"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
        />
      );
    }

    if (type === "pdf") {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-red-50 border-2 border-red-200 rounded-lg">
          {getFileIcon()}
          <span className="text-xs font-medium text-red-700 mt-1 truncate px-2">
            {name || "PDF"}
          </span>
        </div>
      );
    }

    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 border-2 border-gray-200 rounded-lg">
        {getFileIcon()}
        <span className="text-xs font-medium text-gray-700 mt-1 truncate px-2">
          {name || type.toUpperCase()}
        </span>
      </div>
    );
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(url, '_blank');
  };

  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (type === "pdf") {
      window.open(url, '_blank');
    }
  };

  return (
    <div className={cn("relative group", sizeClasses[size], className)}>
      <Dialog>
        <DialogTrigger asChild>
          <div className="cursor-pointer rounded-lg overflow-hidden border-2 border-gray-200 hover:border-primary transition-all duration-200 hover:shadow-md group">
            {renderThumbnail()}
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Eye className="h-6 w-6 text-white" />
            </div>
          </div>
        </DialogTrigger>
        
        <DialogContent className="max-w-5xl max-h-[95vh] overflow-hidden">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getFileIcon()}
                <div>
                  <h3 className="font-semibold">{name || "PDF Document"}</h3>
                  <Badge variant="secondary">{type.toUpperCase()}</Badge>
                </div>
              </div>
              
              {showActions && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handlePreview}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in New Tab
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              )}
            </div>

            {/* PDF Preview Content */}
            <div className="max-h-[75vh] overflow-hidden">
              {type === "image" ? (
                <img
                  src={url}
                  alt={name || "Image"}
                  className="w-full h-auto rounded-lg"
                />
              ) : type === "pdf" ? (
                <div className="w-full h-[75vh] bg-gray-50 rounded-lg">
                  <iframe
                    src={url}
                    className="w-full h-full rounded-lg border-0"
                    title={name || "PDF Document"}
                    style={{ minHeight: '600px' }}
                  />
                </div>
              ) : (
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  {getFileIcon()}
                  <p className="text-lg font-semibold mt-4">File Preview</p>
                  <p className="text-gray-600">Click download to access the file</p>
                </div>
              )}
            </div>
            
            {/* PDF Instructions */}
            {type === "pdf" && (
              <div className="text-sm text-muted-foreground text-center border-t pt-2">
                <p>If the PDF doesn't display, click "Open in New Tab" above or use the Download button.</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Quick actions on hover */}
      {showActions && size !== "sm" && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex gap-1">
            {type === "pdf" && (
              <Button 
                variant="secondary" 
                size="icon" 
                className="h-7 w-7 bg-white/90 hover:bg-white"
                onClick={handlePreview}
              >
                <ExternalLink className="h-3 w-3" />
              </Button>
            )}
            <Button 
              variant="secondary" 
              size="icon" 
              className="h-7 w-7 bg-white/90 hover:bg-white"
              onClick={handleDownload}
            >
              <Download className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaPreview;