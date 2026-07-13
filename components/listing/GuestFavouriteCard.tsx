"use client";

import React from "react";
import { Icon } from "../shared/Icon";

export function GuestFavouriteCard() {
  return (
    <div className="border border-airbnb-border rounded-xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between text-airbnb-ink select-none bg-white w-full">
      {/* Left Laurel & Badge */}
      <div className="flex items-center space-x-3 w-full md:w-auto justify-center md:justify-start">
        {/* Laurel Wreath Icon */}
        <div className="flex items-center space-x-2">
          <svg viewBox="0 0 17 32" className="w-[17px] h-[32px] fill-current text-airbnb-ink" aria-hidden="true">
            <path d="M12.242 2a1 1 0 0 1 .993.883L13.25 3v1.836A9.99 9.99 0 0 1 16.5 12a10.01 10.01 0 0 1-5.5 8.948v1.393a5 5 0 0 1 2.302 4.095l.044.378.004.186a1 1 0 0 1-1.993.117l-.007-.117a3 3 0 0 0-2.824-2.995l-.176-.005H8a1 1 0 0 1-.993-.883L7 24V11a1 1 0 0 1 .883-.993L8 10h.25a7.99 7.99 0 0 0 4.25-6.93V3a1 1 0 0 1 1-1zm-6.5 4a1 1 0 0 1 .993.883L6.75 7v1.836A9.99 9.99 0 0 1 10 16a10.01 10.01 0 0 1-5.5 8.948v1.393a5 5 0 0 1 2.302 4.095l.044.378.004.186A1 1 0 0 1 4.857 31l-.007-.117a3 3 0 0 0-2.824-2.995L1.85 27.883H1.5a1 1 0 0 1-.993-.883L.5 27V15a1 1 0 0 1 .883-.993L1.5 14h.25a7.99 7.99 0 0 0 4.25-6.93V7a1 1 0 0 1 1-1z" />
          </svg>
          <div className="flex flex-col text-center">
            <span className="text-[20px] font-extrabold tracking-tight leading-5 text-airbnb-ink">Guest</span>
            <span className="text-[20px] font-extrabold tracking-tight leading-5 mt-0.5 text-airbnb-ink">favourite</span>
          </div>
          <svg viewBox="0 0 17 32" className="w-[17px] h-[32px] fill-current text-airbnb-ink scale-x-[-1]" aria-hidden="true">
            <path d="M12.242 2a1 1 0 0 1 .993.883L13.25 3v1.836A9.99 9.99 0 0 1 16.5 12a10.01 10.01 0 0 1-5.5 8.948v1.393a5 5 0 0 1 2.302 4.095l.044.378.004.186a1 1 0 0 1-1.993.117l-.007-.117a3 3 0 0 0-2.824-2.995l-.176-.005H8a1 1 0 0 1-.993-.883L7 24V11a1 1 0 0 1 .883-.993L8 10h.25a7.99 7.99 0 0 0 4.25-6.93V3a1 1 0 0 1 1-1zm-6.5 4a1 1 0 0 1 .993.883L6.75 7v1.836A9.99 9.99 0 0 1 10 16a10.01 10.01 0 0 1-5.5 8.948v1.393a5 5 0 0 1 2.302 4.095l.044.378.004.186A1 1 0 0 1 4.857 31l-.007-.117a3 3 0 0 0-2.824-2.995L1.85 27.883H1.5a1 1 0 0 1-.993-.883L.5 27V15a1 1 0 0 1 .883-.993L1.5 14h.25a7.99 7.99 0 0 0 4.25-6.93V7a1 1 0 0 1 1-1z" />
          </svg>
        </div>
      </div>

      {/* Vertical Divider 1 */}
      <div className="hidden md:block w-[1px] h-10 bg-airbnb-border mx-6" />

      {/* Middle Description */}
      <div className="text-center md:text-left text-sm font-normal text-airbnb-ink max-w-xs py-3 md:py-0 leading-5">
        One of the most loved homes on Airbnb, according to guests
      </div>

      {/* Vertical Divider 2 */}
      <div className="hidden md:block w-[1px] h-10 bg-airbnb-border mx-6" />

      {/* Rating & Stars */}
      <div className="flex flex-col items-center w-full md:w-auto justify-center py-2 md:py-0">
        <span className="text-[22px] font-bold leading-none tracking-tight">4.95</span>
        <div className="flex items-center space-x-0.5 mt-1">
          {[...Array(5)].map((_, i) => (
            <Icon key={i} name="star" className="w-3.5 h-3.5 text-airbnb-ink" />
          ))}
        </div>
      </div>

      {/* Vertical Divider 3 */}
      <div className="hidden md:block w-[1px] h-10 bg-airbnb-border mx-6" />

      {/* Review Count */}
      <div className="flex flex-col items-center w-full md:w-auto justify-center">
        <span className="text-[22px] font-bold leading-none tracking-tight">19</span>
        <span className="text-xs font-bold underline mt-1.5 tracking-wide uppercase">Reviews</span>
      </div>
    </div>
  );
}
