import { db } from "@/drizzle";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  console.log("GET");

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() ?? "";

  if (!q) {
    return NextResponse.json([]);
  }

  const data = await db.query.products.findMany({
    where: (products, { and, eq, ilike }) =>
      and(eq(products.isActive, true), ilike(products.title, `%${q}%`)),
    columns: {
      id: true,
      title: true,
      price: true,
      gender: true,
      slug: true,
    },
    with: {
      category: {
        columns: {
          slug: true,
        },
      },
      productType: {
        columns: {
          slug: true,
        },
      },
      productImages: {
        columns: {
          url: true,
          alt: true,
          isPrimary: true,
        },
      },
    },
    limit: 5,
  });

  return NextResponse.json(data);
}
