import { cn } from "@/lib/utils";
import * as React from "react";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  startIcon?: React.ReactNode;
  error?: string | null;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, startIcon, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative">
          {startIcon && (
            <div
              className={cn(
                "absolute top-3 left-3",
                error ? "text-red-500" : "text-muted-foreground",
              )}
            >
              {startIcon}
            </div>
          )}

          <textarea
            ref={ref}
            aria-invalid={!!error}
            className={cn(
              "placeholder:text-muted-foreground flex min-h-[100px] w-full resize-none rounded-md border bg-transparent py-2 text-base shadow-xs transition-colors focus-visible:ring-1 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              startIcon ? "pr-3 pl-10" : "px-3",
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

Textarea.displayName = "Textarea";

export { Textarea };
