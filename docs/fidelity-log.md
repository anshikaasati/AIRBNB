# Fidelity Log — Listing Page Parity

This log documents the styling, copying, animations, and properties extracted from the MP4 screen recordings to ensure pixel-perfect and behavioral replication of the reference website.

---

## 1. Global Theme Tokens
* **Colors**:
  - `airbnb-rausch` (Accent/Brand): `#FF385C`
  - `airbnb-ink` (Primary Text): `#222222`
  - `airbnb-gray` (Secondary Text): `#717171`
  - `airbnb-border` (Dividers): `#DDDDDD`
  - `airbnb-light-gray` (Backgrounds): `#F7F7F7`
* **Font Family**: Inter, sans-serif
* **Border Radius**:
  - Card/Modal: `12px` (`rounded-xl` / `rounded-card`)
  - Pill/Button: `9999px` (`rounded-full`)

---

## 2. Section: Header
* **Search Bar Options**: "Anywhere" | "Anytime" | "Add guests"
* **User Nav Menu**: "Become a host", globe icon, and menu icon with a logout silhouette profile badge (standard dark grey circle containing white user head outline).

---

## 3. Section: Title Heading & Badges
* **Title Row**: Aligns title header text on the left and Share/Save buttons on the right.
* **Share Button**: Custom sharing icon. Shows "Share options" toast notification at the bottom when clicked.
* **Save Button**: Outline heart icon. Clicking changes it to a solid red heart showing "Saved".
* **Guest Favourite Badge (NEW)**: Displays Guest Favourite laurel icon badge (left), a center text description, overall rating score 4.95, and 19 reviews.

---

## 4. Section: Host Summary
* **Layout**: Displays hosted by host name, years hosting, and a verified badge overlay (red checkmark shield) on the host profile avatar.

---

## 5. Section: Features Section (NEW)
* **Feature Rows**: Features three vertical items with icons:
  1. "Outdoor entertainment" — "The pool and alfresco dining are great for summer trips."
  2. "Designed for staying cool" — "Beat the heat with the A/C and ceiling fan."
  3. "Self check-in" — "You can check in with the building staff."
* **Translation notice**: Displays "Some info has been automatically translated. Show original" with a globe icon.

---

## 6. Section: Booking Card
* **Coupon Banner**: Prepend coupon card with tag icon: "Get 10% off your next stay. Terms apply." with a Claim button.
* **Header**: Displays total price (`₹28,499 for 5 nights`) and hides the bottom footer row.
* **Cancellation notice**: Displays "Free cancellation before 17 October" box.
* **Report Listing**: Aligns "Report this listing" with flag icon at the bottom of the column.

---

## 7. Section: Reviews Section
* **Distribution Header**: Shows Overall rating vertical graph on the left and 6 columns (Cleanliness, Accuracy, Check-in, Communication, Location, Value) with vertical dividers.
* **Filter Row**: Horizontal scroll tags/pills (Comfort, Accuracy, Hot tub, Condition, Hospitality, Cleanliness, Amenities) with emoji icons.
* **List Cards**: Re-styles reviews to display "X years/months on Airbnb" and star rating rows next to the review date.

---

## 8. Section: Meet Your Host (NEW)
* **Co-Hosts list**: Render list of 8 co-hosts with profile avatars/initial circles.
* **Biography details**: Shows "Born in the 80s" and "Where I went to school: NICMAR GOA" bullet items.

---

## 9. Section: Location Map
* **Mockup Coastline**: Displays custom slanted beach/water block on the left representing the coastline.
* **Pin**: Large black circular home pin in the center.
* **Controls**: Search magnifying button on the top-left, and zoom controls (+/-) on the right side.

---

## 10. Section: More Stays Nearby (NEW)
* **Slider**: Snaps horizontal stays cards (aspect ratios, ratings, prices) with page counts (1/2) and circle arrow sliders navigation.
