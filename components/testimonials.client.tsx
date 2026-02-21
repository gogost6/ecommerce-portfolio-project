"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function Testimonials({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="mb-44">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex items-center justify-between mb-6 px-4">
          <div>{title}</div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              aria-label="Previous testimonial"
              variant="ghost"
              size="icon"
            >
              <ArrowLeft />
            </Button>
            <Button
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              variant="ghost"
              size="icon"
              aria-label="Next testimonial"
            >
              <ArrowRight />
            </Button>
          </div>
        </div>

        {/* Embla viewport must be client */}
        <div className="overflow-hidden" ref={emblaRef}>
          {/* track */}
          <div className="flex">{children}</div>
        </div>
      </div>
    </section>
  );
}
