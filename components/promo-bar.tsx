import Link from "next/link";

export const PromoBar = () => {
  return (
    <p className="bg-black text-center py-2 text-white text-xs">
      Sign up and get 20% off to your first order.{" "}
      <Link className="underline bold" href="/auth/login">
        Sign Up Now
      </Link>
    </p>
  );
};
