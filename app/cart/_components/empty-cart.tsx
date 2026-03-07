import { Button } from "@/components/ui/button";
import Link from "next/link";

export function EmptyCart() {
  return (
    <div className="m-4 flex flex-col items-center gap-5 p-10">
      <h2 className="text-xl font-bold">Your cart is empty</h2>
      <p className="text-center text-gray-600">
        Looks like you haven&apos;t added anything to your cart yet.
      </p>
      <Button asChild>
        <Link href={"/shop"}>Start shopping</Link>
      </Button>
    </div>
  );
}
