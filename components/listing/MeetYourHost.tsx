"use client";

import React from "react";
import Image from "next/image";

export function MeetYourHost() {
  const coHosts = [
    { name: "Sharath", avatar: "/images/rev-1.jpg" },
    { name: "Simran", avatar: "/images/rev-3.jpg" },
    { name: "Shruti", initials: "S", bg: "bg-pink-100 text-pink-700" },
    { name: "Aman Dev Pahwa", avatar: "/images/rev-2.jpg" },
    { name: "Pallavi", avatar: "/images/rev-6.jpg" },
    { name: "Amisha", initials: "A", bg: "bg-blue-100 text-blue-700" },
    { name: "Maria Karen Priyanka", avatar: "/images/rev-5.jpg" },
    { name: "Sanyukta", avatar: "/images/rev-4.jpg" }
  ];

  return (
    <section className="py-10 border-b border-airbnb-border select-none bg-white w-full">
      <h3 className="text-xl md:text-2xl font-semibold text-airbnb-ink mb-6">Meet your host</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Side: Host Card + Bio details */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-[#F7F7F7] border border-airbnb-border rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-stretch gap-8 shadow-sm">
            {/* Host Profile Info Card */}
            <div className="bg-white border border-airbnb-border rounded-2xl p-6 flex flex-col items-center justify-center text-center w-full md:w-64 shadow-sm flex-shrink-0">
              <div className="w-[88px] h-[88px] rounded-full relative mb-3">
                <div className="w-full h-full rounded-full overflow-hidden border border-airbnb-border relative">
                  <Image
                    src="/images/host-avatar.jpg"
                    alt="Host Profile"
                    fill
                    sizes="88px"
                    className="object-cover"
                  />
                </div>
                {/* Verified Shield Badge Overlay */}
                <div className="absolute bottom-0 right-0 bg-[#E61E4D] text-white w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-current text-white" aria-hidden="true">
                    <path d="M14.3 2.3L6.8 9.8 4.7 7.7a1 1 0 0 0-1.4 1.4l2.8 2.8a1 1 0 0 0 1.4 0l8.2-8.2a1 1 0 0 0-1.4-1.4z" />
                  </svg>
                </div>
              </div>
              <h4 className="text-[22px] font-bold text-airbnb-ink leading-7">Mirashya Homes</h4>
              <span className="text-xs font-semibold text-airbnb-gray mt-0.5">Host</span>

              {/* Mini-Stats Grid */}
              <div className="w-full border-t border-airbnb-border mt-4 pt-4 grid grid-cols-3 gap-2 text-left">
                <div className="flex flex-col">
                  <span className="text-[17px] font-bold leading-5">1,463</span>
                  <span className="text-[9px] font-bold uppercase text-airbnb-gray mt-0.5">Reviews</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[17px] font-bold leading-5">4.68★</span>
                  <span className="text-[9px] font-bold uppercase text-airbnb-gray mt-0.5">Rating</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[17px] font-bold leading-5">2</span>
                  <span className="text-[9px] font-bold uppercase text-airbnb-gray mt-0.5">Years</span>
                </div>
              </div>
            </div>

            {/* Co-Hosts List & Details */}
            <div className="flex-1 flex flex-col justify-between space-y-6">
              <div>
                <h5 className="font-semibold text-[15px] mb-3">Co-Hosts</h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {coHosts.map((coHost, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden relative flex-shrink-0 border border-airbnb-border">
                        {coHost.avatar ? (
                          <Image
                            src={coHost.avatar}
                            alt={coHost.name}
                            fill
                            sizes="32px"
                            className="object-cover"
                          />
                        ) : (
                          <div className={`w-full h-full flex items-center justify-center font-bold text-xs ${coHost.bg}`}>
                            {coHost.initials}
                          </div>
                        )}
                      </div>
                      <span className="text-xs font-medium truncate max-w-[90px]">{coHost.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Host details */}
              <div className="space-y-3">
                <h5 className="font-bold text-[15px]">Host details</h5>
                <div className="text-sm font-normal text-airbnb-ink space-y-1">
                  <p>Response rate: <span className="font-semibold">100%</span></p>
                  <p>Responds <span className="font-semibold">within an hour</span></p>
                </div>
                <button
                  type="button"
                  className="bg-airbnb-ink text-white rounded-lg py-3 px-6 font-semibold text-sm hover:bg-black transition-colors focus:outline-none w-fit"
                >
                  Message host
                </button>
              </div>
            </div>
          </div>

          {/* Message disclaimer */}
          <div className="flex items-start space-x-3 text-xs text-airbnb-gray font-normal leading-4 py-1">
            <svg viewBox="0 0 32 32" className="w-5 h-5 fill-current text-airbnb-gray flex-shrink-0 mt-0.5" aria-hidden="true">
              <path d="M16 2a14 14 0 1 0 0 28 14 14 0 0 0 0-28zm0 2.5a11.5 11.5 0 1 1 0 23 11.5 11.5 0 0 1 0-23zm1 6.5h-2v2h2V11zm0 4h-2v6h2v-6z" />
            </svg>
            <p className="select-text">
              To help protect your payment, always use Airbnb to send money and communicate with hosts.
            </p>
          </div>
        </div>

        {/* Right Side: Biographic Bullet points */}
        <div className="lg:col-span-4 flex flex-col justify-start space-y-4 pt-4 lg:pt-8 select-text">
          <div className="flex items-center space-x-3 text-sm text-airbnb-ink font-normal">
            <span className="text-lg">🎈</span>
            <span>Born in the 80s</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-airbnb-ink font-normal">
            <span className="text-lg">🎓</span>
            <span>Where I went to school: NICMAR GOA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
