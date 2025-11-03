import { useState, useEffect, useRef } from "react";
import { ChatSession } from "../lib/types/chats";
import { useChat } from "../context/chatContext";
import { fetchAllChats } from "../lib/apiCall";

export const useLoadChats = () => {
  const [chats, setChats] = useState<ChatSession[]>([]);
  const { setChatSession } = useChat();
  const chatsCache = useRef<ChatSession[]>([]);

  const refreshChats = async () => {
    const chats = await fetchAllChats();
    chatsCache.current = chats;
    setChats(chats);
  };

  useEffect(() => {
    // to prevent the Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended
    let isMounted = true;

    (async () => {
      const chats = await fetchAllChats();
      if (isMounted) {
        chatsCache.current = chats;
        setChats(chats);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const displayMessages = (chat_id: string): ChatSession[] => {
    const findSession = chats.find((chat) => chat.chat_id === chat_id);
    if (!findSession) return [];
    setChatSession(findSession, "load");
    return [findSession];
  };

  return {
    chats,
    displayMessages,
    refreshChats,
  };
};
