"use client";

import * as React from "react";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

interface Asset {
  type: "image" | "video";
  src: string | StaticImageData;
  fallback?: StaticImageData;
  alt?: string;
}

interface AssetThumbnailProps {
  asset: Asset;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export function AssetThumbnail({
  asset,
  onClick,
  className,
  children,
}: AssetThumbnailProps) {
  return (
    <div
      className={cn(
        "cursor-pointer shrink-0",
        children ? "size-full" : "rounded-lg overflow-hidden border",
        className
      )}
      onClick={onClick}
    >
      {children ? (
        children
      ) : asset.type === "image" ? (
        <Image
          src={asset.src as StaticImageData}
          alt={asset.alt || ""}
          unoptimized
          priority
          className="w-full h-full object-cover"
        />
      ) : (
        <video
          src={asset.src as string}
          className="w-full h-full object-contain"
          autoPlay
          muted
          loop
        >
          {asset.fallback && (
            <Image
              src={asset.fallback}
              alt={asset.alt || ""}
              unoptimized
              priority
              className="w-full h-full object-contain"
            />
          )}
        </video>
      )}
    </div>
  );
}
