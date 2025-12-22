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
        "cursor-pointer shrink-0 flex items-center justify-center size-full",
        !children && "rounded-lg overflow-hidden border",
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
          className="size-full object-contain"
        />
      ) : (
        <video
          src={asset.src as string}
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline="true"
          className="size-full object-contain"
        >
          {asset.fallback && (
            <Image
              src={asset.fallback}
              alt={asset.alt || ""}
              unoptimized
              priority
              className="size-full object-contain"
            />
          )}
        </video>
      )}
    </div>
  );
}
