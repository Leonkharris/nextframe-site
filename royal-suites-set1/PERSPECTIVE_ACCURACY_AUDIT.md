# Royal Suites Perspective Accuracy Audit

Date: 2026-05-08

This audit scores the current perspective renders for plan fidelity, not just visual quality. A polished image can still fail if it invents walls, moves furniture zones, separates an open studio, changes window placement, or makes the room read as a generic serviced apartment instead of the actual floor plan.

Passing target: 8/10 minimum.

## Summary

The current set is not reliable enough to treat as final client-facing material without another correction pass. The main issue is not resolution or styling. The issue is spatial drift: the generator often preserves the general luxury-apartment mood while changing the plan logic.

## Current Shot Scores

| Unit | Shot | Score | Decision | Notes |
|---|---:|---:|---|---|
| S1 | Living / Dining | 8.2 | Pass | Regenerated. Open studio reads correctly: sofa and bed share the same room; TV is back on the left wall. |
| S1 | Kitchen / Pantry | 7.7 | Revise | Visually good, but it still reads too much like a corridor-style apartment kitchen and does not fully communicate the compact open studio layout. |
| S1 | Main Bedroom | 6.8 | Fail | Makes the bed zone feel like a separate bedroom suite. S1 is an open studio; the sofa/living adjacency should remain visible. |
| S1 | Washroom / Bath | 8.0 | Pass | Reasonable compact bathroom interpretation. Slightly more generous than the plan but acceptable. |
| S2 | Living / Dining | 7.8 | Revise | Good general adjacency, but the living/dining/pantry relationship is softened into a generic long apartment view. |
| S2 | Kitchen / Pantry | 8.0 | Pass | Acceptable pantry/kitchen-to-living view. |
| S2 | Main Bedroom | 7.0 | Fail | Reads like a large separate bedroom instead of a compact suite bed zone tied closely to the living area. |
| S2 | Washroom / Bath | 8.0 | Pass | Acceptable bathroom composition and fixture logic. |
| J1 | Living / Dining | 8.0 | Pass | Mostly plausible: dining/living near the window side, with room depth preserved. |
| J1 | Kitchen / Pantry | 8.0 | Pass | Kitchen-to-living adjacency is believable enough for this plan. |
| J1 | Main Bedroom | 7.8 | Revise | Good bedroom render, but weak evidence of the exact master-bedroom plan constraints and wardrobe/bath adjacency. |
| J1 | Washroom / Bath | 8.0 | Pass | Acceptable primary bath interpretation. |
| J3 | Living / Dining | 7.8 | Revise | Good image, but circulation/wall reads a little too corridor-like compared with the left-side living/dining/kitchen stack. |
| J3 | Kitchen / Pantry | 8.1 | Pass | Good kitchen/dining adjacency. |
| J3 | Main Bedroom | 8.0 | Pass | Acceptable master bedroom perspective. |
| J3 | Washroom / Bath | 8.0 | Pass | Acceptable bathroom perspective. |
| M1 | Living / Dining | 8.1 | Pass | Regenerated. Floor window error fixed; window is now vertical and floor is continuous. |
| M1 | Kitchen / Pantry | 7.5 | Fail | Too much generic L/island kitchen drift; does not lock tightly enough to the upper-left kitchen location and plan proportions. |
| M1 | Main Bedroom | 8.0 | Pass | Acceptable master bedroom interpretation. |
| M1 | Washroom / Bath | 7.8 | Revise | Visually good, but oversized and too spa-like relative to the plan footprint. |
| DK2 | Living / Dining | 8.0 | Pass | Main living/dining/dry-kitchen relationship is broadly correct. |
| DK2 | Kitchen / Pantry | 7.7 | Revise | Good image, but wet/dry kitchen separation and island massing are not plan-locked enough. |
| DK2 | Main Bedroom | 8.0 | Pass | Acceptable main bedroom view. |
| DK2 | Washroom / Bath | 8.0 | Pass | Acceptable main bath view after prior tub correction. |

## Required Regeneration Queue

Hard fails:

- S1 / Main Bedroom
- S2 / Main Bedroom
- M1 / Kitchen / Pantry

Borderline revisions:

- S1 / Kitchen / Pantry
- S2 / Living / Dining
- J1 / Main Bedroom
- J3 / Living / Dining
- M1 / Washroom / Bath
- DK2 / Kitchen / Pantry

## Revised QA Rule

Do not pass a render just because it is realistic and vertical. It must visibly preserve the specific plan relationship for that shot:

- open studio units must not become one-bedroom apartments
- bed/living/pantry zones must keep their real adjacency
- kitchen/pantry positions must match the plan side and sequence
- windows must stay on the correct wall plane
- bathrooms must not become oversized spa rooms unless the plan supports that scale
- wet/dry kitchen separation must not collapse into a generic show kitchen
