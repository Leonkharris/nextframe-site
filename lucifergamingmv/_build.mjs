// Rebuilds the /lucifergamingmv breakdown page data + assets from the working tree.
// Run after any i2v batch lands new clips:  node lucifergamingmv/_build.mjs
import fs from "node:fs";
import path from "node:path";

const MV = "D:/New AI Directory/lucifer-gaming-mv";
const OUT = import.meta.dirname;

const shotlist = JSON.parse(fs.readFileSync(`${MV}/docs/shotlist.json`, "utf8"));
const sections = JSON.parse(fs.readFileSync(`${MV}/docs/sections.json`, "utf8"));
const jobs = JSON.parse(fs.readFileSync(`${MV}/docs/i2v-jobs.json`, "utf8"));
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
const live = fs.readdirSync(`${MV}/boards/clips`).filter((f) => /^p\d\d\.mp4$/.test(f)).sort();
copyDir(`${MV}/boards/clips`, `${OUT}/clips`, live);
const liveIds = new Set(live.map((f) => f.replace(".mp4", "")));

fs.copyFileSync(`${MV}/boards/MOTION-PASS.mp4`, `${OUT}/MOTION-PASS.mp4`);
fs.copyFileSync(`${MV}/boards/SIX-FACES.jpg`, `${OUT}/SIX-FACES.jpg`);
fs.copyFileSync(`${MV}/boards/CHARBOARD-ARCHITECT_768.jpg`, `${OUT}/CHARBOARD-ARCHITECT.jpg`);

const shots = shotlist.shots.map((s) => {
  const pid = id(s.n);
  const job = byId.get(pid);
  return {
    id: pid, n: s.n, section: s.section, bar: s.bar, bars: s.bars,
    start: s.start, end: s.end, dur: s.dur,
    cast: s.cast, lens: s.lens, movement: s.movement, size: s.size, desc: s.desc,
    status: s.comp ? "gfx" : liveIds.has(pid) ? "live" : "plate",
    render: job?.render ?? null,
    prompt: job?.prompt ?? null,
    thumb: thumbs.includes(pid + ".jpg") ? pid + ".jpg" : null,
  };
});

const done = shots.filter((s) => s.status === "live").length;
const meta = {
  bpm: sections.bpm, bar_sec: sections.bar_sec, beat_sec: sections.beat_sec,
  origin: sections.origin, total_bars: sections.total_bars,
  time_signature: sections.time_signature,
  aspect: shotlist.aspect, panels: shotlist.panels, cast_counts: shotlist.cast_counts,
  jobs: jobs.length, done, remaining: jobs.length - done,
  cut: { dur: 201.374, w: 1280, h: 720, fps: 24, frames: 4833, gaps: 0 },
};

fs.writeFileSync(`${OUT}/data.js`,
  "window.MV = " + JSON.stringify({ meta, sections: sections.sections, shots }) + ";\n");

console.log(`${shots.length} panels | ${done} live | ${thumbs.length} thumbs | ${live.length} clips copied`);
