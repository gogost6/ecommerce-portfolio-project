"use client";

type QuantityBtnsProps = {
  qty: number;
  incQty: () => void;
  decQty: () => void;
};

export function QuantityBtns({ qty, incQty, decQty }: QuantityBtnsProps) {
  return (
    <div className="flex items-stretch rounded-[62px] bg-gray-100">
      <button
        type="button"
        onClick={decQty}
        className="flex items-center px-4 text-base disabled:cursor-not-allowed disabled:opacity-50 md:text-xl"
        aria-label="Decrease quantity"
      >
        -
      </button>

      <span className="flex w-10 items-center justify-center text-sm font-medium tabular-nums">
        {qty}
      </span>

      <button
        type="button"
        onClick={incQty}
        className="flex items-center px-4 text-base disabled:cursor-not-allowed disabled:opacity-50 md:text-xl"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
