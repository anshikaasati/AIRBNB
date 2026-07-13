"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Review } from "../../types/listing";

interface ReviewsSectionProps {
  reviews: Review[];
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const [expandedReviews, setExpandedReviews] = useState<{ [key: string]: boolean }>({});

  const toggleExpand = (id: string) => {
    setExpandedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Co-map the review duration/age and details observed in the recording
  const reviewersDetails: { [key: string]: { duration: string; age: string } } = {
    r1: { duration: "2 months on Airbnb", age: "1 week ago" },
    r2: { duration: "3 years on Airbnb", age: "2 weeks ago" },
    r3: { duration: "8 months on Airbnb", age: "May 2026" },
    r4: { duration: "4 years on Airbnb", age: "May 2026" },
    r5: { duration: "3 years on Airbnb", age: "May 2026" },
    r6: { duration: "5 years on Airbnb", age: "May 2026" },
  };

  const categories = [
    {
      label: "Cleanliness",
      score: 5.0,
      icon: (
        <svg viewBox="0 0 32 32" className="w-8 h-8 fill-current text-airbnb-ink" aria-hidden="true">
          <path d="M26 12h-2V7a5 5 0 0 0-5-5H9a1 1 0 0 0-1 1v22a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8h2a2 2 0 0 0 2-2V14a2 2 0 0 0-2-2zM10 4h8a3 3 0 0 1 3 3v2H10zm11 22H10V11h11zm3-6h-2v-4h2zm2-2v4h-2v-4z" />
        </svg>
      ),
    },
    {
      label: "Accuracy",
      score: 5.0,
      icon: (
        <svg viewBox="0 0 32 32" className="w-8 h-8 fill-current text-airbnb-ink" aria-hidden="true">
          <path d="M16 2a14 14 0 1 0 0 28 14 14 0 0 0 0-28zm0 26a12 12 0 1 1 0-24 12 12 0 0 1 0 24zm-2.4-7.4l-4.2-4.2 1.4-1.4 2.8 2.8 5.8-5.8 1.4 1.4z" />
        </svg>
      ),
    },
    {
      label: "Check-in",
      score: 5.0,
      icon: (
        <svg viewBox="0 0 32 32" className="w-8 h-8 fill-current text-airbnb-ink" aria-hidden="true">
          <path d="M23 2a7 7 0 0 0-6.7 4.9L3.4 19.8A1 1 0 0 0 3 20v7a2 2 0 0 0 2 2h7a1 1 0 0 0 .7-.3l2.8-2.8a1 1 0 0 0 0-1.4l-1.4-1.4 1.8-1.8 1.4 1.4a1 1 0 0 0 1.4 0l1.8-1.8-1.4-1.4a1 1 0 0 0 0-1.4l1.1-1.1A7 7 0 1 0 23 2zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
        </svg>
      ),
    },
    {
      label: "Communication",
      score: 5.0,
      icon: (
        <svg viewBox="0 0 32 32" className="w-8 h-8 fill-current text-airbnb-ink" aria-hidden="true">
          <path d="M16 2C8.3 2 2 7.4 2 14c0 2.5 1 4.8 2.8 6.6L3 27a1 1 0 0 0 1.4 1.1l5.4-2.7c1.9.8 4 1.2 6.2 1.2 7.7 0 14-5.4 14-12S23.7 2 16 2zm0 22c-2 0-3.9-.4-5.6-1.1a1 1 0 0 0-.8 0l-3.3 1.6 1.1-3.3a1 1 0 0 0-.2-.9A9.6 9.6 0 0 1 4 14c0-5.5 5.4-10 12-10s12 4.5 12 10-5.4 10-12 10z" />
        </svg>
      ),
    },
    {
      label: "Location",
      score: 4.8,
      icon: (
        <svg viewBox="0 0 32 32" className="w-8 h-8 fill-current text-airbnb-ink" aria-hidden="true">
          <path d="M29.6 4.3a1 1 0 0 0-1-.1L20 8l-8-4-8.6 3.8a1 1 0 0 0-.6.9v20a1 1 0 0 0 1.4.9L12 26l8 4 8.6-3.8a1 1 0 0 0 .6-.9V5a1 1 0 0 0-.6-.7zM10 23.4l-4 1.8V7.8l4-1.8zm10-13.6l-8-4v19.6l8 4zm6 12.4l-4 1.8V9.8l4-1.8z" />
        </svg>
      ),
    },
    {
      label: "Value",
      score: 4.8,
      icon: (
        <svg viewBox="0 0 32 32" className="w-8 h-8 fill-current text-airbnb-ink" aria-hidden="true">
          <path d="M29.7 15.3l-13-13A2 2 0 0 0 15.3 2H3C1.9 2 1 2.9 1 4v12.3c0 .5.2 1 .6 1.4l13 13a2 2 0 0 0 2.8 0l12.3-12.3c.8-.8.8-2 0-2.8zM16 27.9L4.4 16.3V4H16.7l11.6 11.6zm-7.5-13.4a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
        </svg>
      ),
    },
  ];

  const searchTags = [
    { label: "Comfort 6", icon: "🛋️" },
    { label: "Accuracy 5", icon: "✅" },
    { label: "Hot tub 5", icon: "🛁" },
    { label: "Condition 4", icon: "🎂" },
    { label: "Hospitality 8", icon: "🎁" },
    { label: "Cleanliness 4", icon: "🧼" },
    { label: "Amenities 2", icon: "🧴" },
    { label: "Decor 2", icon: "🎨" },
    { label: "Indoor spaces 2", icon: "🏠" },
    { label: "Location 2", icon: "📍" },
  ];

  return (
    <section className="py-10 border-b border-airbnb-border bg-white select-none">
      {/* Centered Laurel Wreath & Rating Header */}
      <div className="flex flex-col items-center justify-center text-center mb-10 select-text">
        <div className="flex items-center space-x-5 select-none">
          <svg viewBox="0 0 17 32" className="w-[30px] h-[56px] fill-current text-airbnb-ink" aria-hidden="true">
            <path d="M12.242 2a1 1 0 0 1 .993.883L13.25 3v1.836A9.99 9.99 0 0 1 16.5 12a10.01 10.01 0 0 1-5.5 8.948v1.393a5 5 0 0 1 2.302 4.095l.044.378.004.186a1 1 0 0 1-1.993.117l-.007-.117a3 3 0 0 0-2.824-2.995l-.176-.005H8a1 1 0 0 1-.993-.883L7 24V11a1 1 0 0 1 .883-.993L8 10h.25a7.99 7.99 0 0 0 4.25-6.93V3a1 1 0 0 1 1-1zm-6.5 4a1 1 0 0 1 .993.883L6.75 7v1.836A9.99 9.99 0 0 1 10 16a10.01 10.01 0 0 1-5.5 8.948v1.393a5 5 0 0 1 2.302 4.095l.044.378.004.186A1 1 0 0 1 4.857 31l-.007-.117a3 3 0 0 0-2.824-2.995L1.85 27.883H1.5a1 1 0 0 1-.993-.883L.5 27V15a1 1 0 0 1 .883-.993L1.5 14h.25a7.99 7.99 0 0 0 4.25-6.93V7a1 1 0 0 1 1-1z" />
          </svg>
          <span className="text-[100px] font-extrabold tracking-tighter leading-none text-airbnb-ink">
            4.95
          </span>
          <svg viewBox="0 0 17 32" className="w-[30px] h-[56px] fill-current text-airbnb-ink scale-x-[-1]" aria-hidden="true">
            <path d="M12.242 2a1 1 0 0 1 .993.883L13.25 3v1.836A9.99 9.99 0 0 1 16.5 12a10.01 10.01 0 0 1-5.5 8.948v1.393a5 5 0 0 1 2.302 4.095l.044.378.004.186a1 1 0 0 1-1.993.117l-.007-.117a3 3 0 0 0-2.824-2.995l-.176-.005H8a1 1 0 0 1-.993-.883L7 24V11a1 1 0 0 1 .883-.993L8 10h.25a7.99 7.99 0 0 0 4.25-6.93V3a1 1 0 0 1 1-1zm-6.5 4a1 1 0 0 1 .993.883L6.75 7v1.836A9.99 9.99 0 0 1 10 16a10.01 10.01 0 0 1-5.5 8.948v1.393a5 5 0 0 1 2.302 4.095l.044.378.004.186A1 1 0 0 1 4.857 31l-.007-.117a3 3 0 0 0-2.824-2.995L1.85 27.883H1.5a1 1 0 0 1-.993-.883L.5 27V15a1 1 0 0 1 .883-.993L1.5 14h.25a7.99 7.99 0 0 0 4.25-6.93V7a1 1 0 0 1 1-1z" />
          </svg>
        </div>

        <h3 className="text-[22px] font-bold text-airbnb-ink leading-7 mt-1.5">
          Guest favourite
        </h3>
        <p className="text-sm font-normal text-airbnb-gray mt-2.5 max-w-[400px] leading-5">
          This home is a guest favourite based on ratings, reviews and reliability
        </p>
        <button
          type="button"
          className="text-xs font-semibold text-airbnb-gray underline hover:text-black mt-2 focus:outline-none"
        >
          How reviews work
        </button>
      </div>

      {/* Guest Favourite Rating Details Card (7-column grid layout) */}
      <div className="border-y border-airbnb-border py-8 grid grid-cols-2 md:grid-cols-7 divide-x-0 md:divide-x divide-airbnb-border gap-6 md:gap-0 mb-8 select-text">
        {/* Column 1: Overall rating vertical distribution */}
        <div className="col-span-2 md:col-span-1 px-4 flex flex-col justify-center">
          <span className="text-[13px] font-semibold text-airbnb-ink leading-none">Overall rating</span>
          <div className="mt-3.5 space-y-1 w-full max-w-[140px]">
            {/* Distribution bars */}
            {[5, 4, 3, 2, 1].map((score) => (
              <div key={score} className="flex items-center text-[10px] font-semibold text-airbnb-ink space-x-2">
                <span className="w-2">{score}</span>
                <div className="flex-1 h-1 bg-neutral-200 rounded-full overflow-hidden relative">
                  <div
                    style={{ width: score === 5 ? "100%" : "0%" }}
                    className="absolute top-0 bottom-0 left-0 bg-airbnb-ink rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Columns 2-7: Individual categories score & bottom aligned icon */}
        {categories.map((cat, idx) => (
          <div key={idx} className="px-4 flex flex-col justify-between items-start h-[100px]">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-airbnb-ink leading-tight">{cat.label}</span>
              <span className="text-[17px] font-bold text-airbnb-ink leading-none mt-1.5">{cat.score.toFixed(1)}</span>
            </div>
            <div className="mt-auto self-start">{cat.icon}</div>
          </div>
        ))}
      </div>

      {/* Categories tag filters scroll row */}
      <div className="flex items-center space-x-3 overflow-x-auto pb-4 mb-8 scrollbar-hide">
        {searchTags.map((tag, idx) => (
          <button
            key={idx}
            type="button"
            className="flex items-center space-x-2 border border-airbnb-border rounded-full py-2 px-4 hover:border-black font-semibold text-xs text-airbnb-ink bg-white flex-shrink-0 transition-colors focus:outline-none"
          >
            <span>{tag.icon}</span>
            <span>{tag.label}</span>
          </button>
        ))}
      </div>

      {/* Grid of reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10">
        {reviews.map((review) => {
          const detail = reviewersDetails[review.id] || {
            duration: "Guest on Airbnb",
            age: review.date,
          };
          const isExpanded = expandedReviews[review.id];
          const isLong = review.text.length > 150;

          return (
            <article key={review.id} className="text-airbnb-ink flex flex-col justify-between">
              <div>
                {/* Reviewer Header */}
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden relative border border-airbnb-border flex-shrink-0">
                    <Image
                      src={review.authorAvatarSrc}
                      alt={`Avatar of reviewer ${review.authorName}`}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="select-text">
                    <h4 className="font-bold text-sm leading-none">{review.authorName}</h4>
                    <span className="text-airbnb-gray text-xs font-normal mt-1 block">
                      {detail.duration}
                    </span>
                  </div>
                </div>

                {/* Rating stars & timing */}
                <div className="flex items-center space-x-2 text-[10px] text-airbnb-ink font-semibold mb-2">
                  <div className="flex items-center space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-xs">★</span>
                    ))}
                  </div>
                  <span className="text-airbnb-gray font-normal">•</span>
                  <span className="text-airbnb-gray font-normal select-text">{detail.age}</span>
                </div>

                {/* Reviewer text */}
                <p className="text-[15px] font-normal leading-6 break-words whitespace-pre-line select-text">
                  {isLong && !isExpanded ? `${review.text.slice(0, 150)}...` : review.text}
                </p>
              </div>

              {/* Show more button */}
              {isLong && (
                <button
                  type="button"
                  onClick={() => toggleExpand(review.id)}
                  className="font-bold text-xs underline hover:text-black mt-2 focus:outline-none w-fit self-start"
                >
                  {isExpanded ? "Show less" : "Show more"}
                </button>
              )}
            </article>
          );
        })}
      </div>

      {/* Bottom Button */}
      <div className="mt-10 select-text">
        <button
          type="button"
          className="border border-airbnb-ink rounded-lg py-3 px-6 font-semibold text-sm hover:bg-airbnb-light-gray transition-colors text-airbnb-ink focus:outline-none"
        >
          Show all 19 reviews
        </button>
      </div>
    </section>
  );
}
