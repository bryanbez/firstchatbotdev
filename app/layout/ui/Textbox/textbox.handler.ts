"use client";

import { useState } from "react";
import { handleChatKeyDown } from "@/app/lib/handleKeyDown";
import { useChat } from "@/app/context/chatContext";

export const useTextBoxHandlers = () => {
  const [text, setText] = useState<string>("");
  const { sendToBot } = useChat();

  return {
    handleSendToBotChat: (userInput: string): void => {
      sendToBot(userInput);
      setText("");
    },
    clearText: (): void => {
      setText("");
    },
    handleKeyDown: (
      e: React.KeyboardEvent<HTMLTextAreaElement>,
      handleSubmit: () => void
    ): void => {
      handleChatKeyDown(e, handleSubmit, setText);
    },
    text,
    setText,
  };
};
