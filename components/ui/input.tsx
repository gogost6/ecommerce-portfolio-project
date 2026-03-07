import { cn } from "@/lib/utils";
import * as React from "react";

interface InputProps extends React.ComponentProps<"input"> {
  startIcon?: React.ReactNode;
  error?: string | null;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative">
          {startIcon && (
            <div
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2",
                error ? "text-red-500" : "text-muted-foreground",
              )}
            >
              {startIcon}
            </div>
          )}

          <input
            type={type}
            ref={ref}
            aria-invalid={!!error}
            className={cn(
              "flex h-9 w-full rounded-md border bg-transparent py-1 text-base shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              startIcon ? "pl-10 pr-3" : "px-3",
              !error && "border-input focus-visible:ring-ring",
              error && "border-red-500 focus-visible:ring-red-500",
              className,
            )}
            {...props}
          />
        </div>

        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
