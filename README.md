# A More Curious Life — Interactive Prototype

A static multi-page browser prototype based on the agreed `spec.md`, with a
self-contained React and Three.js gallery for the Work chapter.

## What is implemented

- Full-screen collage landing scene
- Four interactive object regions
  - Laptop → Work / Portfolio
  - Lizzy → Lizzy / Life / Diary
  - Books → Reading
  - Camera + map → Travel
- Round white hotspot buttons by default
- Hotspots expand into labels on hover/focus
- Object-specific zoom/lift effect on hover
- Short intro mask/reveal
- Immersive Work / Portfolio gallery with six navigable 3D exhibits
- Interactive Reading shelf with six selected books, expandable details, and keyboard navigation
- Sun-washed Travel diary with loose postcard stories and replaceable trip-photo spaces
- Placeholder destination page for Lizzy
- Keyboard focus support and reduced-motion support
- Responsive scene positioning using percentages
- Clean placeholder routes (`/work/`, `/lizzy/`, `/reading/`, `/travel/`)
- Replaceable HTML/CSS Lizzy photo holder

## Run it

The simplest option is to open `index.html` directly in a browser. The compiled
Work gallery also supports this local-file workflow.

For a local server (recommended):

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Develop the Work gallery

The gallery source lives in `work-gallery/`. Its production build is written to
`work/` so the rest of the site can continue to be served as plain static files.

```bash
cd work-gallery
npm install
npm run dev
```

After changing the gallery, rebuild the version used by the full site:

```bash
npm run build
```

## Replace Lizzy's photo

The Polaroid over Lizzy is now live HTML/CSS rather than only being baked into the collage artwork. In `index.html`, replace the placeholder `<span>` inside `.lizzy-photo-slot` with an image:

```html
<img src="assets/lizzy.jpg" alt="Lizzy curled up on her blue blanket">
```

## Notes

The current collage image already contains some UI/text from the visual mockup. In a later pass, we should generate/export a clean art-only background and render every title, hotspot, and navigation element as HTML/CSS. This V0.1 focuses on validating the interaction itself.

## Next tuning points

1. Fine-tune hotspot coordinates on your actual screen.
2. Tune each object clip region so the hover enlargement feels natural.
3. Decide whether to keep the intro animation after repeat visits.
4. Replace the art asset with a UI-free background before production.


Refinement: the Lizzy hover region now stays below the global header, and live hotspot controls are aligned over the concept-art markers to avoid a doubled-button look.

Latest refinement: removed the baked-in static hotspot symbols from the background artwork and nudged the Work / Portfolio hotspot upward for a cleaner hover state.

This variant uses the cleaned collage artwork without baked-in static hotspot symbols and is intended as the current prototype baseline.
