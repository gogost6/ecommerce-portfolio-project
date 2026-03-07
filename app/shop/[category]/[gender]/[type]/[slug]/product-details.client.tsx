"use client";

import { StarRating } from "@/components/star-rating";
import { Badge } from "@/components/ui/badge";
import { useMemo, useState } from "react";
import { AddToCard } from "./_components/AddToCart";
import { Colors } from "./_components/Colors";
import { Sizes } from "./_components/Sizes";

type Variant = {
  id: number;
  sku: string | null;
  price: number;
  discounted_price: number | null;
  percent_discount: number | null;
  stock: number;
  is_active: boolean;
  size_id: number | null;
  color_id: number | null;
  sizes: { id: number; name: string; slug: string } | null;
  colors: { id: number; name: string; slug: string; hex: string } | null;
};

type Product = {
  id: number;
  title: string;
  rating: number;
  price: number;
  discounted_price: number | null;
  percent_discount: number | null;
  description: string | null;
  product_variants: Variant[];
};

export default function ProductDetailsClient({
  product,
}: {
  product: Product;
}) {
  const [selectedColorId, setSelectedColorId] = useState<number | null>(() => {
    const first = product.product_variants.find((v) => v.colors?.id)?.colors
      ?.id;
    return first ?? null;
  });

  const [selectedSizeId, setSelectedSizeId] = useState<number | null>(() => {
    const first = product.product_variants.find((v) => v.sizes?.id)?.sizes?.id;
    return first ?? null;
  });

  const [qty, setQty] = useState(1);

  // ---- Deduped colors/sizes ----
  const colors = useMemo(() => {
    const map = new Map();
    for (const v of product.product_variants) {
      if (v.colors) map.set(v.colors.id, v.colors);
    }
    return [...map.values()];
  }, [product.product_variants]);

  const sizes = useMemo(() => {
    const map = new Map();
    for (const v of product.product_variants) {
      if (v.sizes) map.set(v.sizes.id, v.sizes);
    }
    return [...map.values()];
  }, [product.product_variants]);

  // ---- Pick variant by selected color+size ----
  const selectedVariant = useMemo(() => {
    return product.product_variants.find((v) => {
      const colorOk = selectedColorId ? v.colors?.id === selectedColorId : true;
      const sizeOk = selectedSizeId ? v.sizes?.id === selectedSizeId : true;
      return colorOk && sizeOk && v.is_active;
    });
  }, [product.product_variants, selectedColorId, selectedSizeId]);

  const sizeAvailability = useMemo(() => {
    // sizeId -> inStock?
    const map = new Map<number, boolean>();

    // init all sizes to false (out of stock until proven otherwise)
    for (const s of sizes) map.set(s.id, false);

    for (const v of product.product_variants) {
      if (!v.is_active) continue;
      if (!v.sizes?.id) continue;

      // if a color is selected, only count variants of that color
      if (selectedColorId && v.colors?.id !== selectedColorId) continue;

      const inStock = v.stock > 0;
      if (inStock) map.set(v.sizes.id, true);
    }

    return map; // Map<sizeId, boolean>
  }, [product.product_variants, sizes, selectedColorId]);

  const isSizeOutOfStock = (sizeId: number) => !sizeAvailability.get(sizeId);

  // ---- Price displayed (variant overrides product) ----
  const display = useMemo(() => {
    const basePrice = selectedVariant?.price ?? product.price;
    const disc = selectedVariant?.discounted_price ?? product.discounted_price;
    const perc =
      basePrice && disc
        ? Math.round(((basePrice - disc) / basePrice) * 100)
        : null;

    return {
      basePrice,
      discounted_price: disc,
      percent_discount: perc,
      hasDiscount: !!disc && !!perc,
      stock: selectedVariant?.stock ?? null,
    };
  }, [selectedVariant, product.price, product.discounted_price]);

  const decQty = () => setQty((q) => Math.max(1, q - 1));
  const incQty = () => setQty((q) => q + 1);

  const outOfStock = display.stock !== null ? display.stock <= 0 : false;

  return (
    <div className="md:flex md:flex-col">
      <h1 className="my-3 text-2xl font-black md:mt-0 md:mb-3.5 md:text-4xl">
        {product.title}
      </h1>
      <StarRating rating={product.rating} />
      <div className="mt-2.5 mb-5 flex flex-row items-center gap-2.5 md:mt-3.5">
        <p className="text-2xl font-medium md:text-3xl">${display.basePrice}</p>

        {display.hasDiscount && (
          <>
            <p className="text-2xl font-medium text-gray-600 line-through md:text-3xl">
              ${display.discounted_price}
            </p>
            <Badge variant={"red"}>{display.percent_discount}%</Badge>
          </>
        )}

        {selectedVariant?.sku && (
          <span className="ml-2 text-xs text-gray-400">
            SKU: {selectedVariant.sku}
          </span>
        )}
      </div>
      {product.description && (
        <p className="mb-6 text-sm text-gray-600 md:text-base">
          {product.description}
        </p>
      )}

      {colors.length > 0 && (
        <>
          <div className="mb-6 h-px bg-gray-100" />
          <Colors
            colors={colors}
            selectedColorId={selectedColorId}
            setSelectedColorId={setSelectedColorId}
          />
        </>
      )}
      {sizes.length > 0 && (
        <>
          <div className="mb-6 h-px bg-gray-100" />
          <Sizes
            sizes={sizes}
            selectedSizeId={selectedSizeId}
            setSelectedSizeId={setSelectedSizeId}
            isSizeOutOfStock={isSizeOutOfStock}
          />
        </>
      )}

      <div className="mb-6 h-px bg-gray-100" />
      <AddToCard
        qty={qty}
        incQty={incQty}
        decQty={decQty}
        outOfStock={outOfStock}
        variantId={selectedVariant?.id ?? null}
      />
    </div>
  );
}
