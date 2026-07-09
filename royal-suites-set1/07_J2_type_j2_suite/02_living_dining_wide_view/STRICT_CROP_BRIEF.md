# Strict Crop Perspective Brief - J2 Living / Dining

## Generation Authority

Use 	arget_crop.png as the primary source image. The generated perspective must match this crop before it is allowed to replace ender_9x16.png.

Use plan_highlight.png only to understand where the crop sits in the full unit. Do not generate the full unit unless the crop is an isometric/plan job.

## Unit And Shot

- Set: Set 1 Realistic
- Unit: Type J2 Suite
- Unit code: J2
- Shot: Living / Dining
- Approximate cropped dimensions: 3.51 m x 5.4 m
- Output: vertical 9:16 photorealistic perspective render

## Cropped Area Description

# Spatial Preflight - J2 Living / Dining

Unit: Type J2 Suite
Shot folder: 07_J2_type_j2_suite\02_living_dining_wide_view
Source floor plan: ..\..\07_J2_type_j2_suite\00_source_floor_plan.jpg

## Preflight Assets

- Full plan with target highlight: plan_highlight.png
- Cropped target zone: target_crop.png

## Target Area

Approximate crop size from plan scale: **3.51 m x 5.4 m**.
Approximate position within whole unit plan: **0% from left**, **0% from top**.

What is inside the cropped/highlighted area:
Left-side open living/dining stack with sofa, dining table, kitchen below, and window wall at the upper edge. The bedroom/bath core remains enclosed on the right.

## Camera Intent

Eye-level from kitchen/dining side toward living/window wall; no overhead or dollhouse angle.

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
- Render only the living/dining target crop, plus directly visible adjacent pantry/kitchen edges if the crop shows them.
- Keep the sofa, coffee/living table, dining table/chairs, window wall, and any pantry counter in the same relative positions as the crop.
- If the crop shows an open studio relation, do not create a separating wall between sofa, bed, dining, and pantry.
- If the crop shows the TV/living label on a specific side, keep the TV/living wall on that side.

REJECT IF:
- Sofa moves to the wrong wall or becomes a generic back-window sofa when the crop does not show that.
- Bedroom becomes the main room unless the crop explicitly combines bed and living in one studio zone.
- A corridor, island, ensuite, wardrobe hallway, extra balcony, or extra room appears.

## Design Theme

Bright realistic real-estate presentation.
Materials: neutral modern apartment finishes, light timber, matte white cabinetry, soft daylight, practical scaled furniture.
Keep the look natural, sales-gallery realistic, and compact where the floor plan is compact.

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
