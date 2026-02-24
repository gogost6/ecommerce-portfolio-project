import { Brands } from "@/components/brands";
import { Hero } from "@/components/hero";
import { ProductsScroll } from "@/components/products-scroll";
import { StylesBoxes } from "@/components/styles-boxes";
import TestimonialsSection from "@/components/testimonials";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Hero />
      <Brands />
      <Suspense
        fallback={
          <div className="h-96 flex items-center justify-center">
            Loading...
          </div>
        }
      >
        <ProductsScroll title="NEW ARRIVALS" type="new-arrivals" />
        <div className="h-[1px] bg-gray-100 mx-4"></div>
        <ProductsScroll title="TOP SELLING" type="top-selling" />
        <StylesBoxes />
        <TestimonialsSection />
      </Suspense>
    </>
  );
}
