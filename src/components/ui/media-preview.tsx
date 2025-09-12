import React, { useState } from "react";
import { Image, FileText, Download, Eye, ExternalLink } from "lucide-react";
import { Button } from "./button";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";
import { Badge } from "./badge";
import { cn, getFilenameFromUrl } from "@/lib/utils";

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
  className,
}: MediaPreviewProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-full h-32",
    lg: "w-full h-48",
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
        <div className="w-full flex items-center justify-between bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <FileText className="h-8 w-8 text-red-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-red-900 truncate">
                {name || "PDF Document"}
              </p>
            </div>
          </div>
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
    const link = document.createElement("a");
    link.href = url;
    link.download = name || `document.${type === "pdf" ? "pdf" : "file"}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const renderPdfViewer = () => {
    if (hasError) {
      return (
        <div className="w-full h-[calc(95vh-180px)] flex flex-col items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <FileText className="h-20 w-20 text-gray-400 mb-6" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Cannot Display PDF
          </h3>
          <p className="text-gray-600 mb-6 text-center max-w-md">
            There was an error loading this PDF. Please try downloading it or
            opening it in a new tab.
          </p>
          <div className="flex gap-3">
            <Button onClick={handlePreview} className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Open in New Tab
            </Button>
            <Button
              variant="outline"
              onClick={handleDownload}
              className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-[calc(95vh-180px)] bg-white rounded-lg border overflow-hidden">
        {/* Direct PDF Iframe */}
        <div className="flex-1 overflow-auto bg-gray-100">
          <iframe
            src={url}
            className="w-full h-full min-h-[500px] border-0"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setHasError(true);
              setIsLoading(false);
            }}
            title={name || getFilenameFromUrl(url)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={cn("relative group")}>
      <Dialog>
        <DialogTrigger asChild>
          <div className="rounded-lg overflow-hidden border-2 border-gray-200">
            {renderThumbnail()}
          </div>
        </DialogTrigger>
      </Dialog>
    </div>
  );
};

export default MediaPreview;
