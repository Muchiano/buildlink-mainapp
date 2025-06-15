
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Users, 
  MessageSquare, 
  PlusCircle, 
  Search, 
  Briefcase, 
  GraduationCap,
  Building2,
  Heart
} from 'lucide-react';

interface EmptyStateProps {
  type: 'posts' | 'search' | 'notifications' | 'mentors' | 'courses' | 'connections';
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState = ({ 
  type, 
  title, 
  description, 
  actionLabel, 
  onAction 
}: EmptyStateProps) => {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'posts':
        return {
          icon: <MessageSquare className="h-16 w-16 text-gray-400" />,
          title: title || 'No posts yet',
          description: description || 'Be the first to share something with the community! Your insights and experiences matter.',
          actionLabel: actionLabel || 'Create your first post',
          icon2: <PlusCircle className="h-4 w-4 mr-2" />
        };
      
      case 'search':
        return {
          icon: <Search className="h-16 w-16 text-gray-400" />,
          title: title || 'No results found',
          description: description || 'Try adjusting your search terms or explore different keywords.',
          actionLabel: actionLabel || 'Browse all posts',
          icon2: <MessageSquare className="h-4 w-4 mr-2" />
        };
      
      case 'notifications':
        return {
          icon: <Heart className="h-16 w-16 text-gray-400" />,
          title: title || 'No notifications',
          description: description || 'You\'re all caught up! New notifications will appear here when others interact with your content.',
          actionLabel: actionLabel || 'Create a post',
          icon2: <PlusCircle className="h-4 w-4 mr-2" />
        };
      
      case 'mentors':
        return {
          icon: <Users className="h-16 w-16 text-gray-400" />,
          title: title || 'No mentors available',
          description: description || 'Be the first to join as a mentor and help others grow in their construction careers.',
          actionLabel: actionLabel || 'Become a mentor',
          icon2: <GraduationCap className="h-4 w-4 mr-2" />
        };
      
      case 'courses':
        return {
          icon: <GraduationCap className="h-16 w-16 text-gray-400" />,
          title: title || 'No courses available',
          description: description || 'Check back later for new learning opportunities in construction and engineering.',
          actionLabel: actionLabel || 'Browse skills',
          icon2: <Search className="h-4 w-4 mr-2" />
        };
      
      case 'connections':
        return {
          icon: <Building2 className="h-16 w-16 text-gray-400" />,
          title: title || 'No connections yet',
          description: description || 'Start building your professional network by connecting with other construction professionals.',
          actionLabel: actionLabel || 'Find people',
          icon2: <Search className="h-4 w-4 mr-2" />
        };
      
      default:
        return {
          icon: <MessageSquare className="h-16 w-16 text-gray-400" />,
          title: title || 'Nothing here yet',
          description: description || 'Content will appear here soon.',
          actionLabel: actionLabel || 'Get started',
          icon2: <PlusCircle className="h-4 w-4 mr-2" />
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <Card className="border-dashed border-2 border-gray-200">
      <CardContent className="flex flex-col items-center justify-center text-center py-12">
        {content.icon}
        <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">
          {content.title}
        </h3>
        <p className="text-gray-500 mb-6 max-w-md">
          {content.description}
        </p>
        {onAction && actionLabel && (
          <Button onClick={onAction} variant="outline">
            {content.icon2}
            {content.actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default EmptyState;
