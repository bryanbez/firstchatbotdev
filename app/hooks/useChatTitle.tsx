import { useChat } from "../context/chatContext";

export const useTitleChatContext = () => {
  const { currentChatSession } = useChat();

  const messagesLength = currentChatSession?.messages?.length ?? 0;

  return {
    messagesLength,
    currentChatSession,
  };
};
