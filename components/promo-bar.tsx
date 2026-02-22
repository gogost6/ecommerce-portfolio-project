import Link from "next/link";
import { PromoBarCloseBtn } from "./promo-bar-close-btn";

export const PromoBar = () => {
  return (
    <div className="promo-bar bg-black hidden opacity-0 transition-opacity">
      <p className=" mx-auto max-w-7xl text-center py-2 text-white text-xs relative">
        Sign up and get 20% off to your first order.{" "}
        <Link className="underline bold" href="/auth/login">
          Sign Up Now
        </Link>
        <PromoBarCloseBtn />
      </p>
    </div>
  );
};
