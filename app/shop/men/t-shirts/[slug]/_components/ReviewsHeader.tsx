import { Button } from "@/components/ui/button";
import { SlidersVertical } from "lucide-react";

export function ReviewsHeader({ reviewsCount }: { reviewsCount: number }) {
  return (
    <div className="flex flex-row justify-between items-center mb-5">
      <div className="flex flex-row gap-2.5 justify-center items-center">
        <h3 className="font-bold text-xl">All Reviews</h3>
        <p className="text-gray-600 text-base">({reviewsCount})</p>
      </div>

      <div className="flex flex-row gap-2.5 justify-center items-center">
        <Button variant={"outline"} size={"icon"}>
          <SlidersVertical size={12} />
        </Button>
        <Button>Write a Review</Button>
      </div>
    </div>
  );
}
