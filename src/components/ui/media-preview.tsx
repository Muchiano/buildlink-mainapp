import React, { useState, useEffect } from "react";
import { Image, FileText, Download, Eye, ExternalLink, AlertCircle } from "lucide-react";
import { Button } from "./button";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";
import { Badge } from "./badge";
import { Alert, AlertDescription } from "./alert";
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
  const [pdfLoadError, setPdfLoadError] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-32 h-32",
    lg: "w-48 h-48"
  };

  // Check if PDF can be displayed inline
  useEffect(() => {
    if (type === 'pdf') {
      // Test if browser supports PDF viewing
      const testPdf = () => {
        const userAgent = navigator.userAgent.toLowerCase();
        const isChrome = userAgent.includes('chrome');
        const isFirefox = userAgent.includes('firefox');
        const isSafari = userAgent.includes('safari') && !userAgent.includes('chrome');
        const isEdge = userAgent.includes('edge');
        
        // Most modern browsers support PDF viewing, but mobile browsers often don't
        const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
        
        if (isMobile) {
          setShowFallback(true);
        }
      };
      
      testPdf();
    }
  }, [type]);

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
    // Create a proper download link
    const link = document.createElement('a');
    link.href = url;
    link.download = name || `document.${type === 'pdf' ? 'pdf' : 'file'}`;
    link.target = '_blank';
    // Add rel="noopener noreferrer" for security
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Enhanced PDF viewer with multiple fallback options
  const renderPdfViewer = () => {
    if (showFallback || pdfLoadError) {
      return (
        <div className="w-full h-[calc(95vh-120px)] flex flex-col items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <FileText className="h-20 w-20 text-gray-400 mb-6" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">PDF Preview</h3>
          <p className="text-gray-600 mb-6 text-center max-w-md">
            {showFallback 
              ? "PDF preview is not available on mobile devices. Use the buttons below to view the document."
              : "Unable to display PDF inline. Your browser may not support embedded PDF viewing."
            }
          </p>
          
          <Alert className="max-w-md mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              For the best viewing experience, try opening the PDF in a new tab or downloading it.
            </AlertDescription>
          </Alert>
          
          <div className="flex gap-3">
            <Button onClick={handlePreview} className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Open in New Tab
            </Button>
            <Button variant="outline" onClick={handleDownload} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
      );
    }

    // Create multiple PDF viewing strategies
    const pdfViewerUrl = `${url}#view=FitH&toolbar=1&navpanes=1`;
    
    return (
      <div className="w-full h-[calc(95vh-120px)] bg-gray-100 rounded-lg border relative">
        {/* Primary iframe attempt */}
        <iframe
          src={pdfViewerUrl}
          className="w-full h-full rounded-lg border-0"
          title={name || "PDF Document"}
          onLoad={() => {
            setIsLoading(false);
            setPdfLoadError(false);
          }}
          onError={() => {
            setPdfLoadError(true);
            setIsLoading(false);
          }}
          style={{ 
            minHeight: '600px',
            backgroundColor: 'white'
          }}
        />
        
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Loading PDF...</p>
            </div>
          </div>
        )}
        
        {/* Fallback button overlay if iframe fails */}
        {!isLoading && pdfLoadError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">PDF cannot be displayed inline</p>
              <Button onClick={() => setShowFallback(true)}>
                Show Alternative Options
              </Button>
            </div>
          </div>
        )}
      </div>
    );
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
        
        <DialogContent className="max-w-6xl w-[95vw] max-h-[95vh] overflow-hidden">
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

            {/* Content */}
            <div className="max-h-[calc(95vh-120px)] overflow-hidden">
              {type === "image" ? (
                <img
                  src={url}
                  alt={name || "Image"}
                  className="w-full h-auto max-h-full object-contain rounded-lg"
                />
              ) : type === "pdf" ? (
                renderPdfViewer()
              ) : (
                <div className="bg-gray-50 p-8 rounded-lg text-center h-96 flex flex-col justify-center">
                  {getFileIcon()}
                  <p className="text-lg font-semibold mt-4">File Preview</p>
                  <p className="text-gray-600">Click download to access the file</p>
                </div>
              )}
            </div>
            
            {/* PDF Instructions */}
            {type === "pdf" && !showFallback && (
              <div className="text-sm text-muted-foreground text-center border-t pt-2">
                <p>Having trouble viewing the PDF? Try opening it in a new tab or downloading it directly.</p>
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