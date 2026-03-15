import { db } from "@/db";
import { productReviews } from "@/drizzle/schema";
import { and, asc, desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const REVIEWS_PAGE_SIZE = 4;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> },
) {
  const { productId } = await params;
  const { searchParams } = new URL(request.url);

  const offset = Number(searchParams.get("offset") ?? 0);
  const limit = Number(searchParams.get("limit") ?? REVIEWS_PAGE_SIZE);
  const orderByParam = searchParams.get("orderBy") ?? "created_at";
  const orderParam = searchParams.get("order") ?? "asc";

  const parsedProductId = Number(productId);

  if (Number.isNaN(parsedProductId)) {
    return NextResponse.json({ error: "Invalid product id" }, { status: 400 });
  }

  const orderColumn =
    orderByParam === "rating"
      ? productReviews.rating
      : productReviews.createdAt;

  const orderDirection =
    orderParam === "desc" ? desc(orderColumn) : asc(orderColumn);

  const reviews = await db
    .select({
      id: productReviews.id,
      reviewer_name: productReviews.reviewerName,
      rating: productReviews.rating,
      body: productReviews.body,
      created_at: productReviews.createdAt,
      is_verified_purchase: productReviews.isVerifiedPurchase,
      is_published: productReviews.isPublished,
    })
    .from(productReviews)
    .where(
      and(
        eq(productReviews.productId, parsedProductId),
        eq(productReviews.isVerifiedPurchase, true),
        eq(productReviews.isPublished, true),
      ),
    )
    .orderBy(orderDirection, asc(productReviews.id))
    .limit(limit)
    .offset(offset);

  return NextResponse.json(reviews);
}
