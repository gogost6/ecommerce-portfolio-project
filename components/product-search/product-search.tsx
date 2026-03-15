"use client";

import { useEffect, useRef, useState } from "react";
import { ProductSearchDesktop } from "./product-search-desktop";
import { ProductSearchMobile } from "./product-search-mobile";
import { ProductSearchResult } from "./types";

export function ProductSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductSearchResult[]>([]);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  function clearSearch() {
    setResults([]);
    setQuery("");
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setResults([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/products/search?q=${encodeURIComponent(query)}`,
        );

        if (!res.ok) {
          setResults([]);
          return;
        }

        const data = await res.json();
        setResults(data);
      } catch {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div ref={wrapperRef} className="flex w-fit items-center gap-2 md:w-full">
      <ProductSearchMobile
        query={query}
        setQuery={setQuery}
        results={results}
        clearSearch={clearSearch}
      />

      <ProductSearchDesktop
        query={query}
        setQuery={setQuery}
        results={results}
        clearSearch={clearSearch}
      />
    </div>
  );
}
