# Royal Suites Perspective Accuracy Audit - Round 2

Date: 2026-05-08

This is a stricter second check against the floor plans. I am scoring plan fidelity first and render polish second. A render only passes if the room relationship, room openness/enclosure, kitchen position, window plane, and bath/wardrobe adjacency make sense against the actual plan.

Audit sheets used:

- D:\New AI Directory\Damasara Heights - Royal Suites\CURRENT_ANTIGRAVITY_PACKAGE\viewer-qa\unit-audit\S1-audit.png
- D:\New AI Directory\Damasara Heights - Royal Suites\CURRENT_ANTIGRAVITY_PACKAGE\viewer-qa\unit-audit\S2-audit.png
- D:\New AI Directory\Damasara Heights - Royal Suites\CURRENT_ANTIGRAVITY_PACKAGE\viewer-qa\unit-audit\J1-audit.png
- D:\New AI Directory\Damasara Heights - Royal Suites\CURRENT_ANTIGRAVITY_PACKAGE\viewer-qa\unit-audit\J3-audit.png
- D:\New AI Directory\Damasara Heights - Royal Suites\CURRENT_ANTIGRAVITY_PACKAGE\viewer-qa\unit-audit\M1-audit.png
- D:\New AI Directory\Damasara Heights - Royal Suites\CURRENT_ANTIGRAVITY_PACKAGE\viewer-qa\unit-audit\DK2-audit.png

## Round 2 Result

The set is not fully client-safe yet. Several images are visually attractive but still too generic, especially the compact open-suite layouts and kitchen views. The biggest issue is that the model keeps turning open studio/compact suite plans into larger one-bedroom or showroom-apartment scenes.

## Shot-by-Shot Scores

| Unit | Shot | Score | Decision | Reason |
|---|---:|---:|---|---|
| S1 | Living / Dining | 8.1 | Pass | Corrected enough: one open studio room, bed visible, living/dining and pantry direction readable. |
| S1 | Kitchen / Pantry | 7.6 | Revise | Looks good but still reads like a long apartment/corridor kitchen more than the exact compact left-wall pantry. |
| S1 | Main Bedroom | 7.2 | Revise | Better than the old version, but still too much like a separate bedroom zone; S1 bed should feel more obviously open to the studio. |
| S1 | Washroom / Bath | 8.0 | Pass | Acceptable compact bath interpretation. |
| S2 | Living / Dining | 7.1 | Fail | Too much long condo perspective; weak match to the compact S2 relationship of dining, living, central pantry, bath/wardrobe, and bed zone. |
| S2 | Kitchen / Pantry | 7.4 | Revise | Pleasant view but the kitchen/pantry reads too generic and not locked to the plan's central horizontal pantry run. |
| S2 | Main Bedroom | 6.8 | Fail | Reads as a large separate bedroom suite. The plan is a compact open sleeping zone tied closely to living, wardrobe, and bath. |
| S2 | Washroom / Bath | 8.0 | Pass | Acceptable bathroom scale and fixture logic. |
| J1 | Living / Dining | 8.0 | Pass | Living/dining near the window side is plausible and keeps the suite relationship reasonably. |
| J1 | Kitchen / Pantry | 8.0 | Pass | Kitchen-to-living adjacency is believable enough. |
| J1 | Main Bedroom | 7.7 | Revise | Good render, but not strongly locked to the upper-left enclosed master bedroom and wardrobe/bath adjacency. |
| J1 | Washroom / Bath | 8.0 | Pass | Acceptable primary bath view. |
| J3 | Living / Dining | 7.7 | Revise | Good image but slightly too corridor-like; should emphasize the left-side living/dining/kitchen stack more clearly. |
| J3 | Kitchen / Pantry | 8.1 | Pass | Kitchen/dining adjacency is reasonably plan-faithful. |
| J3 | Main Bedroom | 8.0 | Pass | Acceptable master-bedroom view. |
| J3 | Washroom / Bath | 8.0 | Pass | Acceptable bathroom view. |
| M1 | Living / Dining | 8.1 | Pass | Corrected floor/window problem; living/dining/kitchen depth is now readable. |
| M1 | Kitchen / Pantry | 6.7 | Fail | Biggest M1 drift: turns the compact upper-left kitchen into a larger showroom/L-island kitchen. |
| M1 | Main Bedroom | 8.0 | Pass | Acceptable master-bedroom interpretation. |
| M1 | Washroom / Bath | 7.6 | Revise | Looks oversized and spa-like compared with the master-bath footprint. |
| DK2 | Living / Dining | 8.0 | Pass | Main living/dining/dry-kitchen relationship is broadly credible. |
| DK2 | Kitchen / Pantry | 7.8 | Revise | Shows dry/wet kitchen idea, but still too showroom-like; wet/dry separation should be clearer. |
| DK2 | Main Bedroom | 8.0 | Pass | Acceptable main-bedroom view. |
| DK2 | Washroom / Bath | 8.0 | Pass | Acceptable main-bath view. |

## Must Regenerate

These are below the 8/10 pass target and are visibly inaccurate enough to redo before client use:

- S1 / Kitchen / Pantry
- S1 / Main Bedroom
- S2 / Living / Dining
- S2 / Kitchen / Pantry
- S2 / Main Bedroom
- J1 / Main Bedroom
- J3 / Living / Dining
- M1 / Kitchen / Pantry
- M1 / Washroom / Bath
- DK2 / Kitchen / Pantry

## Highest Priority Failures

Do these first:

1. S2 / Main Bedroom - looks like a separate bedroom suite instead of compact open sleeping zone.
2. M1 / Kitchen / Pantry - kitchen geometry is too invented and showroom-like.
3. S2 / Living / Dining - misses compact suite spatial relationship.
4. S1 / Main Bedroom - still not open-studio enough.
5. S2 / Kitchen / Pantry - central pantry relationship is weak.

## Revised Pass Rule

For the next generation pass, do not accept an image unless it answers this question clearly:

"If the client puts the render beside the floor plan, can they recognize the same room layout without us explaining it?"

If the answer is no, it should be rejected even if the render is beautiful.
