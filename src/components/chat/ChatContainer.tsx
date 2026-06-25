import { useRef, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { WelcomeScreen } from './WelcomeScreen';
import { ChatInput } from './ChatInput';
import { ChatHeader } from './ChatHeader';
import { ChatSidebar } from './ChatSidebar';
import { ThemeToggle } from './ThemeToggle';
import { useAI } from '@/hooks/useAI';
import { useChatStore } from '@/hooks/useChatStore';
import { useTheme } from '@/hooks/useTheme';
import { useState } from 'react';

export const ChatContainer = () => {
  const store = useChatStore();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Get messages for active chat
  const activeMessages = store.activeChat?.messages || [];

  const { isLoading, sendMessage: sendAIMessage } = useAI();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages, isLoading]);

  const handleSend = useCallback(async (content: string) => {
    let chatId = store.activeChatId;
    if (!chatId) {
      chatId = store.createChat();
    }

    // We need to pass current messages + handle streaming updates
    await sendAIMessage(content, activeMessages, (updatedMessages) => {
      store.updateMessages(chatId!, updatedMessages);
    });
  }, [store.activeChatId, activeMessages, sendAIMessage, store.createChat, store.updateMessages]);

  const handleClear = useCallback(() => {
    if (store.activeChatId) {
      store.clearChat(store.activeChatId);
    }
  }, [store.activeChatId, store.clearChat]);

  const handleExport = useCallback((chatId: string) => {
    const chat = store.chats.find(c => c.id === chatId);
    if (!chat) return;
    const text = chat.messages
      .map(m => `[${m.role.toUpperCase()}] ${m.content}`)
      .join('\n\n---\n\n');
    const blob = new Blob([`# ${chat.title}\n\n${text}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${chat.title.replace(/[^a-z0-9]/gi, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [store.chats]);

  return (
    <div className="flex h-screen w-full gradient-dark">
      <ChatSidebar
        chats={store.chats}
        activeChatId={store.activeChatId}
        searchQuery={store.searchQuery}
        onSearchChange={store.setSearchQuery}
        onNewChat={store.createChat}
        onSelectChat={store.setActiveChatId}
        onDeleteChat={store.deleteChat}
        onRenameChat={store.renameChat}
        onTogglePin={store.togglePin}
        onExportChat={handleExport}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center px-4 py-3 border-b border-border/30">
          <button
            onClick={() => setSidebarOpen(prev => !prev)}
            className="p-2 rounded-xl hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors mr-2"
          >
            <Menu className="w-5 h-5" />
          </button>
          <ChatHeader onClear={handleClear} />
          <div className="ml-auto">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {activeMessages.length === 0 ? (
            <WelcomeScreen onSuggestionClick={handleSend} />
          ) : (
            <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
              <AnimatePresence mode="popLayout">
                {activeMessages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isLoading && activeMessages[activeMessages.length - 1]?.role !== 'assistant' && <TypingIndicator />}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="px-4 pb-6 pt-2 max-w-3xl mx-auto w-full">
          <ChatInput onSend={handleSend} disabled={isLoading} />
          <p className="text-center text-xs text-muted-foreground mt-3">
            Powered by AI • Responses may not always be accurate
          </p>
        </div>
      </div>
    </div>
  );
};
