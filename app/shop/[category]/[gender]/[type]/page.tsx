import { ProductsListing } from "@/components/products-listing";

export default async function Page({
  params,
}: {
  params: Promise<{ category: string; gender: "men" | "women"; type: string }>;
}) {
  const { category, gender, type } = await params;
  const basePath = `/shop/${category}/${gender}/${type}`;

  return (
    <ProductsListing
      category={category}
      gender={gender}
      type={type}
      page={1}
      basePath={basePath}
    />
  );
}
