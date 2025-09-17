import { cn } from "@/lib/utils";

interface EnhancedSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'text' | 'circular' | 'rectangular' | 'card';
  lines?: number;
  width?: string | number;
  height?: string | number;
}

const EnhancedSkeleton = ({ 
  className, 
  variant = 'default',
  lines = 1,
  width,
  height,
  ...props 
}: EnhancedSkeletonProps) => {
  const baseClasses = "animate-pulse bg-muted";
  
  const variantClasses = {
    default: "rounded-md",
    text: "rounded h-4",
    circular: "rounded-full",
    rectangular: "rounded-sm",
    card: "rounded-lg"
  };

  const style = {
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height || (variant === 'text' ? '1rem' : undefined),
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2" {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseClasses,
              variantClasses.text,
              index === lines - 1 && "w-3/4", // Last line shorter
              className
            )}
            style={style}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
      style={style}
      {...props}
    />
  );
};

// Pre-built skeleton components for common use cases
const SkeletonPostCard = ({ className }: { className?: string }) => (
  <div className={cn("border rounded-lg p-4 space-y-4", className)}>
    <div className="flex items-center space-x-3">
      <EnhancedSkeleton variant="circular" width={40} height={40} />
      <div className="space-y-2">
        <EnhancedSkeleton variant="text" width={120} />
        <EnhancedSkeleton variant="text" width={80} />
      </div>
    </div>
    <EnhancedSkeleton variant="text" lines={3} />
    <EnhancedSkeleton variant="rectangular" className="w-full h-48" />
    <div className="flex items-center justify-between">
      <div className="flex space-x-4">
        <EnhancedSkeleton variant="text" width={60} />
        <EnhancedSkeleton variant="text" width={60} />
      </div>
      <EnhancedSkeleton variant="text" width={40} />
    </div>
  </div>
);

const SkeletonProfileCard = ({ className }: { className?: string }) => (
  <div className={cn("border rounded-lg p-6 space-y-4", className)}>
    <div className="flex items-center space-x-4">
      <EnhancedSkeleton variant="circular" width={64} height={64} />
      <div className="space-y-2">
        <EnhancedSkeleton variant="text" width={150} />
        <EnhancedSkeleton variant="text" width={100} />
      </div>
    </div>
    <EnhancedSkeleton variant="text" lines={2} />
    <div className="grid grid-cols-3 gap-2">
      <EnhancedSkeleton variant="text" width={60} />
      <EnhancedSkeleton variant="text" width={60} />
      <EnhancedSkeleton variant="text" width={60} />
    </div>
  </div>
);

const SkeletonFeed = ({ count = 3 }: { count?: number }) => (
  <div className="space-y-6">
    {Array.from({ length: count }).map((_, index) => (
      <SkeletonPostCard key={index} />
    ))}
  </div>
);

export { 
  EnhancedSkeleton, 
  SkeletonPostCard, 
  SkeletonProfileCard, 
  SkeletonFeed 
};