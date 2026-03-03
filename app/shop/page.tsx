import { ProductsListing } from "@/components/products-listing";

export default async function Page() {
  return (
    <ProductsListing
      page={1}
      basePath="/shop"
      // no filters => all products
    />
  );
}
