import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [theme, setTheme] = useState<'dark' | 'light'>(() =>
    (localStorage.getItem('pf-theme') as 'dark' | 'light') || 'dark'
  );

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem('pf-theme', theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = links.map(l => document.getElementById(l.href.slice(1)));
      const y = window.scrollY + 120;
      for (const s of sections) {
        if (s && s.offsetTop <= y && s.offsetTop + s.offsetHeight > y) {
          setActive(s.id);
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="container mx-auto px-6">
        <nav className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
          scrolled ? 'glass' : 'bg-transparent'
        }`}>
          <a href="#home" className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl gradient-primary glow">
              <Sparkles className="h-4 w-4 text-white" />
            </span>
            <span className="text-gradient">Aurelius</span>
          </a>

          <ul className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-1.5">
            {links.map(l => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                    active === l.href.slice(1)
                      ? 'text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {active === l.href.slice(1) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 gradient-primary rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
              className="glass h-10 w-10 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Button asChild size="sm" className="hidden md:inline-flex gradient-primary border-0 rounded-full px-5 glow">
              <a href="#contact">Let's talk</a>
            </Button>
            <button
              className="md:hidden glass h-10 w-10 rounded-full flex items-center justify-center"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-3 glass rounded-2xl p-4 flex flex-col gap-1"
            >
              {links.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-xl hover:bg-secondary text-sm font-medium"
                >
                  {l.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
