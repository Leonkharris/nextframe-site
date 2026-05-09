# Spatial Preflight Workflow

Use this package before generating any new Royal Suites perspective render.

## Required Order

1. Open the shot-specific AREA_BRIEF.md.
2. Review plan_highlight.png to confirm where the shot sits in the full floor plan.
3. Review target_crop.png as the primary spatial reference.
4. Read the approximate crop dimensions and contents description.
5. Engineer the image prompt from that specific crop only.
6. Generate one upright 9:16 human eye-level perspective render.
7. Compare the generated render back against plan_highlight.png and target_crop.png.
8. Accept only if floor-plan fidelity scores at least 8/10.

## Hard Rejects

- Wrong room or neighboring zone.
- Overhead, dollhouse, collage, split-frame, or rotated composition.
- Invented walls, windows, balconies, kitchen islands, corridors, or extra rooms.
- Moved doors, windows, bathrooms, wardrobes, kitchen position, or major adjacency.
- Render below 8/10 floor-plan accuracy.

## Files Per Perspective Shot

Each shot folder contains:

- AREA_BRIEF.md: dimensions, contents, camera intent, and accuracy gate.
- plan_highlight.png: full floor plan with the target zone highlighted.
- target_crop.png: cropped target area to use for prompt engineering.
