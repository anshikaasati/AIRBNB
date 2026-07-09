import React from "react";
import Image from "next/image";
import { RatingBreakdown, Review } from "../../types/listing";
import { Icon } from "../shared/Icon";

interface ReviewsSectionProps {
  ratingBreakdown: RatingBreakdown;
  reviews: Review[];
}

export function ReviewsSection({ ratingBreakdown, reviews }: ReviewsSectionProps) {
  return (
    <section className="py-8 border-b border-airbnb-border">
      {/* Stars Header Summary */}
      <h3 className="text-lg md:text-xl font-semibold text-airbnb-ink flex items-center mb-6 leading-6">
        <Icon name="star" className="w-5 h-5 text-airbnb-ink mr-2" />
        <span>{ratingBreakdown.overall.toFixed(2)}</span>
        <span className="text-airbnb-gray font-normal mx-2">•</span>
        <span>{ratingBreakdown.reviewCount} reviews</span>
      </h3>

      {/* Ratings Categories Bar Graph Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-4 mb-8 select-none">
        {ratingBreakdown.categories.map((category) => {
          const percentage = `${(category.score / 5) * 100}%`;
          return (
            <div key={category.label} className="flex items-center justify-between">
              <span className="text-sm font-normal text-airbnb-ink w-32">{category.label}</span>
              <div className="flex-1 flex items-center space-x-3">
                {/* Gray progress background track */}
                <div className="flex-1 h-1 bg-[#DDDDDD] rounded-full relative overflow-hidden">
                  {/* Black filled progression bar */}
                  <div
                    style={{ width: percentage }}
                    className="absolute top-0 bottom-0 left-0 bg-airbnb-ink rounded-full"
                  />
                </div>
                <span className="text-xs font-semibold text-airbnb-ink w-6 text-right">
                  {category.score.toFixed(1)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid of reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8">
        {reviews.map((review) => (
          <article key={review.id} className="text-airbnb-ink">
            {/* Reviewer Header */}
            <div className="flex items-center space-x-3 mb-3 select-none">
              <div className="w-10 h-10 rounded-full overflow-hidden relative border border-airbnb-border">
                <Image
                  src={review.authorAvatarSrc}
                  alt={`Avatar of reviewer ${review.authorName}`}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-sm leading-5">{review.authorName}</h4>
                <span className="text-airbnb-gray text-xs font-normal leading-4">{review.date}</span>
              </div>
            </div>

            {/* Reviewer text */}
            <p className="text-base font-normal leading-6 break-words whitespace-pre-line">
              {review.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
