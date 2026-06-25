import { Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 py-12 mt-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-9 w-9 rounded-xl gradient-primary flex items-center justify-center glow">
                <Sparkles className="h-4 w-4 text-white" />
              </span>
              <span className="font-display text-xl font-bold text-gradient">Aurelius Vale</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              Independent designer & engineer crafting digital products for ambitious teams worldwide.
            </p>
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Navigate</p>
            <ul className="space-y-2 text-sm">
              {['About', 'Work', 'Experience', 'Contact'].map(l => (
                <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-primary transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Elsewhere</p>
            <ul className="space-y-2 text-sm">
              {['GitHub', 'LinkedIn', 'Twitter', 'Dribbble'].map(l => (
                <li key={l}><a href="#" className="hover:text-primary transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-8 border-t border-border/50 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Aurelius Vale. All rights reserved.</p>
          <p className="font-mono">Crafted with care · v3.0</p>
        </div>
      </div>
    </footer>
  );
}
