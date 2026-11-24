import { useEffect, useState } from 'react';

// Design is built at 1920x1080 and scaled to fit any screen (4K = 2x)
const fit = () => Math.min(window.innerWidth / 1920, window.innerHeight / 1080);

export default function Stage({ children }) {
  const [s, setS] = useState(fit);
  useEffect(() => {
    const on = () => setS(fit());
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return (
    <div className="stage" style={{ transform: `translate(-50%,-50%) scale(${s})` }}>
      {children}
    </div>
  );
}
