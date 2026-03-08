export type ProductSearchResult = {
  id: number;
  title: string;
  price: number;
  gender: string;
  slug: string;
  categories: { slug: string };
  product_types: { slug: string };
  product_images: { url: string; alt: string | null; is_primary: boolean }[];
};
