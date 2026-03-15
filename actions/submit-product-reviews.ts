"use server";

import { db } from "@/drizzle";
import { productReviews } from "@/drizzle/schema";
import { createClient } from "@/lib/supabase/server";

type SubmitReviewInput = {
  productId: number;
  rating: number;
  body: string;
};

export async function submitProductReview({
  productId,
  rating,
  body,
}: SubmitReviewInput) {
  const trimmedBody = body.trim();

  if (!trimmedBody) {
    return {
      ok: false,
      error: "Review body is required",
    };
  }

  if (rating < 1 || rating > 5) {
    return {
      ok: false,
      error: "Rating must be between 1 and 5",
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      ok: false,
      error: "Please sign in to write a review.",
    };
  }

  try {
    await db.insert(productReviews).values({
      productId,
      userId: user.id,
      reviewerName: user.user_metadata?.fullName ?? user.email ?? "User",
      reviewerEmail: user.email,
      rating,
      body: trimmedBody,
      isVerifiedPurchase: false,
      isPublished: false,
    });

    return { ok: true };
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      error: "Something went wrong",
    };
  }
}
