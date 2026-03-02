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
      <Tabs.List className="w-full border-b mb-5 flex justify-center gap-12 text-gray-400 text-sm md:text-xl">
        <Tabs.Trigger
          value="details"
          className="pb-4 relative data-[state=active]:text-black"
        >
          Product Details
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black scale-x-0 transition-transform duration-200 data-[state=active]:scale-x-100 origin-left" />
        </Tabs.Trigger>

        <Tabs.Trigger
          value="reviews"
          className="pb-4 relative data-[state=active]:text-black"
        >
          Rating & Reviews
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black scale-x-0 transition-transform duration-200 data-[state=active]:scale-x-100 origin-left" />
        </Tabs.Trigger>

        <Tabs.Trigger
          value="faq"
          className="pb-4 relative data-[state=active]:text-black"
        >
          FAQs
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black scale-x-0 transition-transform duration-200 data-[state=active]:scale-x-100 origin-left" />
        </Tabs.Trigger>
      </Tabs.List>

      {/* Content */}
      <Tabs.Content value="details">
        <div className="py-6">Product Details Content</div>
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
