import { motion } from 'framer-motion';

// Blank-by-default pages (Student of the Month, Recent Belt Testers, ...)
export default function ExtraPage({ slide }) {
  return (
    <>
      <div className="title">
        <h1>{slide.title}</h1>
        <h2>{slide.subtitle}</h2>
      </div>
      <div className="wrap">
        <motion.div className="frame" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
          {slide.image ? <img src={slide.image} alt={slide.title} /> : <div className="placeholder">Add an image in config.js</div>}
        </motion.div>
        {slide.caption && <div className="focus"><span>{slide.caption}</span></div>}
      </div>
    </>
  );
}
