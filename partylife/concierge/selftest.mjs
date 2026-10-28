// node concierge/selftest.mjs : checks the query parser, the hours logic and the Manila clock. No DOM needed.
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
const C = createRequire(import.meta.url)('./concierge.js');

// 5 sample queries -> area / category / time filters
const cases = [
  ['rooftop bar in BGC open late', { areas: ['bgc'], cats: ['rooftop'], time: { late: true } }],
  ['cheap drinks Poblacion tonight', { areas: ['poblacion'], cats: [], flags: { cheap: true }, time: { tonight: true } }],
  ['salsa night', { areas: [], cats: ['salsa'] }],
  ['quiet bar for a date near Makati', { areas: ['poblacion', 'makati-cbd'], cats: [], flags: { quiet: true } }],
  ['club with no cover charge', { areas: [], cats: ['club'], flags: { nocover: true } }],
  ['live jazz in Quezon City open after 2am', { areas: ['quezon-city'], cats: ['live', 'jazz'], time: { after: 26 * 60 } }],
  ['karaoke Alabang open now', { areas: ['south'], cats: ['karaoke'], time: { openNow: true } }],
  ['beer near Taguig Fort', { areas: ['bgc'], cats: ['beer'] }],
];
for (const [text, want] of cases) {
  const got = C.parseQuery(text);
  assert.deepEqual([...got.areas].sort(), [...want.areas].sort(), `${text}: areas ${got.areas}`);
  assert.deepEqual([...got.cats].sort(), [...want.cats].sort(), `${text}: cats ${got.cats}`);
  for (const [k, v] of Object.entries(want.flags || {})) assert.equal(got.flags[k], v, `${text}: flag ${k}`);
  for (const [k, v] of Object.entries(want.time || {})) assert.equal(got.time[k], v, `${text}: time ${k}`);
  console.log('ok  ', text.padEnd(42), JSON.stringify({ areas: got.areas, cats: got.cats, time: got.time }));
}

// open-now logic: Asia/Manila time, closing past midnight (0 = Sunday)
const tu = C.parseHours('Tu-Sa 19:00-3:00');
assert.equal(C.openState(tu, 6, 23 * 60), 'open', 'Sat 11pm');
assert.equal(C.openState(tu, 0, 2 * 60), 'open', 'Sun 2am is still Saturday night');
assert.equal(C.openState(tu, 0, 20 * 60), 'closed', 'Sun 8pm');
assert.equal(C.openState(tu, 3, 18 * 60), 'closed', 'Wed 6pm, before opening');
assert.equal(C.lateClose(tu, 5), 27 * 60);
assert.equal(C.openState(C.parseHours('24/7'), 2, 4 * 60), 'open');
assert.equal(C.openState(C.parseHours('Closed · Opens 7 pm'), 2, 20 * 60), 'unknown', 'snapshot is not a schedule');
assert.equal(C.parseHours('Closed · Opens 7 pm').openHint, 19 * 60);
const fs = C.parseHours('Su-Th 16:00-01:00, Fr,Sa 16:00-02:00');
assert.equal(C.openState(fs, 5, 90), 'closed', 'Fri 1:30am: Thursday closed at 1am');
assert.equal(C.openState(fs, 6, 90), 'open', 'Sat 1:30am: Friday runs to 2am');
console.log('ok   hours');

// 2026-10-28 17:30 UTC is 01:30 on Thursday 29 Oct in Manila
const n = C.manilaNow(new Date('2026-10-28T17:30:00Z'));
assert.deepEqual(n, { dow: 4, min: 90, date: '2026-10-29' });
console.log('ok   manila clock', JSON.stringify(n));
console.log('selftest passed');
