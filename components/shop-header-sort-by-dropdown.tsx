"use client";

import { ArrowDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type SortOption = "latest" | "oldest" | "highest" | "lowest";

const mapping = {
  latest: "Latest",
  oldest: "Oldest",
  highest: "Highest rating",
  lowest: "Lowest rating",
} as Record<SortOption, string>;

export function ShopHeaderSortByDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-center gap-2 text-base font-medium">
          {mapping.highest}
          <ArrowDown className="h-4! w-4!" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-base font-medium">
        <DropdownMenuItem>Latest</DropdownMenuItem>
        <DropdownMenuItem>Oldest</DropdownMenuItem>
        <DropdownMenuItem>Highest rating</DropdownMenuItem>
        <DropdownMenuItem>Lowest rating</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
