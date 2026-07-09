import React from "react";
import { Listing } from "../../types/listing";

interface LocationMapProps {
  listing: Listing;
}

export function LocationMap({ listing }: LocationMapProps) {
  return (
    <section className="py-8 border-b border-airbnb-border">
      <h3 className="text-lg md:text-xl font-semibold text-airbnb-ink leading-6 mb-2">
        {"Where you'll be"}
      </h3>
      <p className="text-sm font-normal text-airbnb-ink mb-6 select-text">
        {listing.address}
      </p>

      {/* Styled Vector Map Mockup */}
      <div className="w-full h-[380px] bg-[#E5E9F0] border border-airbnb-border rounded-card overflow-hidden relative shadow-sm select-none">
        {/* Map grid patterns & lines representing roads/blocks */}
        <div className="absolute inset-0 bg-[radial-gradient(#C8CED9_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-60" />
        
        {/* Mock Road Lines */}
        <svg className="absolute inset-0 w-full h-full text-[#CCD2DE] stroke-current stroke-2" fill="none">
          <path d="M-50,200 L1200,200" strokeWidth="12" />
          <path d="M300,-50 L300,500" strokeWidth="8" />
          <path d="M700,-50 L700,500" strokeWidth="8" />
          <path d="M-50,100 Q400,100 800,450" strokeWidth="6" />
        </svg>

        {/* Central Glowing Location Marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          {/* Ripple animation rings */}
          <div className="absolute w-20 h-20 bg-airbnb-rausch/20 rounded-full animate-ping" />
          <div className="absolute w-12 h-12 bg-airbnb-rausch/30 rounded-full" />
          
          {/* Main Pin */}
          <div className="relative z-10 w-10 h-10 rounded-full bg-airbnb-rausch shadow-md flex items-center justify-center border-2 border-white">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
              <path d="M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2ZM12,11.5A2.5,2.5 0 1,1 14.5,9A2.5,2.5 0 0,1 12,11.5Z" />
            </svg>
          </div>
        </div>

        {/* Map Overlay Controls */}
        <div className="absolute bottom-4 left-4 bg-white border border-airbnb-border rounded-lg shadow-sm flex flex-col overflow-hidden font-bold">
          <button type="button" className="w-8 h-8 flex items-center justify-center hover:bg-airbnb-light-gray border-b border-airbnb-border text-sm">+</button>
          <button type="button" className="w-8 h-8 flex items-center justify-center hover:bg-airbnb-light-gray text-sm">-</button>
        </div>
      </div>
    </section>
  );
}
