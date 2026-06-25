import { useState, useCallback, useEffect } from 'react';
import { Message } from './useAI';

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  pinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const STORAGE_KEY = 'genie-ai-chats';
const ACTIVE_KEY = 'genie-ai-active-chat';

function loadChats(): Chat[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw).map((c: any) => ({
      ...c,
      createdAt: new Date(c.createdAt),
      updatedAt: new Date(c.updatedAt),
      messages: c.messages.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })),
    }));
  } catch { return []; }
}

function saveChats(chats: Chat[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
}

function generateTitle(firstMessage: string): string {
  const trimmed = firstMessage.trim().slice(0, 50);
  return trimmed.length < firstMessage.trim().length ? trimmed + '…' : trimmed;
}

export function useChatStore() {
  const [chats, setChats] = useState<Chat[]>(loadChats);
  const [activeChatId, setActiveChatId] = useState<string | null>(
    () => localStorage.getItem(ACTIVE_KEY)
  );
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => { saveChats(chats); }, [chats]);
  useEffect(() => {
    if (activeChatId) localStorage.setItem(ACTIVE_KEY, activeChatId);
    else localStorage.removeItem(ACTIVE_KEY);
  }, [activeChatId]);

  const activeChat = chats.find(c => c.id === activeChatId) || null;

  const createChat = useCallback(() => {
    const chat: Chat = {
      id: crypto.randomUUID(),
      title: 'New Chat',
      messages: [],
      pinned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setChats(prev => [chat, ...prev]);
    setActiveChatId(chat.id);
    return chat.id;
  }, []);

  const deleteChat = useCallback((id: string) => {
    setChats(prev => prev.filter(c => c.id !== id));
    setActiveChatId(prev => prev === id ? null : prev);
  }, []);

  const renameChat = useCallback((id: string, title: string) => {
    setChats(prev => prev.map(c => c.id === id ? { ...c, title, updatedAt: new Date() } : c));
  }, []);

  const togglePin = useCallback((id: string) => {
    setChats(prev => prev.map(c => c.id === id ? { ...c, pinned: !c.pinned, updatedAt: new Date() } : c));
  }, []);

  const updateMessages = useCallback((id: string, messages: Message[]) => {
    setChats(prev => prev.map(c => {
      if (c.id !== id) return c;
      const title = c.title === 'New Chat' && messages.length > 0
        ? generateTitle(messages[0].content)
        : c.title;
      return { ...c, messages, title, updatedAt: new Date() };
    }));
  }, []);

  const clearChat = useCallback((id: string) => {
    setChats(prev => prev.map(c => c.id === id ? { ...c, messages: [], updatedAt: new Date() } : c));
  }, []);

  const filteredChats = chats.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.messages.some(m => m.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedChats = [...filteredChats].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return b.updatedAt.getTime() - a.updatedAt.getTime();
  });

  return {
    chats: sortedChats,
    activeChat,
    activeChatId,
    searchQuery,
    setSearchQuery,
    setActiveChatId,
    createChat,
    deleteChat,
    renameChat,
    togglePin,
    updateMessages,
    clearChat,
  };
}
