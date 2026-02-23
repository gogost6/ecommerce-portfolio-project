import { Brands } from "@/components/brands";
import { Hero } from "@/components/hero";
import { ProductsScroll } from "@/components/products-scroll";
import { StylesBoxes } from "@/components/styles-boxes";
import TestimonialsSection from "@/components/testimonials";
import { products } from "@/lib/mocks";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Hero />
      <Brands />
      <ProductsScroll products={products} title="NEW ARRIVALS" />
      <div className="h-[1px] bg-gray-100 mx-4"></div>
      <ProductsScroll products={products} title="TOP SELLING" />
      <StylesBoxes />
      <Suspense
        fallback={
          <div className="text-center py-40">Loading testimonials...</div>
        }
      >
        <TestimonialsSection />
      </Suspense>
    </>
  );
}
