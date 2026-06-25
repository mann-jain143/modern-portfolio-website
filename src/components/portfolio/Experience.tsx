import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { SectionHeader } from './Section';

const items = [
  { year: '2023 — Now', role: 'Principal Designer', company: 'Vercel', desc: 'Leading design for the deployment platform — design systems, dashboard, and CLI experiences.' },
  { year: '2021 — 2023', role: 'Design Engineer', company: 'Linear', desc: 'Shipped the Cycles, Roadmap, and Insights surfaces. Built the motion language and the v2 design system.' },
  { year: '2019 — 2021', role: 'Senior Product Designer', company: 'Stripe', desc: 'Led design for Stripe Atlas and Checkout. Drove a 38% increase in onboarding completion.' },
  { year: '2017 — 2019', role: 'Founding Designer', company: 'Cobalt (acquired)', desc: 'First design hire — defined brand, product, and helped grow to 40k users before acquisition.' },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-32">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Career"
          title="A decade of craft"
          description="Selected roles across early-stage startups and category-defining product teams."
        />

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-5 md:left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
          {items.map((it, i) => (
            <motion.div
              key={it.role}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative mb-10 md:grid md:grid-cols-2 md:gap-12 ${i % 2 ? 'md:[&>div:first-child]:order-2' : ''}`}
            >
              <div className={`pl-14 md:pl-0 ${i % 2 ? 'md:text-left md:pl-12' : 'md:text-right md:pr-12'}`}>
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{it.year}</span>
                <h3 className="font-display text-2xl font-semibold mt-1">{it.role}</h3>
                <p className="text-primary font-medium">{it.company}</p>
              </div>
              <div className={`pl-14 md:pl-12 mt-2 md:mt-0 ${i % 2 ? 'md:pl-0 md:pr-12 md:text-right' : ''}`}>
                <p className="text-muted-foreground leading-relaxed">{it.desc}</p>
              </div>
              <div className="absolute left-0 md:left-1/2 top-1 md:-translate-x-1/2 h-10 w-10 rounded-full glass flex items-center justify-center glow">
                <Briefcase className="h-4 w-4 text-primary" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
