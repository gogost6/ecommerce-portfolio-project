"use client";

import { StarRating } from "@/components/star-rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useMemo, useState, useTransition } from "react";
import { AddToCard } from "./_components/AddToCart";
import { Colors } from "./_components/Colors";
import { ReviewsHeader } from "./_components/ReviewsHeader";
import { ReviewsList } from "./_components/ReviewsList";
import { Sizes } from "./_components/Sizes";
import { TabsHeader } from "./_components/TabsHeader";

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

export type Review = {
  id: number;
  reviewer_name: string | null;
  rating: number;
  body: string | null;
  created_at: string;
  is_verified_purchase: boolean;
  is_published: boolean;
};

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
              {display.discounted_price}$
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
      <Colors
        colors={colors}
        selectedColorId={selectedColorId}
        setSelectedColorId={setSelectedColorId}
      />
      <div className="h-[1px] bg-gray-100 mb-6" />
      <Sizes
        sizes={sizes}
        selectedSizeId={selectedSizeId}
        setSelectedSizeId={setSelectedSizeId}
      />
      <div className="h-[1px] bg-gray-100 mb-6" />
      <AddToCard
        qty={qty}
        incQty={incQty}
        decQty={decQty}
        outOfStock={outOfStock}
      />
      <TabsHeader />
      <ReviewsHeader reviewsCount={reviewsCount} />
      <ReviewsList reviews={reviews} />

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
