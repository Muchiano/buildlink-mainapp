import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface UserRatingProps {
  rating: number;
  totalRatings: number;
  showDetails?: boolean;
  className?: string;
}

const UserRating = ({ rating, totalRatings, showDetails = true, className = '' }: UserRatingProps) => {
  const displayRating = rating || 0;
  const fullStars = Math.floor(displayRating);
  const hasHalfStar = displayRating % 1 >= 0.5;

  if (totalRatings === 0) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-4 h-4 text-muted-foreground" />
          ))}
        </div>
        {showDetails && <span className="text-sm text-muted-foreground">No ratings yet</span>}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= fullStars
                ? 'fill-yellow-400 text-yellow-400'
                : star === fullStars + 1 && hasHalfStar
                ? 'fill-yellow-400/50 text-yellow-400'
                : 'text-muted-foreground'
            }`}
          />
        ))}
      </div>
      {showDetails && (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{displayRating.toFixed(1)}</span>
          <Badge variant="secondary" className="text-xs">
            {totalRatings} {totalRatings === 1 ? 'review' : 'reviews'}
          </Badge>
        </div>
      )}
    </div>
  );
};

export default UserRating;