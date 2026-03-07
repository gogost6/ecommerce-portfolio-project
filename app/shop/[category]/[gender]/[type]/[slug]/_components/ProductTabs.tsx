"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { FAQ } from "./Faq";
import { Review, Reviews } from "./Reviews";

export function ProductTabs({
  initialReviews,
  reviewsCount,
  productId,
}: {
  initialReviews: Review[];
  reviewsCount: number;
  productId: number;
}) {
  return (
    <Tabs.Root defaultValue="reviews" className="w-full">
      {/* Header */}
      <Tabs.List className="mb-5 flex w-full justify-center gap-12 border-b text-sm text-gray-400 md:text-xl">
        <Tabs.Trigger
          value="details"
          className="relative pb-4 data-[state=active]:text-black"
        >
          Product Details
          <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-black transition-transform duration-200 data-[state=active]:scale-x-100" />
        </Tabs.Trigger>

        <Tabs.Trigger
          value="reviews"
          className="relative pb-4 data-[state=active]:text-black"
        >
          Rating & Reviews
          <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-black transition-transform duration-200 data-[state=active]:scale-x-100" />
        </Tabs.Trigger>

        <Tabs.Trigger
          value="faq"
          className="relative pb-4 data-[state=active]:text-black"
        >
          FAQs
          <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-black transition-transform duration-200 data-[state=active]:scale-x-100" />
        </Tabs.Trigger>
      </Tabs.List>

      {/* Content */}
      <Tabs.Content value="details">
        <div className="prose max-w-none">
          <p>
            This is a high-quality product made from the finest materials. It
            features a sleek design and is built to last. Perfect for everyday
            use or special occasions.
          </p>
          <ul>
            <li>Material: 100% Cotton</li>
            <li>Available Sizes: XS, S, M, L, XL, XXL</li>
            <li>
              Care Instructions: Machine wash cold, tumble dry low. Do not
              bleach. Iron on low heat if needed.{" "}
            </li>
          </ul>
          <p>
            Experience the perfect blend of comfort and style with this
            must-have addition to your wardrobe. Whether you&apos;re dressing up
            or keeping it casual, this product has got you covered.
          </p>
        </div>
      </Tabs.Content>

      <Tabs.Content value="reviews">
        <Reviews
          initialReviews={initialReviews}
          reviewsCount={reviewsCount}
          productId={productId}
        />
      </Tabs.Content>

      <Tabs.Content value="faq">
        <FAQ />
      </Tabs.Content>
    </Tabs.Root>
  );
}
