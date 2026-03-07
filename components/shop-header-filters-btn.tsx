"use client";

import { useFiltersOpenerStore } from "@/store/filters-opener-store";
import { SlidersVertical } from "lucide-react";
import { Button } from "./ui/button";

export function ShopHeaderFiltersBtn() {
  const { toggle } = useFiltersOpenerStore();

  return (
    <Button
      variant={"secondary"}
      size={"icon"}
      onClick={toggle}
      className="md:hidden"
    >
      <SlidersVertical />
    </Button>
  );
}
