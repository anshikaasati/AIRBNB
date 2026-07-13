"use client";

import React from "react";
import { calculateNights, formatDateLabel } from "../../lib/dateUtils";



interface CalendarPickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onChangeRange: (start: Date | null, end: Date | null) => void;
  locationName: string;
}

export function CalendarPicker({
  startDate,
  endDate,
  onChangeRange,
  locationName,
}: CalendarPickerProps) {
  // We statically construct grids for October and November 2026
  const oct2026StartDay = 4; // Thursday (0=Sun, 1=Mon, ..., 4=Thu)
  const oct2026Days = 31;
  const nov2026StartDay = 0; // Sunday
  const nov2026Days = 30;

  const getDaysArray = (startDay: number, numDays: number, monthIndex: number) => {
    const days: (Date | null)[] = Array(startDay).fill(null);
    for (let d = 1; d <= numDays; d++) {
      days.push(new Date(2026, monthIndex, d));
    }
    return days;
  };

  const octDays = getDaysArray(oct2026StartDay, oct2026Days, 9); // October is month 9 (0-indexed)
  const novDays = getDaysArray(nov2026StartDay, nov2026Days, 10); // November is month 10

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      onChangeRange(date, null);
    } else if (startDate && !endDate) {
      if (date < startDate) {
        onChangeRange(date, null);
      } else {
        onChangeRange(startDate, date);
      }
    }
  };

  const isSelected = (date: Date | null) => {
    if (!date) return false;
    return (
      (startDate && date.getTime() === startDate.getTime()) ||
      (endDate && date.getTime() === endDate.getTime())
    );
  };

  const isInRange = (date: Date | null) => {
    if (!date || !startDate || !endDate) return false;
    return date > startDate && date < endDate;
  };

  const nights = calculateNights(startDate, endDate);

  const renderMonthGrid = (days: (Date | null)[], monthName: string) => {
    const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
    return (
      <div className="flex-1 min-w-[280px]">
        <h4 className="font-semibold text-sm text-center text-airbnb-ink mb-4">{monthName}</h4>
        {/* Weekdays */}
        <div className="grid grid-cols-7 gap-y-2 text-center text-[10px] font-bold text-airbnb-gray uppercase tracking-wider mb-2">
          {weekdays.map((w, idx) => (
            <span key={`${w}-${idx}`}>{w}</span>
          ))}
        </div>
        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-y-1 text-center font-semibold text-sm">
          {days.map((date, idx) => {
            if (!date) return <div key={`empty-${idx}`} className="h-9 w-9" />;

            const selected = isSelected(date);
            const inRange = isInRange(date);

            let dayClasses = "h-9 w-9 flex items-center justify-center rounded-full cursor-pointer transition-all hover:border hover:border-black ";
            if (selected) {
              dayClasses += "bg-airbnb-ink text-white hover:bg-black hover:border-transparent";
            } else if (inRange) {
              dayClasses += "bg-airbnb-light-gray text-airbnb-ink rounded-none";
            } else {
              dayClasses += "text-airbnb-ink";
            }

            return (
              <button
                key={date.toISOString()}
                type="button"
                onClick={() => handleDateClick(date)}
                className={dayClasses}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section className="py-8 border-b border-airbnb-border">
      {/* Title */}
      <h3 className="text-lg md:text-xl font-semibold text-airbnb-ink leading-6 mb-1">
        {nights > 0 ? `${nights} nights in ${locationName}` : `Select dates in ${locationName}`}
      </h3>
      <p className="text-xs text-airbnb-gray font-normal mb-6">
        {startDate && endDate
          ? `${formatDateLabel(startDate)} - ${formatDateLabel(endDate)}`
          : "Add your travel dates for exact pricing"}
      </p>

      {/* Dual Month Calendar View */}
      <div className="relative">
        {/* Navigation Arrows */}
        <div className="absolute top-0 left-0 right-0 flex justify-between pointer-events-none px-2 z-10">
          <button
            type="button"
            className="pointer-events-auto p-2 hover:bg-airbnb-light-gray rounded-full transition-colors focus:outline-none flex items-center justify-center"
            aria-label="Previous month"
          >
            <svg viewBox="0 0 32 32" className="w-3 h-3 stroke-current text-airbnb-ink fill-none" strokeWidth="3" aria-hidden="true">
              <path d="M20 28L8 16 20 4" />
            </svg>
          </button>
          <button
            type="button"
            className="pointer-events-auto p-2 hover:bg-airbnb-light-gray rounded-full transition-colors focus:outline-none flex items-center justify-center"
            aria-label="Next month"
          >
            <svg viewBox="0 0 32 32" className="w-3 h-3 stroke-current text-airbnb-ink fill-none" strokeWidth="3" aria-hidden="true">
              <path d="M12 4l12 12-12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-12 select-none">
          {renderMonthGrid(octDays, "October 2026")}
          {renderMonthGrid(novDays, "November 2026")}
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div className="flex justify-between items-center mt-4 px-1 select-none">
        {/* Keyboard Shortcuts Button */}
        <button
          type="button"
          className="p-2.5 hover:bg-airbnb-light-gray rounded-full transition-colors focus:outline-none flex items-center justify-center border border-transparent active:scale-95"
          aria-label="Keyboard shortcuts"
        >
          <svg viewBox="0 0 32 32" className="w-[18px] h-[18px] stroke-current text-airbnb-ink fill-none" strokeWidth="2.5" aria-hidden="true">
            <rect x="3" y="6" width="26" height="20" rx="3" />
            <path d="M7 11h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zm4 0h2v2h-2zm4 0h2v2h-2zM7 15h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zm4 0h2v2h-2zm4 0h2v2h-2zM9 19h14v2H9z" />
          </svg>
        </button>

        {/* Clear dates link */}
        <button
          type="button"
          onClick={() => onChangeRange(null, null)}
          className="text-xs font-semibold underline text-airbnb-ink hover:text-black focus:outline-none"
        >
          Clear dates
        </button>
      </div>
    </section>
  );
}
