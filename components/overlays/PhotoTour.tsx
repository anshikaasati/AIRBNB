"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Listing, Photo } from "../../types/listing";
import { useOverlay } from "../../context/OverlayContext";
import { Icon } from "../shared/Icon";

interface PhotoTourProps {
  listing: Listing;
  isOpen: boolean;
  onClose: () => void;
}

export function PhotoTour({ listing, isOpen, onClose }: PhotoTourProps) {
  const { state, openOverlay } = useOverlay();
  const [activeCategory, setActiveCategory] = useState("");
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Group photos by their category
  const categoriesList = [
    { name: "Living room 1", desc: "Sofa • Air conditioning • Ceiling fan • TV" },
    { name: "Living room 2", desc: "Ceiling fan • Hot tub" },
    { name: "Full kitchen", desc: "Freezer • Fridge • Blender • Cooker • Cooking basics • Kettle • Microwave • Toaster • Wine glasses • Coffee • Crockery and cutlery" },
    { name: "Bedroom", desc: "Double bed • Air conditioning • Bed linen • Ceiling fan • Clothes storage • Cot • Hangers • Iron • Room-darkening blinds • Cleaning available during stay • Cleaning products • Long-term stays allowed • Private entrance • Wifi" },
    { name: "Full bathroom", desc: "Hairdryer • Hot water • Shampoo • Shower gel" },
    { name: "Gym", desc: "Air conditioning • Gym • Exercise equipment • Ceiling fan" },
    { name: "Exterior", desc: "" },
    { name: "Pool", desc: "Pool" },
    { name: "Additional photos", desc: "" },
  ];

  // Map category names to their respective list of photos
  const getCategoryPhotos = (catName: string): Photo[] => {
    if (catName === "Additional photos") {
      // Return photos that don't match any other category or are explicitly "Additional photos"
      const designatedCats = categoriesList.map((c) => c.name).filter((n) => n !== "Additional photos");
      return listing.photos.filter((p) => !p.category || !designatedCats.includes(p.category) || p.category === "Additional photos");
    }
    return listing.photos.filter((p) => p.category === catName);
  };

  // Find the first photo of a category to display in the thumbnail navbar
  const getCategoryThumbnail = (catName: string): string => {
    const catPhotos = getCategoryPhotos(catName);
    return catPhotos.length > 0 ? catPhotos[0].src : listing.photos[0].src;
  };

  // Find the global index of a photo in the listing.photos array
  const getGlobalPhotoIndex = (photoId: string): number => {
    return listing.photos.findIndex((p) => p.id === photoId);
  };

  // Scroll smoothly to a category section
  const scrollToCategory = (catName: string) => {
    const targetSection = sectionRefs.current[catName];
    const scrollContainer = contentContainerRef.current;
    if (targetSection && scrollContainer) {
      // Offset by the height of the sticky header and categories navbar (approx 180px)
      const offsetTop = targetSection.offsetTop - 180;
      scrollContainer.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setActiveCategory(catName);
    }
  };

  // Set up scroll sync listener inside the modal's scroll container
  useEffect(() => {
    const scrollContainer = contentContainerRef.current;
    if (!isOpen || !scrollContainer) return;

    const validCategories = categoriesList.filter((cat) => getCategoryPhotos(cat.name).length > 0);

    // Sync initial scroll position to clicked hero grid image
    const activePhoto = listing.photos[state.activePhotoIndex];
    const initialCategory = activePhoto?.category || "";
    
    let defaultCategory = validCategories.length > 0 ? validCategories[0].name : "";
    if (initialCategory && validCategories.some((c) => c.name === initialCategory)) {
      defaultCategory = initialCategory;
    }

    if (defaultCategory) {
      setActiveCategory(defaultCategory);
      if (state.activePhotoIndex > 0) {
        setTimeout(() => {
          const targetSection = sectionRefs.current[defaultCategory];
          if (targetSection && scrollContainer) {
            const offsetTop = targetSection.offsetTop - 180;
            scrollContainer.scrollTo({
              top: offsetTop,
              behavior: "auto", // Instant scroll on mount for seamless transition
            });
          }
        }, 50);
      } else {
        scrollContainer.scrollTo({ top: 0 });
      }
    }

    const handleScroll = () => {
      let currentActive = "";
      const scrollPosition = scrollContainer.scrollTop + 220;

      for (const cat of validCategories) {
        const section = sectionRefs.current[cat.name];
        if (section) {
          if (scrollPosition >= section.offsetTop) {
            currentActive = cat.name;
          }
        }
      }

      if (currentActive && currentActive !== activeCategory) {
        setActiveCategory(currentActive);
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <div className="w-full h-full flex flex-col bg-white text-airbnb-ink select-none">
      {/* Sticky Photo Tour Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-airbnb-border h-16 flex items-center justify-between px-6 flex-shrink-0">
        <button
          type="button"
          onClick={onClose}
          className="p-3 -ml-3 rounded-full hover:bg-airbnb-light-gray text-airbnb-ink transition-colors focus:outline-none focus:ring-2 focus:ring-airbnb-ink"
          aria-label="Back to listing page"
        >
          <Icon name="chevron-left" className="w-4 h-4" />
        </button>
        <span className="font-semibold text-sm">Photo tour</span>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="flex items-center space-x-2 text-sm font-semibold p-2.5 rounded-lg hover:bg-airbnb-light-gray transition-colors"
          >
            <Icon name="share" className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="flex items-center space-x-2 text-sm font-semibold p-2.5 rounded-lg hover:bg-airbnb-light-gray transition-colors"
          >
            <Icon name="heart-outline" className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Horizontal Category Navigation Bar */}
      <nav className="sticky top-16 z-20 bg-white border-b border-airbnb-border overflow-x-auto flex space-x-5 px-10 py-3 flex-shrink-0 scrollbar-hide">
        {categoriesList
          .filter((cat) => getCategoryPhotos(cat.name).length > 0)
          .map((cat) => {
            const isActive = cat.name === activeCategory;
            return (
              <button
                key={cat.name}
                type="button"
                onClick={() => scrollToCategory(cat.name)}
                className={`flex flex-col items-center flex-shrink-0 space-y-1.5 focus:outline-none border-b-2 py-1.5 transition-all duration-200 ${
                  isActive
                    ? "border-airbnb-ink font-semibold"
                    : "border-transparent text-airbnb-gray hover:text-black"
                }`}
              >
                <div className="w-10 h-10 rounded-md overflow-hidden relative border border-airbnb-border">
                  <Image
                    src={getCategoryThumbnail(cat.name)}
                    alt=""
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <span className="text-[11px] tracking-tight">{cat.name}</span>
              </button>
            );
          })}
      </nav>

      {/* Main Scrollable Content */}
      <div
        ref={contentContainerRef}
        className="flex-1 overflow-y-auto bg-white px-6 md:px-10"
      >
        <div className="max-w-[1080px] mx-auto divide-y divide-airbnb-border">
          {categoriesList
            .filter((cat) => getCategoryPhotos(cat.name).length > 0)
            .map((cat) => {
              const catPhotos = getCategoryPhotos(cat.name);
              return (
                <div
                  key={cat.name}
                  ref={(el) => {
                    sectionRefs.current[cat.name] = el;
                  }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-10 relative"
                >
                  {/* Category description - left column */}
                  <div className="lg:col-span-4 lg:sticky lg:top-48 h-fit space-y-2 select-text">
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-airbnb-ink">
                      {cat.name}
                    </h2>
                    {cat.desc && (
                      <p className="text-sm font-normal text-airbnb-gray leading-5">
                        {cat.desc}
                      </p>
                    )}
                  </div>

                  {/* Photos - right column */}
                  <div className="lg:col-span-8 space-y-4">
                    {catPhotos.map((photo) => {
                      const globalIndex = getGlobalPhotoIndex(photo.id);
                      return (
                        <button
                          key={photo.id}
                          type="button"
                          onClick={() => openOverlay("lightbox", globalIndex, "photoTour")}
                          className="w-full relative rounded-card overflow-hidden group text-left focus:outline-none"
                        >
                          <div className="relative aspect-video w-full overflow-hidden transition-transform duration-[450ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.02]">
                            <Image
                              src={photo.src}
                              alt={photo.alt}
                              fill
                              sizes="(max-width: 1024px) 100vw, 700px"
                              className="object-cover"
                            />
                            {/* Overlay hover darkener */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-[450ms]" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
