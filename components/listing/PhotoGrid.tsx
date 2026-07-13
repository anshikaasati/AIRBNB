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
    <section className="_LYTWdd select-none" id="_LYTWdd" aria-label="Photos of this place">
      <div className="_xabjMC" id="heroGrid">
        {displayPhotos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => openOverlay("photoTour", index)}
            className="_bcKEnm focus:outline-none"
            aria-label={`Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image ${index + 1}`}
          >
            <div className="w-full h-full relative">
              <Image
                src={photo.src}
                alt=""
                fill
                priority={index < 3}
                sizes={
                  index === 0
                    ? "(max-width: 768px) 100vw, 50vw"
                    : "(max-width: 768px) 0vw, 25vw"
                }
                className="object-cover"
              />
            </div>
          </button>
        ))}
      </div>

      <button
        type="button"
        id="showAllPhotos"
        onClick={() => openOverlay("photoTour")}
        className="_ocjgQL"
      >
        <span className="_bhnFoi">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" role="presentation" focusable="false" style={{ display: "block", height: "100%", width: "100%", fill: "currentColor" }}>
            <path fillRule="evenodd" d="M3 11.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-10-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-10-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
          </svg>
        </span>
        Show all photos
      </button>
    </section>
  );
}
