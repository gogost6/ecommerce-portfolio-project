import { ProductsListing } from "@/components/products-listing";

export default async function Page({
  params,
}: {
  params: Promise<{
    category: string;
    gender: "men" | "women";
    type: string;
    page: string;
  }>;
}) {
  const { category, gender, type, page } = await params;

  const safePage = Math.max(1, Number(page) || 1);
  const basePath = `/shop/${category}/${gender}/${type}`;

  return (
    <ProductsListing
      category={category}
      gender={gender}
      type={type}
      page={safePage}
      basePath={basePath}
    />
  );
}
