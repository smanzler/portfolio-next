import * as React from "react";
import Image, { StaticImageData } from "next/image";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
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
      <DialogContent className="w-[95vw] !max-w-7xl p-6 bg-transparent border-none shadow-none">
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
      </DialogContent>
    </Dialog>
  );
}
