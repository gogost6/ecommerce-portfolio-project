import { Star } from "lucide-react";

export const StarRating = ({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      <div className="flex flex-row gap-1">
        {[...Array(5)].map((_, index) => {
          index += 1;

          return (
            <Star
              key={index}
              className={`w-4 h-4 md:w-5 md:h-5 ${index <= rating ? "text-yellow-500" : "text-gray-300"}`}
            />
          );
        })}
      </div>
      <p className="text-xs md:text-sm text-gray-600">
        {rating}/<span className="text-gray-500">5</span>
      </p>
    </div>
  );
};
