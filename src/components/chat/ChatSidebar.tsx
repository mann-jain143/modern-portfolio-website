import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Search, MessageSquare, Trash2, Pin, PinOff,
  Edit3, Check, X, Download, ChevronLeft
} from 'lucide-react';
import { Chat } from '@/hooks/useChatStore';
import { cn } from '@/lib/utils';

interface ChatSidebarProps {
  chats: Chat[];
  activeChatId: string | null;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  onDeleteChat: (id: string) => void;
  onRenameChat: (id: string, title: string) => void;
  onTogglePin: (id: string) => void;
  onExportChat: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const ChatSidebar = ({
  chats, activeChatId, searchQuery, onSearchChange,
  onNewChat, onSelectChat, onDeleteChat, onRenameChat,
  onTogglePin, onExportChat, isOpen, onClose,
}: ChatSidebarProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const startEdit = (chat: Chat) => {
    setEditingId(chat.id);
    setEditTitle(chat.title);
  };

  const saveEdit = () => {
    if (editingId && editTitle.trim()) {
      onRenameChat(editingId, editTitle.trim());
    }
    setEditingId(null);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -320 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={cn(
          'fixed lg:relative z-50 h-full w-[280px] flex flex-col',
          'glass-sidebar border-r border-border/50',
          'lg:translate-x-0',
          !isOpen && 'lg:w-0 lg:overflow-hidden lg:border-0'
        )}
      >
        {/* Header */}
        <div className="p-3 flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNewChat}
            className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </motion.button>
          <button onClick={onClose} className="lg:hidden p-2 rounded-lg hover:bg-muted/50 text-muted-foreground">
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="px-3 pb-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              placeholder="Search chats..."
              className="w-full pl-8 pr-3 py-2 bg-muted/30 rounded-lg text-xs placeholder:text-muted-foreground/60 outline-none focus:ring-1 focus:ring-primary/30 text-foreground"
            />
          </div>
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-2 space-y-0.5">
          <AnimatePresence mode="popLayout">
            {chats.map(chat => (
              <motion.div
                key={chat.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={cn(
                  'group relative rounded-xl px-3 py-2.5 cursor-pointer transition-all duration-200',
                  activeChatId === chat.id
                    ? 'bg-primary/15 text-foreground'
                    : 'hover:bg-muted/40 text-muted-foreground hover:text-foreground'
                )}
                onClick={() => onSelectChat(chat.id)}
              >
                {editingId === chat.id ? (
                  <div className="flex items-center gap-1">
                    <input
                      value={editTitle}
                      onChange={e => setEditTitle(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && saveEdit()}
                      className="flex-1 bg-muted/50 rounded px-2 py-1 text-xs outline-none text-foreground"
                      autoFocus
                      onClick={e => e.stopPropagation()}
                    />
                    <button onClick={e => { e.stopPropagation(); saveEdit(); }} className="p-1 hover:text-primary">
                      <Check className="w-3 h-3" />
                    </button>
                    <button onClick={e => { e.stopPropagation(); setEditingId(null); }} className="p-1 hover:text-destructive">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="text-xs font-medium truncate flex-1">{chat.title}</span>
                      {chat.pinned && <Pin className="w-3 h-3 text-primary flex-shrink-0" />}
                    </div>
                    <p className="text-[10px] text-muted-foreground/60 mt-1 ml-5.5">
                      {formatDate(chat.updatedAt)} · {chat.messages.length} msgs
                    </p>

                    {/* Actions */}
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-0.5 bg-background/80 rounded-lg px-1 py-0.5">
                      <button onClick={e => { e.stopPropagation(); startEdit(chat); }} className="p-1 hover:text-primary" title="Rename">
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button onClick={e => { e.stopPropagation(); onTogglePin(chat.id); }} className="p-1 hover:text-primary" title={chat.pinned ? 'Unpin' : 'Pin'}>
                        {chat.pinned ? <PinOff className="w-3 h-3" /> : <Pin className="w-3 h-3" />}
                      </button>
                      <button onClick={e => { e.stopPropagation(); onExportChat(chat.id); }} className="p-1 hover:text-primary" title="Export">
                        <Download className="w-3 h-3" />
                      </button>
                      <button onClick={e => { e.stopPropagation(); onDeleteChat(chat.id); }} className="p-1 hover:text-destructive" title="Delete">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {chats.length === 0 && (
            <div className="text-center py-8 text-muted-foreground/50 text-xs">
              {searchQuery ? 'No chats found' : 'No conversations yet'}
            </div>
          )}
        </div>
      </motion.aside>
    </>
  );
};
