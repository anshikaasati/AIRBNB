/**
 * Centralized Framer Motion animation transition configurations.
 */

export const FADE_TRANSITION = {
  duration: 0.2,
  ease: "easeInOut",
} as const;

export const LIGHTBOX_IMAGE_TRANSITION = {
  duration: 0.25,
  ease: [0.25, 0.1, 0.25, 1.0] as const,
} as const;
