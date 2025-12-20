"use client";

import * as React from "react";
import Image, { StaticImageData } from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface Asset {
  type: "image" | "video";
  src: string | StaticImageData;
  fallback?: StaticImageData;
  alt?: string;
}

interface AssetThumbnailProps {
  asset: Asset;
  index: number;
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
}

export function AssetThumbnail({
  asset,
  index,
  onClick,
  className,
  children,
}: AssetThumbnailProps) {
  const layoutId = `asset-thumbnail-${index}`;

  return (
    <div className={cn("cursor-pointer shrink-0", className)}>
      <motion.div
        className={cn(
          children ? "size-full" : "rounded-lg overflow-hidden border"
        )}
        layoutId={children ? undefined : layoutId}
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
      </motion.div>
    </div>
  );
}
