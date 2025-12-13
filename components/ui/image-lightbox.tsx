"use client";

import * as React from "react";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface ImageLightboxProps {
  src: string | StaticImageData;
  alt: string;
  className?: string;
}

export function ImageLightbox({ src, alt, className }: ImageLightboxProps) {
  const [open, setOpen] = React.useState(false);
  const layoutId = React.useId();

  return (
    <>
      <motion.div
        className={cn("cursor-pointer shrink-0", className)}
        onClick={() => setOpen(true)}
        layoutId={layoutId}
      >
        <Image
          src={src}
          alt={alt}
          unoptimized
          priority
          className="w-full h-full object-cover"
        />
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
              onClick={() => setOpen(false)}
            />

            <motion.div className="fixed inset-0 z-51 flex items-center justify-center pointer-events-none">
              <motion.div
                layoutId={layoutId}
                className="w-[90dvw] max-w-4xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Image src={src} alt={alt} unoptimized priority />
              </motion.div>

              {/* Close Button */}
              <motion.div
                className="absolute top-4 right-4 z-20"
                onClick={() => setOpen(false)}
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
