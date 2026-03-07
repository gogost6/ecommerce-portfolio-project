import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDown, SlidersVertical } from "lucide-react";
import { useState } from "react";
import { ReviewWriteDialog } from "./ReviewWriteDialog";

type SortOption = "latest" | "oldest" | "highest" | "lowest";

const mapping = {
  latest: "Latest",
  oldest: "Oldest",
  highest: "Highest rating",
  lowest: "Lowest rating",
} as Record<SortOption, string>;

export function ReviewsHeader({
  reviewsCount,
  sortCb,
  productId,
}: {
  reviewsCount: number;
  sortCb: (criteria: SortOption) => void;
  productId: number;
}) {
  const [option, setOption] = useState<
    "latest" | "oldest" | "highest" | "lowest"
  >("latest");

  const sortReviews = (criteria: SortOption) => {
    setOption(criteria);
    sortCb(criteria);
  };

  return (
    <div className="mb-5 flex flex-row items-center justify-between">
      <div className="flex flex-row items-center justify-center gap-2.5">
        <h3 className="text-xl font-bold md:text-2xl">All Reviews</h3>
        <p className="text-base text-gray-600">({reviewsCount})</p>
      </div>

      <div className="flex flex-row items-center justify-center gap-2.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"} size={"icon"} className="md:hidden">
              <SlidersVertical size={12} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"} className="hidden md:inline-flex">
              {mapping[option]}
              <ArrowDown className="h-4! w-4!" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => sortReviews("latest")}>
              Latest
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => sortReviews("oldest")}>
              Oldest
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => sortReviews("highest")}>
              Highest rating
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => sortReviews("lowest")}>
              Lowest rating
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ReviewWriteDialog productId={productId} />
      </div>
    </div>
  );
}
