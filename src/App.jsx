import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CONFIG } from './config';
import { useSheet } from './hooks/useSheet';
import { buildSlides, fmtDate } from './lib/students';
import Stage from './components/Stage';
import LevelPage from './components/LevelPage';
import ExtraPage from './components/ExtraPage';
import LevelBanner from './components/LevelBanner';

export default function App() {
  const { data, at, error } = useSheet();
  const latest = useRef({ data, at });
  latest.current = { data, at };

  // New sheet data is only applied at the end of a full cycle, so cards never jump mid-view
  const [snap, setSnap] = useState(null);
  useEffect(() => { if (!snap && data) setSnap({ data, at }); }, [data]);

  const slides = useMemo(() => (snap ? buildSlides(snap.data) : []), [snap]);
  const [pos, setPos] = useState({ i: 0, phase: 'banner' });

  useEffect(() => {
    if (!slides.length) return;
    if (!slides[pos.i]) { setPos({ i: 0, phase: 'banner' }); return; }
    const cur = slides[pos.i];
    const ms = (pos.phase === 'banner' ? CONFIG.bannerSeconds : cur.seconds ?? CONFIG.pageSeconds) * 1000;
    const t = setTimeout(() => {
      if (pos.phase === 'banner') { setPos({ i: pos.i, phase: 'page' }); return; }
      const wrap = pos.i + 1 >= slides.length;
      const next = wrap ? 0 : pos.i + 1;
      if (wrap && latest.current.data) setSnap({ data: latest.current.data, at: latest.current.at });
      const nextGroup = slides[next].group;
      setPos({ i: next, phase: nextGroup !== cur.group ? 'banner' : 'page' });
    }, ms);
    return () => clearTimeout(t);
  }, [pos, slides]);

  const slide = slides[pos.i];

  return (
    <Stage>
      {!slide ? (
        <div className="bscreen"><div className="bsub">{error ? 'Can’t reach Google Sheets. Retrying…' : 'Loading…'}</div></div>
      ) : (
        <AnimatePresence mode="wait">
          {pos.phase === 'banner' ? (
            <LevelBanner key={`banner-${pos.i}`} slide={slide} />
          ) : (
            <motion.div key={`page-${pos.i}`} className="screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -120, transition: { duration: 0.35 } }}>
              {slide.type === 'level'
                ? <LevelPage slide={slide} updated={fmtDate(snap.at)} />
                : <ExtraPage slide={slide} />}
              <motion.div className="timer" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: slide.seconds ?? CONFIG.pageSeconds, ease: 'linear' }} />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </Stage>
  );
}
