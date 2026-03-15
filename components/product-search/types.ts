export type ProductSearchResult = {
  id: number;
  title: string;
  price: number;
  gender: string;
  slug: string;
  category: { slug: string };
  productType: { slug: string };
  productImages: { url: string; alt: string | null; isPrimary: boolean }[];
};
