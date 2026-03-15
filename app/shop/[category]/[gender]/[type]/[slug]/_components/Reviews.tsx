"use client";

import { Button } from "@/components/ui/button";
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
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<"created_at" | "rating">("created_at");
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [loadingMore, startTransition] = useTransition();

  const canLoadMore = reviews.length < reviewsCount;

  const loadMoreReviews = () => {
    startTransition(async () => {
      const offset = reviews.length;

      const res = await fetch(
        `/api/products/${productId}/reviews?offset=${offset}&limit=${REVIEWS_PAGE_SIZE}&orderBy=${orderBy}&order=${order}`,
        {
          method: "GET",
        },
      );

      if (!res.ok) return;

      const data: Review[] = await res.json();

      if (data.length) {
        setReviews((prev) => [...prev, ...data]);
      }
    });
  };

  const sortReviews = async (criteria: string) => {
    let nextOrder: "asc" | "desc" = "desc";
    let nextOrderBy: "created_at" | "rating" = "created_at";

    switch (criteria) {
      case "latest":
        nextOrderBy = "created_at";
        nextOrder = "desc";
        break;
      case "oldest":
        nextOrderBy = "created_at";
        nextOrder = "asc";
        break;
      case "highest":
        nextOrderBy = "rating";
        nextOrder = "desc";
        break;
      case "lowest":
        nextOrderBy = "rating";
        nextOrder = "asc";
        break;
    }

    setOrder(nextOrder);
    setOrderBy(nextOrderBy);

    const res = await fetch(
      `/api/products/${productId}/reviews?offset=0&limit=${reviews.length}&orderBy=${nextOrderBy}&order=${nextOrder}`,
      {
        method: "GET",
      },
    );

    if (!res.ok) return;

    const data: Review[] = await res.json();
    setReviews(data);
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
