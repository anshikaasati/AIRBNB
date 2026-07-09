"use client";

import React from "react";
import Image from "next/image";
import { Listing } from "../../types/listing";
import { useOverlay } from "../../context/OverlayContext";

interface PhotoGridProps {
  listing: Listing;
}

export function PhotoGrid({ listing }: PhotoGridProps) {
  const { openOverlay } = useOverlay();
  const displayPhotos = listing.photos.slice(0, 5);

  return (
    <section className="relative w-full h-[300px] sm:h-[380px] md:h-[450px] rounded-card overflow-hidden grid grid-cols-4 grid-rows-2 gap-2 bg-airbnb-light-gray select-none">
      {displayPhotos.map((photo, index) => {
        // Grid cell styling depending on placement
        let gridClasses = "";
        if (index === 0) {
          gridClasses = "col-span-2 row-span-2";
        } else {
          gridClasses = "col-span-1 row-span-1 hidden md:block";
        }

        return (
          <button
            key={photo.id}
            type="button"
            onClick={() => openOverlay("lightbox", index)}
            className={`${gridClasses} relative overflow-hidden group w-full h-full text-left focus:outline-none`}
            aria-label={`View photo ${index + 1}: ${photo.alt}`}
          >
            {/* Image wrapper for hover scale */}
            <div className="w-full h-full relative transition-transform duration-[450ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.03]">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority={index < 3} // Eager load primary elements above fold
                loading={index >= 3 ? "lazy" : undefined}
                sizes={
                  index === 0
                    ? "(max-width: 768px) 100vw, 50vw"
                    : "(max-width: 768px) 0vw, 25vw"
                }
                className="object-cover"
              />
              {/* Overlay darken effect */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-[450ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]" />
            </div>
          </button>
        );
      })}

      {/* "Show all photos" trigger button */}
      <button
        type="button"
        onClick={() => openOverlay("photoTour")}
        className="absolute bottom-6 right-6 flex items-center space-x-2 bg-white border border-airbnb-ink text-airbnb-ink rounded-lg py-1.5 px-4 font-semibold text-sm shadow-sm hover:bg-airbnb-light-gray transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-airbnb-ink"
      >
        <span className="grid grid-cols-3 gap-[3px] w-[14px] h-[14px]">
          <span className="border border-airbnb-ink rounded-[1px]" />
          <span className="border border-airbnb-ink rounded-[1px]" />
          <span className="border border-airbnb-ink rounded-[1px]" />
          <span className="border border-airbnb-ink rounded-[1px]" />
          <span className="border border-airbnb-ink rounded-[1px]" />
          <span className="border border-airbnb-ink rounded-[1px]" />
          <span className="border border-airbnb-ink rounded-[1px]" />
          <span className="border border-airbnb-ink rounded-[1px]" />
          <span className="border border-airbnb-ink rounded-[1px]" />
        </span>
        <span>Show all photos</span>
      </button>
    </section>
  );
}
