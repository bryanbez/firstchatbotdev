"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { generateID, getCurrentDate } from "../lib/utils";

export type Message = {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamps: string;
};

export type ChatContextType = {
  chatMessages: Message[];
  botMessage: string | null;
  addChatMessage: (msg: Message) => void;
  sendToBot: (userText: string) => Promise<void>;
  loading: boolean;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [botMessage, setBotMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const addChatMessage = (msg: Message) => {
    setChatMessages((prevMessages) => [...prevMessages, msg]);
    if (msg.sender === "bot") {
      setBotMessage(msg.text);
    }
  };

  const sendToBot = async (userText: string) => {
    if (!userText.trim()) return;

    const userMessage: Message = {
      id: "user-" + generateID(),
      sender: "user",
      text: userText,
      timestamps: getCurrentDate(),
    };

    addChatMessage(userMessage);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userText }),
      });

      if (!res.ok) throw new Error(`API Bot Error: ${res.statusText}`);
      const data = await res.json();
      const botReplyMessage: Message = {
        id: "bot-" + generateID(),
        sender: "bot",
        text: data.text || "Sorry, I couldn’t understand that.",
        timestamps: getCurrentDate(),
      };
      addChatMessage(botReplyMessage); // bot replay json "text: """
    } catch (error) {
      console.error("Bot error:", error);
      addChatMessage({
        id: "error-" + generateID(),
        sender: "bot",
        text: "Sorry, there was an error processing your request.",
        timestamps: getCurrentDate(),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{ chatMessages, addChatMessage, botMessage, sendToBot, loading }}>
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
