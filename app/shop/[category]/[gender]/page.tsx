import { ProductsListing } from "@/components/products-listing";

export default async function Page({
  params,
}: {
  params: Promise<{ page: string; category: string; gender: "men" | "women" }>;
}) {
  const { page, category, gender } = await params;
  const safePage = Math.max(1, Number(page) || 1);

  return (
    <ProductsListing
      page={safePage}
      basePath={`/shop/${category}/${gender}`}
      category={category}
      gender={gender}
    />
  );
}
