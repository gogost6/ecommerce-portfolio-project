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
    <>
      <h1 className="text-2xl font-black my-3">{product.title}</h1>
      <StarRating rating={product.rating} />

      <div className="flex flex-row gap-2.5 mt-2.5 mb-5 items-center">
        <p className="text-2xl font-medium">{display.basePrice}$</p>

        {display.hasDiscount && (
          <>
            <p className="text-gray-600 line-through text-2xl font-medium">
              {display.discounted_price}$
            </p>
            <Badge variant={"red"}>{display.percent_discount}%</Badge>
          </>
        )}

        {selectedVariant?.sku && (
          <span className="text-xs text-gray-400 ml-2">
            SKU: {selectedVariant.sku}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-600 mb-6">{product.description}</p>
      <div className="h-[1px] bg-gray-100 mb-6" />
      <Colors
        colors={colors}
        selectedColorId={selectedColorId}
        setSelectedColorId={setSelectedColorId}
      />
      <div className="h-[1px] bg-gray-100 mb-6" />
      <Sizes
        sizes={sizes}
        selectedSizeId={selectedSizeId}
        setSelectedSizeId={setSelectedSizeId}
      />
      <div className="h-[1px] bg-gray-100 mb-6" />
      <AddToCard
        qty={qty}
        incQty={incQty}
        decQty={decQty}
        outOfStock={outOfStock}
      />
    </>
  );
}
