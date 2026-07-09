"use client";

import React, { useState } from "react";
import { Listing } from "../../types/listing";
import { Icon } from "../shared/Icon";

interface BookingCardProps {
  listing: Listing;
}

export function BookingCard({ listing }: BookingCardProps) {
  const [nights, setNights] = useState(5);
  const [guests, setGuests] = useState(2);
  const [isGuestMenuOpen, setIsGuestMenuOpen] = useState(false);

  // Dynamic calculations
  const pricePerNight = listing.pricePerNight;
  const baseTotal = pricePerNight * nights;
  const cleaningFee = 150;
  const serviceFee = Math.round(baseTotal * 0.12);
  const grandTotal = baseTotal + cleaningFee + serviceFee;

  const incrementNights = () => setNights((prev) => prev + 1);
  const decrementNights = () => setNights((prev) => (prev > 1 ? prev - 1 : 1));

  const incrementGuests = () => setGuests((prev) => (prev < 4 ? prev + 1 : 4));
  const decrementGuests = () => setGuests((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="bg-white border border-airbnb-border rounded-card p-6 shadow-booking-card sticky top-28 select-none">
      {/* Price & Star Rating Header */}
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <span className="text-2xl font-bold text-airbnb-ink">
            {listing.currency}
            {pricePerNight}
          </span>
          <span className="text-airbnb-gray text-base ml-1">night</span>
        </div>
        <div className="flex items-center text-sm font-semibold text-airbnb-ink">
          <Icon name="star" className="w-3.5 h-3.5 mr-1" />
          <span>{listing.ratingBreakdown.overall.toFixed(2)}</span>
          <span className="text-airbnb-gray font-normal mx-1.5">•</span>
          <span className="text-airbnb-gray underline font-normal">
            {listing.ratingBreakdown.reviewCount} reviews
          </span>
        </div>
      </div>

      {/* Date & Guest Input Mocks */}
      <div className="border border-airbnb-border rounded-lg mb-4 text-xs font-semibold text-airbnb-ink">
        <div className="grid grid-cols-2 border-b border-airbnb-border">
          <div className="p-3 border-r border-airbnb-border flex flex-col justify-between">
            <span className="text-[10px] uppercase font-bold text-airbnb-ink">Nights</span>
            <div className="flex items-center justify-between mt-1 text-sm">
              <button
                type="button"
                onClick={decrementNights}
                className="w-6 h-6 rounded-full border border-airbnb-border flex items-center justify-center hover:border-black text-base"
                aria-label="Decrease nights"
              >
                -
              </button>
              <span>{nights}</span>
              <button
                type="button"
                onClick={incrementNights}
                className="w-6 h-6 rounded-full border border-airbnb-border flex items-center justify-center hover:border-black text-base"
                aria-label="Increase nights"
              >
                +
              </button>
            </div>
          </div>
          <div className="p-3 flex flex-col justify-center">
            <span className="text-[10px] uppercase font-bold text-airbnb-gray">Dates Mocked</span>
            <span className="text-sm mt-1 font-normal text-airbnb-ink">Jul 12 – Jul {12 + nights}</span>
          </div>
        </div>

        {/* Guest Input */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsGuestMenuOpen(!isGuestMenuOpen)}
            className="w-full p-3 flex justify-between items-center text-left text-sm font-normal focus:outline-none"
            aria-expanded={isGuestMenuOpen}
            aria-label="Guest count options"
          >
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-airbnb-ink">Guests</span>
              <span className="mt-0.5 text-airbnb-ink font-normal">
                {guests} guest{guests > 1 ? "s" : ""}
              </span>
            </div>
            <Icon name="arrow-down" className="w-4 h-4 text-airbnb-ink" />
          </button>

          {isGuestMenuOpen && (
            <div className="absolute right-0 left-0 bg-white border border-airbnb-border rounded-lg shadow-md p-4 mt-2 z-10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-airbnb-ink">Adults</span>
                  <span className="text-xs text-airbnb-gray font-normal">Age 13+</span>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={decrementGuests}
                    disabled={guests <= 1}
                    className="w-8 h-8 rounded-full border border-airbnb-border flex items-center justify-center hover:border-black disabled:opacity-30 disabled:hover:border-airbnb-border text-lg font-normal"
                  >
                    -
                  </button>
                  <span className="text-sm font-semibold">{guests}</span>
                  <button
                    type="button"
                    onClick={incrementGuests}
                    disabled={guests >= 4}
                    className="w-8 h-8 rounded-full border border-airbnb-border flex items-center justify-center hover:border-black disabled:opacity-30 disabled:hover:border-airbnb-border text-lg font-normal"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsGuestMenuOpen(false)}
                className="w-full text-right text-xs font-semibold underline text-airbnb-ink hover:text-black"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Booking Action Button */}
      <button
        type="button"
        className="w-full bg-airbnb-rausch text-white rounded-lg py-3 font-semibold text-base hover:bg-[#E61E4D] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-airbnb-rausch"
      >
        Reserve
      </button>

      <p className="text-center text-xs text-airbnb-gray mt-3 font-normal">
        {"You won't be charged yet"}
      </p>

      {/* Fee Breakdown */}
      <div className="mt-6 space-y-3.5 text-sm text-airbnb-ink">
        <div className="flex justify-between font-normal">
          <span className="underline">
            {listing.currency}
            {pricePerNight} x {nights} nights
          </span>
          <span>
            {listing.currency}
            {baseTotal}
          </span>
        </div>
        <div className="flex justify-between font-normal">
          <span className="underline">Cleaning fee</span>
          <span>
            {listing.currency}
            {cleaningFee}
          </span>
        </div>
        <div className="flex justify-between font-normal">
          <span className="underline">Airbnb service fee</span>
          <span>
            {listing.currency}
            {serviceFee}
          </span>
        </div>

        <div className="border-t border-airbnb-border pt-4 mt-4 flex justify-between font-bold text-base">
          <span>Total before taxes</span>
          <span>
            {listing.currency}
            {grandTotal}
          </span>
        </div>
      </div>
    </div>
  );
}
