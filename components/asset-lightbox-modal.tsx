"use client";

import * as React from "react";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Spinner } from "./ui/spinner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface Asset {
  type: "image" | "video";
  src: string | StaticImageData;
  fallback?: StaticImageData;
  alt?: string;
}

interface AssetLightboxModalProps {
  assets: Asset[];
  open: boolean;
  initialIndex: number;
  onClose: () => void;
}

export function AssetLightboxModal({
  assets,
  open,
  initialIndex,
  onClose,
}: AssetLightboxModalProps) {
  const [loadedStates, setLoadedStates] = React.useState<boolean[]>(
    new Array(assets.length).fill(false)
  );
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);
  const [api, setApi] = React.useState<CarouselApi>();
  // Track if opening animation has completed - use initialIndex until then, then switch to currentIndex
  const [openingComplete, setOpeningComplete] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      const newIndex = api.selectedScrollSnap();
      setCurrentIndex(newIndex);
    };

    api.on("select", handleSelect);
    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  // Always keep currentIndex in sync with initialIndex when modal opens
  React.useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex);
      setOpeningComplete(false); // Reset when opening
    } else {
      setOpeningComplete(false); // Reset when closing
    }
  }, [open]);

  React.useEffect(() => {
    if (open) {
      // Reset loaded state for the initial asset when opening
      setLoadedStates((prev: boolean[]) => {
        const newStates = [...prev];
        newStates[initialIndex] = false;
        return newStates;
      });
    } else {
      // Reset all loaded states when closing
      setLoadedStates(new Array(assets.length).fill(false));
    }
  }, [open, initialIndex, assets.length]);

  React.useEffect(() => {
    if (open) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, onClose]);

  const handleClose = (e?: React.MouseEvent<HTMLDivElement>) => {
    e?.stopPropagation();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <div key={`modal-${initialIndex}`}>
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
            <div
              className={cn(
                "relative pointer-events-auto",
                "w-[90dvw] max-w-7xl"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <Carousel
                setApi={setApi}
                opts={{
                  align: "center",
                  loop: false,
                  startIndex: initialIndex,
                  dragFree: false,
                  containScroll: "trimSnaps",
                }}
                className="w-full"
              >
                <CarouselContent>
                  {assets.map((asset, index) => {
                    // Use initialIndex for layoutId until opening animation completes, then use currentIndex
                    // This ensures opening animates from clicked thumbnail, closing animates to current view
                    // const layoutIdIndex = openingComplete
                    //   ? currentIndex
                    //   : initialIndex;
                    const layoutIdIndex = initialIndex;
                    const isActive = index === layoutIdIndex;
                    const hasLayoutId = open && isActive;
                    const props = hasLayoutId
                      ? { layoutId: `asset-thumbnail-${index}` }
                      : {
                          initial: { opacity: 0, scale: 0.9 },
                          animate: { opacity: 1, scale: 1 },
                          exit: { opacity: 0, scale: 0.9 },
                          transition: { duration: 0.2 },
                        };

                    return (
                      <CarouselItem key={index} className="basis-full">
                        <motion.div
                          {...props}
                          onLayoutAnimationComplete={() => {
                            // Switch to currentIndex after opening animation completes
                            if (
                              open &&
                              !openingComplete &&
                              index === initialIndex
                            ) {
                              setOpeningComplete(true);
                            }
                          }}
                          className={cn(
                            "relative w-full h-full rounded-lg overflow-hidden border"
                          )}
                        >
                          {asset.type === "image" ? (
                            <div className="relative w-full aspect-auto">
                              <Image
                                src={asset.src as StaticImageData}
                                alt={asset.alt || ""}
                                unoptimized
                                priority
                                onLoad={() => {
                                  setLoadedStates((prev: boolean[]) => {
                                    const newStates = [...prev];
                                    newStates[index] = true;
                                    return newStates;
                                  });
                                }}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </div>
                          ) : (
                            <div className="relative w-full aspect-video">
                              <video
                                src={asset.src as string}
                                className="w-full h-full object-contain rounded-lg"
                                autoPlay
                                muted
                                loop
                                onLoadedData={() => {
                                  setLoadedStates((prev: boolean[]) => {
                                    const newStates = [...prev];
                                    newStates[index] = true;
                                    return newStates;
                                  });
                                }}
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
                            </div>
                          )}
                        </motion.div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                {assets.length > 1 && (
                  <>
                    <CarouselPrevious className="left-4 bg-background/80 backdrop-blur-sm hover:bg-background/90 border-0" />
                    <CarouselNext className="right-4 bg-background/80 backdrop-blur-sm hover:bg-background/90 border-0" />
                  </>
                )}
              </Carousel>
            </div>

            {/* Close Button */}
            <motion.div
              className="absolute top-4 right-4 z-20 pointer-events-auto"
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
        </div>
      )}
    </AnimatePresence>
  );
}
