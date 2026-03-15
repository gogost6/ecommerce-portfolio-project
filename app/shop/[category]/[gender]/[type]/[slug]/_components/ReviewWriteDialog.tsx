"use client";

import { submitProductReview } from "@/actions/submit-product-reviews";
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
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronRight, X } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";

type Props = {
  productId: number;
};

export function ReviewWriteDialog({ productId }: Props) {
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState("");
  const [bodyError, setBodyError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async () => {
    setBodyError(null);

    if (!body.trim()) {
      setBodyError("Review body is required");
      toast("Please write your review", { type: "error" });
      return;
    }

    startTransition(async () => {
      const result = await submitProductReview({
        productId,
        rating,
        body,
      });

      if (!result.ok) {
        if (result.error === "Review body is required") {
          setBodyError(result.error);
        }

        toast(result.error, { type: "error" });
        return;
      }

      toast("Review submitted!", { type: "success" });
      setRating(5);
      setBody("");
      setOpen(false);
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button>Write a Review</Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />

        <Dialog.Content className="fixed top-1/2 left-1/2 w-[95%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-xl font-bold">
              Write a Review
            </Dialog.Title>
            <Dialog.Close>
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>

          <div className="space-y-4">
            {/* Rating */}
            <div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Rating (1-5)
                </label>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left"
                    >
                      <span>{rating}</span>
                      <ChevronRight className="rotate-90" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="start"
                    className="w-(--radix-dropdown-menu-trigger-width)"
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

            <Button onClick={handleSubmit} disabled={isPending}>
              {isPending ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
