
import { Card, CardContent } from "../ui/card";

interface ProfileTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  postsCount: number;
}

const ProfileTabs = ({ activeTab, setActiveTab, postsCount }: ProfileTabsProps) => (
  <Card className="border-0 shadow-sm">
    <CardContent className="p-0">
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("about")}
          className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
            activeTab === "about"
              ? "text-primary border-b-2 border-primary bg-primary/5"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          About
        </button>
        <button
          onClick={() => setActiveTab("activity")}
          className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
            activeTab === "activity"
              ? "text-primary border-b-2 border-primary bg-primary/5"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Activity ({postsCount})
        </button>
      </div>
    </CardContent>
  </Card>
);

export default ProfileTabs;
