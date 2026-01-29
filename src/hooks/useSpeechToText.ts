import { useState, useEffect, useRef } from "react";
import type { SpeechState } from "../types/chat";

export const useSpeechToText = () => {
  const [state, setState] = useState<SpeechState>({
    listening: false,
    transcript: "",
    error: null,
  });

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognitionClass =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      // Браузер не поддерживает
      setTimeout(() => {
        setState(prev => ({
          ...prev,
          error: "Ваш браузер не поддерживает распознавание речи",
        }));
      });
      return;
    }

    const recognition = new SpeechRecognitionClass();
    recognition.lang = "ru-RU";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setState(prev => ({ ...prev, transcript }));
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setState(prev => ({ ...prev, error: event.error }));
    };

    recognition.onend = () => {
      setState(prev => ({ ...prev, listening: false }));
    };

    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    if (!recognitionRef.current) return;
    setState(prev => ({ ...prev, listening: true, error: null }));
    recognitionRef.current.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setState(prev => ({ ...prev, listening: false }));
  };

  return {
    ...state,
    startListening,
    stopListening,
  };
};
