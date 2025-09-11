import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PublicProfileView from '@/components/profile/PublicProfileView';
import ResponsiveNavigation from '@/components/ResponsiveNavigation';
import TopBar from '@/components/TopBar';

const PublicProfile: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "home") {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar 
        onLogoClick={handleLogoClick}
        activeTab={activeTab}
        loading={loading}
      />
      
      <div className="flex pt-12">
        <div className="hidden md:block w-64 fixed h-full border-r border-border bg-background/95">
          <ResponsiveNavigation 
            activeTab={activeTab}
            onTabChange={handleTabChange}
            loading={loading}
          />
        </div>
        
        <main className="flex-1 md:ml-64 pb-16 md:pb-4">
          <div className="container mx-auto py-8">
            <PublicProfileView />
          </div>
        </main>
      </div>
      
      <ResponsiveNavigation 
        activeTab={activeTab}
        onTabChange={handleTabChange}
        loading={loading}
      />
    </div>
  );
};

export default PublicProfile;