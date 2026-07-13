"use client";

import React, { useState } from "react";
import { Listing } from "../../types/listing";
import { formatDateMMDDYYYY, getCancellationDateString } from "../../lib/dateUtils";

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

  const incrementGuests = () => onGuestsChange(guests < 3 ? guests + 1 : 3);
  const decrementGuests = () => onGuestsChange(guests > 1 ? guests - 1 : 1);

  return (
    <div className="_MpaXTl" id="bookingSticky">
      {/* 1. Coupon Banner */}
      <div className="_kDefVU">
        <svg viewBox="0 0 24 24" fill="currentColor" className="_WGtRPa text-[#10B981]" aria-hidden="true">
          <path d="M12.586 2.586A2 2 0 0011.172 2H4a2 2 0 00-2 2v7.172c0 .53.21 1.04.586 1.414l8.586 8.586a2 2 0 002.828 0l7.172-7.172a2 2 0 000-2.828l-8.586-8.586zM7 9a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
        <div className="_uXBIIR">
          Get 10% off your next stay.<br />
          <a href="#">Terms apply</a>
        </div>
        <button
          type="button"
          onClick={onClaimToggle}
          className="_dUZzqb"
        >
          {isClaimed ? "Claimed" : "Claim"}
        </button>
      </div>

      {/* 2. Reservation Calculator */}
      <div className="_wquDFA">
        <div className="_KVzBtf">
          <span className="_ctCzOZ">
            {listing.currency}
            {baseTotal.toLocaleString("en-IN")}
          </span>
          <span className="_sHBaep">
            {nights > 0 ? `for ${nights} night${nights > 1 ? "s" : ""}` : "/ night"}
          </span>
        </div>

        <div className="_pVUQKF">
          <div className="_KWmrmZ">
            <div className="_kKMKFu">
              <div className="_LrGBOE">CHECK-IN</div>
              <div className="_QDbcjH">{formatDateMMDDYYYY(startDate, "Add date")}</div>
            </div>
            <div className="_kKMKFu">
              <div className="_LrGBOE">CHECKOUT</div>
              <div className="_QDbcjH">{formatDateMMDDYYYY(endDate, "Add date")}</div>
            </div>
          </div>

          <div
            className="_txAGtY select-none"
            onClick={() => setIsGuestMenuOpen(!isGuestMenuOpen)}
          >
            <div>
              <div className="_LrGBOE">GUESTS</div>
              <div className="_QDbcjH">
                {guests} guest{guests > 1 ? "s" : ""}
              </div>
            </div>
            <span className="_SHwZRb">
              <svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: "block", height: "100%", width: "100%", fill: "none", stroke: "currentColor", strokeWidth: 2, overflow: "visible" }}>
                <path d="M4 10l12 12 12-12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>

            {isGuestMenuOpen && (
              <div
                className="absolute right-0 left-0 bg-white border border-airbnb-border rounded-xl shadow-md p-4 mt-2 z-10 space-y-4"
                onClick={(e) => e.stopPropagation()}
              >
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

        <div className="_ICtBAS">
          Free cancellation before <b>{getCancellationDateString(startDate)}</b>
        </div>

        <button className="_yUDphb _rOppNP" type="button" id="reserveBtn">
          Reserve
        </button>

        <div className="_uNGnOu">You won&apos;t be charged yet</div>
      </div>

      {/* 3. Report Listing */}
      <div className="_uwXNpr">
        <span className="ico">
          <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: "block", height: "16px", width: "16px", fill: "currentColor" }}>
            <path d="m7.5011 1c.5272 0 .9591.40794.99725.92537l.00275.07463v1h5.5c.31265 0 .5435.281645.4935.581075l-.01275.056285-.96125 3.36264.96125 3.36265c.08055.2818-.0967.5625-.36775.62465l-.0554.00945-.0576.00325h-5.5c-.5272 0-.9591-.40795-.99725-.92535l-.00275-.07465v-1h-5v6h-1v-14zm1 3h-1v4h1z" />
          </svg>
        </span>
        <a href="#">Report this listing</a>
      </div>
    </div>
  );
}
