import React from 'react';
import { useParams } from 'react-router-dom';
import PublicProfileView from '@/components/profile/PublicProfileView';

const PublicProfile: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <PublicProfileView />
      </div>
    </div>
  );
};

export default PublicProfile;