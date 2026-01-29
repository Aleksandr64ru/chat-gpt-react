import React from "react";
import { ChatPage } from "./pages/ChatPage";
import { createGlobalStyle } from "styled-components";

// Глобальные стили
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: #191970;
    color: #111827;
    min-height: 100vh;
  }

  button {
    cursor: pointer;
  }
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <ChatPage />
    </>
  );
};

export default App;
