"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Asset } from "@/lib/projects";

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
        "cursor-pointer shrink-0 flex items-center justify-center relative w-full",
        className
      )}
      onClick={onClick}
    >
      {children ? (
        children
      ) : asset.type === "image" ? (
        <Image
          src={asset.path}
          alt={asset.alt || ""}
          width={asset.width}
          height={asset.height}
          sizes="100vw"
          className="w-full h-auto border rounded-lg"
        />
      ) : (
        <video
          src={asset.path}
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline="true"
          className="size-full border rounded-lg"
        >
          {asset.fallback && (
            <Image
              src={asset.fallback}
              alt={asset.alt || ""}
              className="w-full h-auto border rounded-lg"
              width={asset.width}
              height={asset.height}
              sizes="100vw"
            />
          )}
        </video>
      )}
    </div>
  );
}
