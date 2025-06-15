import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface UserAvatarHeaderProps {
  user: any;
}
const UserAvatarHeader: React.FC<UserAvatarHeaderProps> = ({ user }) => (
  <div className="flex space-x-3 mb-4">
    <Avatar>
      <AvatarImage src={user?.user_metadata?.avatar_url} />
      <AvatarFallback className="bg-primary text-white">
        {user?.user_metadata?.full_name?.charAt(0) || 'U'}
      </AvatarFallback>
    </Avatar>
    <div className="flex-1">
      <h3 className="font-medium text-gray-800">
        {user?.user_metadata?.full_name || 'Your Name'}
      </h3>
      <p className="text-sm text-gray-600">Professional</p>
    </div>
  </div>
);

export default UserAvatarHeader;
