import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, Check, Github, Linkedin, Twitter, Dribbble } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SectionHeader } from './Section';

export function Contact() {
  const [state, setState] = useState<{ name: string; email: string; msg: string }>({ name: '', email: '', msg: '' });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!state.name.trim()) newErrors.name = 'Name is required';
    if (!state.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email required';
    if (state.msg.trim().length < 10) newErrors.msg = 'Message too short';
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;
    setSent(true);
    setTimeout(() => { setSent(false); setState({ name: '', email: '', msg: '' }); }, 3500);
  };

  return (
    <section id="contact" className="relative py-32">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Get in touch"
          title="Let's build something memorable"
          description="Whether it's a refined concept or a bold rebrand, I'd love to hear about it. Response time: usually within 24 hours."
        />

        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="glass rounded-3xl p-6">
              <Mail className="h-5 w-5 text-primary mb-3" />
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Email</p>
              <a href="mailto:hello@aurelius.studio" className="font-display text-lg hover:text-primary transition-colors">hello@aurelius.studio</a>
            </div>
            <div className="glass rounded-3xl p-6">
              <MapPin className="h-5 w-5 text-primary mb-3" />
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Based in</p>
              <p className="font-display text-lg">Lisbon, Portugal · Remote-first</p>
            </div>
            <div className="glass rounded-3xl p-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Follow</p>
              <div className="flex gap-2">
                {[Github, Linkedin, Twitter, Dribbble].map((Ic, i) => (
                  <a key={i} href="#" className="h-10 w-10 rounded-full glass flex items-center justify-center hover:scale-110 hover:text-primary transition-all">
                    <Ic className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3 glass rounded-3xl p-8 space-y-5 relative overflow-hidden"
          >
            <div className="absolute inset-0 gradient-mesh opacity-30 pointer-events-none" />
            <div className="relative space-y-5">
              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Your name</label>
                <Input
                  value={state.name}
                  onChange={e => setState({ ...state, name: e.target.value })}
                  className="mt-2 h-12 rounded-xl bg-background/50 border-border/50"
                  placeholder="Jane Doe"
                />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Email</label>
                <Input
                  type="email"
                  value={state.email}
                  onChange={e => setState({ ...state, email: e.target.value })}
                  className="mt-2 h-12 rounded-xl bg-background/50 border-border/50"
                  placeholder="jane@company.com"
                />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Tell me about your project</label>
                <Textarea
                  value={state.msg}
                  onChange={e => setState({ ...state, msg: e.target.value })}
                  rows={5}
                  className="mt-2 rounded-xl bg-background/50 border-border/50 resize-none"
                  placeholder="A few lines about your goals, timeline, and budget..."
                />
                {errors.msg && <p className="text-xs text-destructive mt-1">{errors.msg}</p>}
              </div>

              <Button type="submit" size="lg" className="w-full gradient-primary border-0 rounded-xl h-12 glow group" disabled={sent}>
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.span key="ok" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <Check className="h-4 w-4" /> Message sent — thank you!
                    </motion.span>
                  ) : (
                    <motion.span key="send" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      Send message <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
