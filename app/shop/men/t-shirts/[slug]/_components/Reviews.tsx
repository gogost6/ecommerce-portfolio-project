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

export function Reviews({
  initialReviews,
  reviewsCount,
  productId,
}: {
  initialReviews: Review[];
  reviewsCount: number;
  productId: number;
}) {
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
        .eq("product_id", productId)
        .eq("is_verified_purchase", true)
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .range(from, to);

      if (data?.length) {
        setReviews((prev) => [...prev, ...(data as Review[])]);
      }
    });
  };

  const sortReviews = (criteria: string) => {
    const sortedReviews = [...reviews];

    switch (criteria) {
      case "latest":
        sortedReviews.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
        break;
      case "oldest":
        sortedReviews.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        );
        break;
      case "highest":
        sortedReviews.sort((a, b) => b.rating - a.rating);
        break;
      case "lowest":
        sortedReviews.sort((a, b) => a.rating - b.rating);
        break;
    }
    setReviews(sortedReviews);
  };

  return (
    <>
      <ReviewsHeader reviewsCount={reviewsCount} sortCb={sortReviews} />
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
