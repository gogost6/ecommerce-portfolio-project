import { StarRating } from "@/components/star-rating";
import { Check } from "lucide-react";
import { Review } from "./Reviews";

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  }).format(new Date(iso));

export function ReviewsList({ reviews }: { reviews: Review[] }) {
  return (
    <div className="mb-5 flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-5">
      {reviews.length === 0 && (
        <p className="col-span-full mt-4 text-center text-gray-600">
          No reviews yet. Be the first to review this product!
        </p>
      )}
      {reviews.map((review) => (
        <div
          key={review.id}
          className="rounded-lg border border-gray-100 p-4 md:px-8 md:py-7"
        >
          <StarRating rating={review.rating} />

          <div className="mt-3 mb-2 flex w-fit flex-row items-center justify-center gap-1 md:mt-4 md:mb-3">
            <h4 className="text-lg font-bold md:text-xl">
              {review.reviewer_name}
            </h4>
            <div className="relative h-5 w-5 rounded-full bg-green-500">
              <Check
                size={10}
                color="white"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          </div>

          <p className="mb-4 text-base text-gray-600 md:mb-6">{review.body}</p>
          <span className="text-base font-medium text-gray-600">
            Posted on {formatDate(review.created_at)}
          </span>
        </div>
      ))}
    </div>
  );
}
