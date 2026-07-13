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
      <div className="w-full h-[380px] bg-[#F2F0EB] border border-airbnb-border rounded-card overflow-hidden relative shadow-sm select-none">
        {/* Map grid block background */}
        <div className="absolute inset-0 bg-[radial-gradient(#E2E0D8_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-70" />
        
        {/* Slanted Coastal Beach Water Block on Left */}
        <div 
          className="absolute top-0 bottom-0 left-0 w-[35%] bg-[#D4E6FC] border-r-2 border-dashed border-[#B8D3F5] opacity-90"
          style={{ clipPath: "polygon(0 0, 100% 0, 70% 100%, 0 100%)" }}
        />

        {/* Mock Road Lines */}
        <svg className="absolute inset-0 w-full h-full text-[#E6E3D8] stroke-current" fill="none">
          <path d="M-50,150 L1200,280" strokeWidth="6" />
          <path d="M450,-50 L350,500" strokeWidth="8" />
          <path d="M850,-50 L900,500" strokeWidth="6" />
          <path d="M-50,220 Q500,80 1000,420" strokeWidth="5" />
        </svg>

        {/* Top-Left Search Button */}
        <div className="absolute top-4 left-4 w-10 h-10 bg-white border border-airbnb-border rounded-full shadow-md flex items-center justify-center cursor-pointer text-airbnb-ink hover:bg-airbnb-light-gray transition-colors">
          <svg viewBox="0 0 32 32" className="w-4 h-4 fill-current text-airbnb-ink" aria-hidden="true">
            <path d="M29 27.58l-7.16-7.16A11.75 11.75 0 1 0 20.42 22L27.58 29.16a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 13a8 8 0 1 1 8 8 8 8 0 0 1-8-8z" />
          </svg>
        </div>

        {/* Central glowing house icon inside a black circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          {/* Subtle location highlight rings */}
          <div className="absolute w-24 h-24 bg-green-200/20 rounded-full" />
          
          {/* House icon pin */}
          <div className="relative z-10 w-14 h-14 rounded-full bg-[#222222] shadow-2xl flex items-center justify-center border-4 border-white">
            <svg viewBox="0 0 32 32" className="w-6 h-6 fill-none stroke-white" strokeWidth="2.5" aria-hidden="true">
              <path d="M16 3l12 10v14H4V13L16 3zm0 5.5l-8 7v10h16V15.5l-8-7z" />
            </svg>
          </div>
        </div>

        {/* Map Zoom Controls on Right */}
        <div className="absolute bottom-4 right-4 bg-white border border-airbnb-border rounded-lg shadow-md flex flex-col overflow-hidden font-bold select-none text-airbnb-ink text-sm">
          <button type="button" className="w-9 h-9 flex items-center justify-center hover:bg-airbnb-light-gray border-b border-airbnb-border transition-colors focus:outline-none">+</button>
          <button type="button" className="w-9 h-9 flex items-center justify-center hover:bg-airbnb-light-gray transition-colors focus:outline-none">-</button>
        </div>
      </div>
    </section>
  );
}
