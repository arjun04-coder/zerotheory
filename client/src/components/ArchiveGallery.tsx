import { useEffect, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { fullSrcSet, fullUrl } from "@/lib/sanity";
import type { GalleryPhoto } from "@/lib/sanity";

const WIDTHS = [640, 960, 1280, 1920];

interface ArchiveGalleryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  category?: string;
  photos: GalleryPhoto[];
}

export function ArchiveGallery({ open, onOpenChange, title, category, photos }: ArchiveGalleryProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    const update = () => setIndex(api.selectedScrollSnap());
    update();
    api.on("select", update);
    return () => {
      api.off("select", update);
    };
  }, [api]);

  useEffect(() => {
    if (open) setIndex(0);
  }, [open]);

  const current = photos[index];
  const many = photos.length > 1;

  // Radix keeps focus on the dialog, so the arrow keys are handled here rather
  // than by the carousel itself.
  const handleKeyDown = (event: ReactKeyboardEvent) => {
    if (!api || !many) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      api.scrollNext();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      api.scrollPrev();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        onKeyDown={handleKeyDown}
        className="grain max-h-[92vh] w-[min(96vw,1180px)] max-w-[min(96vw,1180px)] gap-0 sm:max-w-[min(96vw,1180px)] overflow-hidden rounded-[1.25rem] border-white/15 bg-[#1d1d1b] p-0 text-white"
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/12 px-5 py-4 md:px-7">
          <div>
            {category && (
              <div className="mono text-[10px] text-[#fcea10]">{category}</div>
            )}
            <DialogTitle className="mt-1 text-xl font-bold tracking-[-0.04em] md:text-2xl">
              {title}
            </DialogTitle>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            {many && (
              <span className="mono text-[10px] text-white/60" aria-live="polite">
                {index + 1} / {photos.length}
              </span>
            )}
            <DialogClose
              aria-label="Close gallery"
              className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-[#fcea10] hover:text-[#fcea10]"
            >
              <X size={18} />
            </DialogClose>
          </div>
        </div>

        <DialogDescription className="sr-only">
          {many
            ? `Photo gallery for ${title}. Use the left and right arrow keys to move between ${photos.length} photos.`
            : `Photo gallery for ${title}.`}
        </DialogDescription>

        <Carousel opts={{ loop: many }} setApi={setApi} className="relative bg-black/25">
          <CarouselContent className="ml-0">
            {photos.map((photo) => (
              <CarouselItem key={photo._key} className="pl-0">
                <div className="flex h-[58vh] items-center justify-center p-3 md:h-[64vh] md:p-6">
                  {photo.image && (
                    <img
                      src={fullUrl(photo.image, 1280)}
                      srcSet={fullSrcSet(photo.image, WIDTHS)}
                      sizes="(max-width: 768px) 94vw, 1100px"
                      alt={photo.alt ?? ""}
                      loading="lazy"
                      decoding="async"
                      className="max-h-full w-auto max-w-full rounded-lg object-contain"
                      style={
                        photo.lqip
                          ? { backgroundImage: `url(${photo.lqip})`, backgroundSize: "cover" }
                          : undefined
                      }
                    />
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {many && (
            <>
              <CarouselPrevious
                aria-label="Previous photo"
                className="focus-ring left-3 h-11 w-11 border-white/30 bg-[#1d1d1b]/80 text-white hover:border-[#fcea10] hover:bg-[#1d1d1b] hover:text-[#fcea10] disabled:opacity-40"
              >
                <ChevronLeft />
              </CarouselPrevious>
              <CarouselNext
                aria-label="Next photo"
                className="focus-ring right-3 h-11 w-11 border-white/30 bg-[#1d1d1b]/80 text-white hover:border-[#fcea10] hover:bg-[#1d1d1b] hover:text-[#fcea10] disabled:opacity-40"
              >
                <ChevronRight />
              </CarouselNext>
            </>
          )}
        </Carousel>

        <div className="min-h-[56px] border-t border-white/12 px-5 py-4 md:px-7">
          <p className="text-sm leading-relaxed text-white/75">
            {current?.caption || current?.alt || ""}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
