"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Listing } from "../../types/listing";
import { useOverlay } from "../../context/OverlayContext";
import { useKeyboardNav } from "../../hooks/useKeyboardNav";
import { Icon } from "../shared/Icon";
import { LIGHTBOX_IMAGE_TRANSITION } from "../../lib/motion";

interface LightboxProps {
  listing: Listing;
  isOpen: boolean;
  onClose: () => void;
}

export function Lightbox({ listing, isOpen, onClose }: LightboxProps) {
  const { state, setPhotoIndex } = useOverlay();
  const photos = listing.photos;
  const activeIndex = state.activePhotoIndex;
  const activePhoto = photos[activeIndex];

  const handleNext = () => {
    if (activeIndex < photos.length - 1) {
      setPhotoIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setPhotoIndex(activeIndex - 1);
    }
  };

  // Connect global keyboard events to navigation handlers
  useKeyboardNav(
    {
      onEsc: onClose,
      onArrowLeft: handlePrev,
      onArrowRight: handleNext,
    },
    isOpen
  );

  if (!isOpen || !activePhoto) return null;

  return (
    <div className="w-full h-full flex flex-col bg-black text-white relative select-none">
      {/* Lightbox Header Bar */}
      <header className="absolute top-0 left-0 right-0 z-30 h-16 flex items-center justify-between px-6 bg-gradient-to-b from-black/60 to-transparent">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="flex items-center space-x-2 text-white hover:bg-white/10 rounded-full p-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Close photo viewer"
        >
          <Icon name="close" className="w-4 h-4 text-white" />
        </button>

        {/* Counter */}
        <span className="text-sm font-semibold tracking-wide" aria-live="polite">
          {activeIndex + 1} / {photos.length}
        </span>

        {/* Action Mock placeholders */}
        <div className="w-9" />
      </header>

      {/* Main Image Slider Viewport */}
      <div className="flex-1 flex items-center justify-center relative px-12 md:px-24">
        {/* Slider Previous Button */}
        {activeIndex > 0 && (
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-6 z-20 w-12 h-12 rounded-full bg-black/50 border border-white/20 hover:bg-black/80 hover:scale-105 active:scale-95 text-white flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Previous photo"
          >
            <Icon name="chevron-left" className="w-4 h-4 text-white" />
          </button>
        )}

        {/* Central Display Photo */}
        <div className="w-full h-full max-w-5xl max-h-[80vh] relative flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhoto.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={LIGHTBOX_IMAGE_TRANSITION}
              className="w-full h-full relative"
            >
              <Image
                src={activePhoto.src}
                alt={activePhoto.alt}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain select-text"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slider Next Button */}
        {activeIndex < photos.length - 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-6 z-20 w-12 h-12 rounded-full bg-black/50 border border-white/20 hover:bg-black/80 hover:scale-105 active:scale-95 text-white flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Next photo"
          >
            <Icon name="chevron-right" className="w-4 h-4 text-white" />
          </button>
        )}
      </div>

      {/* Optional Photo Description Banner */}
      {activePhoto.alt && (
        <footer className="absolute bottom-0 left-0 right-0 z-30 py-6 px-10 text-center text-sm text-neutral-300 bg-gradient-to-t from-black/80 to-transparent">
          <p className="max-w-2xl mx-auto drop-shadow-sm select-text">
            {activePhoto.alt}
          </p>
        </footer>
      )}
    </div>
  );
}
