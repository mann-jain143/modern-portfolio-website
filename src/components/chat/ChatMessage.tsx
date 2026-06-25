import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Bot, User } from 'lucide-react';
import { Message } from '@/hooks/useAI';
import { CopyButton } from './CopyButton';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn('flex gap-3 w-full group', isUser ? 'flex-row-reverse' : 'flex-row')}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center',
          isUser ? 'gradient-primary' : 'glass-panel border border-primary/20'
        )}
      >
        {isUser ? <User className="w-4 h-4 text-primary-foreground" /> : <Bot className="w-4 h-4 text-primary" />}
      </motion.div>

      <div className="max-w-[80%] relative">
        <div
          className={cn(
            'rounded-2xl px-4 py-3',
            isUser ? 'message-user rounded-br-md' : 'message-ai rounded-bl-md'
          )}
        >
          {isUser ? (
            <p className="text-sm leading-relaxed">{message.content}</p>
          ) : (
            <div className="prose-chat text-sm">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* Copy + timestamp */}
        <div className={cn(
          'flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity',
          isUser ? 'justify-end' : 'justify-start'
        )}>
          <CopyButton text={message.content} />
          <span className="text-[10px] text-muted-foreground/50">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
