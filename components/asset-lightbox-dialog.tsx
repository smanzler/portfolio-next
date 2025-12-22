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
import { Asset } from "@/lib/projects";

function AssetDialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay className="bg-neutral-900/50 backdrop-blur-sm">
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
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200",
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
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
  const dragStartRef = React.useRef<{ x: number; y: number } | null>(null);
  const isDraggingRef = React.useRef(false);

  React.useEffect(() => {
    if (api && initialIndex >= 0) {
      api.scrollTo(initialIndex);
    }
  }, [api, initialIndex]);

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

  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    isDraggingRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingRef.current) return;

    if (dragStartRef.current) {
      const deltaX = Math.abs(e.clientX - dragStartRef.current.x);
      const deltaY = Math.abs(e.clientY - dragStartRef.current.y);
      if (deltaX > 5 || deltaY > 5) {
        isDraggingRef.current = true;
      }
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) {
      setOpen(false);
    }

    dragStartRef.current = null;
    isDraggingRef.current = false;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <AssetDialogContent
        className="!max-w-7xl p-10 sm:p-16 bg-transparent border-none shadow-none outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      >
        <DialogTitle className="sr-only">Media Gallery</DialogTitle>

        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: false,
            startIndex: initialIndex,
          }}
        >
          <CarouselContent>
            {assets.map((asset, i) => (
              <CarouselItem key={i}>
                <div className="flex items-center justify-center h-[calc(100vh-10rem)] w-full">
                  {asset.type === "image" ? (
                    <Image
                      src={asset.path}
                      alt={asset.alt || `Asset ${i + 1}`}
                      width={asset.width}
                      height={asset.height}
                      sizes="100vw"
                      className="size-full object-contain"
                    />
                  ) : (
                    <video
                      src={asset.path}
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
                          alt={asset.alt || `Asset ${i + 1}`}
                          width={asset.width}
                          height={asset.height}
                          sizes="100vw"
                          className="size-full object-contain"
                        />
                      )}
                    </video>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {assets.length > 1 && (
            <div onClick={(e) => e.stopPropagation()}>
              <CarouselPrevious />
              <CarouselNext />
            </div>
          )}
        </Carousel>
      </AssetDialogContent>
    </Dialog>
  );
}
