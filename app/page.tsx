import { Brands } from "@/components/brands";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navigation } from "@/components/navigation";
import { ProductsScroll } from "@/components/products-scroll";
import { PromoBar } from "@/components/promo-bar";
import { StylesBoxes } from "@/components/styles-boxes";
import TestimonialsSection from "@/components/testimonials";
import { products } from "@/lib/mocks";

export default function Home() {
  return (
    <>
      <PromoBar />
      <Navigation />
      <Hero />
      <Brands />
      <ProductsScroll products={products} title="NEW ARRIVALS" />
      <div className="h-[1px] bg-gray-100 mx-4"></div>
      <ProductsScroll products={products} title="TOP SELLING" />
      <StylesBoxes />
      <TestimonialsSection />
      <Footer />
    </>
  );
}
