import { useState, useCallback, useRef } from 'react';
import { toast } from 'sonner';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

export const useAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isProcessingRef = useRef(false);

  const sendMessage = useCallback(async (
    content: string,
    currentMessages: Message[],
    onUpdate: (messages: Message[]) => void,
  ) => {
    if (!content.trim() || isProcessingRef.current) return;
    isProcessingRef.current = true;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    const updatedMessages = [...currentMessages, userMessage];
    onUpdate(updatedMessages);
    setIsLoading(true);

    let assistantContent = '';

    try {
      const apiMessages = updatedMessages.map(m => ({ role: m.role, content: m.content }));

      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({}));
        const errorMsg = errorData.error || 'Something went wrong. Please try again.';
        if (resp.status === 429) toast.error('Rate limited — please wait a moment.');
        else if (resp.status === 402) toast.error('AI credits exhausted. Add funds in Settings → Workspace → Usage.');
        else toast.error(errorMsg);
        throw new Error(errorMsg);
      }

      if (!resp.body) throw new Error('No response body');

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let streamDone = false;
      const assistantId = crypto.randomUUID();

      const updateAssistant = (content: string) => {
        const msgs = [...updatedMessages, { id: assistantId, role: 'assistant' as const, content, timestamp: new Date() }];
        onUpdate(msgs);
      };

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') { streamDone = true; break; }
          try {
            const parsed = JSON.parse(jsonStr);
            const delta = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (delta) { assistantContent += delta; updateAssistant(assistantContent); }
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split('\n')) {
          if (!raw) continue;
          if (raw.endsWith('\r')) raw = raw.slice(0, -1);
          if (raw.startsWith(':') || raw.trim() === '') continue;
          if (!raw.startsWith('data: ')) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === '[DONE]') continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const delta = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (delta) { assistantContent += delta; updateAssistant(assistantContent); }
          } catch { /* ignore */ }
        }
      }

    } catch (error) {
      console.error('Error:', error);
      if (!assistantContent) {
        onUpdate([...updatedMessages, {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: "I'm sorry, I encountered an error. Please try again.",
          timestamp: new Date(),
        }]);
      }
    } finally {
      setIsLoading(false);
      isProcessingRef.current = false;
    }
  }, []);

  return { isLoading, sendMessage };
};
