"use client";

import React, { useState } from "react";
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
    <section className="_nqOILr relative" id="photos">
      <h1 className="_XtZJrm">
        {listing.title}
      </h1>

      <div className="_MIbhFG select-none">
        <button
          type="button"
          id="shareBtn"
          onClick={handleShareClick}
          className="_lXWmLq focus:outline-none"
        >
          <span className="_ffLphr">
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style={{
                display: "block",
                height: "100%",
                width: "100%",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 2,
                overflow: "visible"
              }}
            >
              <path d="m27 18v9c0 1.1046-.8954 2-2 2h-18c-1.10457 0-2-.8954-2-2v-9m11-15v21m-10-11 9.2929-9.29289c.3905-.39053 1.0237-.39053 1.4142 0l9.2929 9.29289" />
            </svg>
          </span>
          <span className="_lBQzRQ">Share</span>
        </button>

        <button
          type="button"
          id="saveBtn"
          onClick={() => setIsSaved(!isSaved)}
          className="_lXWmLq focus:outline-none"
        >
          <span className="_ffLphr">
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style={{
                display: "block",
                height: "100%",
                width: "100%",
                fill: isSaved ? "#e61e4d" : "none",
                stroke: isSaved ? "#e61e4d" : "currentColor",
                strokeWidth: 2,
                overflow: "visible"
              }}
            >
              <path d="m15.9998 28.6668c7.1667-4.8847 14.3334-10.8844 14.3334-18.1088 0-1.84951-.6993-3.69794-2.0988-5.10877-1.3996-1.4098-3.2332-2.11573-5.0679-2.11573-1.8336 0-3.6683.70593-5.0668 2.11573l-2.0999 2.11677-2.0988-2.11677c-1.3995-1.4098-3.2332-2.11573-5.06783-2.11573-1.83364 0-3.66831.70593-5.06683 2.11573-1.39955 1.41083-2.09984 3.25926-2.09984 5.10877 0 7.2244 7.16667 13.2241 14.3333 18.1088z" />
            </svg>
          </span>
          <span className="_lBQzRQ">{isSaved ? "Saved" : "Save"}</span>
        </button>
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
