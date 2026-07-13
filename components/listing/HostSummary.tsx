import React from "react";
import Image from "next/image";
import { Host } from "../../types/listing";

interface HostSummaryProps {
  host: Host;
}

export function HostSummary({ host }: HostSummaryProps) {
  return (
    <section className="py-6 border-b border-airbnb-border flex items-center space-x-3.5 bg-white select-none">
      {/* Avatar Container on Left */}
      <div className="w-10 h-10 rounded-full relative flex-shrink-0 select-none">
        <div className="w-full h-full rounded-full overflow-hidden border border-airbnb-border relative">
          <Image
            src={host.avatarSrc}
            alt={`Avatar of host ${host.name}`}
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
        {/* Verified Shield Badge Overlay */}
        <div className="absolute -bottom-0.5 -right-0.5 bg-[#E61E4D] text-white w-[14px] h-[14px] rounded-full flex items-center justify-center border-2 border-white shadow-sm">
          <svg viewBox="0 0 16 16" className="w-2 h-2 fill-current text-white" aria-hidden="true">
            <path d="M14.3 2.3L6.8 9.8 4.7 7.7a1 1 0 0 0-1.4 1.4l2.8 2.8a1 1 0 0 0 1.4 0l8.2-8.2a1 1 0 0 0-1.4-1.4z" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col">
        <h2 className="text-[15px] font-semibold text-airbnb-ink leading-5">
          Hosted by {host.name}
        </h2>
        <span className="text-xs font-normal text-airbnb-gray mt-0.5 leading-none">
          {host.yearsHosting} years hosting
        </span>
      </div>
    </section>
  );
}
