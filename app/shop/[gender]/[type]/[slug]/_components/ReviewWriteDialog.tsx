"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/text-area";
import { createClient } from "@/lib/supabase/client";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  productId: number;
};

export function ReviewWriteDialog({ productId }: Props) {
  const supabase = createClient();

  const [rating, setRating] = useState(5);
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [bodyError, setBodyError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setBodyError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast("Please sign in to write a review.", { type: "error" });
      return;
    }

    if (!body) {
      setBodyError("Review body is required");
      toast("Please write your review", { type: "error" });
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.from("product_reviews").insert({
        product_id: productId,
        user_id: user.id,
        reviewer_name: user.user_metadata?.full_name ?? user.email ?? "User",
        reviewer_email: user.email,
        rating,
        body,
        is_verified_purchase: false,
        is_published: false,
      });

      if (error) throw error;

      toast("Review submitted!", { type: "success" });
      setRating(5);
      setBody("");
    } catch (err) {
      console.error(err);
      toast("Something went wrong", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Write a Review</Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />

        <Dialog.Content className="fixed top-1/2 left-1/2 w-[95%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-bold">
              Write a Review
            </Dialog.Title>
            <Dialog.Close>
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>

          <div className="space-y-4">
            {/* Rating */}
            <div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Rating (1-5)
                </label>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="w-full border rounded-lg px-3 py-2 text-left flex items-center justify-between"
                    >
                      <span>{rating}</span>
                      <ChevronRight className="rotate-90" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="start"
                    className="w-[var(--radix-dropdown-menu-trigger-width)]"
                  >
                    <DropdownMenuLabel>Choose rating</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuRadioGroup
                      value={String(rating)}
                      onValueChange={(v) => setRating(Number(v))}
                    >
                      {["1", "2", "3", "4", "5"].map((r) => (
                        <DropdownMenuRadioItem key={r} value={r}>
                          {r}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <Textarea
              placeholder="Write your review..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              error={bodyError}
            />

            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
