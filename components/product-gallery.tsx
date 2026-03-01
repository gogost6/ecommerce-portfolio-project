"use client";

import Image from "next/image";
import { useState } from "react";

type ProductGalleryProps = {
  images: {
    id: number;
    url: string;
    alt: string | null;
    sort_order: number;
    is_primary: boolean;
  }[];
};

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const sortedImages = [...images].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <section className="w-full px-4 max-w-4xl md:flex md:flex-row-reverse md:gap-4">
      {/* Main image */}
      <div className="relative mx-auto aspect-[1/1] w-full md:h-[530px] md:aspect-auto">
        <Image
          src={sortedImages[active]!.url}
          alt={sortedImages[active]!.alt || "Product image"}
          fill
          priority
          className="object-cover rounded-xl"
          sizes="(min-width: 768px) 520px, 100vw"
        />
      </div>

      {/* Thumbnails */}
      <div className="mt-3 grid grid-cols-3 gap-4 md:flex md:flex-col md:w-fit md:mt-0">
        {sortedImages
          .filter((img) => !img.is_primary)
          .map((img, idx) => {
            const isActive = idx === active;

            return (
              <button
                key={img.url}
                type="button"
                onClick={() => setActive(idx)}
                className={[
                  "group relative rounded-xl md:w-40 md:h-[167px]",
                  "transition",
                  isActive
                    ? "ring-1 ring-black"
                    : "ring-1 ring-black/0 hover:ring-black/20",
                ].join(" ")}
                aria-label={`Select image: ${img.alt || "Product image"}`}
              >
                <div className="relative mx-auto aspect-square w-full">
                  <Image
                    src={img.url}
                    alt={img.alt || "Product image"}
                    fill
                    className="object-cover rounded-xl"
                    sizes="(min-width: 768px) 170px, 30vw"
                  />
                </div>
              </button>
            );
          })}
      </div>
    </section>
  );
}
