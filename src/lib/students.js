import { CONFIG, BELTS } from '../config';

// rows come from Sheets as [Name, Belt Level, Progress, Focus]
export function parseRows(rows) {
  const out = [];
  for (const r of rows) {
    const raw = String(r[0] ?? '').trim();
    const belt = String(r[1] ?? '').trim().toLowerCase();
    if (!raw) continue;
    if (!BELTS[belt]) { console.warn('Unknown belt, skipping row:', r); continue; }
    let name = raw;
    if (/\s\S$/.test(name)) name += '.';       // "Brian W" -> "Brian W."
    let p = parseFloat(String(r[2] ?? '0').replace('%', ''));
    if (Number.isNaN(p)) p = 0;
    if (!String(r[2]).includes('%') && p > 0 && p <= 1 && String(r[2]).includes('.')) p *= 100;
    out.push({ name, belt, progress: Math.max(0, Math.min(100, p)) });
  }
  return out;
}

// Turns students into an ordered list of screens (pages) to cycle through
export function buildSlides(students) {
  const slides = [];
  for (const level of CONFIG.levels) {
    const list = students
      .filter((s) => level.belts.includes(s.belt))
      .sort((a, b) => b.progress - a.progress || a.name.localeCompare(b.name));
    const pages = Math.ceil(list.length / CONFIG.perPage);   // 0 students = level skipped
    for (let p = 0; p < pages; p++) {
      slides.push({
        type: 'level', group: level.key, level, page: p + 1, pages,
        title: `${level.name} Level`,
        subtitle: `${BELTS[level.belts[0]].label} - ${BELTS[level.belts.at(-1)].label} BELT`,
        belts: level.belts,
        students: list.slice(p * CONFIG.perPage, (p + 1) * CONFIG.perPage),
      });
    }
  }
  for (const e of CONFIG.extraPages) {
    if (e.enabled) slides.push({ type: 'extra', group: e.key, belts: [], ...e });
  }
  return slides;
}

export const fmtDate = (d) =>
  [d.getMonth() + 1, d.getDate(), d.getFullYear() % 100].map((n) => String(n).padStart(2, '0')).join('/');
