import React, { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Loader } from "../components/Loader";
import { MicrophoneButton } from "../components/MicrophoneButton";
import { useChat } from "../hooks/useChat";
import { useSpeechToText } from "../hooks/useSpeechToText";
import styled from "styled-components";

const PageWrapper = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MessagesWrapper = styled.div`
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 16px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #6366f1;
  overflow-y: auto;
`;

const Message = styled.div<{ role: "user" | "assistant" }>`
  align-self: ${(props) => (props.role === "user" ? "flex-end" : "flex-start")};
  background-color: ${(props) => (props.role === "user" ? "#6366f1" : "#e5e7eb")};
  color: ${(props) => (props.role === "user" ? "white" : "#111827")};
  padding: 10px 14px;
  border-radius: 12px;
  max-width: 70%;
  word-wrap: break-word;
`;

const InputRow = styled.div`
  display: flex;
  gap: 8px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  color: white;
  margin-bottom: 8px;
`;

export const ChatPage: React.FC = () => {
  const { messages, loading, error, sendMessage } = useChat();
  const { transcript, listening, startListening, stopListening } = useSpeechToText();
  const [input, setInput] = useState("");

  const handleSend = () => {
    sendMessage(input || transcript);
    setInput("");
  };

  return (
    <PageWrapper>
      <Title>Hi there 👋</Title>
      <Title>What would you like to know?</Title>

      <MessagesWrapper>
        {messages.map((msg) => (
          <Message key={msg.id} role={msg.role}>
            {msg.content}
          </Message>
        ))}
        {loading && <Loader />}
      </MessagesWrapper>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <InputRow>
        <Input
          placeholder="Введите сообщение..."
          value={input || transcript}
          onChange={(e) => setInput(e.target.value)}
        />
        <MicrophoneButton
          active={listening}
          onMouseDown={startListening}
          onMouseUp={stopListening}
        />
        <Button onClick={handleSend}>Отправить</Button>
      </InputRow>
    </PageWrapper>
  );
};
