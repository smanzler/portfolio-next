"use client";

import * as React from "react";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { XIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Spinner } from "./ui/spinner";

interface Asset {
  type: "image" | "video";
  src: string | StaticImageData;
  fallback?: StaticImageData;
  alt?: string;
}

interface ImageLightboxProps {
  src: string | StaticImageData;
  alt: string;
  className?: string;
  children?: React.ReactNode;
  assets?: Asset[];
  currentIndex?: number;
  onNavigate?: (index: number) => void;
}

export function ImageLightbox({
  src,
  alt,
  className,
  children,
  assets,
  currentIndex = 0,
  onNavigate,
}: ImageLightboxProps) {
  const [open, setOpen] = React.useState(false);
  const layoutId = React.useId();
  const [loaded, setLoaded] = React.useState(false);
  const [currentAssetIndex, setCurrentAssetIndex] =
    React.useState(currentIndex);

  const hasMultipleAssets = assets && assets.length > 1;
  const currentAsset = assets
    ? assets[currentAssetIndex]
    : { type: "image" as const, src: src as StaticImageData, alt };
  const currentImageSrc =
    assets && currentAsset.type === "image" ? currentAsset.src : src;
  const currentImageAlt =
    assets && currentAsset.type === "image" ? currentAsset.alt || alt : alt;
  const canGoPrevious = hasMultipleAssets && currentAssetIndex > 0;
  const canGoNext = hasMultipleAssets && currentAssetIndex < assets.length - 1;

  React.useEffect(() => {
    if (open && assets) {
      setCurrentAssetIndex(currentIndex);
    }
  }, [open, currentIndex, assets]);

  React.useEffect(() => {
    if (!open) {
      setLoaded(false);
    }
  }, [open]);

  React.useEffect(() => {
    if (open) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowLeft" && canGoPrevious) {
          handlePrevious();
        } else if (e.key === "ArrowRight" && canGoNext) {
          handleNext();
        } else if (e.key === "Escape") {
          handleClose();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, canGoPrevious, canGoNext]);

  const handlePrevious = () => {
    if (canGoPrevious && assets) {
      const newIndex = currentAssetIndex - 1;
      setCurrentAssetIndex(newIndex);
      setLoaded(false);
      onNavigate?.(newIndex);
    }
  };

  const handleNext = () => {
    if (canGoNext && assets) {
      const newIndex = currentAssetIndex + 1;
      setCurrentAssetIndex(newIndex);
      setLoaded(false);
      onNavigate?.(newIndex);
    }
  };

  const props = children
    ? {
        initial: { opacity: 1, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
        transition: { duration: 0.2 },
      }
    : { layoutId };

  const handleClose = () => {
    setOpen(false);
    if (children) {
      setLoaded(false);
    }
  };

  return (
    <>
      <motion.div
        className={cn(
          "cursor-pointer shrink-0",
          children ? "size-full" : "rounded-lg overflow-hidden border",
          className
        )}
        layoutId={children ? undefined : layoutId}
        onClick={() => setOpen(true)}
      >
        {children ? (
          children
        ) : (
          <Image
            src={src}
            alt={alt}
            unoptimized
            priority
            className="w-full h-full object-cover"
          />
        )}
      </motion.div>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.1 } }}
              exit={{ opacity: 0, transition: { delay: 0 } }}
              transition={{ duration: 0.2 }}
              onClick={handleClose}
            />

            <motion.div className="fixed inset-0 z-51 flex items-center justify-center pointer-events-none">
              <motion.div
                {...props}
                className="relative w-[90dvw] max-w-7xl rounded-lg overflow-hidden border"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  key={currentAssetIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full h-full"
                >
                  {!loaded && (
                    <div className="absolute inset-0 flex items-center justify-center z-60 bg-black">
                      <Spinner />
                    </div>
                  )}
                  <Image
                    src={currentImageSrc}
                    alt={currentImageAlt}
                    unoptimized
                    priority
                    onLoad={() => setLoaded(true)}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>

              {/* Navigation Arrows */}
              {hasMultipleAssets && (
                <>
                  {canGoPrevious && (
                    <motion.div
                      className="absolute left-4 z-20"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handlePrevious}
                        className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
                      >
                        <ChevronLeft className="h-6 w-6" />
                        <span className="sr-only">Previous</span>
                      </Button>
                    </motion.div>
                  )}
                  {canGoNext && (
                    <motion.div
                      className="absolute right-4 z-20"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleNext}
                        className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
                      >
                        <ChevronRight className="h-6 w-6" />
                        <span className="sr-only">Next</span>
                      </Button>
                    </motion.div>
                  )}
                </>
              )}

              {/* Close Button */}
              <motion.div
                className="absolute top-4 right-4 z-20"
                onClick={handleClose}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Button variant="ghost" size="icon">
                  <XIcon className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
