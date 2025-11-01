"use client";

import { useChat } from "@/app/context/chatContext";
import { createNewChatSession } from "@/app/lib/functions/chats";

const useButtonHandlers = () => {
  const { setChatSession } = useChat();

  return {
    handleNewChat: () => {
      setChatSession(createNewChatSession(), "new");
    },
    handleGithubPage: () => {
      alert("Working");
    },
  };
};

export default useButtonHandlers;
