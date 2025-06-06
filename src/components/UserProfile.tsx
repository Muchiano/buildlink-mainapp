
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { MapPin, Building2, Calendar, Users, Award } from "lucide-react";

interface UserProfileProps {
  user: {
    name: string;
    role: string;
    company: string;
    location: string;
    joinedDate: string;
    followers: number;
    following: number;
    projects: number;
  };
  onClose: () => void;
}

const UserProfile = ({ user, onClose }: UserProfileProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[80vh] overflow-y-auto">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-600">{user.role}</p>
                <p className="text-sm text-gray-500">{user.company}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              {user.location}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              Joined {user.joinedDate}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{user.followers}</div>
              <div className="text-xs text-gray-500">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{user.following}</div>
              <div className="text-xs text-gray-500">Following</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{user.projects}</div>
              <div className="text-xs text-gray-500">Projects</div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button className="flex-1">Connect</Button>
            <Button variant="outline" className="flex-1">Message</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
