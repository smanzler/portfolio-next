"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";
import { Spinner } from "./ui/spinner";

interface VideoLightboxProps {
  src: string;
  fallback?: StaticImageData;
  alt: string;
  className?: string;
  children?: React.ReactNode;
}

export function VideoLightbox({
  src,
  fallback,
  alt,
  className,
  children,
}: VideoLightboxProps) {
  const [open, setOpen] = React.useState(false);
  const layoutId = React.useId();
  const [loaded, setLoaded] = React.useState(false);

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
          <video
            src={src}
            className="w-full h-full object-contain"
            autoPlay
            muted
            loop
          >
            {fallback && (
              <Image
                src={fallback}
                alt={alt}
                unoptimized
                priority
                className="w-full h-full object-contain"
              />
            )}
          </video>
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
                className="relative w-[90dvw] max-w-7xl rounded-lg overflow-hidden border aspect-video"
                onClick={(e) => e.stopPropagation()}
              >
                <>
                  {!loaded && (
                    <div className="absolute inset-0 flex items-center justify-center z-60 bg-black">
                      <Spinner />
                    </div>
                  )}
                  <video
                    src={src}
                    className="w-full h-full object-contain"
                    autoPlay
                    muted
                    loop
                    onLoad={() => setLoaded(true)}
                  >
                    {fallback && (
                      <Image
                        src={fallback}
                        alt={alt}
                        unoptimized
                        priority
                        className="w-full h-full object-contain"
                      />
                    )}
                  </video>
                </>
              </motion.div>

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
