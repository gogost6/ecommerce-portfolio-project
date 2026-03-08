import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { ProductSearchResults } from "./product-search-results";
import { ProductSearchResult } from "./types";

type ProductSearchDesktopProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  results: ProductSearchResult[];
  clearSearch: () => void;
};

export function ProductSearchDesktop({
  query,
  setQuery,
  results,
  clearSearch,
}: ProductSearchDesktopProps) {
  return (
    <div className="relative mx-4 hidden w-full max-w-144.25 md:block">
      <Input
        startIcon={<Search size={24} />}
        placeholder="Search for products..."
        name="search"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />

      <ProductSearchResults
        results={results}
        onSelect={clearSearch}
        className="top-full"
      />
    </div>
  );
}
