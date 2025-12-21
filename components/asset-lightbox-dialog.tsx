import * as React from "react";
import Image, { StaticImageData } from "next/image";
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { Button } from "./ui/button";

function AssetDialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay>
        <DialogPrimitive.Close data-slot="dialog-close" asChild>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </Button>
        </DialogPrimitive.Close>
      </DialogOverlay>
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

interface Asset {
  type: "image" | "video";
  src: string | StaticImageData;
  alt?: string;
  fallback?: StaticImageData;
}

interface AssetLightboxDialogProps {
  assets: Asset[];
  open: boolean;
  setOpen: (open: boolean) => void;
  initialIndex: number;
}

export function AssetLightboxDialog({
  open,
  setOpen,
  assets,
  initialIndex,
}: AssetLightboxDialogProps) {
  const [api, setApi] = React.useState<CarouselApi>();

  React.useEffect(() => {
    if (api && initialIndex >= 0) {
      api.scrollTo(initialIndex);
    }
  }, [api, initialIndex]);

  // Keyboard navigation
  React.useEffect(() => {
    if (!open || !api) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        api.scrollPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        api.scrollNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, api]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <AssetDialogContent className="!max-w-7xl p-6 bg-transparent border-none shadow-none">
        <DialogTitle className="sr-only">Media Gallery</DialogTitle>

        <Carousel
          setApi={setApi}
          opts={{
            align: "center",
            loop: false,
            startIndex: initialIndex,
          }}
        >
          <CarouselContent>
            {assets.map((asset, i) => (
              <CarouselItem
                key={i}
                className="flex items-center justify-center"
              >
                {asset.type === "image" ? (
                  <Image
                    src={asset.src as StaticImageData}
                    alt={asset.alt || `Asset ${i + 1}`}
                    className="max-h-full max-w-full w-auto h-auto object-contain rounded-lg"
                    unoptimized
                    priority
                  />
                ) : (
                  <video
                    src={asset.src as string}
                    className="max-h-full max-w-full w-auto h-auto object-contain rounded-lg"
                    controls
                    autoPlay
                    muted
                    loop
                  >
                    {asset.fallback && (
                      <Image
                        src={asset.fallback}
                        alt={asset.alt || `Asset ${i + 1}`}
                        className="max-h-full max-w-full w-auto h-auto object-contain"
                        unoptimized
                        priority
                      />
                    )}
                  </video>
                )}
              </CarouselItem>
            ))}
          </CarouselContent>

          {assets.length > 1 && (
            <>
              <CarouselPrevious className="left-4 bg-background/80 backdrop-blur-sm hover:bg-background/90" />
              <CarouselNext className="right-4 bg-background/80 backdrop-blur-sm hover:bg-background/90" />
            </>
          )}
        </Carousel>
      </AssetDialogContent>
    </Dialog>
  );
}
