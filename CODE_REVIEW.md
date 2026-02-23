

### P0 — Performance Critical

#### 1. CSS `@import url()` fonts are render-blocking

- **File:** `src/app/globals.css` (lines 2–3)
- **Impact:** Single biggest LCP hit. Creates a request chain: CSS → font URL → font files (adds 500–1500ms).
- **Fix:** Switch to `next/font`:

```js
// layout.js
import { Playfair_Display, Montserrat } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
```

Benefits: automatic font subsetting, self-hosting, zero layout shift, no render-blocking requests.

#### 2. PNG assets not converted to WebP

- **Impact:** 36 PNG files remain (~60–80% larger than WebP equivalents).
- **Files:** `info1-3.png`, `curriculum1-3.png`, `experience1-7.png`, `leader1-3.png`, `corevalues1-4.png`, `minds.png`, logos.
- **Fix:** Convert all PNGs to WebP 
---

### P1 — Should Fix

#### 3. Dead file: `src/app/Footer.jsx`

- Still exists but is not imported anywhere (layout uses `src/components/Footer.jsx`).
- **Fix:** Delete it.

#### 4. Dead file: `src/components/WidthAnimation.jsx`

- Not imported by any file.
- Imports from non-existent `@/utils/common`.
- **Fix:** Delete it.

#### 5. `<button>` nested inside `<Link>`

- **File:** `src/components/ContactCTA.jsx` (lines 63–77)
- **Issue:** Nesting interactive elements (`<button>` inside `<a>`) is invalid HTML.
- **Fix:** Style `<Link>` as a button directly:

```jsx
<Link
  href="/contact"
  className="px-7 py-3 text-white text-sm md:text-base font-semibold bg-maroon inline-block"
>
  CONTACT US
</Link>
```


#### 7. `priority` on below-fold images

- **Files:**
  - `src/app/about/CoreValues.jsx` (line 98)
  - `src/components/MindsSection.jsx` (line 74)
  - `src/components/ContactSection.jsx` (line 212)
  - `src/components/AcademicsScrollSection.jsx` (lines 71, 172)
- **Issue:** `priority` preloads images immediately. Only the first visible above-the-fold image should have it.
- **Fix:** Remove `priority` from all below-fold images.

#### 8. Missing `sizes` on `fill` images

- **Files:** `gallery.jsx`, `CoreValues.jsx`, `LearningSpacesSection.jsx`, and most `<Image fill>` usages.
- **Issue:** Without `sizes`, the browser downloads the full-width image regardless of viewport.
- **Fix:** Add `sizes` prop:

```jsx
<Image fill sizes="(max-width: 768px) 100vw, 50vw" ... />
```

#### 9. `contact-cta-override` CSS hack

- **File:** `src/app/globals.css` (lines 79–161) — ~80 lines of `!important` overrides.
- **Fix:** Add an `align` prop to `ContactCTA` component instead:

```jsx
<ContactCTA imageSrc="..." align="left" />
```

---

### P2 — Code Quality / Consistency

#### 10. `!important` abuse in Tailwind classes

- ~40+ uses of `!text-[...]`, `!font-[...]`, `!leading-[...]` across components.
- **Root cause:** Global rule in `globals.css` (line 42) sets `font-size: 48px` on all `h1-h6`, forcing every component to override with `!important`.
- **Fix:** Remove the global `font-size: 48px` from the heading rule, or scope it. Let Tailwind utilities work without `!important`.

#### 11. Inline `style={{ fontFamily }}` repeated everywhere

- **Files affected:**
  - `CoreValues.jsx` (6 times)
  - `VideoHero.jsx` (8 times)
  - `ContactCTA.jsx` (2 times)
  - `AcademicsScrollSection.jsx` (6 times)
  - `explore/page.jsx` (4 times)
  - `ContactSection.jsx` (2 times)
- **Fix:** Use existing `.heading` / `.paragraph` CSS classes, or Tailwind's `font-[Playfair_Display]` utility.

#### 12. `#1F4E79` not in CSS variables

- Used in `CoreValues.jsx` (line 35) and `LeaderShipSection.jsx` (lines 54, 105).
- **Fix:** Add `--color-navy: #1F4E79` to `:root` and `@theme` if this is a brand color.

#### 13. Gallery bug — `useEffect` before declarations

- **File:** `src/app/explore/gallery.jsx` (lines 8–21)
- **Issue:** `useEffect` references `topImages`, `bottomImages`, `setTopIndex`, `setBottomIndex` before they are defined (lines 23–36). This will cause a runtime error.
- **Fix:** Move the `useEffect` below the state and array declarations.

#### 14. Unnecessary `"use client"` directives

- **Files:** `PageBanner.jsx`, `FloatingCTAs.jsx` — neither uses hooks or browser APIs.
- **Fix:** Remove `"use client"` so they remain Server Components (smaller JS bundle).

#### 15. Footer links are all `href="#"`

- **Files:** `Footer.jsx` (lines 38–41, 77–88), `FloatingCTAs.jsx` (lines 12, 27).
- **Fix:** Wire them to actual routes (`/about`, `/admissions`, `/academics`, `/contact`).

#### 16. Duplicate heading mobile override conflicts

- **File:** `globals.css` (lines 146–154)
- **Issue:** Sets `h1-h6 { font-size: 36px }` at `max-width: 768px`, but most components already set their own responsive sizes. The global override conflicts rather than helps.

#### 17. `document.getElementById` in React

- **File:** `src/app/explore/page.jsx` (lines 131–146)
- **Issue:** Uses `document.getElementById("safety-slider")` for DOM access instead of React's `useRef`.
- **Fix:**

```jsx
const sliderRef = useRef(null);
// ...
<div ref={sliderRef} className="flex overflow-x-auto ...">
// ...
onClick={() => sliderRef.current.scrollBy({ left: -offset, behavior: "smooth" })}
```

---

## Progress Summary

| Category                | Before     | Now                                  |
| ----------------------- | ---------- | ------------------------------------ |
| Raw `<img>` tags        | 9          | **0**                                |
| Hardcoded hex colors    | Widespread | Mostly using Tailwind theme classes  |
| Unused components       | 3          | **1 deleted**, 2 remain              |
| `next/image` usage      | Partial    | Much better, `fill` used properly    |
| Fonts                   | CSS import | **Still CSS import (needs next/font)** |
| Per-page SEO metadata   | None       | **Still missing**                    |
| PNG → WebP conversion   | 36 PNGs    | **Still 36 PNGs**                    |
