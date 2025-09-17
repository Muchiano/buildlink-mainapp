import { WifiOff, Wifi, Cloud, CloudOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useOfflineSync } from '@/hooks/useOfflineSync';
import { cn } from '@/lib/utils';

interface OfflineIndicatorProps {
  className?: string;
}

export const OfflineIndicator = ({ className }: OfflineIndicatorProps) => {
  const { isOnline, offlineActions, hasCachedContent } = useOfflineSync();

  if (isOnline && offlineActions.length === 0) {
    return null; // Don't show anything when fully online
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      {!isOnline && (
        <Badge variant="destructive" className="flex items-center space-x-1">
          <WifiOff className="h-3 w-3" />
          <span>Offline</span>
        </Badge>
      )}
      
      {isOnline && offlineActions.length > 0 && (
        <Badge variant="secondary" className="flex items-center space-x-1">
          <Cloud className="h-3 w-3" />
          <span>Syncing...</span>
        </Badge>
      )}

      {!isOnline && hasCachedContent && (
        <Badge variant="outline" className="flex items-center space-x-1 text-xs">
          <CloudOff className="h-3 w-3" />
          <span>Cached content available</span>
        </Badge>
      )}
    </div>
  );
};