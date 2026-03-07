"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useState, useTransition } from "react";
import { ReviewsHeader } from "./ReviewsHeader";
import { ReviewsList } from "./ReviewsList";

export type Review = {
  id: number;
  reviewer_name: string | null;
  rating: number;
  body: string | null;
  created_at: string;
  is_verified_purchase: boolean;
  is_published: boolean;
};

const REVIEWS_PAGE_SIZE = 4;
const SELECT_REVIEWS_FIELDS = `
  id,
  reviewer_name,
  rating,
  body,
  created_at,
  is_verified_purchase,
  is_published
`;

export function Reviews({
  initialReviews,
  reviewsCount,
  productId,
}: {
  initialReviews: Review[];
  reviewsCount: number;
  productId: number;
}) {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<"created_at" | "rating">("created_at");
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
        .select(SELECT_REVIEWS_FIELDS)
        .eq("product_id", productId)
        .eq("is_verified_purchase", true)
        .eq("is_published", true)
        .order(orderBy, { ascending: order === "asc" })
        .order("id", { ascending: true })
        .range(from, to);

      if (data?.length) {
        setReviews((prev) => [...prev, ...(data as Review[])]);
      }
    });
  };

  const sortReviews = async (criteria: string) => {
    const supabase = createClient();

    let order: "asc" | "desc" = "desc";
    let orderBy: "created_at" | "rating" = "created_at";

    switch (criteria) {
      case "latest":
        orderBy = "created_at";
        order = "desc";
        break;
      case "oldest":
        orderBy = "created_at";
        order = "asc";
        break;
      case "highest":
        orderBy = "rating";
        order = "desc";
        break;
      case "lowest":
        orderBy = "rating";
        order = "asc";
        break;
    }

    setOrder(order);
    setOrderBy(orderBy);

    const { data } = await supabase
      .from("product_reviews")
      .select(SELECT_REVIEWS_FIELDS)
      .eq("product_id", productId)
      .eq("is_verified_purchase", true)
      .eq("is_published", true)
      .order(orderBy, { ascending: order === "asc" })
      .order("id", { ascending: true })
      .limit(reviews.length);

    if (data) {
      setReviews(data as Review[]);
    }
  };

  return (
    <>
      <ReviewsHeader
        reviewsCount={reviewsCount}
        sortCb={sortReviews}
        productId={productId}
      />
      <ReviewsList reviews={reviews} />

      {canLoadMore && (
        <Button
          variant={"outline"}
          className="mx-auto mb-12 block"
          onClick={loadMoreReviews}
          disabled={loadingMore}
        >
          {loadingMore ? "Loading..." : "Load More Reviews"}
        </Button>
      )}
    </>
  );
}
