import Link from "next/link";
import { PromoBarCloseBtn } from "./promo-bar-close-btn";

export const PromoBar = () => {
  return (
    <div className="promo-bar hidden bg-black opacity-0 transition-opacity">
      <p className="relative mx-auto max-w-7xl py-2 text-center text-xs text-white">
        Sign up and get 20% off to your first order.{" "}
        <Link className="bold underline" href="/auth/login">
          Sign Up Now
        </Link>
        <PromoBarCloseBtn />
      </p>
    </div>
  );
};
