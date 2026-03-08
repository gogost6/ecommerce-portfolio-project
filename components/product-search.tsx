"use client";

import { createClient } from "@/lib/supabase/client";
import { cn, DEFAULT_PRODUCT_IMAGE_URL } from "@/lib/utils";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type ProductSearchResult = {
  id: number;
  title: string;
  price: number;
  gender: string;
  slug: string;
  categories: { slug: string };
  product_types: { slug: string };
  product_images: { url: string; alt: string | null; is_primary: boolean }[];
};

export function ProductSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductSearchResult[]>([]);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

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
      const supabase = createClient();

      const { data, error } = await supabase
        .from("products")
        .select(
          `
          id,
          title,
          price,
          gender,
          slug,
          categories!inner ( slug ),
          product_types!inner ( slug ),
          product_images (
            url,
            alt,
            is_primary
          )
        `,
        )
        .ilike("title", `%${query}%`);

      if (data) {
        setResults(data);
      } else if (error) {
        toast.error("An error occurred while searching for products.");
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div ref={wrapperRef} className="flex gap-2">
      <Button variant="ghost" size="icon" className="md:hidden">
        <Search />
      </Button>

      <div className="relative mx-4 hidden w-full max-w-144.25 md:block">
        <Input
          startIcon={<Search size={24} />}
          placeholder="Search for products..."
          name="search"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />

        <div
          className={cn(
            "bg-background absolute top-full left-0 z-10 mt-2 flex w-full flex-col gap-2 rounded-sm border border-gray-100 p-1 shadow-xl transition-opacity",
            results.length > 0
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0",
          )}
        >
          {results.map((result, index) => (
            <Link
              href={`/shop/${result.categories.slug}/${result.gender}/${result.product_types.slug}/${result.slug}`}
              key={result.id + "-" + index}
              onClick={() => {
                setResults([]);
                setQuery("");
              }}
              className="hover:bg-accent rounded-md p-2 transition-colors"
            >
              <div className="flex gap-2">
                <Image
                  src={
                    result.product_images?.find((img) => img.is_primary)?.url ||
                    DEFAULT_PRODUCT_IMAGE_URL
                  }
                  alt={
                    result.product_images?.find((img) => img.is_primary)?.alt ||
                    "Placeholder"
                  }
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-xl object-cover"
                />
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-semibold">{result.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    ${result.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
