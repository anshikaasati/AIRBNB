"use client";

import React from "react";

export function FeaturesSection() {
  return (
    <section className="py-6 border-b border-airbnb-border space-y-6 select-none bg-white">
      {/* Feature 1: Outdoor entertainment */}
      <div className="flex items-start space-x-4">
        {/* Pool / Outdoor entertainment Icon */}
        <div className="mt-1 flex-shrink-0">
          <svg viewBox="0 0 32 32" className="w-6 h-6 fill-current text-airbnb-ink" aria-hidden="true">
            <path d="M12 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm15 15a1 1 0 0 0-1-1h-6.2l-2.6-4.5A3 3 0 0 0 14.6 10H7a1 1 0 0 0 0 2h7.6a1 1 0 0 1 .9.5l2.8 4.8-2 3.4-3.6-1.8A3 3 0 0 0 9.3 19H3a1 1 0 0 0 0 2h6.3a1 1 0 0 1 .9.5l3.8 1.9a1 1 0 0 0 1-.1l3.5-6H26a1 1 0 0 0 1-1z" />
          </svg>
        </div>
        <div className="flex flex-col text-airbnb-ink">
          <span className="font-semibold text-base leading-5">Outdoor entertainment</span>
          <span className="text-sm font-normal text-airbnb-gray mt-0.5 leading-4">
            The pool and alfresco dining are great for summer trips.
          </span>
        </div>
      </div>

      {/* Feature 2: Designed for staying cool */}
      <div className="flex items-start space-x-4">
        {/* Designed for staying cool Icon */}
        <div className="mt-1 flex-shrink-0">
          <svg viewBox="0 0 32 32" className="w-6 h-6 fill-current text-airbnb-ink" aria-hidden="true">
            <path d="M16 2a14 14 0 1 0 0 28 14 14 0 0 0 0-28zm0 2c3.1 0 5.9 1 8.2 2.8l-1.4 1.4A12 12 0 0 1 16 6a1 1 0 1 0 0-2zm10.2 6.8a12 12 0 0 1 1.8 8.2 1 1 0 0 0 2 0 14 14 0 0 0-2.8-8.2l-1 1zM6 16c0-5.5 4.5-10 10-10a1 1 0 1 0 0-2 12 12 0 0 0-12 12c0 1.2.2 2.3.5 3.4l1.9-1c-.2-.8-.4-1.6-.4-2.4zm10 10c-5.5 0-10-4.5-10-10a1 1 0 0 0-2 0c0 6.6 5.4 12 12 12 .8 0 1.6-.1 2.4-.4l-1-1.9c-.8.2-1.6.3-2.4.3zm8.2-2.8A12 12 0 0 1 16 26a1 1 0 1 0 0 2 14 14 0 0 0 8.2-2.8l-1-1.4z" />
          </svg>
        </div>
        <div className="flex flex-col text-airbnb-ink">
          <span className="font-semibold text-base leading-5">Designed for staying cool</span>
          <span className="text-sm font-normal text-airbnb-gray mt-0.5 leading-4">
            Beat the heat with the A/C and ceiling fan.
          </span>
        </div>
      </div>

      {/* Feature 3: Self check-in */}
      <div className="flex items-start space-x-4">
        {/* Self check-in Icon */}
        <div className="mt-1 flex-shrink-0">
          <svg viewBox="0 0 32 32" className="w-6 h-6 fill-current text-airbnb-ink" aria-hidden="true">
            <path d="M26 24V6a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v18H4a1 1 0 0 0 0 2h24a1 1 0 0 0 0-2h-2zm-2 0H8V6c0-.6.4-1 1-1h14c.6 0 1 .4 1 1v18zM19 14a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
          </svg>
        </div>
        <div className="flex flex-col text-airbnb-ink">
          <span className="font-semibold text-base leading-5">Self check-in</span>
          <span className="text-sm font-normal text-airbnb-gray mt-0.5 leading-4">
            You can check in with the building staff.
          </span>
        </div>
      </div>

      {/* Translation Notice Banner */}
      <div className="bg-airbnb-light-gray rounded-xl p-4 flex items-center space-x-3 text-sm font-normal text-airbnb-ink border border-neutral-100 mt-6 select-text">
        <span className="text-lg">🌐</span>
        <p>
          Some info has been automatically translated.{" "}
          <button type="button" className="underline font-semibold hover:text-black focus:outline-none ml-1">
            Show original
          </button>
        </p>
      </div>
    </section>
  );
}
