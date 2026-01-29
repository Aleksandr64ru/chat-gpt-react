import type { ChatRequest, ChatResponse } from "../types/chat";

// Если используем Vite proxy, можно оставлять "/api/chat"
const API_URL = "/api/chat";

export const sendMessage = async (text: string): Promise<ChatResponse> => {
  try {
    const body: ChatRequest = { text };

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data: ChatResponse = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Ошибка при получении ответа от сервера");
    }

    return data;
  } catch (err: unknown) {
    console.error("API sendMessage error:", err);
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Неизвестная ошибка API");
  }
};
