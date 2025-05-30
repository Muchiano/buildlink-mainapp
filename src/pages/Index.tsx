
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

  const getPageTitle = () => {
    switch (activeTab) {
      case "home":
        return "Home Feed";
      case "mentorship":
        return "Mentorship Hub";
      case "post":
        return "Create & Share";
      case "skillup":
        return "Skill Up";
      case "profile":
        return "Your Profile";
      default:
        return "BuildLink Kenya";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <TopBar />
      
      {/* Main Content */}
      <main className="pt-16 pb-20 px-4 max-w-2xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{getPageTitle()}</h1>
          {activeTab === "home" && (
            <p className="text-gray-600">Stay updated with industry news, jobs, and professional insights</p>
          )}
          {activeTab === "mentorship" && (
            <p className="text-gray-600">Connect with experienced professionals for guidance and growth</p>
          )}
          {activeTab === "post" && (
            <p className="text-gray-600">Share your projects, insights, and opportunities with the community</p>
          )}
          {activeTab === "skillup" && (
            <p className="text-gray-600">Advance your career with professional development and CPD courses</p>
          )}
          {activeTab === "profile" && (
            <p className="text-gray-600">Showcase your professional portfolio and achievements</p>
          )}
        </div>

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
