import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';
import { VoiceInput } from './VoiceInput';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput = ({ onSend, disabled, placeholder = 'Ask GENIE anything...' }: ChatInputProps) => {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
      if (textareaRef.current) textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  return (
    <form onSubmit={handleSubmit} className="relative">
      <motion.div
        animate={{ boxShadow: isFocused ? 'var(--glow-primary)' : 'none' }}
        transition={{ duration: 0.2 }}
        className={cn(
          'relative flex items-end gap-2 glass-panel rounded-2xl p-2 transition-all duration-300',
          isFocused && 'border-primary/40'
        )}
      >
        <VoiceInput
          onTranscript={(text) => setInput(prev => prev ? prev + ' ' + text : text)}
          disabled={disabled}
        />

        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className={cn(
              'w-full bg-transparent text-foreground placeholder:text-muted-foreground',
              'resize-none outline-none py-2 px-2 text-sm leading-relaxed',
              'max-h-[150px] min-h-[40px]',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          />
        </div>

        <motion.button
          type="submit"
          disabled={!input.trim() || disabled}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            'flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300',
            input.trim() && !disabled
              ? 'gradient-primary glow-primary cursor-pointer'
              : 'bg-muted cursor-not-allowed'
          )}
        >
          {disabled ? (
            <Sparkles className="w-5 h-5 text-muted-foreground animate-pulse" />
          ) : (
            <Send className={cn('w-5 h-5', input.trim() ? 'text-primary-foreground' : 'text-muted-foreground')} />
          )}
        </motion.button>
      </motion.div>
    </form>
  );
};
