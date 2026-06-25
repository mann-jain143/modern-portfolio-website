import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { SectionHeader } from './Section';

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, v => Math.floor(v).toLocaleString());

  useEffect(() => {
    if (inView) animate(mv, to, { duration: 2, ease: [0.22, 1, 0.36, 1] });
  }, [inView, to, mv]);

  return (
    <span ref={ref} className="font-display text-5xl md:text-6xl font-bold text-gradient-primary">
      <motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
}

const stats = [
  { value: 120, suffix: '+', label: 'Projects Shipped' },
  { value: 48, suffix: '', label: 'Happy Clients' },
  { value: 8, suffix: 'y', label: 'Years Experience' },
  { value: 14, suffix: '', label: 'Awards Won' },
];

export function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="About"
          title={<>A designer who codes,<br/>an engineer who designs.</>}
          description="I bridge the gap between bold ideas and pixel-perfect execution. From early-stage startups shipping their first MVP to enterprise teams scaling design systems — I help build products people genuinely love."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-20">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glass rounded-3xl p-8 text-center card-hover relative overflow-hidden"
            >
              <div className="absolute inset-0 gradient-mesh opacity-40 pointer-events-none" />
              <Counter to={s.value} suffix={s.suffix} />
              <p className="mt-2 text-sm uppercase tracking-widest text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
