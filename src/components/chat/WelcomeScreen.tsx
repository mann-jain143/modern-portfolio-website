import { motion } from 'framer-motion';
import { Brain, Code, Globe, Lightbulb, Sparkles, Zap } from 'lucide-react';

interface WelcomeScreenProps {
  onSuggestionClick: (suggestion: string) => void;
}

const suggestions = [
  { icon: Code, text: 'Write a Python program for factorial' },
  { icon: Lightbulb, text: 'Explain JavaScript closures' },
  { icon: Globe, text: 'What is the Taj Mahal?' },
  { icon: Brain, text: 'What is AI and how does it work?' },
];

export const WelcomeScreen = ({ onSuggestionClick }: WelcomeScreenProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="relative mx-auto mb-6"
        >
          <div className="w-20 h-20 rounded-2xl gradient-primary glow-primary flex items-center justify-center mx-auto">
            <Sparkles className="w-10 h-10 text-primary-foreground" />
          </div>
          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-2xl gradient-primary blur-xl opacity-30"
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-gradient mb-2"
        >
          Welcome to GENIE AI
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground text-sm mb-8"
        >
          Your intelligent AI assistant powered by cutting-edge models.
          Ask anything — code, research, explanations, and more.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-4 text-xs text-muted-foreground mb-8"
        >
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span>Smart Answers</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-muted-foreground" />
          <div className="flex items-center gap-1.5">
            <Brain className="w-3.5 h-3.5 text-primary" />
            <span>Context-Aware</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 gap-2"
        >
          <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
          {suggestions.map((suggestion, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSuggestionClick(suggestion.text)}
              className="flex items-center gap-3 p-3 rounded-xl glass-panel hover:border-primary/30 transition-all text-left group"
            >
              <suggestion.icon className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {suggestion.text}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};
