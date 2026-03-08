import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ProductSearchResults } from "./product-search-results";
import { ProductSearchResult } from "./types";

type ProductSearchMobileProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  results: ProductSearchResult[];
  clearSearch: () => void;
};

export function ProductSearchMobile({
  query,
  setQuery,
  results,
  clearSearch,
}: ProductSearchMobileProps) {
  const [isOpen, setIsOpen] = useState(false);

  function closeProductSearchMobile() {
    setIsOpen(false);
    clearSearch();
  }

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        aria-label="Open search"
      >
        <Search />
      </Button>

      <div
        className={cn(
          "bg-background fixed inset-0 z-50 transition-all duration-200",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <div className="border-border flex items-center gap-2 border-b p-4">
          <div className="flex-1">
            <Input
              autoFocus
              startIcon={<Search size={20} />}
              placeholder="Search for products..."
              name="mobile-search"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={closeProductSearchMobile}
            aria-label="Close search"
          >
            <X />
          </Button>
        </div>

        <div className="relative p-4">
          <ProductSearchResults
            results={results}
            onSelect={closeProductSearchMobile}
            className="static mt-0 border-none p-0 shadow-none"
          />

          {!results.length && query.trim() && (
            <p className="text-muted-foreground text-sm">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
