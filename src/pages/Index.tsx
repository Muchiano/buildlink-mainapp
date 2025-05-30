
import { useState } from "react";
import TopBar from "@/components/TopBar";
import BottomNavigation from "@/components/BottomNavigation";
import HomeFeed from "@/components/feeds/HomeFeed";
import MentorshipHub from "@/components/feeds/MentorshipHub";
import PostCreate from "@/components/feeds/PostCreate";
import SkillUpFeed from "@/components/feeds/SkillUpFeed";
import ProfileBoard from "@/components/feeds/ProfileBoard";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <TopBar />
      
      {/* Main Content */}
      <main className="pt-20 pb-20 px-4 max-w-2xl mx-auto">
        {/* Dynamic Content */}
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
