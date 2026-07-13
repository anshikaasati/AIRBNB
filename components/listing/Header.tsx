import React from "react";
import { LAYOUT } from "../../lib/constants";
import { FaGlobe, FaBars } from "react-icons/fa6";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-airbnb-border h-20 flex items-center">
      <div className={`w-full ${LAYOUT.HEADER_MAX_WIDTH} mx-auto px-6 md:px-10 lg:px-20 flex items-center justify-between`}>
        {/* Logo */}
        <div className="flex items-center text-airbnb-rausch cursor-pointer select-none">
          <svg
            className="w-8 h-8 hidden md:block"
            viewBox="0 0 32 32"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M16 1c-2.008 0-3.9 1.155-4.872 3.01L3.196 19.866a4.847 4.847 0 00-.317 4.707 5.097 5.097 0 004.382 2.946h17.478a5.097 5.097 0 004.382-2.946 4.847 4.847 0 00-.317-4.707L20.872 4.01C19.9 2.155 18.008 1 16 1zm0 2.5c1.178 0 2.296.685 2.872 1.782l7.93 15.856a2.4 2.4 0 01.16 2.308 2.57 2.57 0 01-2.222 1.488H7.26a2.57 2.57 0 01-2.222-1.488 2.4 2.4 0 01.16-2.308l7.93-15.856C13.704 4.185 14.822 3.5 16 3.5z" />
          </svg>
          <span className="font-bold text-xl ml-2 tracking-tight hidden lg:block">airbnb</span>
        </div>

        {/* Mock Search Bar */}
        <div className="flex items-center border border-airbnb-border rounded-full py-2 px-4 shadow-sm hover:shadow-md cursor-pointer transition-shadow">
          <button type="button" className="text-sm font-semibold px-4 border-r border-airbnb-border text-airbnb-ink">
            Anywhere
          </button>
          <button type="button" className="text-sm font-semibold px-4 border-r border-airbnb-border text-airbnb-ink">
            Anytime
          </button>
          <button type="button" className="text-sm font-medium px-4 text-airbnb-gray">
            Add guests
          </button>
          <div className="w-8 h-8 rounded-full bg-airbnb-rausch text-white flex items-center justify-center ml-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* User Navigation menu */}
        <div className="flex items-center space-x-3">
          <button
            type="button"
            className="text-sm font-semibold py-2 px-4 rounded-full hover:bg-airbnb-light-gray text-airbnb-ink transition-colors"
          >
            Become a host
          </button>
          <button
            type="button"
            className="p-3 rounded-full hover:bg-airbnb-light-gray text-airbnb-ink transition-colors"
            aria-label="Choose language"
          >
            <FaGlobe className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="flex items-center border border-airbnb-border rounded-full p-1.5 pl-3.5 space-x-3 hover:shadow-md transition-shadow bg-white"
            aria-label="User menu"
          >
            <FaBars className="w-4 h-4 text-airbnb-ink" />
            <div className="w-[30px] h-[30px] rounded-full bg-[#717171] text-white flex items-center justify-center relative overflow-hidden">
              <svg viewBox="0 0 32 32" className="w-full h-full fill-current" aria-hidden="true">
                <path d="M16 8a5 5 0 100 10 5 5 0 000-10zm-9 16.5a9 9 0 0118 0z" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
