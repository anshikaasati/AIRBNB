"use client";

import React, { useState } from "react";
import { Icon } from "../shared/Icon";
import { Listing } from "../../types/listing";
import { motion, AnimatePresence } from "framer-motion";

interface ListingHeadingProps {
  listing: Listing;
}

export function ListingHeading({ listing }: ListingHeadingProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  const handleShareClick = () => {
    setShowShareToast(true);
    setTimeout(() => {
      setShowShareToast(false);
    }, 2500);
  };

  return (
    <section className="py-6 relative">
      {/* Title & Share/Save Buttons Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-[26px] font-semibold text-airbnb-ink leading-8 tracking-tight max-w-4xl">
          {listing.title}
        </h1>

        {/* Share & Save Buttons */}
        <div className="flex items-center space-x-4 flex-shrink-0 select-none">
          <button
            type="button"
            onClick={handleShareClick}
            className="flex items-center space-x-2 text-sm font-semibold underline p-2 rounded-lg hover:bg-airbnb-light-gray transition-colors focus:outline-none"
          >
            {/* Standard upload/share icon matching standard layout */}
            <svg viewBox="0 0 32 32" className="w-4 h-4 fill-none stroke-current" strokeWidth="2.5" aria-hidden="true">
              <path d="M16 2.5v18.5M9.5 9L16 2.5 22.5 9M6 18.5v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8" />
            </svg>
            <span>Share</span>
          </button>
          <button
            type="button"
            onClick={() => setIsSaved(!isSaved)}
            className="flex items-center space-x-2 text-sm font-semibold underline p-2 rounded-lg hover:bg-airbnb-light-gray transition-colors focus:outline-none"
          >
            <Icon
              name={isSaved ? "heart-filled" : "heart-outline"}
              className={`w-4 h-4 ${isSaved ? "text-airbnb-rausch" : "text-airbnb-ink"}`}
            />
            <span>{isSaved ? "Saved" : "Save"}</span>
          </button>
        </div>
      </div>

      {/* Share Options Toast */}
      <AnimatePresence>
        {showShareToast && (
          <motion.div
            initial={{ opacity: 0, y: 15, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 15, x: "-50%" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-10 left-1/2 z-50 bg-[#222222] text-white text-[15px] py-3.5 px-6 rounded-xl shadow-lg border border-neutral-700/50 flex items-center justify-center font-normal select-none"
          >
            Share options
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
