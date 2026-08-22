// Rebuilds the /lucifergamingmv breakdown page data + assets from the working tree.
// Run after any i2v batch lands new clips:  node lucifergamingmv/_build.mjs
import fs from "node:fs";
import path from "node:path";

const MV = "D:/New AI Directory/lucifer-gaming-mv";
const OUT = import.meta.dirname;

const shotlist = JSON.parse(fs.readFileSync(`${MV}/docs/shotlist.json`, "utf8"));
const sections = JSON.parse(fs.readFileSync(`${MV}/docs/sections.json`, "utf8"));
const jobs = JSON.parse(fs.readFileSync(`${MV}/docs/i2v-jobs.json`, "utf8"));
// A panel with no i2v clip is no longer a held plate: it cuts to a different picture every beat.
// Same file the assembler reads, so the page can never claim a build the cut does not have.
const montage = JSON.parse(fs.readFileSync(`${MV}/docs/montage.json`, "utf8"));
const byId = new Map(jobs.map((j) => [j.id, j]));

const copyDir = (src, dst, files) => {
  fs.mkdirSync(dst, { recursive: true });
  for (const f of files) fs.copyFileSync(path.join(src, f), path.join(dst, f));
  return files.length;
};

const id = (n) => "p" + String(n).padStart(2, "0");

const thumbs = fs.readdirSync(`${MV}/boards/_thumbs`).filter((f) => f.endsWith(".jpg"));
copyDir(`${MV}/boards/_thumbs`, `${OUT}/thumbs`, thumbs);

// Only real deliverable clips -- the PORTRAIT reject and the attach-fail PNGs stay behind.
const clipRe = /^p\d\d\.mp4$/;
const live = fs.readdirSync(`${MV}/boards/clips`).filter((f) => clipRe.test(f)).sort();
copyDir(`${MV}/boards/clips`, `${OUT}/clips`, live);
// A clip in _stale/ is queued for a re-fire, not rejected -- keep shipping it until a better
// take lands. Exact name only, so the renamed alternates (p06-campfire.mp4) stay behind.
const staled = fs.readdirSync(`${MV}/boards/clips/_stale`)
  .filter((f) => clipRe.test(f) && !live.includes(f)).sort();
copyDir(`${MV}/boards/clips/_stale`, `${OUT}/clips`, staled);
const liveIds = new Set([...live, ...staled].map((f) => f.replace(".mp4", "")));

fs.copyFileSync(`${MV}/boards/MOTION-PASS.mp4`, `${OUT}/MOTION-PASS.mp4`);
// The six one-off faces as they now render. Replaces the old SIX-FACES/CHARBOARD pair: the film no
// longer has a recurring protagonist to board, so a character sheet would be documenting a decision
// that was reversed.
fs.copyFileSync(`${MV}/boards/SIX-CAST.jpg`, `${OUT}/SIX-CAST.jpg`);
fs.copyFileSync(`${MV}/boards/MONTAGE-SAMPLE.jpg`, `${OUT}/MONTAGE-SAMPLE.jpg`);
// Proof the five title panels move: p08 across five seconds, p38 across one breath.
fs.copyFileSync(`${MV}/boards/GFX-MOTION.jpg`, `${OUT}/GFX-MOTION.jpg`);

const shots = shotlist.shots.map((s) => {
  const pid = id(s.n);
  const job = byId.get(pid);
  return {
    id: pid, n: s.n, section: s.section, bar: s.bar, bars: s.bars,
    start: s.start, end: s.end, dur: s.dur,
    cast: s.cast, lens: s.lens, movement: s.movement, size: s.size, desc: s.desc,
    status: s.comp ? "gfx" : liveIds.has(pid) ? "live" : montage[pid]?.length ? "montage" : "plate",
    // status says how the panel was MADE; clip says whether there is footage on disk to play.
    // The two came apart when the GFX panels got motion: they are still composites, not generated
    // shots, so they must not count toward the i2v lane -- but the page was reading status to decide
    // what to render, and so kept showing a thumbnail for five panels that now move.
    clip: liveIds.has(pid),
    slices: montage[pid]?.length ?? null,
    render: job?.render ?? null,
    prompt: job?.prompt ?? null,
    thumb: thumbs.includes(pid + ".jpg") ? pid + ".jpg" : null,
  };
});

const done = shots.filter((s) => s.status === "live").length;
const nMont = shots.filter((s) => s.status === "montage").length;
const meta = {
  bpm: sections.bpm, bar_sec: sections.bar_sec, beat_sec: sections.beat_sec,
  origin: sections.origin, total_bars: sections.total_bars,
  time_signature: sections.time_signature,
  aspect: shotlist.aspect, panels: shotlist.panels, cast_counts: shotlist.cast_counts,
  jobs: jobs.length, done, remaining: jobs.length - done, montage: nMont,
  slices: Object.values(montage).reduce((n, v) => n + v.length, 0),
  cut: { dur: 201.374, w: 1280, h: 720, fps: 24, frames: 4833, gaps: 0 },
};

fs.writeFileSync(`${OUT}/data.js`,
  "window.MV = " + JSON.stringify({ meta, sections: sections.sections, shots }) + ";\n");

console.log(`${shots.length} panels | ${done} live | ${nMont} montage | ${shots.filter((s) => s.clip).length} with footage | ${thumbs.length} thumbs | ${live.length} clips copied`);
