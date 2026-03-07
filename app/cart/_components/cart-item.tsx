import { Trash } from "lucide-react";
import Image from "next/image";
import { CartItemProps } from "../types";

export function CartItem({
  src,
  alt,
  title,
  size,
  color,
  price,
  quantity,
}: CartItemProps) {
  return (
    <div className="flex gap-3.5">
      <Image
        src={src}
        alt={alt}
        width={200}
        height={200}
        className="h-24 w-24 shrink-0 rounded-xl object-cover md:h-32 md:w-32"
      />
      <div className="flex w-full flex-col gap-2.5">
        <div className="relative">
          <Trash size={20} color="red" className="absolute top-0 right-0" />
          <h3 className="pr-5 text-base font-bold md:mb-0.5 md:text-xl">
            {title}
          </h3>
          <p className="text-sm md:mb-1">
            Size: <span className="text-gray-600">{size}</span>
          </p>
          <p className="text-sm">
            Color: <span className="text-gray-600">{color}</span>{" "}
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <p className="text-xl font-bold md:text-2xl">${price}</p>
          <div className="flex items-stretch rounded-2xl bg-gray-100">
            <button
              type="button"
              //   onClick={decQty}
              className="flex items-center px-4 text-base md:text-xl"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="flex items-center px-3 text-sm font-medium">
              {quantity}
            </span>
            <button
              type="button"
              //   onClick={incQty}
              className="flex items-center px-4 text-base md:text-xl"
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
