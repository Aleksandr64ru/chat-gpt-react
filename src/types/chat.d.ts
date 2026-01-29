// Типы для сообщений чата
export interface ChatMessage {
    id: string;                   // уникальный id сообщения
    role: "user" | "assistant";   // кто отправил сообщение
    content: string;              // текст сообщения
    timestamp: number;            // время отправки в формате Date.now()
  }
  
  // Формат запроса к backend
  export interface ChatRequest {
    text: string;                 // текст, который отправляем в ChatGPT
  }
  
  // Формат ответа от backend
  export interface ChatResponse {
    messages: ChatMessage[];      // массив сообщений (можно расширять)
    error?: string;               // сообщение об ошибке, если есть
  }
  
  // Состояния чата на фронтенде
  export interface ChatState {
    messages: ChatMessage[];
    loading: boolean;             // индикатор загрузки
    error: string | null;
  }
  
  // Для голосового ввода
  export interface SpeechState {
    listening: boolean;           // идёт запись голоса
    transcript: string;           // текущий текст, полученный с микрофона
    error: string | null;         // ошибка при записи или распознавании речи
  }
  