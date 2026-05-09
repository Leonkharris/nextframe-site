# Start Here - Antigravity

Paste this into Antigravity:

```text
Use this current Royal Suites render package only:

D:\New AI Directory\Damasara Heights - Royal Suites\CURRENT_ANTIGRAVITY_PACKAGE

Open and follow this file exactly:

D:\New AI Directory\Damasara Heights - Royal Suites\CURRENT_ANTIGRAVITY_PACKAGE\ALL_TAILORED_SHOT_PROMPTS.md

Process every row in:

D:\New AI Directory\Damasara Heights - Royal Suites\CURRENT_ANTIGRAVITY_PACKAGE\generation_queue.csv

For every shot:

1. Upload/reference only the listed Source floor plan.
2. Copy the exact tailored prompt for that shot from ALL_TAILORED_SHOT_PROMPTS.md.
3. Generate exactly one image for that shot.
4. Save the generated image to the listed Output target path as render_9x16.png.
5. Verify the actual saved pixel dimensions before marking the row complete.
6. Mark the row complete in render_log.csv only if the saved image is truly vertical.

Hard rules:

- Do not use anything from outputs.
- Do not use anything from _ARCHIVE_DO_NOT_USE.
- Do not use old generated renders.
- Do not upload placeholders, screenshots, viewer pages, prompt cards, reference cards, start frames, end frames, or route cards.
- Do not generate square images.
- Do not copy the 2D floor plan as the final image.
- Do not mark any image complete if it is 1024x1024, 1:1, landscape, or cropped square.

Required output:

- 6 selected floor plans.
- 5 shots per floor plan.
- 30 total images.
- Every image must be 9:16 vertical, ideally 1080x1920.
- Width must be less than height for every saved file.

Shot types:

- 1 realistic 3D isometric dollhouse render per plan.
- 4 first-person realistic room views per plan:
  living/dining, kitchen/pantry, main bedroom, washroom/bath.

Quality gate:

Reject and regenerate anything that is square, top-down for a room view, copied from the floor plan, collage-like, mislabeled, structurally wrong, or inconsistent with the attached floor plan.
```
