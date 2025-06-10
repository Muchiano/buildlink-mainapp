
import { Star, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Mentor } from '@/types/database';

interface MentorCardProps {
  mentor: Mentor;
  onBookSession: (mentor: Mentor) => void;
}

const MentorCard = ({ mentor, onBookSession }: MentorCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={mentor.user?.avatar_url} />
            <AvatarFallback className="text-lg">
              {mentor.user?.full_name?.charAt(0) || 'M'}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{mentor.user?.full_name}</h3>
            <p className="text-muted-foreground text-sm">{mentor.user?.profession}</p>
            
            <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{mentor.rating.toFixed(1)}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{mentor.total_sessions} sessions</span>
              </div>
              
              {mentor.hourly_rate && (
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>${mentor.hourly_rate}/hr</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">{mentor.description}</p>
          
          <div className="flex flex-wrap gap-2">
            {mentor.specializations.map((spec) => (
              <Badge key={spec} variant="secondary" className="text-xs">
                {spec}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-3">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Available:</span> {mentor.availability}
            </div>
            
            <Button onClick={() => onBookSession(mentor)}>
              Book Session
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MentorCard;
