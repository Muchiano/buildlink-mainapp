import { cn } from "@/lib/utils"
import { Skeleton } from "./skeleton"

interface LoadingSkeletonProps {
  className?: string;
  variant?: "card" | "profile" | "post" | "feed" | "banner";
  count?: number;
}

export const LoadingSkeleton = ({ 
  className, 
  variant = "card", 
  count = 1 
}: LoadingSkeletonProps) => {
  const renderSkeleton = () => {
    switch (variant) {
      case "profile":
        return (
          <div className="space-y-4 md:space-y-6">
            {/* Banner Skeleton */}
            <Skeleton className="w-full h-32 sm:h-40 md:h-48" />
            
            {/* Header Skeleton */}
            <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6">
                <Skeleton className="w-20 h-20 md:w-24 md:h-24 rounded-full flex-shrink-0 mx-auto sm:mx-0" />
                <div className="flex-1 space-y-3 text-center sm:text-left">
                  <Skeleton className="h-8 w-3/4 mx-auto sm:mx-0" />
                  <Skeleton className="h-4 w-1/2 mx-auto sm:mx-0" />
                  <Skeleton className="h-4 w-2/3 mx-auto sm:mx-0" />
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-10 w-20" />
                </div>
              </div>
            </div>

            {/* Content Skeleton */}
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-card rounded-lg p-4 md:p-6 shadow-sm space-y-3">
                  <Skeleton className="h-6 w-1/4" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "post":
        return (
          <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm space-y-4">
            <div className="flex items-start space-x-3">
              <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-3 w-1/6" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <Skeleton className="h-48 w-full rounded-md" />
            <div className="flex items-center space-x-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-16" />
              ))}
            </div>
          </div>
        );

      case "banner":
        return (
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4 md:p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2 flex-1">
                <Skeleton className="h-8 w-3/4 bg-primary/20" />
                <Skeleton className="h-4 w-full bg-primary/15" />
                <Skeleton className="h-4 w-5/6 bg-primary/15" />
              </div>
              <Skeleton className="h-8 w-24 bg-primary/20" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center space-y-2">
                <Skeleton className="h-8 w-16 mx-auto bg-primary/20" />
                <Skeleton className="h-4 w-20 mx-auto bg-primary/15" />
              </div>
              <div className="text-center space-y-2">
                <Skeleton className="h-8 w-16 mx-auto bg-primary/20" />
                <Skeleton className="h-4 w-20 mx-auto bg-primary/15" />
              </div>
            </div>
          </div>
        );

      case "feed":
        return (
          <div className="space-y-4 md:space-y-6">
            <LoadingSkeleton variant="banner" />
            {Array.from({ length: count }).map((_, i) => (
              <LoadingSkeleton key={i} variant="post" />
            ))}
          </div>
        );

      default:
        return (
          <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm space-y-4">
            <Skeleton className="h-6 w-1/4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        );
    }
  };

  if (count === 1) {
    return <div className={cn("animate-pulse", className)}>{renderSkeleton()}</div>;
  }

  return (
    <div className={cn("space-y-4 animate-pulse", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{renderSkeleton()}</div>
      ))}
    </div>
  );
};

// Specialized skeleton components
export const ProfileSkeleton = () => <LoadingSkeleton variant="profile" />;
export const PostSkeleton = () => <LoadingSkeleton variant="post" />;
export const FeedSkeleton = ({ count = 3 }: { count?: number }) => (
  <LoadingSkeleton variant="feed" count={count} />
);
export const BannerSkeleton = () => <LoadingSkeleton variant="banner" />;