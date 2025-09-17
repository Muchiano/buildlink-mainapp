
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Users } from "lucide-react";

export interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  rating: number;
  sessions: number;
  specialties: string[];
  bio: string;
  price: string;
}

interface MentorItemProps {
  mentor: Mentor;
}

const MentorItem = ({ mentor }: MentorItemProps) => {
  return (
    <Card key={mentor.id} className="border-0 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-primary text-white">
              {mentor.name?.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">{mentor.name}</h3>
            <p className="text-sm text-gray-600">{mentor.title}</p>
            <p className="text-xs text-gray-500 mb-2">{mentor.company}</p>
            
            <div className="flex items-center space-x-4 mb-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-sm font-medium">{mentor.rating}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="h-4 w-4 mr-1" />
                <span className="text-sm">{mentor.sessions} sessions</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-700 mb-3">{mentor.bio}</p>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {mentor.specialties.map((specialty, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-primary">{mentor.price}</span>
              <Button size="sm" className="bg-primary hover:bg-primary-800">
                Book Session
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MentorItem;
