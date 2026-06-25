import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeader } from './Section';

const items = [
  { quote: "Aurelius rebuilt our entire product surface in a quarter. Conversion jumped 47% and our team's velocity doubled.", name: 'Maya Chen', role: 'CPO, Lumen', avatar: 'MC' },
  { quote: "The most thoughtful designer I've worked with. Equally comfortable in Figma and a Next.js codebase. Rare combo.", name: 'David Park', role: 'CEO, Orbit', avatar: 'DP' },
  { quote: "A masterclass in interface craft. Every interaction felt considered. Worth every dollar and then some.", name: 'Sofia Reyes', role: 'Head of Design, Stripe', avatar: 'SR' },
  { quote: "Shipped a design system that's still scaling four years later. He built it like an engineer and shipped it like a designer.", name: 'Jonas Weber', role: 'VP Eng, Vercel', avatar: 'JW' },
];

export function Testimonials() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % items.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative py-32">
      <div className="container mx-auto px-6">
        <SectionHeader eyebrow="Testimonials" title="Kind words" description="From the founders, designers, and engineers I've had the privilege to work alongside." />

        <div className="max-w-3xl mx-auto relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 h-20 w-20 rounded-full gradient-primary flex items-center justify-center glow">
            <Quote className="h-8 w-8 text-white" />
          </div>

          <div className="glass rounded-3xl p-10 md:p-14 pt-16 md:pt-20 relative overflow-hidden min-h-[280px]">
            <div className="absolute inset-0 gradient-mesh opacity-40 pointer-events-none" />
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative text-center"
              >
                <p className="font-display text-xl md:text-2xl leading-relaxed mb-8 text-foreground">"{items[idx].quote}"</p>
                <div className="flex items-center justify-center gap-3">
                  <div className="h-12 w-12 rounded-full gradient-primary flex items-center justify-center font-display font-bold text-white">{items[idx].avatar}</div>
                  <div className="text-left">
                    <p className="font-semibold">{items[idx].name}</p>
                    <p className="text-sm text-muted-foreground">{items[idx].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            <button onClick={() => setIdx(i => (i - 1 + items.length) % items.length)} className="h-10 w-10 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} className={`h-2 rounded-full transition-all ${i === idx ? 'w-8 gradient-primary' : 'w-2 bg-border'}`} />
              ))}
            </div>
            <button onClick={() => setIdx(i => (i + 1) % items.length)} className="h-10 w-10 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
