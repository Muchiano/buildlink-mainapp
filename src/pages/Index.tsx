import { useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import TopBar from "@/components/TopBar";
import HomeFeed from "@/components/feeds/HomeFeed";
import MentorshipHub from "@/components/feeds/MentorshipHub";
import SkillUpFeed from "@/components/feeds/SkillUpFeed";
import PostCreate from "@/components/feeds/PostCreate";
import ProfileBoard from "@/components/feeds/ProfileBoard";
import ResponsiveNavigation from "@/components/ResponsiveNavigation";
import ContentFilters from "@/components/ContentFilters";
import { OfflineIndicator } from "@/components/OfflineIndicator";

const Index = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("home");
  const [activeFilter, setActiveFilter] = useState("latest");
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabChange = useCallback((tab: string) => {
    setLoading(true);
    setActiveTab(tab);
    setMobileMenuOpen(false);
    // Reset filter when changing tabs
    if (tab === "home" || tab === "skillup") {
      setActiveFilter("latest");
    }
    // Simulate loading time for smooth transition
    setTimeout(() => setLoading(false), 300);
  }, []);

  const handleLogoClick = () => {
    handleTabChange("home");
    setActiveFilter("latest");
  };

  const renderActiveContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeFeed activeFilter={activeFilter} />;
      case "mentorship":
        return <MentorshipHub />;
      case "post":
        return <PostCreate />;
      case "skillup":
        return <SkillUpFeed activeFilter={activeFilter} />;
      case "profile":
        return <ProfileBoard />;
      default:
        return <HomeFeed activeFilter={activeFilter} />;
    }
  };

  const shouldShowFilters = activeTab === "home" || activeTab === "skillup";

  return (
    <div className="min-h-screen bg-background">
      <TopBar 
        onLogoClick={handleLogoClick} 
        onMenuClick={() => setMobileMenuOpen(true)}
        activeTab={activeTab}
        loading={loading}
      />
      <OfflineIndicator />
      
      <div className="flex">
        {/* Responsive Navigation */}
        <ResponsiveNavigation 
          activeTab={activeTab} 
          onTabChange={handleTabChange}
          loading={loading}
        />
        
        {/* Main Content */}
        <div className="flex-1 pt-12 lg:ml-64 pb-16 lg:pb-0">
          <div className="min-h-[calc(100vh-3rem)] max-w-7xl mx-auto px-4">
            {/* Content Filters */}
            {shouldShowFilters && (
              <div className="mb-4">
                <ContentFilters
                  activeFilter={activeFilter}
                  onFilterChange={setActiveFilter}
                  filterType={activeTab}
                />
              </div>
            )}
            
            {/* Content Area */}
            <div className={`transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
              {renderActiveContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;