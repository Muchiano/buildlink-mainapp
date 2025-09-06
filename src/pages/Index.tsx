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
    <div className="w-full">
      <div className="min-h-screen bg-gray-50 flex w-full">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Navigation */}
          <TopBar onLogoClick={handleLogoClick} onMenuClick={handleMenuClick} />

          {/* Main Content */}
          <main
            className={cn(
              "grid grid-cols-12 h-screen px-4 pb-20 md:pb-8 w-full max-w-screen-xl mx-auto",
              shouldShowFilters ? "" : ""
            )}>
            {/* Sidebar */}
            <div className="hidden md:block col-span-3 bg-white border-r">
              <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

            <div className="lg:col-span-8 md:col-span-9 col-span-12 md:col-start-4">
              {/* Content Filters */}
              {shouldShowFilters && (
                <ContentFilters
                  activeFilter={activeFilter}
                  onFilterChange={setActiveFilter}
                  filterType={activeTab}
                />
              )}
              <div className="animate-fade-in">{renderContent()}</div>
            </div>
          </main>
        </div>

        {/* Bottom Navigation - Mobile Only */}
        <div className="md:hidden">
          <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>
    </div>
  );
};

export default Index;
