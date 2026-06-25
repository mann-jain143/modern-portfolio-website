import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const headline = ['Designing', 'digital', 'experiences', 'that', 'feel', 'alive.'];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* Mesh background */}
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />
      <div className="absolute inset-0 grid-pattern pointer-events-none opacity-60" />

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-primary/20 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-accent/20 blur-3xl"
      />

      <div className="container mx-auto px-6 relative">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8 text-xs font-mono"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-muted-foreground">Available for new projects · 2026</span>
          </motion.div>

          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold leading-[1.05] tracking-tighter mb-8">
            {headline.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block mr-3"
              >
                {word === 'alive.' ? <span className="text-gradient-primary italic font-serif">{word}</span> : <span className="text-gradient">{word}</span>}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            I'm <span className="text-foreground font-medium">Aurelius Vale</span> — a product designer & full-stack engineer crafting interfaces for ambitious startups and Fortune 500 teams.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-12"
          >
            <Button asChild size="lg" className="gradient-primary border-0 rounded-full px-7 h-12 glow group">
              <a href="#projects">
                View my work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-7 h-12 glass border-border/50">
              <a href="#" download>
                <Download className="h-4 w-4" /> Download Resume
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex items-center justify-center gap-3"
          >
            {[
              { Icon: Github, href: '#' },
              { Icon: Linkedin, href: '#' },
              { Icon: Twitter, href: '#' },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="glass h-11 w-11 rounded-full flex items-center justify-center hover:scale-110 hover:text-primary transition-all"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Brand marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-24 relative overflow-hidden"
        >
          <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">Trusted by teams at</p>
          <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,white_20%,white_80%,transparent)]">
            <div className="flex marquee gap-16 pr-16 text-2xl font-display font-semibold text-muted-foreground/60 whitespace-nowrap">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-16 pr-16">
                  {['Linear', 'Vercel', 'Stripe', 'Notion', 'Figma', 'Framer', 'Arc', 'Raycast'].map(b => (
                    <span key={b}>{b}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
