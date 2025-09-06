
import { Card, CardContent } from "../ui/card";
import { MessageSquare, Edit, Heart, Share2 } from "lucide-react";

interface ProfileActivityProps {
  userPosts: any[];
}

const ProfileActivity = ({ userPosts }: ProfileActivityProps) => {
  const renderActivityItem = (post: any) => (
    <div key={post.id} className="border-b border-gray-100 pb-4 mb-4 last:border-b-0">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          <Edit className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <p className="text-gray-800 mb-2">{post.content}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {new Date(post.created_at).toLocaleDateString()}
            </span>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Heart className="h-4 w-4" />
                <span>{post.likes_count || 0}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageSquare className="h-4 w-4" />
                <span>{post.comments_count || 0}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Share2 className="h-4 w-4" />
                <span>{post.reposts_count || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
          <span className="text-sm text-gray-500">{userPosts.length} posts</span>
        </div>
        {userPosts.length > 0 ? (
          <div className="space-y-4">
            {/* Show only first 2 posts in grid layout initially */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userPosts.slice(0, 2).map(renderActivityItem)}
            </div>
            
            {/* View more button if there are more posts */}
            {userPosts.length > 2 && (
              <div className="pt-4 border-t text-center">
                <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
                  View all {userPosts.length} posts →
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No posts yet</h3>
            <p className="text-gray-500">
              Start sharing your thoughts and experiences with the community
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileActivity;
