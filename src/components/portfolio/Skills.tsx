import { motion } from 'framer-motion';
import { Code2, Palette, Layers, Sparkles, Database, Smartphone, Gauge, Bot } from 'lucide-react';
import { SectionHeader } from './Section';

const skills = [
  { icon: Palette, title: 'Product Design', desc: 'Figma, design systems, interaction design, prototyping.', level: 96, tag: 'Design' },
  { icon: Code2, title: 'Frontend Engineering', desc: 'React, TypeScript, Next.js, Tailwind, Framer Motion.', level: 94, tag: 'Code' },
  { icon: Layers, title: 'Design Systems', desc: 'Tokens, components, governance, multi-brand theming.', level: 92, tag: 'Systems' },
  { icon: Database, title: 'Backend & APIs', desc: 'Node, Postgres, Supabase, edge functions, GraphQL.', level: 85, tag: 'Code' },
  { icon: Smartphone, title: 'Mobile', desc: 'React Native, Expo, native-feel motion and gestures.', level: 80, tag: 'Code' },
  { icon: Bot, title: 'AI Integration', desc: 'LLM workflows, RAG, streaming, agentic interfaces.', level: 88, tag: 'AI' },
  { icon: Sparkles, title: 'Motion Design', desc: 'Spring physics, scroll choreography, micro-interactions.', level: 90, tag: 'Design' },
  { icon: Gauge, title: 'Performance', desc: 'Core Web Vitals, bundle budgeting, edge rendering.', level: 87, tag: 'Code' },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="container mx-auto px-6 relative">
        <SectionHeader
          eyebrow="Capabilities"
          title="Tools of the craft"
          description="A full-stack toolkit refined over a decade of shipping production interfaces."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: (i % 4) * 0.08, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="group glass rounded-3xl p-6 relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-start justify-between mb-5">
                  <div className="h-12 w-12 rounded-2xl gradient-primary flex items-center justify-center glow">
                    <s.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground glass rounded-full px-2 py-1">{s.tag}</span>
                </div>
                <h3 className="font-display text-lg font-semibold mb-1.5">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{s.desc}</p>
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="text-muted-foreground">Proficiency</span>
                  <span className="text-foreground">{s.level}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full gradient-primary rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
