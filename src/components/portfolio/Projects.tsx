import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, Search } from 'lucide-react';
import { SectionHeader } from './Section';
import { Input } from '@/components/ui/input';

const projects = [
  { title: 'Nebula Analytics', category: 'SaaS', tags: ['React', 'D3', 'Edge'], desc: 'Real-time analytics dashboard powering 12B events/month for fintech leaders.', gradient: 'from-indigo-500 via-purple-500 to-pink-500' },
  { title: 'Lumen Banking', category: 'Fintech', tags: ['iOS', 'Motion'], desc: 'A consumer banking app rebuild that increased weekly active users by 47%.', gradient: 'from-cyan-500 via-blue-500 to-indigo-600' },
  { title: 'Pulse AI Studio', category: 'AI', tags: ['Next.js', 'LLM'], desc: 'Multimodal creative tool turning sketches and prompts into production assets.', gradient: 'from-fuchsia-500 via-pink-500 to-rose-500' },
  { title: 'Harvest OS', category: 'SaaS', tags: ['Design System'], desc: 'Operating system for modern farms — 4-region rollout, 1,200+ daily users.', gradient: 'from-emerald-500 via-teal-500 to-cyan-500' },
  { title: 'Atelier Commerce', category: 'E-commerce', tags: ['Shopify', '3D'], desc: 'Immersive product showroom blending WebGL configurators with luxury retail.', gradient: 'from-amber-500 via-orange-500 to-rose-500' },
  { title: 'Orbit Collab', category: 'SaaS', tags: ['Realtime', 'CRDT'], desc: 'Multiplayer roadmap tool with sub-50ms collaboration across 6 continents.', gradient: 'from-violet-500 via-indigo-500 to-blue-500' },
];

const categories = ['All', 'SaaS', 'Fintech', 'AI', 'E-commerce'];

export function Projects() {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = projects.filter(p =>
    (filter === 'All' || p.category === filter) &&
    (query === '' || p.title.toLowerCase().includes(query.toLowerCase()) || p.desc.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <section id="projects" className="relative py-32">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Selected Work"
          title="Recent projects"
          description="A curated selection of products and platforms shipped over the past three years."
        />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === c ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground glass'
                }`}
              >
                {filter === c && (
                  <motion.span layoutId="filter-pill" className="absolute inset-0 gradient-primary rounded-full -z-10" />
                )}
                {c}
              </button>
            ))}
          </div>
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="pl-10 glass border-border/50 rounded-full"
            />
          </div>
        </div>

        <motion.div layout className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.article
                layout
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ y: -8 }}
                className="group glass rounded-3xl overflow-hidden relative"
              >
                <div className={`aspect-[16/10] bg-gradient-to-br ${p.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 grid-pattern opacity-30" />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="font-display text-4xl md:text-5xl font-bold text-white/90 drop-shadow-2xl">{p.title}</span>
                  </motion.div>
                  <div className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-xs font-mono uppercase tracking-widest">{p.category}</div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-display text-2xl font-semibold">{p.title}</h3>
                    <div className="flex gap-2">
                      <a href="#" className="h-9 w-9 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform" aria-label="GitHub">
                        <Github className="h-4 w-4" />
                      </a>
                      <a href="#" className="h-9 w-9 rounded-full gradient-primary flex items-center justify-center hover:scale-110 transition-transform" aria-label="Live demo">
                        <ArrowUpRight className="h-4 w-4 text-white" />
                      </a>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map(t => (
                      <span key={t} className="text-xs font-mono px-3 py-1 rounded-full bg-secondary text-muted-foreground">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-16">No projects match your search.</p>
        )}
      </div>
    </section>
  );
}
