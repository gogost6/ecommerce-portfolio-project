import { Brands } from "@/components/brands";
import { Hero } from "@/components/hero";
import { ProductsScroll } from "@/components/products-scroll";
import { StylesBoxes } from "@/components/styles-boxes";
import TestimonialsSection from "@/components/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Brands />
      <ProductsScroll title="NEW ARRIVALS" />
      <div className="h-[1px] bg-gray-100 mx-4"></div>
      <ProductsScroll title="TOP SELLING" />
      <StylesBoxes />
      <TestimonialsSection />
    </>
  );
}
