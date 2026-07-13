"use client";

import React, { useState, useEffect, useRef } from "react";
import listingData from "../data/listing.json";
import { Listing } from "../types/listing";
import { Header } from "../components/listing/Header";
import { ListingHeading } from "../components/listing/ListingHeading";
import { PhotoGrid } from "../components/listing/PhotoGrid";
import { HostSummary } from "../components/listing/HostSummary";
import { GuestFavouriteCard } from "../components/listing/GuestFavouriteCard";
import { FeaturesSection } from "../components/listing/FeaturesSection";
import { Description } from "../components/listing/Description";
import { AmenitiesList } from "../components/listing/AmenitiesList";
import { BookingCard } from "../components/listing/BookingCard";
import { ReviewsSection } from "../components/listing/ReviewsSection";
import { MeetYourHost } from "../components/listing/MeetYourHost";
import { LocationMap } from "../components/listing/LocationMap";
import { NearbyStays } from "../components/listing/NearbyStays";
import { Footer } from "../components/listing/Footer";
import { SubHeader } from "../components/listing/SubHeader";
import { CalendarPicker } from "../components/listing/CalendarPicker";
import { OverlayShell } from "../components/overlays/OverlayShell";
import { PhotoTour } from "../components/overlays/PhotoTour";
import { Lightbox } from "../components/overlays/Lightbox";
import { useOverlay } from "../context/OverlayContext";
import { calculateNights } from "../lib/dateUtils";

export default function Home() {
  const listing = listingData as Listing;
  const { state, closeOverlay } = useOverlay();

  // Booking states synced across calendar and booking card
  // Initialize with October 18, 2026 to October 23, 2026 (5 nights) matching the recording
  const [startDate, setStartDate] = useState<Date | null>(new Date(2026, 9, 18));
  const [endDate, setEndDate] = useState<Date | null>(new Date(2026, 9, 23));
  const [nights, setNights] = useState(5);
  const [guests, setGuests] = useState(2);
  const [isClaimed, setIsClaimed] = useState(false);

  // Synchronized price calculations
  const rawTotal = nights * listing.pricePerNight - (nights > 0 ? 1 : 0);
  const baseTotal = isClaimed ? Math.floor(rawTotal * 0.9) : rawTotal;

  // Section references for sticky SubHeader tabs mapping
  const [sectionOffsets, setSectionOffsets] = useState({
    photos: 0,
    amenities: 0,
    reviews: 0,
    location: 0,
  });

  const amenitiesRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateOffsets = () => {
      setSectionOffsets({
        photos: 0,
        amenities: amenitiesRef.current?.offsetTop || 0,
        reviews: reviewsRef.current?.offsetTop || 0,
        location: locationRef.current?.offsetTop || 0,
      });
    };

    // Calculate offsets on mount and when resizing windows
    const timer = setTimeout(updateOffsets, 500); // Small buffer to ensure rendering is complete
    window.addEventListener("resize", updateOffsets);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateOffsets);
    };
  }, []);

  // Update check-in and checkout range inside the calendar picker
  const handleCalendarRangeChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      setNights(calculateNights(start, end));
    } else {
      setNights(1); // Reset to base night
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top sticky nav */}
      <Header />

      {/* Scroll-sticky navigation bar links synced on scroll */}
      <SubHeader listing={listing} sectionOffsets={sectionOffsets} nights={nights} baseTotal={baseTotal} />

      {/* Main Grid Content */}
      <main id="main" className="flex-1 w-full pb-16">
        <div className="_DyYHYD">
        {/* Listing Title Heading */}
        <ListingHeading listing={listing} />

        {/* Photo Grid container */}
        <PhotoGrid listing={listing} />

        {/* Grid split columns: Info pane left, Sticky calculator right */}
        <div className="_UPwKNi mt-6 relative">
          {/* Details Column */}
          <div className="_HlYqcO" id="contentLeft">
            {/* Room Type & Bedding Details Header */}
            <div className="border-b border-airbnb-border pb-6 bg-white select-none">
              <h2 className="text-xl md:text-[22px] font-semibold text-airbnb-ink leading-7">
                Entire serviced apartment in Candolim, India
              </h2>
              <p className="text-sm font-normal text-airbnb-ink mt-1">
                3 guests &middot; 1 bedroom &middot; 1 bed &middot; 1 bathroom
              </p>
            </div>

            <GuestFavouriteCard />
            <HostSummary host={listing.host} />
            <FeaturesSection />
            <Description description={listing.description} />
            
            <div ref={amenitiesRef} id="amenities">
              <AmenitiesList amenities={listing.amenities} />
            </div>

            <CalendarPicker
              startDate={startDate}
              endDate={endDate}
              onChangeRange={handleCalendarRangeChange}
              locationName="Candolim"
            />
          </div>

          {/* Sticky Calculator Column */}
          <aside className="_nuIcYI hidden lg:block">
            <BookingCard
              listing={listing}
              startDate={startDate}
              endDate={endDate}
              nights={nights}
              guests={guests}
              onGuestsChange={setGuests}
              isClaimed={isClaimed}
              onClaimToggle={() => setIsClaimed(!isClaimed)}
              baseTotal={baseTotal}
            />
          </aside>
        </div>

        {/* Full span review grids */}
        <div ref={reviewsRef} id="reviews" className="mt-4">
          <ReviewsSection
            reviews={listing.reviews}
          />
        </div>

        {/* Full span Map coordinates */}
        <div ref={locationRef} id="location">
          <LocationMap listing={listing} />
        </div>

        {/* Full span Meet Your Host */}
        <MeetYourHost />

        {/* Full span Nearby Stays */}
        <NearbyStays />
        </div>
      </main>

      {/* Site Footer */}
      <Footer />

      {/* PHOTO TOUR OVERLAY Portal */}
      <OverlayShell isOpen={state.view === "photoTour"} onClose={closeOverlay}>
        <PhotoTour
          listing={listing}
          isOpen={state.view === "photoTour"}
          onClose={closeOverlay}
        />
      </OverlayShell>

      {/* LIGHTBOX OVERLAY Portal */}
      <OverlayShell
        isOpen={state.view === "lightbox"}
        onClose={closeOverlay}
        darkBackdrop={true}
      >
        <Lightbox
          listing={listing}
          isOpen={state.view === "lightbox"}
          onClose={closeOverlay}
        />
      </OverlayShell>
    </div>
  );
}
