import React from "react";
import listingData from "../data/listing.json";
import { Listing } from "../types/listing";
import { Header } from "../components/listing/Header";
import { ListingHeading } from "../components/listing/ListingHeading";
import { PhotoGrid } from "../components/listing/PhotoGrid";
import { HostSummary } from "../components/listing/HostSummary";
import { Description } from "../components/listing/Description";
import { AmenitiesList } from "../components/listing/AmenitiesList";
import { BookingCard } from "../components/listing/BookingCard";
import { ReviewsSection } from "../components/listing/ReviewsSection";
import { LocationMap } from "../components/listing/LocationMap";
import { Footer } from "../components/listing/Footer";
import { LAYOUT } from "../lib/constants";

export default function Home() {
  const listing = listingData as Listing;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Navigation */}
      <Header />

      {/* Main Content Container */}
      <main className={`flex-1 w-full ${LAYOUT.CONTAINER_MAX_WIDTH} mx-auto px-6 md:px-10 pb-16`}>
        {/* Title, ratings, and actions */}
        <ListingHeading listing={listing} />

        {/* Hero Grid */}
        <PhotoGrid listing={listing} />

        {/* Detail Panel split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8 relative">
          {/* Left Column: Info & Details */}
          <div className="lg:col-span-8 space-y-2">
            <HostSummary host={listing.host} />
            <Description description={listing.description} />
            <AmenitiesList amenities={listing.amenities} />
          </div>

          {/* Right Column: Sticky Booking Card */}
          <div className="lg:col-span-4 relative hidden lg:block">
            <BookingCard listing={listing} />
          </div>
        </div>

        {/* Full-width bottom sections */}
        <ReviewsSection
          ratingBreakdown={listing.ratingBreakdown}
          reviews={listing.reviews}
        />
        
        <LocationMap listing={listing} />
      </main>

      {/* Footer bar */}
      <Footer />
    </div>
  );
}
