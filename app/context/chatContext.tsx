"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Message = {
  id: number;
  sender: "user" | "bot";
  text: string;
};

type ChatContextType = {
  chatMessages: Message[];
  addChatMessage: (msg: string) => void;
  addBotReply: (msg: string) => void;
  sendToBot: (msg: string) => void;
};

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const addChatMessage = (msg: string) =>
    setChatMessages((prevMessages) => [
      ...prevMessages,
      {
        id: Date.now() + Math.floor(Math.random() * 999) + 1,
        sender: "user",
        text: msg,
      },
    ]);

  const addBotReply = (msg: string) => {
    setChatMessages((prevMessages) => [
      ...prevMessages,
      {
        id: Date.now() + Math.floor(Math.random() * 999) + 1,
        sender: "bot",
        text: msg,
      },
    ]);
  };

  const sendToBot = async (msg: string) => {
    addChatMessage(msg);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: msg }),
      });

      const data = await res.json();
      addBotReply(data.text); // bot replay json "text: """
    } catch (error) {
      console.log(error);
      addBotReply("Sorry, something went wrong. Please try again.");
    }
  };

  return (
    <ChatContext.Provider
      value={{ chatMessages, addChatMessage, addBotReply, sendToBot }}>
      {children}
    </ChatContext.Provider>
  );
};

// hook
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within a ChatProvider");
  return context;
};
