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
                className="w-4 h-4 md:w-5 md:h-5 text-yellow-500"
              />
            );
          }

          if (starValue - 0.5 === roundedRating) {
            // Half star
            return (
              <StarHalf
                key={index}
                className="w-4 h-4 md:w-5 md:h-5 text-yellow-500"
              />
            );
          }

          // Empty star
          return (
            <Star key={index} className="w-4 h-4 md:w-5 md:h-5 text-gray-300" />
          );
        })}
      </div>

      <p className="text-xs md:text-sm text-gray-600">
        {rating.toFixed(1)}/<span className="text-gray-500">5</span>
      </p>
    </div>
  );
};
