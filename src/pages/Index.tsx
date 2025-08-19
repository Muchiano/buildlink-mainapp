import { useState } from "react";
import { cn } from "@/lib/utils";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import TopBar from "@/components/TopBar";
import AppSidebar from "@/components/AppSidebar";
import BottomNavigation from "@/components/BottomNavigation";
import ContentFilters from "@/components/ContentFilters";
import HomeFeed from "@/components/feeds/HomeFeed";
import MentorshipHub from "@/components/feeds/MentorshipHub";
import PostCreate from "@/components/feeds/PostCreate";
import SkillUpFeed from "@/components/feeds/SkillUpFeed";
import ProfileBoard from "@/components/feeds/ProfileBoard";
import DashboardRouter from "@/components/dashboards/DashboardRouter";
import { useIsAdmin } from "@/hooks/useIsAdmin";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeFilter, setActiveFilter] = useState("latest");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAdmin } = useIsAdmin();

  const handleLogoClick = () => {
    setActiveTab("dashboard");
    setActiveFilter("latest");
  };

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardRouter />;
      case "home":
        return <HomeFeed activeFilter={activeFilter} />;
      case "mentorship":
      case "job-search":
      case "recruitment":
      case "thought-leadership":
      case "networking":
      case "alumni-network":
        return <MentorshipHub />;
      case "post":
        return <PostCreate />;
      case "skillup":
      case "courses":
      case "skill-development":
      case "employee-development":
        return <SkillUpFeed activeFilter={activeFilter} />;
      case "profile":
      case "branding":
        return <ProfileBoard />;
      case "study-groups":
      case "assignments":
      case "analytics":
        return <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
          <p className="text-muted-foreground">This feature is under development</p>
        </div>;
      default:
        return <DashboardRouter />;
    }
  };

  const shouldShowFilters = activeTab === "home" || activeTab === "skillup";

  return (
    <div>
      <SidebarProvider>
        <div className="min-h-screen bg-gray-50 flex w-full">
          {/* Sidebar */}
          <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Top Navigation */}
            <TopBar onLogoClick={handleLogoClick} onMenuClick={handleMenuClick} />
            
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
              "flex-1 px-4 max-w-4xl mx-auto w-full",
              shouldShowFilters ? "pt-4" : "pt-6",
              "pb-20 md:pb-8"
            )}>
              <div className="animate-fade-in">
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
      {isAdmin && (
        <div className="fixed top-4 right-4 z-50 flex gap-2">
          <a href="/admin-analytics">
            <button className="bg-secondary text-primary px-4 py-2 rounded shadow-md hover:bg-secondary/80 transition">
              Analytics
            </button>
          </a>
          <a href="/admin-resources">
            <button className="bg-primary text-white px-4 py-2 rounded shadow-md hover:bg-primary/80 transition">
              Admin Panel
            </button>
          </a>
        </div>
      )}
    </div>
  );
};

export default Index;
