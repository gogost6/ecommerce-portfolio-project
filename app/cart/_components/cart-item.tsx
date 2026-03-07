"use client";

import { Trash } from "lucide-react";
import Image from "next/image";
import { CartItemProps } from "../types";

type CartItemComponentProps = CartItemProps & {
  isPending?: boolean;
  onDelete: () => void;
  onDecrease: () => void;
  onIncrease: () => void;
};

export function CartItem({
  src,
  alt,
  title,
  size,
  color,
  price,
  quantity,
  isPending = false,
  onDelete,
  onDecrease,
  onIncrease,
}: CartItemComponentProps) {
  return (
    <div className={`flex gap-3.5 ${isPending ? "opacity-60" : "opacity-100"}`}>
      <Image
        src={src}
        alt={alt}
        width={200}
        height={200}
        className="h-24 w-24 shrink-0 rounded-xl object-cover md:h-32 md:w-32"
      />
      <div className="flex w-full flex-col gap-2.5">
        <div className="relative">
          <button
            type="button"
            onClick={onDelete}
            disabled={isPending}
            className="absolute top-0 right-0 cursor-pointer disabled:cursor-not-allowed"
            aria-label="Delete item"
          >
            <Trash size={20} color="red" />
          </button>

          <h3 className="pr-5 text-base font-bold md:mb-0.5 md:text-xl">
            {title}
          </h3>
          <p className="text-sm md:mb-1">
            Size: <span className="text-gray-600">{size}</span>
          </p>
          <p className="text-sm">
            Color: <span className="text-gray-600">{color}</span>
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <p className="text-xl font-bold md:text-2xl">
            ${Number(price).toFixed(2)}
          </p>

          <div className="flex items-stretch rounded-2xl bg-gray-100">
            <button
              type="button"
              onClick={onDecrease}
              disabled={isPending}
              className="flex items-center px-4 text-base disabled:cursor-not-allowed disabled:opacity-50 md:text-xl"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="flex items-center px-3 text-sm font-medium">
              {quantity}
            </span>
            <button
              type="button"
              onClick={onIncrease}
              disabled={isPending}
              className="flex items-center px-4 text-base disabled:cursor-not-allowed disabled:opacity-50 md:text-xl"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
