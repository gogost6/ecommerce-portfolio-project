import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Ticket, Trash } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4">
      <h1 className="text-3xl font-black">Cart</h1>
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="flex shrink-0 flex-col gap-4 rounded-xl border border-gray-100 p-3.5 md:w-178.75 md:gap-6">
          <CartItem />
          <div className="mx-4 h-px bg-gray-100"></div>
          <CartItem />
          <div className="mx-4 h-px bg-gray-100"></div>
          <CartItem />
        </div>
        <div className="flex h-fit w-full flex-col gap-4 rounded-xl border border-gray-100 p-5 md:gap-6">
          <h2 className="text-xl font-bold">Order Summary</h2>
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between text-base md:text-xl">
              <p className="text-gray-600">Subtotal</p>
              <p className="font-bold">$565</p>
            </div>
            <div className="flex items-center justify-between text-base md:text-xl">
              <p className="text-gray-600">Discount (-20%)</p>
              <p className="font-bold text-red-500">-$113</p>
            </div>
            <div className="flex items-center justify-between text-base md:text-xl">
              <p className="text-gray-600">Delivery Fee</p>
              <p className="font-bold">$5</p>
            </div>
            <div className="mx-4 h-px bg-gray-100"></div>
            <div className="flex items-center justify-between">
              <p className="text-base text-gray-600 md:text-xl">Total</p>
              <p className="text-xl font-bold md:text-2xl">$467</p>
            </div>
            <div className="flex items-center gap-3">
              <Input
                placeholder="Add promo code"
                startIcon={<Ticket size={20} />}
                className="flex-1"
              />
              <Button>Apply</Button>
            </div>
            <Button>Go to Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartItem() {
  return (
    <div className="flex gap-3.5">
      <Image
        src="https://tmfbysibhlpkahvvpoeu.supabase.co/storage/v1/object/public/shop.me/default-product.jpg"
        alt="Empty cart"
        width={200}
        height={200}
        className="h-24 w-24 shrink-0 rounded-xl object-cover md:h-32 md:w-32"
      />
      <div className="flex w-full flex-col gap-2.5">
        <div className="relative">
          <Trash size={20} color="red" className="absolute top-0 right-0" />
          <h3 className="pr-5 text-base font-bold md:mb-0.5 md:text-xl">
            Gradient Graphic T-shirt
          </h3>
          <p className="text-sm md:mb-1">
            Size: <span className="text-gray-600">Large</span>
          </p>
          <p className="text-sm">
            Color: <span className="text-gray-600">White</span>{" "}
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <p className="text-xl font-bold md:text-2xl">$145</p>
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
              1
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
