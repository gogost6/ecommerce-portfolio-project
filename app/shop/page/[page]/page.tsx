import { ProductsListing } from "@/components/products-listing";

export default async function Page({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const safePage = Math.max(1, Number(page) || 1);

  return <ProductsListing page={safePage} basePath="/shop" />;
}
