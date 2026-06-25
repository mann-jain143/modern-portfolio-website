import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

export const TypingIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex gap-3"
    >
      <div className="flex-shrink-0 w-9 h-9 rounded-full glass-panel border border-primary/20 flex items-center justify-center">
        <Bot className="w-5 h-5 text-primary" />
      </div>
      <div className="message-ai rounded-2xl rounded-bl-md px-5 py-4">
        <div className="flex gap-1.5">
          <span className="typing-dot w-2 h-2 rounded-full bg-primary" />
          <span className="typing-dot w-2 h-2 rounded-full bg-primary" />
          <span className="typing-dot w-2 h-2 rounded-full bg-primary" />
        </div>
      </div>
    </motion.div>
  );
};
