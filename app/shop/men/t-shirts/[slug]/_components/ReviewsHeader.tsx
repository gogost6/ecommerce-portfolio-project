import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDown, SlidersVertical } from "lucide-react";
import { useState } from "react";

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
}: {
  reviewsCount: number;
  sortCb: (criteria: SortOption) => void;
}) {
  const [option, setOption] = useState<
    "latest" | "oldest" | "highest" | "lowest"
  >("latest");

  const sortReviews = (criteria: SortOption) => {
    setOption(criteria);
    sortCb(criteria);
  };

  return (
    <div className="flex flex-row justify-between items-center mb-5">
      <div className="flex flex-row gap-2.5 justify-center items-center">
        <h3 className="font-bold text-xl md:text-2xl">All Reviews</h3>
        <p className="text-gray-600 text-base">({reviewsCount})</p>
      </div>

      <div className="flex flex-row gap-2.5 justify-center items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant={"outline"} size={"icon"} className="md:hidden">
              <SlidersVertical size={12} />
            </Button>
            <Button variant={"outline"} className="hidden md:inline-flex">
              {mapping[option]}
              <ArrowDown className="!w-4 !h-4" />
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
        <Button>Write a Review</Button>
      </div>
    </div>
  );
}
