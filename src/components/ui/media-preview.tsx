import React, { useState, useEffect, useRef } from "react";
import { Image, FileText, Download, Eye, ExternalLink, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1.0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-32 h-32",
    lg: "w-48 h-48"
  };

  // Load PDF.js dynamically
  useEffect(() => {
    if (type === 'pdf') {
      loadPdfJs();
    }
  }, [type, url]);

  const loadPdfJs = async () => {
    try {
      // Load PDF.js from CDN
      const pdfjsLib = await loadPdfJsLibrary();
      
      // Set worker source
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      
      // Load the PDF document
      const loadingTask = pdfjsLib.getDocument(url);
      const pdf = await loadingTask.promise;
      
      setPdfDoc(pdf);
      setTotalPages(pdf.numPages);
      setIsLoading(false);
      
      // Render first page
      renderPage(pdf, 1);
    } catch (error) {
      console.error('Error loading PDF:', error);
      setHasError(true);
      setIsLoading(false);
    }
  };

  const loadPdfJsLibrary = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      // Check if PDF.js is already loaded
      if (window.pdfjsLib) {
        resolve(window.pdfjsLib);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      script.onload = () => {
        resolve(window.pdfjsLib);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const renderPage = async (pdf: any, pageNum: number) => {
    if (!canvasRef.current || !pdf) return;

    try {
      const page = await pdf.getPage(pageNum);
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      const viewport = page.getViewport({ scale });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      await page.render(renderContext).promise;
    } catch (error) {
      console.error('Error rendering page:', error);
      setHasError(true);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && pdfDoc) {
      setCurrentPage(newPage);
      renderPage(pdfDoc, newPage);
    }
  };

  const handleZoom = (newScale: number) => {
    if (newScale >= 0.5 && newScale <= 3.0 && pdfDoc) {
      setScale(newScale);
      renderPage(pdfDoc, currentPage);
    }
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
    const link = document.createElement('a');
    link.href = url;
    link.download = name || `document.${type === 'pdf' ? 'pdf' : 'file'}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const renderPdfViewer = () => {
    if (hasError) {
      return (
        <div className="w-full h-[calc(95vh-180px)] flex flex-col items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <FileText className="h-20 w-20 text-gray-400 mb-6" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Cannot Display PDF</h3>
          <p className="text-gray-600 mb-6 text-center max-w-md">
            There was an error loading this PDF. Please try downloading it or opening it in a new tab.
          </p>
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

    if (isLoading) {
      return (
        <div className="w-full h-[calc(95vh-180px)] flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading PDF...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-[calc(95vh-180px)] bg-white rounded-lg border overflow-hidden">
        {/* PDF Controls */}
        <div className="flex items-center justify-between p-3 border-b bg-gray-50">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleZoom(scale - 0.2)}
              disabled={scale <= 0.5}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[60px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleZoom(scale + 0.2)}
              disabled={scale >= 3.0}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* PDF Canvas */}
        <div className="flex-1 overflow-auto p-4 bg-gray-100">
          <div className="flex justify-center">
            <canvas
              ref={canvasRef}
              className="border border-gray-300 shadow-lg bg-white"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
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
            {type === "image" ? (
              <img
                src={url}
                alt={name || "Image"}
                className="w-full h-auto max-h-[calc(95vh-120px)] object-contain rounded-lg"
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

// Extend the Window interface for TypeScript
declare global {
  interface Window {
    pdfjsLib: any;
  }
}

export default MediaPreview;