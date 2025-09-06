import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, Smartphone } from 'lucide-react';
import { useDataSaver } from '@/contexts/DataSaverContext';
import { cn } from '@/lib/utils';

interface DataSaverToggleProps {
  className?: string;
  showNetworkInfo?: boolean;
}

export const DataSaverToggle = ({ className, showNetworkInfo = false }: DataSaverToggleProps) => {
  const { dataSaverMode, setDataSaverMode, networkType, isSlowConnection } = useDataSaver();

  const getNetworkIcon = () => {
    if (isSlowConnection) return <WifiOff className="h-4 w-4 text-orange-500" />;
    if (networkType === '4g' || networkType === '3g') return <Wifi className="h-4 w-4 text-green-500" />;
    return <Smartphone className="h-4 w-4 text-blue-500" />;
  };

  const getNetworkLabel = () => {
    switch (networkType) {
      case 'slow-2g':
        return '2G (Slow)';
      case '2g':
        return '2G';
      case '3g':
        return '3G';
      case '4g':
        return '4G';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      {showNetworkInfo && (
        <div className="flex items-center space-x-2">
          {getNetworkIcon()}
          <Badge variant={isSlowConnection ? "destructive" : "secondary"} className="text-xs">
            {getNetworkLabel()}
          </Badge>
        </div>
      )}
      
      <div className="flex items-center space-x-2">
        <label 
          htmlFor="data-saver-toggle" 
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Data Saver
        </label>
        <Switch
          id="data-saver-toggle"
          checked={dataSaverMode}
          onCheckedChange={setDataSaverMode}
        />
        {dataSaverMode && (
          <Badge variant="outline" className="text-xs">
            ON
          </Badge>
        )}
      </div>
      
      {isSlowConnection && !dataSaverMode && (
        <Badge variant="outline" className="text-xs text-orange-600">
          Slow Connection Detected
        </Badge>
      )}
    </div>
  );
};