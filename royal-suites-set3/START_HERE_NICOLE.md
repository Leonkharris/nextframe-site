# Start Here - Modern Set 3 Nicole Generation

Use this folder only:

`D:\New AI Directory\Damasara Heights - Royal Suites\MODERN_SET_3`

Goal:
Generate the third Royal Suites perspective set with a modern sophisticated look.

Inputs:
- `generation_queue.csv` has all 40 perspective jobs.
- Each shot folder contains `reference_card.png`, `prompt.txt`, `AREA_BRIEF.md`, `plan_highlight.png`, and `target_crop.png`.

For each row:
1. Open the shot folder.
2. Upload/reference only `reference_card.png`.
3. Paste the exact `prompt.txt`.
4. Generate one vertical 9:16 render.
5. Save it to `render_9x16.png`.
6. Compare against the reference card and accept only if it scores at least 8/10 for floor-plan fidelity.
7. Update `render_log.csv`.

Nicole command pattern:

```powershell
rtk powershell -ExecutionPolicy Bypass -File "tools\agents\nicole\nicole-run-flow-job.ps1" -PromptFile "<prompt.txt>" -SourceImage "<reference_card.png>" -TargetFile "<render_9x16.png>" -RequireVertical
```
