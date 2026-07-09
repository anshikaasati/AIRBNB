"use client";

import React, { useState } from "react";
import { Icon } from "../shared/Icon";
import { Listing } from "../../types/listing";

interface ListingHeadingProps {
  listing: Listing;
}

export function ListingHeading({ listing }: ListingHeadingProps) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <section className="py-6">
      {/* Title */}
      <h1 className="text-[26px] font-semibold text-airbnb-ink leading-8 tracking-tight">
        {listing.title}
      </h1>

      {/* Metadata Row */}
      <div className="flex items-center justify-between mt-2 flex-wrap gap-2 text-sm text-airbnb-ink">
        <div className="flex items-center space-x-1 font-semibold flex-wrap">
          <div className="flex items-center">
            <Icon name="star" className="w-3.5 h-3.5 text-airbnb-ink mr-1" />
            <span>{listing.ratingBreakdown.overall.toFixed(2)}</span>
          </div>
          <span className="text-airbnb-gray font-normal">•</span>
          <button
            type="button"
            className="underline hover:text-black transition-colors font-semibold"
          >
            {listing.ratingBreakdown.reviewCount} reviews
          </button>
          <span className="text-airbnb-gray font-normal">•</span>
          <div className="flex items-center text-airbnb-gray font-normal">
            <Icon name="superhost" className="w-3.5 h-3.5 text-airbnb-ink mr-1" />
            <span className="text-airbnb-ink font-semibold">Superhost</span>
          </div>
          <span className="text-airbnb-gray font-normal">•</span>
          <button
            type="button"
            className="underline hover:text-black transition-colors font-semibold"
          >
            {listing.location}
          </button>
        </div>

        {/* Share & Save Buttons */}
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="flex items-center space-x-2 text-sm font-semibold underline p-2 rounded-lg hover:bg-airbnb-light-gray transition-colors"
          >
            <Icon name="share" className="w-4 h-4" />
            <span>Share</span>
          </button>
          <button
            type="button"
            onClick={() => setIsSaved(!isSaved)}
            className="flex items-center space-x-2 text-sm font-semibold underline p-2 rounded-lg hover:bg-airbnb-light-gray transition-colors"
          >
            <Icon
              name={isSaved ? "heart-filled" : "heart-outline"}
              className={`w-4 h-4 ${isSaved ? "text-airbnb-rausch" : "text-airbnb-ink"}`}
            />
            <span>{isSaved ? "Saved" : "Save"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
