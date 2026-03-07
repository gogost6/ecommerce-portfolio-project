"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import * as React from "react";

type Category = { slug: string; name: string };

export function NavigationCategoriesDropdown({
  label,
  gender,
  categories,
}: {
  label: string;
  gender: "men" | "women";
  categories: Category[];
}) {
  const [open, setOpen] = React.useState(false);
  const closeTimer = React.useRef<number | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openNow = () => {
    clearCloseTimer();
    setOpen(true);
  };

  const closeSoon = () => {
    clearCloseTimer();
    // small delay prevents flicker when moving between trigger and content
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          onMouseEnter={openNow}
          onMouseLeave={closeSoon}
          className="flex items-center gap-1 text-base font-light underline-offset-4 hover:underline"
        >
          {label} <ChevronDown size={12} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="center"
        className="w-48"
        forceMount
        onMouseEnter={openNow}
        onMouseLeave={closeSoon}
      >
        {categories.map((category) => (
          <DropdownMenuItem key={category.slug} asChild>
            <Link
              href={`/shop/${category.slug}/${gender}`}
              className="cursor-pointer"
            >
              {category.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
