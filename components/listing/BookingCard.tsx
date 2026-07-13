"use client";

import React, { useState } from "react";
import { Listing } from "../../types/listing";
import { Icon } from "../shared/Icon";

interface BookingCardProps {
  listing: Listing;
  startDate: Date | null;
  endDate: Date | null;
  nights: number;
  guests: number;
  onGuestsChange: (guests: number) => void;
  isClaimed: boolean;
  onClaimToggle: () => void;
  baseTotal: number;
}

export function BookingCard({
  listing,
  startDate,
  endDate,
  nights,
  guests,
  onGuestsChange,
  isClaimed,
  onClaimToggle,
  baseTotal,
}: BookingCardProps) {
  const [isGuestMenuOpen, setIsGuestMenuOpen] = useState(false);

  const incrementGuests = () => onGuestsChange(guests < 3 ? guests + 1 : 3); // Max 3 guests per rules
  const decrementGuests = () => onGuestsChange(guests > 1 ? guests - 1 : 1);

  const formatDateString = (date: Date | null, placeholder: string) => {
    if (!date) return placeholder;
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const y = date.getFullYear();
    return `${m}/${d}/${y}`;
  };

  const getCancellationDateString = (date: Date | null) => {
    if (!date) return "17 October";
    const cancelDate = new Date(date);
    cancelDate.setDate(date.getDate() - 1);
    const day = cancelDate.getDate();
    const month = cancelDate.toLocaleString("en-US", { month: "long" });
    return `${day} ${month}`;
  };

  return (
    <div className="sticky top-28 select-none space-y-4 w-full">
      {/* 1. Coupon Card */}
      <div className="bg-white border border-airbnb-border rounded-2xl p-4 shadow-sm flex items-center justify-between text-sm">
        <div className="flex items-center space-x-3">
          {/* Green Tag Icon */}
          <span className="text-xl">🏷️</span>
          <div className="flex flex-col text-airbnb-ink">
            <span className="font-semibold text-xs leading-4">Get 10% off your next stay.</span>
            <button
              type="button"
              className="underline font-semibold text-[10px] text-airbnb-gray hover:text-black focus:outline-none w-fit text-left"
            >
              Terms apply.
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={onClaimToggle}
          className={`border rounded-lg py-1.5 px-3 font-semibold text-xs transition-colors focus:outline-none ${
            isClaimed
              ? "bg-[#F0FDF4] border-emerald-200 text-emerald-700"
              : "border-airbnb-border text-airbnb-ink hover:bg-airbnb-light-gray"
          }`}
        >
          {isClaimed ? "Claimed" : "Claim"}
        </button>
      </div>

      {/* 2. Reservation Card */}
      <div className="bg-white border border-airbnb-border rounded-2xl p-6 shadow-booking-card">
        {/* Total Price Header */}
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <span className="text-2xl font-bold text-airbnb-ink">
              {listing.currency}
              {baseTotal.toLocaleString("en-IN")}
            </span>
            <span className="text-airbnb-gray text-sm ml-1 font-normal">
              for {nights} night{nights > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Date & Guest Input boxes */}
        <div className="border border-airbnb-border rounded-xl mb-4 text-xs font-semibold text-airbnb-ink overflow-hidden">
          {/* CHECK-IN & CHECKOUT Columns */}
          <div className="grid grid-cols-2 border-b border-airbnb-border">
            <div className="p-3 border-r border-airbnb-border flex flex-col justify-between">
              <span className="text-[9px] uppercase font-bold text-airbnb-ink">Check-in</span>
              <span className="text-sm mt-0.5 font-normal text-airbnb-ink">
                {formatDateString(startDate, "Add date")}
              </span>
            </div>
            <div className="p-3 flex flex-col justify-between">
              <span className="text-[9px] uppercase font-bold text-airbnb-ink">Checkout</span>
              <span className="text-sm mt-0.5 font-normal text-airbnb-ink">
                {formatDateString(endDate, "Add date")}
              </span>
            </div>
          </div>

          {/* Guest Selection Input box */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsGuestMenuOpen(!isGuestMenuOpen)}
              className="w-full p-3 flex justify-between items-center text-left text-sm font-normal focus:outline-none"
              aria-expanded={isGuestMenuOpen}
              aria-label="Guest count options"
            >
              <div className="flex flex-col">
                <span className="text-[9px] uppercase font-bold text-airbnb-ink">Guests</span>
                <span className="mt-0.5 text-airbnb-ink font-normal">
                  {guests} guest{guests > 1 ? "s" : ""}
                </span>
              </div>
              <Icon name="chevron-down" className="w-4 h-4 text-airbnb-ink" />
            </button>

            {isGuestMenuOpen && (
              <div className="absolute right-0 left-0 bg-white border border-airbnb-border rounded-xl shadow-md p-4 mt-2 z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-airbnb-ink">Guests</span>
                    <span className="text-xs text-airbnb-gray font-normal">Max 3 guests</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={decrementGuests}
                      disabled={guests <= 1}
                      className="w-8 h-8 rounded-full border border-airbnb-border flex items-center justify-center hover:border-black disabled:opacity-30 disabled:hover:border-airbnb-border text-lg font-normal focus:outline-none"
                    >
                      -
                    </button>
                    <span className="text-sm font-semibold">{guests}</span>
                    <button
                      type="button"
                      onClick={incrementGuests}
                      disabled={guests >= 3}
                      className="w-8 h-8 rounded-full border border-airbnb-border flex items-center justify-center hover:border-black disabled:opacity-30 disabled:hover:border-airbnb-border text-lg font-normal focus:outline-none"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsGuestMenuOpen(false)}
                  className="w-full text-right text-xs font-semibold underline text-airbnb-ink hover:text-black focus:outline-none"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Free cancellation notice box */}
        <div className="bg-[#F7F7F7] border border-airbnb-border rounded-xl p-3 mb-4 text-center">
          <span className="text-xs font-normal text-airbnb-ink">
            Free cancellation before <span className="font-semibold">{getCancellationDateString(startDate)}</span>
          </span>
        </div>

        {/* Booking Action Button */}
        <button
          type="button"
          className="w-full bg-[#E61E4D] text-white rounded-lg py-3 font-semibold text-base hover:bg-[#D90B3C] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-airbnb-rausch"
        >
          Reserve
        </button>

        <p className="text-center text-xs text-[#717171] mt-3 font-normal">
          You won&apos;t be charged yet
        </p>
      </div>

      {/* 3. Report listing link */}
      <div className="flex items-center justify-center space-x-1 text-xs text-[#717171] hover:text-black cursor-pointer font-normal pt-2">
        {/* Flag Icon */}
        <svg viewBox="0 0 32 32" className="w-3.5 h-3.5 fill-current text-airbnb-gray" aria-hidden="true">
          <path d="M6 3v26H4V3h2zm22 4.6L12.3 2.1a1 1 0 0 0-1 .1L8 4.6V16l3.3 2.4a1 1 0 0 0 1 .1L28 13.9a1 1 0 0 0 .5-.9V8.5a1 1 0 0 0-.5-.9zM26 12l-14 3.7-4-2.9V6.2l4 2.9L26 8.3v3.7z" />
        </svg>
        <span className="underline select-text">Report this listing</span>
      </div>
    </div>
  );
}
