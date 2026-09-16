# A More Curious Life — V0.1 Interactive Prototype

A zero-dependency browser prototype based on the agreed `spec.md`.

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
- Placeholder destination pages
- Keyboard focus support and reduced-motion support
- Responsive scene positioning using percentages

## Run it

The simplest option is to open `index.html` directly in a browser.

For a local server (recommended):

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

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
