import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [show, setShow] = useState(false);

  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', on);
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <>
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-0.5 gradient-primary origin-left z-[60]" />
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full gradient-primary flex items-center justify-center glow z-50 hover:scale-110 transition-transform"
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5 text-white" />
      </motion.button>
    </>
  );
}
