import { StarRating } from "@/components/star-rating";
import { Check } from "lucide-react";
import { Review } from "../product-details.client";

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  }).format(new Date(iso));

export function ReviewsList({ reviews }: { reviews: Review[] }) {
  return (
    <div className="flex flex-col gap-4 mb-5">
      {reviews.map((review) => (
        <div key={review.id} className="border border-gray-100 rounded-lg p-4">
          <StarRating rating={review.rating} />

          <div className="flex flex-row gap-1 items-center justify-center w-fit mt-3 mb-2">
            <h4 className="text-lg font-bold">{review.reviewer_name}</h4>
            <div className="w-5 h-5 bg-green-500 relative rounded-full">
              <Check
                size={10}
                color="white"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          </div>

          <p className="text-gray-600 text-base mb-4">{review.body}</p>
          <span className="font-medium text-base text-gray-600">
            Posted on {formatDate(review.created_at)}
          </span>
        </div>
      ))}
    </div>
  );
}
