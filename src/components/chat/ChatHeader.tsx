import { Trash2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatHeaderProps {
  onClear: () => void;
}

export const ChatHeader = ({ onClear }: ChatHeaderProps) => {
  return (
    <div className="flex items-center gap-3 flex-1">
      <motion.div
        initial={{ rotate: -180, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <div className="w-8 h-8 rounded-xl gradient-primary glow-primary flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-primary-foreground" />
        </div>
      </motion.div>

      <div>
        <h1 className="text-sm font-bold text-gradient tracking-tight">GENIE AI</h1>
        <p className="text-[10px] text-muted-foreground">Next-gen AI assistant</p>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClear}
        className="p-2 rounded-xl hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
        title="Clear chat"
      >
        <Trash2 className="w-4 h-4" />
      </motion.button>
    </div>
  );
};
