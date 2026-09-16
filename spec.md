# A More Curious Life — Prototype Specification

## 1. Purpose

Create a first interactive prototype for Coco's personal portfolio landing page. The page should feel like an editorial scrapbook / flat-lay collage where meaningful objects act as navigation into different parts of Coco's life.

The prototype should focus only on the landing experience and basic navigation. Subpages can remain intentionally empty for now.

## 2. Working Title

Primary title for V0.1:

**A More Curious Life**

Subtitle:

*Work, reading, travel, and small bright things.*

Alternative title to revisit later:

**Welcome to Coco's Nest**

*An interactive portfolio of work, books, travel, and life with Lizzy.*

## 3. Core Concept

The homepage is a full-screen collage scene viewed from above. Four real objects in the scene represent four sections of the site.

The objects are not just decorative; each one is an interactive navigation target.

### Four interactive objects

1. **Laptop** → Work / Portfolio
2. **Lizzy / cat area** → Lizzy / Life / Diary
3. **Book stack / book area** → Reading
4. **Camera + map area** → Travel

For V0.1, do not add additional sections.

## 4. Visual Direction

Use the latest approved collage concept as the visual reference.

Style characteristics:

- top-down editorial flat-lay composition
- warm cream paper background
- bold cobalt blue, red, golden yellow, black, and neutral accents
- scrapbook / mixed-media feeling
- visible paper texture, torn edges, photo prints, handwritten notes, maps, books, and stationery
- cozy but polished
- personal rather than corporate
- visually rich, but with clear hierarchy

The **laptop is the main focal point** and should remain near the visual center of the page.

The four interactive objects should be easy to recognize:

- laptop centered
- Lizzy in upper-right area
- books in upper-left area
- camera + map in lower-left area

## 5. Page Structure

### Route: `/`

Interactive landing page.

### Placeholder routes

- `/work`
- `/lizzy`
- `/reading`
- `/travel`

For V0.1 these routes may render a minimal placeholder page containing only the section title and a back link.

## 6. Landing Page Layers

The homepage should be composed of separate layers instead of baking all UI into one image.

### Layer 1 — Background collage

The collage artwork fills the viewport.

It should behave like the scene/background rather than containing the interactive UI itself.

### Layer 2 — Intro/title content

Render title text as real HTML/CSS so that it remains sharp and editable.

Content:

**A More Curious Life**

*Work, reading, travel, and small bright things.*

Optional helper copy:

`Hover over an object to explore.`

This helper text may be removed later if the interaction is self-explanatory.

### Layer 3 — Four interactive hotspots

Each object receives one hotspot positioned using percentage-based coordinates so it remains aligned with the responsive image.

Default hotspot appearance:

- circular
- white background
- thin dark border
- subtle shadow
- small dark icon in the center
- approximately 42–52 px desktop diameter

Suggested icons:

- laptop → laptop / monitor icon
- Lizzy → cat icon
- reading → open-book icon
- travel → airplane icon

## 7. Hotspot Placement

Exact coordinates should be tuned during implementation, but placement should follow the current approved design.

### Laptop / Work

- hotspot sits at the **top edge of the laptop screen**
- visually centered along the screen's top border

### Lizzy

- hotspot sits near the **upper outer edge of Lizzy's fur**
- should not cover her face or center of body

### Reading

- hotspot sits around the upper-left book stack

### Travel

- hotspot sits around the camera + map cluster in the lower-left quadrant

All positions should be implemented as percentages relative to the hero scene, not hard-coded pixel offsets tied to one screen size.

## 8. Hover Interaction

Hovering an interactive object should trigger two coordinated effects.

### 8.1 Object emphasis

The associated object region subtly comes forward.

Desired behavior:

- scale approximately `1.04` to `1.08`
- transition approximately `250–350ms`
- gentle easing
- optional slight brightness / contrast increase
- optional soft drop shadow

The effect should feel polished and restrained rather than dramatic.

Only the relevant object region should scale—not the entire collage.

Examples:

- hovering Lizzy enlarges/emphasizes the cat region only
- hovering Travel emphasizes the camera/map cluster
- hovering Reading emphasizes the book area
- hovering Work emphasizes the laptop

### 8.2 Hotspot expansion

The circular hotspot expands horizontally into a white pill.

Default:

`○`

Hover:

`[ icon   Work / Portfolio  → ]`

Labels:

- `Work / Portfolio`
- `Lizzy / Life / Diary`
- `Reading`
- `Travel`

The label should:

- fade in
- optionally slide in a few pixels
- remain aligned with the original hotspot position
- not obscure the object unnecessarily

When hover ends, the pill collapses smoothly back to the circular button.

## 9. Click Behavior

Clicking a hotspot or its hovered object should navigate to the matching route.

Mappings:

- laptop → `/work`
- Lizzy → `/lizzy`
- books → `/reading`
- camera/map → `/travel`

The entire intended object hotspot area should feel clickable, not only the tiny icon.

## 10. Intro Animation

On initial load, use a short introductory reveal.

Suggested sequence:

1. collage is visible beneath a subtle cream/dark translucent mask
2. title appears
3. subtitle appears shortly after
4. overlay fades away
5. hotspots become active

Target duration:

- approximately 1.5–2 seconds total

The intro should feel elegant and quick, not like a long splash screen.

Potential later option:

- skip intro on repeat visits within the same session

## 11. Motion Guidance

Motion should be subtle and intentional.

Recommended:

- Framer Motion for intro and hover transitions
- smooth ease such as `easeOut`
- object scale changes kept small
- hotspot pulse may occur once when the page becomes interactive

Avoid:

- constant bouncing
- aggressive glow effects
- large zooms
- animations that compete with the collage artwork

## 12. Responsive Behavior

### Desktop first

V0.1 should primarily target desktop/laptop screens.

### Background behavior

The collage should fill the screen while preserving composition as much as possible.

Possible implementation:

- hero wrapper with fixed aspect-ratio logic
- image `object-fit: cover` or `contain` depending on viewport
- hotspot coordinates tied to the rendered hero container

### Mobile

Mobile can be deferred until the desktop interaction is approved.

Do not over-engineer mobile for V0.1.

## 13. Accessibility / UX

Even though the design is visual, the interactive controls should remain accessible.

Requirements:

- each hotspot is a real button/link
- add descriptive `aria-label` values
- keyboard focus should trigger a state equivalent to hover
- visible focus styles should be included
- links should remain usable even if animations are disabled
- respect `prefers-reduced-motion`

Suggested aria labels:

- `Open Work and Portfolio`
- `Open Lizzy Life and Diary`
- `Open Reading`
- `Open Travel`

## 14. Recommended Technical Stack

### Framework

- Next.js
- React
- TypeScript

### Styling

- CSS Modules, Tailwind CSS, or standard CSS

Use whichever keeps positioning and responsive behavior easiest to reason about.

### Animation

- Framer Motion

Three.js is **not necessary** for V0.1.

## 15. Suggested Component Structure

```text
app/
├── page.tsx                  # landing page
├── work/page.tsx
├── lizzy/page.tsx
├── reading/page.tsx
└── travel/page.tsx

components/
├── LandingHero.tsx
├── IntroOverlay.tsx
├── InteractiveHotspot.tsx
└── ObjectRegion.tsx

data/
└── hotspots.ts

public/
└── images/
    └── landing-collage.webp
```

Suggested hotspot data structure:

```ts
export type Hotspot = {
  id: "work" | "lizzy" | "reading" | "travel";
  label: string;
  href: string;
  x: number;
  y: number;
  icon: React.ReactNode;
  region: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};
```

## 16. V0.1 Acceptance Criteria

The prototype is considered complete when:

- [ ] landing page fills the viewport
- [ ] latest approved collage is used as the hero/background
- [ ] title and subtitle are rendered as real text
- [ ] exactly 4 interactive hotspots are visible
- [ ] each hotspot is circular by default
- [ ] all 4 hotspots include simple icons
- [ ] hotspot label is hidden by default
- [ ] hovering/focusing expands the hotspot into a pill
- [ ] correct section name appears on hover/focus
- [ ] associated object subtly enlarges on hover/focus
- [ ] clicking navigates to the corresponding placeholder route
- [ ] intro overlay/reveal is implemented
- [ ] keyboard navigation works
- [ ] reduced-motion users can use the page normally
- [ ] desktop layout is visually aligned with the approved mockup

## 17. Not in Scope for V0.1

Do not build these yet:

- detailed subpage content
- Goodreads integration
- travel database / map implementation
- Lizzy diary data model
- project CMS
- authentication
- 3D/WebGL scene
- mobile-specific redesign
- backend/database

## 18. Next Milestone After V0.1

Once the interactive landing page feels right in a browser:

1. decide whether to keep **A More Curious Life** or switch to **Welcome to Coco's Nest**
2. refine responsive/mobile behavior
3. choose which subpage to build first
4. likely begin with either Work / Portfolio or Reading
5. convert the visual prototype into the final portfolio structure

---

## Current Design Principle

The landing page should feel like discovering Coco through objects rather than navigating a traditional menu.

**The laptop anchors the professional portfolio. The books, travel objects, and Lizzy make the experience personal, curious, and memorable.**


## V0.1 refinement — global banner and hotspot layering

- Preserve the approved collage artwork and composition.
- The top white banner/navigation is global UI and must never enlarge or move with an object hover.
- Lizzy's hover/click region begins below the banner and is limited to the cat/blanket area.
- Interactive HTML hotspot controls are positioned directly over the circular markers in the concept artwork so the live control visually replaces the static marker.
- On hover, only the associated object region enlarges; the top banner remains completely stable.

## Current prototype baseline

- Uses the cleaned homepage collage asset with no static hotspot symbols baked into the image.
- Interactive white hotspot buttons are rendered entirely in HTML/CSS/JS.
- Hover enlarges only the object region while the top banner remains fixed.
