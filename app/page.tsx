import { Brands } from "@/components/brands";
import { Hero } from "@/components/hero";
import { ApplePay } from "@/components/icons/apple-pay";
import { GooglePay } from "@/components/icons/google-pay";
import { MasterCard } from "@/components/icons/master-card";
import { Paypal } from "@/components/icons/paypal";
import { Visa } from "@/components/icons/visa";
import { NavigationMobile } from "@/components/navigation-mobile";
import { ProductsScroll } from "@/components/products-scroll";
import { PromoBar } from "@/components/promo-bar";
import { StylesBoxes } from "@/components/styles-boxes";
import { SubscribeToNewsletter } from "@/components/subscribe-to-newsletter";
import TestimonialsSection from "@/components/testimonials";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/mocks";
import { Facebook, Github, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

const footerGroups = [
  {
    title: "COMPANY",
    links: [
      { label: "About", href: "#" },
      { label: "Features", href: "#" },
      { label: "Works", href: "#" },
      { label: "Career", href: "#" },
    ],
  },
  {
    title: "HELP",
    links: [
      { label: "Customer Support", href: "#" },
      { label: "Delivery Details", href: "#" },
      { label: "Terms & Conditions", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
  {
    title: "FAQ",
    links: [
      { label: "Account", href: "#" },
      { label: "Manage Deliveries", href: "#" },
      { label: "Orders", href: "#" },
      { label: "Payment", href: "#" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { label: "Free eBook", href: "#" },
      { label: "Development Tutorial", href: "#" },
      { label: "How to - Blog", href: "#" },
      { label: "Youtube Playlist", href: "#" },
    ],
  },
];

export default function Home() {
  return (
    <>
      <PromoBar />
      <NavigationMobile />
      <Hero />
      <Brands />
      <ProductsScroll products={products} title="NEW ARRIVALS" />
      <div className="h-[1px] bg-gray-100 mx-4"></div>
      <ProductsScroll products={products} title="TOP SELLING" />
      <StylesBoxes />
      <TestimonialsSection />
      <footer className="px-4 bg-gray-200 pt-48 pb-20 relative">
        <SubscribeToNewsletter />
        <h3 className="font-black text-3xl mb-3">SHOP.CO</h3>
        <p className="text-sm text-gray-600 mb-5">
          We have clothes that suits your style and which you’re proud to wear.
          From women to men.
        </p>
        <div className="flex flex-row gap-3 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="https://www.facebook.com/" target="_blank">
              <Twitter />
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link href="https://www.twitter.com/" target="_blank">
              <Facebook />
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link href="https://www.instagram.com/" target="_blank">
              <Instagram />
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link href="https://www.github.com/" target="_blank">
              <Github />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-x-20 gap-y-12 sm:grid-cols-4 mb-10">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm text-black mb-4">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="h-[1px] bg-gray-300 mb-4"></div>
        <p className="text-sm text-gray-600 mb-4 text-center">
          Shop.co © 2000-2021, All rights reserved
        </p>
        <div className="flex flex-row gap-2.5 justify-center items-center">
          <Visa />
          <MasterCard />
          <Paypal />
          <ApplePay />
          <GooglePay />
        </div>
      </footer>
    </>
  );
}
