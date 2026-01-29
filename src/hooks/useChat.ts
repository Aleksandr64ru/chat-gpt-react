import { useState } from "react";
import type { ChatMessage, ChatRequest, ChatResponse, ChatState } from "../types/chat";
import { v4 as uuidv4 } from "uuid";

export const useChat = () => {
  const [state, setState] = useState<ChatState>({
    messages: [],
    loading: false,
    error: null,
  });

  // Отправка сообщения
  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: "user",
      content: text,
      timestamp: Date.now(),
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      loading: true,
      error: null,
    }));

    try {
      const body: ChatRequest = { text };

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data: ChatResponse = await res.json();

      if (res.ok) {
        setState(prev => ({
          ...prev,
          messages: [...prev.messages, ...data.messages],
          loading: false,
        }));
      } else {
        throw new Error(data.error || "Ошибка при получении ответа");
      }
    } catch (err: unknown) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : "Неизвестная ошибка",
      }));
    }
  };

  return { ...state, sendMessage };
};
