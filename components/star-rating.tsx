import { Star, StarHalf } from "lucide-react";

export const StarRating = ({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) => {
  const roundedRating = Math.round(rating * 2) / 2; // rounds to nearest 0.5

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;

          if (starValue <= roundedRating) {
            return (
              <Star
                key={index}
                className="h-4 w-4 text-yellow-500 md:h-5 md:w-5"
              />
            );
          }

          if (starValue - 0.5 === roundedRating) {
            // Half star
            return (
              <StarHalf
                key={index}
                className="h-4 w-4 text-yellow-500 md:h-5 md:w-5"
              />
            );
          }

          // Empty star
          return (
            <Star key={index} className="h-4 w-4 text-gray-300 md:h-5 md:w-5" />
          );
        })}
      </div>

      <p className="text-xs text-gray-600 md:text-sm">
        {rating.toFixed(1)}/<span className="text-gray-500">5</span>
      </p>
    </div>
  );
};
