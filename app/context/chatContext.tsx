import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  createNewChatSession,
  createSessionMessage,
} from "../lib/functions/chats";
import { Message } from "../lib/types/chats";
import { ChatSession, ChatAction } from "../lib/types/chats";
import { saveOrUpdateChatsApi } from "../lib/apiCall";

export type ChatContextType = {
  chatMessages: Message[];
  setChatMessages: (messages: Message[]) => void;
  currentChatSession: ChatSession | undefined;
  addChatMessage: (msg: Message) => void;
  sendToBot: (userText: string) => Promise<void>;
  loadingSession: boolean;
  setChatSession: (session: ChatSession, action: ChatAction) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [currentChatSession, setCurrentChatSession] = useState<ChatSession>();
  const [loadingSession, setLoadingSession] = useState(false);

  useEffect(() => {
    setChatSession(createNewChatSession(), "new");
  }, []); // Initialize the data

  useEffect(() => {
    if (loadingSession || chatMessages.length === 0) return;
    setCurrentChatSession((prev) =>
      prev
        ? { ...prev, messages: chatMessages, updated: new Date() }
        : undefined
    );
  }, [chatMessages]); // update the conversation if theres new

  const setChatSession = (session: ChatSession, action: ChatAction) => {
    setLoadingSession(true);
    switch (action) {
      case "new":
        setCurrentChatSession(session);
        setChatMessages([]);
        break;
      case "load":
        setCurrentChatSession(session);
        setChatMessages(session.messages || []);
        break;
      default:
        break;
    }
    setLoadingSession(false);
  };

  const addChatMessage = (msg: Message) => {
    // ensures the title doesnt overwrite if no defined title
    // (basing on first chat of user)
    if (msg.sender === "user") {
      setCurrentChatSession((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          messages: [...(prev.messages ?? []), msg],
          title: prev.title || msg.text,
          updated: new Date(),
        };
      });
    }
    setChatMessages((prevMessages) => [...prevMessages, msg]); // for real-time counting message
  };

  const sendToBot = async (userText: string) => {
    if (!userText.trim()) return;

    setLoadingSession(true);

    const userMessage = createSessionMessage(userText, "user");
    addChatMessage(userMessage);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        chat_id: currentChatSession?.chat_id,
        user_id: currentChatSession?.user_id,
        bot_id: currentChatSession?.bot_id,
        title: currentChatSession?.title ?? userText,
        messages: [
          ...(currentChatSession?.messages || []),
          userMessage,
          botReplyMessage,
        ],
      };

      const saveOrUpdate = await saveOrUpdateChatsApi(submittedChatSession);

      return saveOrUpdate;
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
        setChatSession,
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
