/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Framer Motion Animation Constants
 *
 * Sourced and standard-locked from Airbnb listing transition profiles.
 */


// Smooth standard ease-out curve matching premium dialogue transitions
export const TRANSITIONS = {
  EASE_OUT: [0.2, 0.8, 0.2, 1] as any, // Custom cubic-bezier for responsive feel
  SNAP: [0.175, 0.885, 0.32, 1.275] as any,
};

// Fullscreen overlays (PhotoTour) entry/exit transitions
export const OVERLAY_TRANSITION = {
  duration: 0.4,
  ease: TRANSITIONS.EASE_OUT,
};

// Lightbox image transitions (fade and crossfade slides)
export const LIGHTBOX_IMAGE_TRANSITION = {
  duration: 0.25,
  ease: [0.25, 0.1, 0.25, 1] as any,
};

// Backdrop fade parameters
export const FADE_TRANSITION = {
  duration: 0.2,
  ease: "easeInOut" as any,
};


