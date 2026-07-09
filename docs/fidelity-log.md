# Fidelity Log — Listing Page Extraction Status

> [!WARNING]
> **Access Blocked by Bot Detection (Kasada)**
> During Phase 1 execution, the automated browser subagent was blocked from inspecting `https://airbnb-clone-umber-two.vercel.app/` by bot detection (Kasada `ips.js`). The page returned the message: `"This page could not be verified. Please open it in a standard web browser."`
> Because we cannot bypass this security layer, all live styles, copy, and assets are marked as **TODO (User Verification / Manual Extraction Needed)**.
> Below is the extraction structure containing the metrics we need for each section.

---

## 1. Global Theme Tokens
* **Colors**:
  - `airbnb-rausch` (Accent/Brand): TODO (Expected primary color, e.g. #FF385C or similar brand color)
  - `airbnb-ink` (Primary Text): TODO (Expected #222222 or similar dark grey)
  - `airbnb-gray` (Secondary Text): TODO (Expected #717171 or similar grey)
  - `airbnb-border` (Dividers): TODO (Expected #DDDDDD or similar border grey)
* **Font Family**:
  - Standard Airbnb font stack (e.g., `Airbnb Cereal VF`, `Circular`, `-apple-system`, `BlinkMacSystemFont`, `Roboto`, `Helvetica Neue`, `sans-serif`): TODO
* **Border Radius**:
  - Card radius: TODO
  - Pill/Button radius: TODO
* **Box Shadows**:
  - Standard card shadow: TODO
  - Booking card shadow: TODO

---

## 2. Section: Header
* **Copy & Labels**: TODO (Search box placeholders, user nav labels)
* **Layout Structure**: TODO (Flex layout, container width, height, alignment)
* **CSS Metrics**:
  - Font size, weight, line-height: TODO
  - Spacing (Padding/Margin/Gaps): TODO

---

## 3. Section: Photo Grid (Hero)
* **Image Assets**: TODO (Natural widths/heights, download paths)
* **Layout Structure**: TODO (5-image grid container gap, column/row spans, aspect ratios)
* **CSS Metrics**:
  - Hover states transition: TODO
  - Spacing (Padding/Margin/Gaps): TODO

---

## 4. Section: Listing Heading
* **Copy & Labels**: TODO (Verbatim title, rating, reviews count, location string)
* **CSS Metrics**:
  - Title typography: TODO
  - Layout alignment & spacing: TODO

---

## 5. Section: Host Summary
* **Copy & Labels**: TODO (Host name, years hosting, superhost tag)
* **Image Assets**: TODO (Host avatar src URL)
* **CSS Metrics**:
  - Typography & Spacing: TODO

---

## 6. Section: Amenities List
* **Copy & Labels**: TODO (List of all amenity labels, "Show all X amenities" button text)
* **Icons**: TODO (SVG paths or react-icons mappings)
* **CSS Metrics**:
  - Grid/Flex gaps & rows: TODO

---

## 7. Section: Description
* **Copy & Labels**: TODO (Verbatim full description text)
* **CSS Metrics**:
  - Typography & margins: TODO

---

## 8. Section: Reviews Section
* **Copy & Labels**:
  - Review score categories & values (Cleanliness, Accuracy, Communication, Location, Check-in, Value): TODO
  - Review list (Verbatim text, date, reviewer name, reviewer avatar): TODO
* **CSS Metrics**:
  - Grid columns, margins, typography: TODO

---

## 9. Section: Location Map
* **Copy & Labels**: TODO (Location address text, map pins)
* **Map Configuration**: TODO (Coordinates)
* **CSS Metrics**:
  - Width, height, borders: TODO

---

## 10. Section: Booking Card
* **Copy & Labels**: TODO (Price per night, guest selectors, fee breakdown, total calculation)
* **CSS Metrics**:
  - Width, position (sticky trigger offset), shadows, borders: TODO

---

## 11. Section: Footer
* **Copy & Labels**: TODO (Verbatim copyright, links, and language/currency selectors)
* **CSS Metrics**:
  - Grid sections, spacing, divider colors: TODO
