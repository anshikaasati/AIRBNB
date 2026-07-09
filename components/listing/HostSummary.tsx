import React from "react";
import Image from "next/image";
import { Host } from "../../types/listing";
import { Icon } from "../shared/Icon";

interface HostSummaryProps {
  host: Host;
}

export function HostSummary({ host }: HostSummaryProps) {
  return (
    <section className="py-6 border-b border-airbnb-border flex items-center justify-between">
      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-airbnb-ink leading-7">
          Hosted by {host.name}
        </h2>
        <div className="flex items-center space-x-2 text-sm text-airbnb-gray mt-1 flex-wrap">
          {host.isSuperhost && (
            <div className="flex items-center text-airbnb-gray">
              <Icon name="superhost" className="w-3.5 h-3.5 mr-1" />
              <span>Superhost</span>
            </div>
          )}
          {host.isSuperhost && <span className="text-xs">•</span>}
          <span>{host.yearsHosting} years hosting</span>
        </div>
      </div>

      {/* Avatar Container */}
      <div className="w-[56px] h-[56px] rounded-full overflow-hidden relative border border-airbnb-border flex-shrink-0 select-none">
        <Image
          src={host.avatarSrc}
          alt={`Avatar of host ${host.name}`}
          fill
          sizes="56px"
          className="object-cover"
        />
        {host.isSuperhost && (
          <div className="absolute bottom-0 right-0 bg-airbnb-rausch text-white w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white shadow-sm">
            <Icon name="superhost" className="w-2.5 h-2.5 text-white" />
          </div>
        )}
      </div>
    </section>
  );
}
