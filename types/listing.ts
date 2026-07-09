export interface Photo {
  id: string;
  src: string;          // path under /public/images
  alt: string;          // real alt text observed on the reference, or a
                        // faithful description if the reference's alt is empty
  category?: string;     // section the photo belongs to in Photo Tour, if grouped
  width: number;
  height: number;
}

export interface Host {
  name: string;
  avatarSrc: string;
  isSuperhost: boolean;
  yearsHosting: number;
}

export interface Amenity {
  id: string;
  label: string;
  icon: string;          // key into the Icon component's icon map
  available: boolean;    // reference may show unavailable amenities struck through
}

export interface Review {
  id: string;
  authorName: string;
  authorAvatarSrc: string;
  rating: number;
  date: string;          // display string exactly as formatted on reference
  text: string;
}

export interface RatingBreakdown {
  overall: number;
  reviewCount: number;
  categories: { label: string; score: number }[]; // Cleanliness, Accuracy, etc.
}

export interface Listing {
  id: string;
  title: string;
  location: string;
  photos: Photo[];        // order matters — matches hero grid + Photo Tour order
  host: Host;
  amenities: Amenity[];
  description: string;    // full text; UI truncates/expands, data stays whole
  ratingBreakdown: RatingBreakdown;
  reviews: Review[];
  pricePerNight: number;
  currency: string;
  mapCoordinates: { lat: number; lng: number };
  address: string;
}

export type OverlayView = "none" | "photoTour" | "lightbox";

export interface OverlayState {
  view: OverlayView;
  activePhotoIndex: number;
  returnTo: OverlayView | null; // where to fall back to when lightbox closes
}
