import React from 'react';
import EnhancedNotificationCenter from '@/components/notifications/EnhancedNotificationCenter';

const NotificationCenter: React.FC = () => {
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <EnhancedNotificationCenter />
    </div>
  );
};

export default NotificationCenter;