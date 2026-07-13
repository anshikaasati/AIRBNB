"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Listing } from "../../types/listing";
import { LAYOUT } from "../../lib/constants";

interface SubHeaderProps {
  listing: Listing;
  sectionOffsets: {
    photos: number;
    amenities: number;
    reviews: number;
    location: number;
  };
  nights: number;
  baseTotal: number;
}

export function SubHeader({ listing, sectionOffsets, nights, baseTotal }: SubHeaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("photos");

  const tabs = [
    { id: "photos", label: "Photos" },
    { id: "amenities", label: "Amenities" },
    { id: "reviews", label: "Reviews" },
    { id: "location", label: "Location" },
  ];

  // Monitor page scroll to toggle sub-header visibility and highlight active tab
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Make subheader visible after scrolling past the hero photo grid (approx 550px)
      if (scrollY > 550) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Sync active tab state with scroll location
      // Adjust with offsets representing header heights (approx 160px)
      const buffer = 160;
      if (scrollY + buffer >= sectionOffsets.location) {
        setActiveTab("location");
      } else if (scrollY + buffer >= sectionOffsets.reviews) {
        setActiveTab("reviews");
      } else if (scrollY + buffer >= sectionOffsets.amenities) {
        setActiveTab("amenities");
      } else {
        setActiveTab("photos");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionOffsets, activeTab]);

  const handleTabClick = (tabId: string) => {
    let targetScrollY = 0;
    if (tabId === "photos") {
      targetScrollY = 0;
    } else {
      targetScrollY = sectionOffsets[tabId as keyof typeof sectionOffsets] - 140;
    }

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  const handleReserveClick = () => {
    // Scroll to the main booking card
    window.scrollTo({
      top: sectionOffsets.amenities - 100,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed top-20 left-0 right-0 z-40 bg-white border-b border-airbnb-border h-16 flex items-center select-none"
        >
          <div className={`w-full ${LAYOUT.CONTAINER_MAX_WIDTH} mx-auto px-6 md:px-10 lg:px-20 flex items-center justify-between`}>
            {/* Scroll Anchor Tabs */}
            <div className="flex space-x-6 h-full items-center">
              {tabs.map((tab) => {
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleTabClick(tab.id)}
                    className={`h-16 border-b-4 text-sm font-semibold tracking-tight transition-colors focus:outline-none ${
                      isActive
                        ? "border-airbnb-ink text-black"
                        : "border-transparent text-airbnb-gray hover:text-black"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Mini Booking Panel */}
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block select-text">
                <div className="flex items-center space-x-1.5 justify-end">
                  <span className="font-bold text-base text-airbnb-ink">
                    {listing.currency}
                    {baseTotal.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs text-airbnb-gray font-normal">
                    for {nights} night{nights > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center justify-end text-xs font-semibold text-airbnb-ink mt-0.5">
                  <span className="text-airbnb-ink mr-1">★</span>
                  <span>{listing.ratingBreakdown.overall.toFixed(2)}</span>
                  <span className="text-airbnb-gray mx-1">-</span>
                  <span className="text-airbnb-gray underline font-normal">
                    {listing.ratingBreakdown.reviewCount} reviews
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReserveClick}
                className="bg-[#E61E4D] text-white rounded-lg py-2.5 px-6 font-semibold text-sm hover:bg-[#D90B3C] transition-colors focus:outline-none"
              >
                Reserve
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
