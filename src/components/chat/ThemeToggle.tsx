import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  onToggle: () => void;
}

export const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onToggle}
    className="relative w-9 h-9 rounded-xl flex items-center justify-center glass-panel hover:border-primary/30 transition-colors"
    title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
  >
    <motion.div
      initial={false}
      animate={{ rotate: theme === 'dark' ? 0 : 180, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      {theme === 'dark' ? (
        <Moon className="w-4 h-4 text-primary" />
      ) : (
        <Sun className="w-4 h-4 text-amber-500" />
      )}
    </motion.div>
  </motion.button>
);
