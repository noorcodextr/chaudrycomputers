"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Cpu } from "lucide-react";

type ProductGalleryProps = {
  name: string;
  imageUrl: string | null;
  imageUrls: string[];
};

export default function ProductGallery({
  name,
  imageUrl,
  imageUrls,
}: ProductGalleryProps) {
  const images = Array.from(
    new Set(
      [imageUrl, ...imageUrls].filter(
        (image): image is string => Boolean(image)
      )
    )
  );

  const [activeIndex, setActiveIndex] = useState(0);

  function previousImage() {
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  }

  function nextImage() {
    setActiveIndex((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  }

  if (images.length === 0) {
    return (
      <div className="relative flex h-[280px] items-center justify-center overflow-hidden border border-border bg-[hsl(216_26%_13%)] sm:h-[320px]">
        <div className="workshop-grid absolute inset-0 opacity-20" />

        <div className="relative z-10 grid size-24 place-items-center border border-chred text-chred">
          <Cpu className="size-12" strokeWidth={1.2} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Main Image */}
      <div
        className="group relative flex h-[260px] items-center justify-center overflow-hidden border border-border bg-[hsl(216_26%_13%)] sm:h-[320px]"
        onTouchStart={(event) => {
          const touch = event.touches[0];
          event.currentTarget.dataset.touchStart = String(touch.clientX);
        }}
        onTouchEnd={(event) => {
          const start = Number(
            event.currentTarget.dataset.touchStart
          );

          const end = event.changedTouches[0].clientX;
          const distance = start - end;

          if (Math.abs(distance) < 50) return;

          if (distance > 0) {
            nextImage();
          } else {
            previousImage();
          }
        }}
      >
        <div className="workshop-grid absolute inset-0 opacity-20" />

        <img
          src={images[activeIndex]}
          alt={`${name} image ${activeIndex + 1}`}
          loading="eager"
          fetchPriority="high"
          className="relative z-10 max-h-[220px] max-w-[85%] object-contain transition-opacity duration-200 sm:max-h-[270px]"
        />

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={previousImage}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-20 grid size-9 -translate-y-1/2 place-items-center border border-white/20 bg-black/50 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/70 group-hover:opacity-100 sm:opacity-100"
            >
              <ChevronLeft className="size-5" />
            </button>

            <button
              type="button"
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-20 grid size-9 -translate-y-1/2 place-items-center border border-white/20 bg-black/50 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/70 group-hover:opacity-100 sm:opacity-100"
            >
              <ChevronRight className="size-5" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-2 right-2 z-20 bg-black/60 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white">
              {activeIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden border bg-[hsl(216_26%_13%)] transition-all ${
                activeIndex === index
                  ? "border-chred"
                  : "border-border opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={image}
                alt={`${name} thumbnail ${index + 1}`}
                loading="lazy"
                className="h-full w-full object-contain p-1.5"
              />
            </button>
          ))}
        </div>
      )}

      {/* Mobile swipe hint */}
      {images.length > 1 && (
        <p className="mt-1 text-center text-[8px] font-bold uppercase tracking-[.16em] text-muted-foreground sm:hidden">
          Swipe to view more photos
        </p>
      )}
    </div>
  );
}