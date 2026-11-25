import { motion } from 'framer-motion';
import { BELTS, CONFIG } from '../config';

const lerp = (a, b, t) => Math.round(a + (b - a) * t);
// 70% = #60FFB5  ->  100% = #00FF88
export function readyColor(p) {
  const t = Math.min(1, Math.max(0, (p - CONFIG.testReadyAt) / (100 - CONFIG.testReadyAt)));
  const a = [0x60, 0xff, 0xb5], b = [0x00, 0xff, 0x88];
  return `rgb(${a.map((v, i) => lerp(v, b[i], t)).join(',')})`;
}

function Card({ s, i, dir }) {
  const belt = BELTS[s.belt];
  const ready = s.progress >= CONFIG.testReadyAt;
  const dark = s.belt === 'black';
  return (
    <motion.div
      className={`row card${dark ? ' dark' : ''}${ready ? ' ready' : ''}`}
      style={!dark && ready ? { background: readyColor(s.progress) } : undefined}
      initial={{ opacity: 0, x: dir * 90 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 190, damping: 24, delay: 0.15 + i * 0.07 }}
    >
      <div className="name">{s.name}</div>
      <div className="chip" style={{ background: belt.bg, color: belt.fg }}>{belt.label}</div>
      <div className="prog">
        <div className="track">
          <motion.div
            className="fill"
            initial={{ width: 0 }}
            animate={{ width: `${s.progress}%` }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.4 + i * 0.07 }}
          />
        </div>
        <div className="pct">{Math.round(s.progress)}%</div>
      </div>
    </motion.div>
  );
}

function Column({ list, offset, dir }) {
  return (
    <div className="col">
      <div className="row head"><span>Name</span><span>Belt</span><span>Progress</span></div>
      <div className="cards">
        {list.map((s, i) => <Card key={s.name + s.belt} s={s} i={offset + i} dir={dir} />)}
      </div>
    </div>
  );
}

export default function LevelPage({ slide, updated, focus }) {
  const left = slide.students.slice(0, 5);
  const right = slide.students.slice(5);
  const levelFocus = focus?.[slide.level.key] ?? '';
  return (
    <>
      <div className="title">
        <h1>{slide.title} Rankings</h1>
        <h2>{slide.subtitle}</h2>
      </div>
      <div className="updated">Updated {updated}</div>
      <div className="wrap">
        <div className="focus"><span>{focus?.title ?? 'Monthly focus'}</span><span>{levelFocus}</span></div>
        <div className="cols">
          <Column list={left} offset={0} dir={-1} />
          <div className="divider" />
          {right.length ? <Column list={right} offset={5} dir={1} /> : <div />}
        </div>
        <div className="page">Page {slide.page} of {slide.pages}</div>
      </div>
    </>
  );
}
