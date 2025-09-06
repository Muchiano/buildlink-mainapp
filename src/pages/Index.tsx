import { useState } from "react";
import { cn } from "@/lib/utils";
import TopBar from "@/components/TopBar";
import AppSidebar from "@/components/AppSidebar";
import BottomNavigation from "@/components/BottomNavigation";
import ContentFilters from "@/components/ContentFilters";
import HomeFeed from "@/components/feeds/HomeFeed";
import MentorshipHub from "@/components/feeds/MentorshipHub";
import PostCreate from "@/components/feeds/PostCreate";
import SkillUpFeed from "@/components/feeds/SkillUpFeed";
import ProfileBoard from "@/components/feeds/ProfileBoard";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [activeFilter, setActiveFilter] = useState("latest");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogoClick = () => {
    setActiveTab("home");
    setActiveFilter("latest");
  };

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderContent = () => {
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
    <div className="w-full min-h-screen">
      <div className="min-h-screen bg-background flex w-full transition-colors duration-300">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Navigation */}
          <TopBar onLogoClick={handleLogoClick} onMenuClick={handleMenuClick} />

          {/* Main Content */}
          <main className="flex-1 w-full">
            <div className="grid grid-cols-12 min-h-[calc(100vh-4rem)] px-2 sm:px-4 pb-20 md:pb-8 w-full max-w-screen-2xl mx-auto gap-0 md:gap-4">
              {/* Sidebar */}
              <div className="hidden md:block md:col-span-3 xl:col-span-2">
                <div className="sticky top-4 bg-card border rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
                  <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
                </div>
              </div>

              {/* Main Feed */}
              <div className="col-span-12 md:col-span-9 xl:col-span-7 md:col-start-4 xl:col-start-3">
                <div className="space-y-4 md:space-y-6">
                  {/* Content Filters */}
                  {shouldShowFilters && (
                    <div className="sticky top-2 z-10 bg-card/95 backdrop-blur-sm border rounded-lg shadow-sm transition-all duration-300">
                      <ContentFilters
                        activeFilter={activeFilter}
                        onFilterChange={setActiveFilter}
                        filterType={activeTab}
                      />
                    </div>
                  )}
                  
                  {/* Content with smooth transitions */}
                  <div className="animate-fade-in transition-all duration-300">
                    {renderContent()}
                  </div>
                </div>
              </div>

              {/* Right Sidebar - Hidden on smaller screens, shows on XL+ */}
              <div className="hidden xl:block xl:col-span-3">
                <div className="sticky top-4 space-y-4">
                  {/* Trending or suggested content could go here */}
                  <div className="bg-card border rounded-lg p-4 shadow-sm transition-all duration-300 hover:shadow-md">
                    <h3 className="font-semibold text-sm text-muted-foreground mb-3">Quick Links</h3>
                    <div className="space-y-2 text-sm">
                      <button 
                        onClick={() => setActiveTab("mentorship")}
                        className="block w-full text-left p-2 rounded hover:bg-muted transition-colors"
                      >
                        Find Mentors
                      </button>
                      <button 
                        onClick={() => setActiveTab("skillup")}
                        className="block w-full text-left p-2 rounded hover:bg-muted transition-colors"
                      >
                        Skill Development
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Bottom Navigation - Mobile Only */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
          <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>
    </div>
  );
};

export default Index;
