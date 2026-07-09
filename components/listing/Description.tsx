"use client";

import React, { useState } from "react";
import { Icon } from "../shared/Icon";

interface DescriptionProps {
  description: string;
}

export function Description({ description }: DescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);


  const shouldTruncate = description.length > 250;
  const displayText = shouldTruncate && !isExpanded 
    ? `${description.slice(0, 250)}...` 
    : description;

  return (
    <section className="py-6 border-b border-airbnb-border">
      <div className="text-airbnb-ink leading-6 text-base space-y-4">
        {displayText.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>

      {shouldTruncate && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-1.5 mt-4 font-semibold text-sm underline hover:text-black transition-colors focus:outline-none"
        >
          <span>{isExpanded ? "Show less" : "Show more"}</span>
          <Icon 
            name="chevron-down" 
            className={`w-3 h-3 text-airbnb-ink transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} 
          />
        </button>
      )}
    </section>
  );
}
