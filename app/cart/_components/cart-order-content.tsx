import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Ticket } from "lucide-react";
import { CartOrderContentProps } from "../types";

export function CartOrderContent({
  subtotal,
  discount,
  deliveryFee = 5,
}: CartOrderContentProps) {
  return (
    <div className="flex h-fit w-full flex-col gap-4 rounded-xl border border-gray-100 p-5 md:gap-6">
      <h2 className="text-xl font-bold">Order Summary</h2>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between text-base md:text-xl">
          <p className="text-gray-600">Subtotal</p>
          <p className="font-bold">${Number(subtotal).toFixed(2)}</p>
        </div>
        <div className="flex items-center justify-between text-base md:text-xl">
          <p className="text-gray-600">
            Discount (-{Math.round((discount / subtotal) * 100)}%)
          </p>
          <p className="font-bold text-red-500">
            -${Number(discount).toFixed(2)}
          </p>
        </div>
        <div className="flex items-center justify-between text-base md:text-xl">
          <p className="text-gray-600">Delivery Fee</p>
          <p className="font-bold">${Number(deliveryFee).toFixed(2)}</p>
        </div>
        <div className="mx-4 h-px bg-gray-100"></div>
        <div className="flex items-center justify-between">
          <p className="text-base text-gray-600 md:text-xl">Total</p>
          <p className="text-xl font-bold md:text-2xl">
            ${Number(subtotal - discount + deliveryFee).toFixed(2)}
          </p>
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
  );
}
