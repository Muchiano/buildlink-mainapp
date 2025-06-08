
import { useState } from "react";
import BottomNavigation from "@/components/BottomNavigation";
import ContentFilters from "@/components/ContentFilters";
import HomeFeed from "@/components/feeds/HomeFeed";
import MentorshipHub from "@/components/feeds/MentorshipHub";
import PostCreate from "@/components/feeds/PostCreate";
import SkillUpFeed from "@/components/feeds/SkillUpFeed";
import ProfileBoard from "@/components/feeds/ProfileBoard";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [activeFilter, setActiveFilter] = useState("latest");
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeFeed />;
      case "mentorship":
        return <MentorshipHub />;
      case "post":
        return <PostCreate />;
      case "skillup":
        return <SkillUpFeed />;
      case "profile":
        return <ProfileBoard />;
      default:
        return <HomeFeed />;
    }
  };

  const getFilterType = () => {
    return activeTab === "skillup" ? "skillup" : "home";
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Top Bar */}
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3 max-w-6xl mx-auto">
            <div className="flex items-center space-x-3">
              <h1 className="text-xl font-bold text-gray-900">BuildLink KE</h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>{user?.email}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        {(activeTab === "home" || activeTab === "skillup") && (
          <ContentFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            filterType={getFilterType()}
          />
        )}

        {/* Main Content */}
        <main className="pb-20 pt-4">
          <div className="max-w-6xl mx-auto px-4">
            {renderContent()}
          </div>
        </main>

        {/* Bottom Navigation */}
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </ProtectedRoute>
  );
};

export default Index;
