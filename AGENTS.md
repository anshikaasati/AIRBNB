# Agent Instructions & Guidelines

This document outlines the rules and conventions for AI assistants collaborating on this Airbnb listing clone project.

## Core Rules

1. **Maintain Layout Integrity**:
   - Always adhere to the custom inspect classes (e.g. `_MpaXTl`, `_ZltfzZ`, etc.) defined in `app/globals.css`.
   - Avoid injecting random Tailwind padding/margin utilities that clash with official Airbnb spacings.

2. **SOLID & DRY Principles**:
   - Centralize utilities in `lib/dateUtils.ts` (for date/night mathematics) and `lib/motion.ts` (for Framer Motion transitions).
   - Keep state logic clean and centralized (lifted to `app/page.tsx` for shared booking coordinates).

3. **Vercel Deployments**:
   - Ensure all new files are staged and committed (`git add .`) before deploying to trigger successful Vercel builds.
   - Do not leave files untracked.
