import { motion } from 'framer-motion';
import { BELTS } from '../config';

// Full-screen title card shown when the level / section changes
export default function LevelBanner({ slide }) {
  return (
    <motion.div className="bscreen" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.3 } }}>
      <motion.div className="wipe" initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 0.9, ease: 'easeInOut' }} />
      <motion.div className="bcard" initial={{ x: -1400, rotate: -4 }} animate={{ x: 0, rotate: 0 }} exit={{ x: 1400 }}
        transition={{ type: 'spring', stiffness: 130, damping: 16, delay: 0.5 }}>
        {slide.title}
      </motion.div>
      {slide.subtitle && (
        <motion.div className="bsub" initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1, duration: 0.4 }}>
          {slide.subtitle}
        </motion.div>
      )}
      <div className="bchips">
        {slide.belts.map((b, i) => (
          <motion.div key={b} className="chip" style={{ background: BELTS[b].bg, color: BELTS[b].fg }}
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 1.1 + i * 0.1 }}>
            {BELTS[b].label}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
