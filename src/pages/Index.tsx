
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar";
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

  const handleLogoClick = () => {
    setActiveTab("home");
    setActiveFilter("latest");
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
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        {/* Sidebar - Hidden on mobile */}
        <div className="hidden md:block">
          <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Main Content Area - Full width on mobile, Instagram-like on desktop */}
        <div className="flex-1 flex flex-col min-w-0 w-full md:max-w-[975px] md:mx-auto">
          {/* Top Navigation */}
          <TopBar onLogoClick={handleLogoClick} />
          
          {/* Content Filters */}
          {shouldShowFilters && (
            <ContentFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              filterType={activeTab}
            />
          )}
          
          {/* Main Content */}
          <main className={cn(
            "flex-1 w-full overflow-x-hidden",
            // Mobile: minimal padding for max content width
            "px-3",
            // Desktop: Instagram-like max width with proper padding
            "md:px-5 md:max-w-[935px] md:mx-auto",
            shouldShowFilters ? "pt-3 md:pt-4" : "pt-4 md:pt-6",
            // Bottom padding to account for mobile navigation
            "pb-24 md:pb-8"
          )}>
            <div className="animate-fade-in w-full">
              {renderContent()}
            </div>
          </main>
        </div>

        {/* Bottom Navigation - Mobile Only */}
        <div className="md:hidden">
          <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
