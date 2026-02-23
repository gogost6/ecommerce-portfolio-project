import { ProductCardParams } from "@/components/products-scroll";

export const products = [
  {
    src: "/t-shirt.png",
    alt: "T-shirt",
    price: 120,
    rating: 4,
    title: "T-SHIRT WITH TAPE DETAILS",
  },
  {
    src: "/t-shirt.png",
    alt: "T-shirt",
    price: 120,
    rating: 4,
    title: "T-SHIRT WITH TAPE DETAILS",
    discountedPrice: 120 * 0.8,
    discountedPercentage: 20,
  },
  {
    src: "/t-shirt.png",
    alt: "T-shirt",
    price: 120,
    rating: 4,
    title: "T-SHIRT WITH TAPE DETAILS",
  },
  {
    src: "/t-shirt.png",
    alt: "T-shirt",
    price: 120,
    rating: 4,
    title: "T-SHIRT WITH TAPE DETAILS",
  },
] satisfies ProductCardParams[];
