import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: ReactNode; description?: string }) {
  return (
    <div className="max-w-3xl mx-auto text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 mb-5 text-xs font-mono uppercase tracking-widest text-muted-foreground"
      >
        <span className="h-1 w-1 rounded-full bg-primary" /> {eyebrow}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-gradient"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-muted-foreground text-lg leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
