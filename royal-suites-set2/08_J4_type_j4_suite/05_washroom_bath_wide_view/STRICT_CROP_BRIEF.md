# Strict Crop Perspective Brief - J4 Washroom / Bath

## Generation Authority

Use 	arget_crop.png as the primary source image. The generated perspective must match this crop before it is allowed to replace ender_9x16.png.

Use plan_highlight.png only to understand where the crop sits in the full unit. Do not generate the full unit unless the crop is an isometric/plan job.

## Unit And Shot

- Set: Set 2 Cinematic
- Unit: Type J4 Suite
- Unit code: J4
- Shot: Washroom / Bath
- Approximate cropped dimensions: 3.01 m x 3.13 m
- Output: vertical 9:16 photorealistic perspective render

## Cropped Area Description

# Spatial Preflight - J4 Washroom / Bath

Unit: Type J4 Suite
Shot folder: 08_J4_type_j4_suite\05_washroom_bath_wide_view
Source floor plan: ..\..\08_J4_type_j4_suite\00_source_floor_plan.jpg

## Preflight Assets

- Full plan with target highlight: plan_highlight.png
- Cropped target zone: target_crop.png

## Target Area

Approximate crop size from plan scale: **3.01 m x 3.13 m**.
Approximate position within whole unit plan: **26% from left**, **33% from top**.

What is inside the cropped/highlighted area:
Central bath/wardrobe core between master and living zones, compact fixtures and door swings preserved.

## Camera Intent

Eye-level from bath doorway into compact fixture layout.

## Prompt Engineering Handoff Rules

- Use target_crop.png as the primary spatial reference for this shot.
- Use plan_highlight.png to confirm the target zone's relationship to the whole unit.
- Do not invent walls, windows, doors, islands, balconies, corridors, or room separations not supported by the crop and full plan.
- Use one single upright 9:16 real-estate photograph, human eye height, not top-down, not collage, not a presentation board.
- Keep adjacent zones visible only if they are naturally visible from the crop and camera intent.

## Accuracy Gate Before Generation

Pass this checklist before handing off to image generation:

- [ ] Target crop matches the requested shot title.
- [ ] The prompt describes the correct room/zone and not a neighboring room.
- [ ] Approximate room scale is preserved from the crop.
- [ ] Door/window positions are not moved or invented.
- [ ] Camera is eye-level unless this is explicitly an isometric plan shot.
- [ ] No split-frame, collage, overhead, dollhouse, or rotated output is requested.
- [ ] Any visible adjacent area is supported by the full highlighted plan.

## Post-Generation Accuracy Check

After generation, reject the image if:

- It shows a different room or wrong unit zone.
- It uses top-down, dollhouse, overhead, rotated, or collage composition.
- It adds a kitchen island, glass floor, balcony, corridor, bedroom wall, or extra room not shown in the crop.
- It moves window/door locations in a way that contradicts the highlighted plan.
- It scores below 8/10 for floor-plan fidelity.


## Shot-Specific Spatial Rules

ROOM CONTENT TO PRESERVE FROM CROP:
- Render only the washroom/bath target crop.
- Keep toilet, vanity/sink, shower, wet area, door swing, and any partition/glass line in the same relative positions as the crop.
- If the crop shows a compact bathroom, keep it compact and functional.

REJECT IF:
- A bathtub appears unless the crop clearly shows a tub.
- The toilet/vanity/shower swap locations.
- The room becomes a large spa, hallway bathroom, or bedroom-connected ensuite unless the crop supports it.

## Design Theme

Warm cinematic luxury, but still bright enough for client review.
Materials: warm walnut or oak millwork, cream stone, soft beige upholstery, brushed champagne metal, controlled contrast, warm practical lighting.
Do not turn the unit into a dark hotel suite; keep it readable and residential.

## Camera

- Human eye-level camera, about 1.5 m to 1.6 m high.
- Wide real-estate lens, but not distorted.
- Show the target crop as one coherent room/area.
- Keep visible adjacent space only when the crop and plan_highlight.png support it.

## Hard Lock Rules

- Do not use old renders as source.
- Do not copy a previous failed render.
- Do not invent walls, doors, windows, wardrobes, bathrooms, kitchen islands, balconies, bathtubs, corridors, or extra rooms.
- Do not move fixed architecture.
- Do not change room proportions into a different apartment type.
- Do not generate labels, text, blueprint graphics, boards, split screens, or collages.

## Pass Gate

Score must be at least 8/10 for floor-plan fidelity before promotion:

- Same target room or zone as the crop.
- Main furniture/fixtures stay in the same relative positions.
- Door/window/opening positions are not invented or moved.
- Room remains close to the cropped proportions.
- Style matches this set's theme without overriding geometry.
