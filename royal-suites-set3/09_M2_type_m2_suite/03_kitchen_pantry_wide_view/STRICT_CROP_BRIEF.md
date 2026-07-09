# Strict Crop Perspective Brief - M2 Kitchen / Pantry

## Generation Authority

Use 	arget_crop.png as the primary source image. The generated perspective must match this crop before it is allowed to replace ender_9x16.png.

Use plan_highlight.png only to understand where the crop sits in the full unit. Do not generate the full unit unless the crop is an isometric/plan job.

## Unit And Shot

- Set: Set 3 Modern Sophisticated
- Unit: Type M2 Suite
- Unit code: M2
- Shot: Kitchen / Pantry
- Approximate cropped dimensions: 4.81 m x 2.6 m
- Output: vertical 9:16 photorealistic perspective render

## Cropped Area Description

# Spatial Preflight - M2 Kitchen / Pantry

Unit: Type M2 Suite
Shot folder: 09_M2_type_m2_suite\03_kitchen_pantry_wide_view
Source floor plan: ..\..\09_M2_type_m2_suite\00_source_floor_plan.jpg

## Preflight Assets

- Full plan with target highlight: plan_highlight.png
- Cropped target zone: target_crop.png

## Target Area

Approximate crop size from plan scale: **4.81 m x 2.6 m**.
Approximate position within whole unit plan: **11% from left**, **4% from top**.

What is inside the cropped/highlighted area:
Upper-left wet/dry kitchen relationship with yard/service nearby; keep kitchen zones compact and positioned as shown.

## Camera Intent

Eye-level from kitchen counter zone toward dining/living if naturally visible.

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
- Render only the pantry/kitchen target crop and directly visible open living/dining adjacency if present.
- Keep the counter run, sink, cooktop, refrigerator/tall cabinet, wall edge, and entry/open side in the same relative positions as the crop.
- If the crop shows a straight compact pantry, do not convert it into a U-shaped/luxury kitchen or island kitchen.
- If the crop shows no wall between pantry and living/dining, keep it open.

REJECT IF:
- A new wall or closed corridor appears where the crop is open.
- Pantry turns into a different design language from the same set.
- A kitchen island, extra door, bathroom opening, or full-height partition is invented.

## Design Theme

Modern sophisticated real-estate look.
Materials: light oak, warm white walls, soft stone, refined built-ins, linen upholstery, clean daylight, premium but quiet styling.
Do not add fantasy luxury forms, oversized suites, extra architectural features, or dramatic hotel corridors.

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
