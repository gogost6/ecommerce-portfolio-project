"use client";

import { StarRating } from "@/components/star-rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { Check, SlidersVertical } from "lucide-react";
import { useMemo, useState, useTransition } from "react";

type Variant = {
  id: number;
  sku: string | null;
  price: number;
  discounted_price: number | null;
  percent_discount: number | null;
  stock: number;
  is_active: boolean;
  size_id: number | null;
  color_id: number | null;
  sizes: { id: number; name: string; slug: string } | null;
  colors: { id: number; name: string; slug: string; hex: string } | null;
};

type Product = {
  id: number;
  title: string;
  rating: number;
  price: number;
  discounted_price: number | null;
  percent_discount: number | null;
  description: string | null;
  product_variants: Variant[];
};

type Review = {
  id: number;
  reviewer_name: string | null;
  rating: number;
  body: string | null;
  created_at: string;
  is_verified_purchase: boolean;
  is_published: boolean;
};

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  }).format(new Date(iso));

const REVIEWS_PAGE_SIZE = 3;

export default function ProductDetailsClient({
  product,
  initialReviews,
  reviewsCount,
}: {
  product: Product;
  initialReviews: Review[];
  reviewsCount: number;
}) {
  const [selectedColorId, setSelectedColorId] = useState<number | null>(() => {
    const first = product.product_variants.find((v) => v.colors?.id)?.colors
      ?.id;
    return first ?? null;
  });

  const [selectedSizeId, setSelectedSizeId] = useState<number | null>(() => {
    const first = product.product_variants.find((v) => v.sizes?.id)?.sizes?.id;
    return first ?? null;
  });

  const [qty, setQty] = useState(1);

  // ---- Deduped colors/sizes ----
  const colors = useMemo(() => {
    const map = new Map();
    for (const v of product.product_variants) {
      if (v.colors) map.set(v.colors.id, v.colors);
    }
    return [...map.values()];
  }, [product.product_variants]);

  const sizes = useMemo(() => {
    const map = new Map();
    for (const v of product.product_variants) {
      if (v.sizes) map.set(v.sizes.id, v.sizes);
    }
    return [...map.values()];
  }, [product.product_variants]);

  // ---- Pick variant by selected color+size ----
  const selectedVariant = useMemo(() => {
    return product.product_variants.find((v) => {
      const colorOk = selectedColorId ? v.colors?.id === selectedColorId : true;
      const sizeOk = selectedSizeId ? v.sizes?.id === selectedSizeId : true;
      return colorOk && sizeOk && v.is_active;
    });
  }, [product.product_variants, selectedColorId, selectedSizeId]);

  // ---- Price displayed (variant overrides product) ----
  const display = useMemo(() => {
    const basePrice = selectedVariant?.price ?? product.price;
    const disc = selectedVariant?.discounted_price ?? product.discounted_price;
    const perc =
      basePrice && disc
        ? Math.round(((basePrice - disc) / basePrice) * 100)
        : null;

    return {
      basePrice,
      discounted_price: disc,
      percent_discount: perc,
      hasDiscount: !!disc && !!perc,
      stock: selectedVariant?.stock ?? null,
    };
  }, [selectedVariant, product.price, product.discounted_price]);

  // ---- Reviews pagination ----
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [loadingMore, startTransition] = useTransition();

  const canLoadMore = reviews.length < reviewsCount;

  const loadMoreReviews = () => {
    startTransition(async () => {
      const supabase = createClient();

      const from = reviews.length;
      const to = from + REVIEWS_PAGE_SIZE - 1;

      const { data } = await supabase
        .from("product_reviews")
        .select(
          `
          id,
          reviewer_name,
          rating,
          body,
          created_at,
          is_verified_purchase,
          is_published
        `,
        )
        .eq("product_id", product.id)
        .eq("is_verified_purchase", true)
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .range(from, to);

      if (data?.length) {
        setReviews((prev) => [...prev, ...(data as Review[])]);
      }
    });
  };

  const decQty = () => setQty((q) => Math.max(1, q - 1));
  const incQty = () => setQty((q) => q + 1);

  const outOfStock = display.stock !== null ? display.stock <= 0 : false;

  return (
    <>
      <h1 className="text-2xl font-black mt-20 mb-3">{product.title}</h1>
      <StarRating rating={product.rating} />

      <div className="flex flex-row gap-2.5 mt-2.5 mb-5 items-center">
        <p className="text-2xl font-medium">{display.basePrice}$</p>

        {display.hasDiscount && (
          <>
            <p className="text-gray-600 line-through text-2xl font-medium">
              {display.discounted_price}$ {/* (this is your “old price”) */}
            </p>
            <Badge variant={"red"}>{display.percent_discount}%</Badge>
          </>
        )}

        {selectedVariant?.sku && (
          <span className="text-xs text-gray-400 ml-2">
            SKU: {selectedVariant.sku}
          </span>
        )}
      </div>

      <p className="text-sm text-gray-600 mb-6">{product.description}</p>

      <div className="h-[1px] bg-gray-100 mb-6" />

      {/* Colors */}
      <div className="flex flex-col gap-4 mb-6">
        <p className="text-gray-600 text-sm">Select Colors</p>
        <div className="flex flex-row gap-3">
          {colors.map((c) => {
            const active = c.id === selectedColorId;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedColorId(c.id)}
                className={[
                  "w-8 h-8 rounded-full border-2 transition-colors focus:outline-none",
                  active
                    ? "border-gray-900"
                    : "border-gray-300 hover:border-gray-600",
                ].join(" ")}
                style={{ backgroundColor: c.hex }}
                aria-label={`Select color: ${c.name}`}
              />
            );
          })}
        </div>
      </div>

      <div className="h-[1px] bg-gray-100 mb-6" />

      {/* Sizes */}
      <div className="flex flex-col gap-4 mb-6">
        <p className="text-gray-600 text-sm">Choose size</p>
        <div className="flex flex-row gap-3 flex-wrap">
          {sizes.map((s) => {
            const active = s.id === selectedSizeId;
            return (
              <Button
                key={s.id}
                variant={active ? "default" : "outline"}
                onClick={() => setSelectedSizeId(s.id)}
              >
                {s.name}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="h-[1px] bg-gray-100 mb-6" />

      {/* Qty + Add to cart */}
      <div className="flex items-stretch justify-center gap-3 mb-12">
        <div className="bg-gray-100 rounded-2xl flex items-stretch">
          <button
            type="button"
            onClick={decQty}
            className="px-4 text-2xl flex items-center"
            aria-label="Decrease quantity"
          >
            -
          </button>

          <span className="px-3 flex items-center">{qty}</span>

          <button
            type="button"
            onClick={incQty}
            className="px-4 text-2xl flex items-center"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <Button className="flex-1" disabled={outOfStock}>
          {outOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      </div>

      {/* Tabs header (static for now) */}
      <div className="w-full border-b mb-5">
        <div className="flex justify-center gap-12 text-gray-400 text-sm">
          <button className="pb-4">Product Details</button>
          <button className="pb-4 text-black relative">
            Rating & Reviews
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black" />
          </button>
          <button className="pb-4">FAQs</button>
        </div>
      </div>

      {/* Reviews header */}
      <div className="flex flex-row justify-between items-center mb-5">
        <div className="flex flex-row gap-2.5 justify-center items-center">
          <h3 className="font-bold text-xl">All Reviews</h3>
          <p className="text-gray-600 text-base">({reviewsCount})</p>
        </div>

        <div className="flex flex-row gap-2.5 justify-center items-center">
          <Button variant={"outline"} size={"icon"}>
            <SlidersVertical size={12} />
          </Button>
          <Button>Write a Review</Button>
        </div>
      </div>

      {/* Reviews list */}
      <div className="flex flex-col gap-4 mb-5">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border border-gray-100 rounded-lg p-4"
          >
            <StarRating rating={review.rating} />

            <div className="flex flex-row gap-1 items-center justify-center w-fit mt-3 mb-2">
              <h4 className="text-lg font-bold">{review.reviewer_name}</h4>
              <div className="w-5 h-5 bg-green-500 relative rounded-full">
                <Check
                  size={10}
                  color="white"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
            </div>

            <p className="text-gray-600 text-base mb-4">{review.body}</p>
            <span className="font-medium text-base text-gray-600">
              Posted on {formatDate(review.created_at)}
            </span>
          </div>
        ))}
      </div>

      {/* Load more */}
      {canLoadMore && (
        <Button
          variant={"outline"}
          className="block mx-auto mb-12"
          onClick={loadMoreReviews}
          disabled={loadingMore}
        >
          {loadingMore ? "Loading..." : "Load More Reviews"}
        </Button>
      )}
    </>
  );
}
