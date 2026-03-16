"use client";

import clsx from "clsx";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

type ImageWithSkeletonProps = ImageProps & {
  alt?: string;
  containerClassName?: string;
  skeletonClassName?: string;
};

export const ImageWithSkeleton = ({
  containerClassName,
  skeletonClassName,
  className,
  alt,
  ...props
}: ImageWithSkeletonProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={clsx("relative overflow-hidden", containerClassName)}>
      {loading && (
        <div
          className={clsx(
            "absolute inset-0 animate-pulse bg-gray-200",
            skeletonClassName,
          )}
        />
      )}

      <Image
        {...props}
        alt={alt || "image"}
        onLoadingComplete={() => setLoading(false)}
        className={clsx(
          className,
          "transition-opacity duration-300",
          loading ? "opacity-0" : "opacity-100",
        )}
      />
    </div>
  );
};
