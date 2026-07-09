"use client";

import React, { useState, useRef } from "react";
import { Amenity } from "../../types/listing";
import { Icon } from "../shared/Icon";
import { useScrollLock } from "../../hooks/useScrollLock";
import { useFocusTrap } from "../../hooks/useFocusTrap";

interface AmenitiesListProps {
  amenities: Amenity[];
}

export function AmenitiesList({ amenities }: AmenitiesListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Apply scroll lock and focus trap to local modal
  useScrollLock(isModalOpen);
  useFocusTrap(modalRef, isModalOpen);

  // Show up to 8 amenities in the base view
  const visibleAmenities = amenities.slice(0, 8);

  const handleEscClose = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsModalOpen(false);
    }
  };

  return (
    <section className="py-6 border-b border-airbnb-border">
      <h3 className="text-lg md:text-xl font-semibold text-airbnb-ink leading-6 mb-4">
        What this place offers
      </h3>

      {/* Grid of Amenities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visibleAmenities.map((amenity) => (
          <div
            key={amenity.id}
            className={`flex items-center space-x-3 text-base text-airbnb-ink ${
              !amenity.available ? "line-through text-airbnb-gray" : ""
            }`}
          >
            <Icon name={amenity.icon} className="w-6 h-6 text-airbnb-ink" />
            <span>{amenity.label}</span>
          </div>
        ))}
      </div>

      {/* Trigger Button */}
      {amenities.length > 8 && (
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="border border-airbnb-ink rounded-lg py-3 px-6 font-semibold text-sm hover:bg-airbnb-light-gray transition-colors mt-6 text-airbnb-ink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-airbnb-ink"
        >
          Show all {amenities.length} amenities
        </button>
      )}

      {/* Local Amenities Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs select-none"
          onClick={() => setIsModalOpen(false)}
          onKeyDown={handleEscClose}
        >
          <div
            ref={modalRef}
            className="bg-white w-full max-w-2xl rounded-card max-h-[85vh] flex flex-col shadow-booking-card focus:outline-none"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="All amenities"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-airbnb-border">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 -ml-2 rounded-full hover:bg-airbnb-light-gray text-airbnb-ink transition-colors focus:outline-none focus:ring-2 focus:ring-airbnb-ink"
                aria-label="Close amenities modal"
              >
                <Icon name="close" className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-semibold text-airbnb-ink">Amenities</h2>
              <div className="w-9" /> {/* Spacer */}
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 select-text">
              <div>
                <h3 className="font-semibold text-base mb-4 text-airbnb-ink">What this place offers</h3>
                <div className="space-y-4">
                  {amenities
                    .filter((a) => a.available)
                    .map((amenity) => (
                      <div key={amenity.id} className="flex items-center space-x-4 border-b border-airbnb-light-gray pb-4">
                        <Icon name={amenity.icon} className="w-6 h-6" />
                        <span className="text-base text-airbnb-ink">{amenity.label}</span>
                      </div>
                    ))}
                </div>
              </div>

              {amenities.some((a) => !a.available) && (
                <div>
                  <h3 className="font-semibold text-base mb-4 text-airbnb-gray">Not included</h3>
                  <div className="space-y-4">
                    {amenities
                      .filter((a) => !a.available)
                      .map((amenity) => (
                        <div key={amenity.id} className="flex items-center space-x-4 line-through text-airbnb-gray pb-4 border-b border-airbnb-light-gray">
                          <Icon name={amenity.icon} className="w-6 h-6 text-airbnb-gray" />
                          <span className="text-base">{amenity.label}</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
