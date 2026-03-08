"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Ticket } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { CartOrderContentProps } from "../types";

const COUPONS = [
  {
    code: "FREEDELIVERY",
    discountType: "delivery",
    discountValue: 5,
  },
  {
    code: "20PERCENT",
    discountType: "percentage",
    discountValue: 20,
  },
  {
    code: "100PERCENT",
    discountType: "percentage",
    discountValue: 100,
  },
] as const;

type Coupon = (typeof COUPONS)[number];

export function CartOrderContent({
  subtotal,
  discount,
  deliveryFee = 5,
}: CartOrderContentProps) {
  const [promoCode, setPromoCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const calculatedValues = useMemo(() => {
    const finalSubtotal = subtotal;
    let finalDiscount = discount;
    let finalDeliveryFee = deliveryFee;

    if (appliedCoupon) {
      if (appliedCoupon.discountType === "delivery") {
        finalDeliveryFee = 0;
      }

      if (appliedCoupon.discountType === "percentage") {
        const couponDiscount = (subtotal * appliedCoupon.discountValue) / 100;
        finalDiscount = discount + couponDiscount;

        if (appliedCoupon.discountValue === 100) {
          finalDeliveryFee = 0;
        }
      }
    }

    const total = Math.max(finalSubtotal - finalDiscount + finalDeliveryFee, 0);

    const discountPercentage =
      finalSubtotal <= 0
        ? 0
        : Math.round((finalDiscount / finalSubtotal) * 100);

    return {
      finalSubtotal,
      finalDiscount,
      finalDeliveryFee,
      total,
      discountPercentage,
    };
  }, [subtotal, discount, deliveryFee, appliedCoupon]);

  const handleApplyPromoCode = () => {
    const foundCoupon = COUPONS.find(
      (coupon) => coupon.code.toLowerCase() === promoCode.toLowerCase().trim(),
    );

    if (!foundCoupon) {
      toast.error("Invalid promo code");
      return;
    }

    setAppliedCoupon(foundCoupon);
    toast.success("Promo code applied!");
  };

  return (
    <div className="flex h-fit w-full flex-col gap-4 rounded-xl border border-gray-100 p-5 md:gap-6">
      <h2 className="text-xl font-bold">Order Summary</h2>

      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between text-base md:text-xl">
          <p className="text-gray-600">Subtotal</p>
          <p className="font-bold">
            ${Number(calculatedValues.finalSubtotal).toFixed(2)}
          </p>
        </div>

        {calculatedValues.discountPercentage > 0 && (
          <div className="flex items-center justify-between text-base md:text-xl">
            <p className="text-gray-600">
              Discount (-{calculatedValues.discountPercentage}%)
            </p>
            <p className="font-bold text-red-500">
              -${Number(calculatedValues.finalDiscount).toFixed(2)}
            </p>
          </div>
        )}

        <div
          className={cn(
            "flex items-center justify-between text-base md:text-xl",
            {
              "text-gray-400 line-through":
                calculatedValues.finalDeliveryFee === 0,
            },
          )}
        >
          <p className="text-gray-600">Delivery Fee</p>
          <p className="font-bold">
            ${Number(calculatedValues.finalDeliveryFee).toFixed(2)}
          </p>
        </div>

        <div className="mx-4 h-px bg-gray-100"></div>

        <div className="flex items-center justify-between">
          <p className="text-base text-gray-600 md:text-xl">Total</p>
          <p className="text-xl font-bold md:text-2xl">
            ${Number(calculatedValues.total).toFixed(2)}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Input
            placeholder="Add promo code"
            startIcon={<Ticket size={20} />}
            className="flex-1"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            disabled={!!appliedCoupon}
          />
          <Button onClick={handleApplyPromoCode} disabled={!!appliedCoupon}>
            Apply
          </Button>
        </div>

        <Button>Go to Checkout</Button>
      </div>
    </div>
  );
}
