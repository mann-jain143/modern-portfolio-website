import { motion } from 'framer-motion';
import { Layout, Code, Workflow, Zap } from 'lucide-react';
import { SectionHeader } from './Section';

const services = [
  { icon: Layout, title: 'Product Design', items: ['User research & strategy', 'UI/UX systems', 'Prototyping'], price: 'from $8k' },
  { icon: Code, title: 'Web Development', items: ['Next.js & React apps', 'Backend & APIs', 'Edge deployments'], price: 'from $12k' },
  { icon: Workflow, title: 'Design Systems', items: ['Token architecture', 'Component libraries', 'Documentation'], price: 'from $15k' },
  { icon: Zap, title: 'Brand & Identity', items: ['Visual identity', 'Marketing sites', 'Motion design'], price: 'from $6k' },
];

export function Services() {
  return (
    <section id="services" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Services"
          title="How I can help"
          description="Embedded engagements, sprint-based collaborations, or end-to-end product builds — flexible to your team's shape."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative glass rounded-3xl p-7 overflow-hidden card-hover"
            >
              <div className="absolute inset-0 rounded-3xl p-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   style={{ background: 'linear-gradient(135deg, hsl(243 75% 59%), hsl(270 80% 65%), transparent 70%)' }}>
                <div className="h-full w-full rounded-3xl bg-card" />
              </div>
              <div className="relative">
                <div className="h-12 w-12 rounded-2xl gradient-primary flex items-center justify-center mb-5 glow">
                  <s.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{s.title}</h3>
                <ul className="space-y-2 mb-5 text-sm text-muted-foreground">
                  {s.items.map(it => (
                    <li key={it} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-primary" /> {it}
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-border/50 font-mono text-xs uppercase tracking-widest text-foreground">{s.price}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
