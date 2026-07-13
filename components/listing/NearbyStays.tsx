"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "../shared/Icon";

interface Stay {
  id: string;
  title: string;
  price: number;
  rating: number;
  image: string;
}

export function NearbyStays() {
  const stays: Stay[] = [
    {
      id: "ns1",
      title: "Beautiful Studio with a view to die for",
      price: 23600,
      rating: 4.91,
      image: "/images/hero-2.jpg",
    },
    {
      id: "ns2",
      title: "NAQAB - 1bhk with private pool",
      price: 42218,
      rating: 4.95,
      image: "/images/hero-3.jpg",
    },
    {
      id: "ns3",
      title: "Greentique Luxury Flat with plunge pool, Calangute",
      price: 44506,
      rating: 4.94,
      image: "/images/hero-4.jpg",
    },
    {
      id: "ns4",
      title: "The Tropical Studio | 5 mins to Beach",
      price: 22824,
      rating: 4.96,
      image: "/images/hero-5.jpg",
    },
    {
      id: "ns5",
      title: "Luxury Casa Bella 1BHK with plunge pool, Calangute",
      price: 39942,
      rating: 4.95,
      image: "/images/hero-1.jpg",
    },
    {
      id: "ns6",
      title: "Seaside Apartment with Jacuzzi Candolim",
      price: 28499,
      rating: 4.90,
      image: "/images/living-1.jpg",
    },
    {
      id: "ns7",
      title: "Goan Heritage Villa with Private Pool",
      price: 54000,
      rating: 4.98,
      image: "/images/pool.jpg",
    },
  ];

  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 800;
      if (direction === "left") {
        sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        setCurrentPage(1);
      } else {
        sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        setCurrentPage(2);
      }
    }
  };

  return (
    <section className="py-10 border-b border-airbnb-border select-none bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl md:text-2xl font-semibold text-airbnb-ink">More stays nearby</h3>
        <div className="flex items-center space-x-3 text-sm font-semibold">
          <span className="text-airbnb-ink mr-1">{currentPage} / 2</span>
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded-full border border-airbnb-border flex items-center justify-center hover:border-black disabled:opacity-30 disabled:hover:border-airbnb-border focus:outline-none transition-colors"
            aria-label="Previous stays"
          >
            <Icon name="chevron-left" className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={currentPage === 2}
            className="w-8 h-8 rounded-full border border-airbnb-border flex items-center justify-center hover:border-black disabled:opacity-30 disabled:hover:border-airbnb-border focus:outline-none transition-colors"
            aria-label="Next stays"
          >
            <Icon name="chevron-right" className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Cards Horizontal Grid Slider */}
      <div
        ref={sliderRef}
        className="flex space-x-5 overflow-x-auto pb-4 scrollbar-hide scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {stays.map((stay) => (
          <div
            key={stay.id}
            className="w-[260px] sm:w-[280px] flex-shrink-0 snap-start flex flex-col cursor-pointer group"
          >
            {/* Image Box */}
            <div className="aspect-[4/3] w-full rounded-xl overflow-hidden relative border border-airbnb-border bg-airbnb-light-gray">
              <Image
                src={stay.image}
                alt={stay.title}
                fill
                sizes="(max-width: 768px) 260px, 280px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Mock like icon overlay */}
              <div className="absolute top-3 right-3 text-white filter drop-shadow-md hover:scale-110 transition-transform">
                <Icon name="heart-outline" className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Stay text info */}
            <div className="mt-3 flex flex-col text-airbnb-ink">
              <h4 className="font-semibold text-sm leading-5 truncate select-text">
                {stay.title}
              </h4>
              <div className="flex items-center justify-between text-sm mt-1 select-text">
                <span className="font-bold">
                  ₹{stay.price.toLocaleString("en-IN")}
                  <span className="font-normal text-airbnb-gray text-xs ml-0.5">night</span>
                </span>
                <span className="flex items-center font-semibold text-xs text-airbnb-ink">
                  <Icon name="star" className="w-3 h-3 text-airbnb-ink mr-0.5" />
                  {stay.rating.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
