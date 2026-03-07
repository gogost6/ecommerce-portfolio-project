"use client";

import { ArrowDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [selected, setSelected] = useState<SortOption>("latest");
  const router = useRouter();

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const sort = sp.get("sort");

    if (["latest", "oldest", "highest", "lowest"].includes(sort ?? "")) {
      setSelected(sort as SortOption);
    }
  }, []);

  const handleSelect = (option: SortOption) => {
    setSelected(option);
    const sp = new URLSearchParams(window.location.search);
    sp.set("sort", option);
    const qs = sp.toString();
    const newUrl = `${window.location.pathname}?${qs}`;
    router.push(newUrl);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-center gap-2 text-base font-medium">
          {mapping[selected]}
          <ArrowDown className="h-4! w-4!" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-base font-medium">
        <DropdownMenuItem onClick={() => handleSelect("latest")}>
          Latest
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSelect("oldest")}>
          Oldest
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSelect("highest")}>
          Highest rating
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSelect("lowest")}>
          Lowest rating
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
