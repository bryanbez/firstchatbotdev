import { createContext, useContext } from "react";
import { useLoadChats } from "../hooks/useLoadChats";
import { ChatSession } from "../lib/types/chats";

type ChatHistoryContextType = {
  chats: ChatSession[];
  displayMessages: (chat_id: string) => ChatSession[];
  refreshChats: () => Promise<void>;
};

const ChatHistoryContext = createContext<ChatHistoryContextType | undefined>(
  undefined
);

export const ChatHistoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { chats, refreshChats, displayMessages } = useLoadChats();
  return (
    <ChatHistoryContext.Provider
      value={{ chats, refreshChats, displayMessages }}>
      {children}
    </ChatHistoryContext.Provider>
  );
};

export const useChatHistoryContext = () => {
  const context = useContext(ChatHistoryContext);
  if (!context)
    throw new Error(
      "useChatHistoryContext must be used within a ChatHistoryProvider"
    );
  return context;
};
