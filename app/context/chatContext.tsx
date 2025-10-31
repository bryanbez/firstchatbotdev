"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { createSessionMessage } from "../lib/functions/chats";
import { Message } from "../lib/types/chats";
import { ChatSession } from "../lib/types/chats";
import { generateID } from "../lib/utils";

export type ChatContextType = {
  chatMessages: Message[];
  setChatMessages: (messages: Message[]) => void;
  loadChatSession: (session: ChatSession) => void;
  currentChatSession: ChatSession | undefined;
  addChatMessage: (msg: Message) => void;
  sendToBot: (userText: string) => Promise<void>;
  loadingSession: boolean;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [currentChatSession, setCurrentChatSession] = useState<ChatSession>();
  const [loadingSession, setLoadingSession] = useState(false);

  const loadChatSession = (session: ChatSession) => {
    setLoadingSession(true);
    setCurrentChatSession(session);
    setChatMessages(session.messages || []);
    console.warn("Loaded Picked Chat Session:", session);
    setLoadingSession(false);
  };

  useEffect(() => {
    if (loadingSession) return;
    const session: ChatSession = {
      chat_id: generateID(),
      user_id: "user-" + generateID(),
      bot_id: "bot-" + generateID(),
      title: null,
      messages: [],
      created: new Date(),
      updated: new Date(),
    };
    setCurrentChatSession(session);
    setChatMessages(session.messages || []); // This will be []
  }, []); // Initialize the data

  useEffect(() => {
    if (loadingSession || chatMessages.length === 0) return;
    setCurrentChatSession((prev) =>
      prev
        ? { ...prev, messages: chatMessages, updated: new Date() }
        : undefined
    );
  }, [chatMessages]); // update the conversation if theres new

  const addChatMessage = (msg: Message) => {
    setChatMessages((prevMessages) => [...prevMessages, msg]);
    // ensures the title doesnt overwrite if no defined title
    // (basing on first chat of user)
    if (msg.sender === "user") {
      setCurrentChatSession((prev) => {
        if (!prev) return undefined;
        if (prev.title) return prev;

        return {
          ...prev,
          title: msg.text,
          updated: new Date(),
        };
      });
    }
  };

  const sendToBot = async (userText: string) => {
    if (!userText.trim()) return;
    setLoadingSession(true);

    if (!currentChatSession) {
      console.error("No active session found");
      setLoadingSession(false);
      return;
    }

    const userMessage = createSessionMessage(userText, "user");
    addChatMessage(userMessage);

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
      const botReplyMessage = createSessionMessage(
        data.text || "Sorry, i cant answer the question. Try again",
        "bot",
        userMessage.id
      );

      addChatMessage(botReplyMessage); // bot replay json "text: """

      const submittedChatSession = {
        chat_id: currentChatSession.chat_id,
        user_id: currentChatSession.user_id,
        bot_id: currentChatSession.bot_id,
        title: currentChatSession.title ?? userText,
        messages: [
          ...(currentChatSession.messages || []),
          userMessage,
          botReplyMessage,
        ],
      };

      const saveOrUpdateinDB = await fetch("/api/chat/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submittedChatSession),
      });
      const response = await saveOrUpdateinDB.json();
      console.log("Chat session saved:", response); // stooped at here: 10:10pm Oct. 31

      // await fetch("/api/chats/save", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({

      //   }),
      // });
    } catch (error) {
      console.error("Bot error:", error);
    } finally {
      setLoadingSession(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        chatMessages,
        currentChatSession,
        addChatMessage,
        sendToBot,
        loadingSession,
        setChatMessages,
        loadChatSession,
      }}>
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
