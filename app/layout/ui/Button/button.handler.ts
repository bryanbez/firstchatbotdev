"use client";

import { useChat } from "@/app/context/chatContext";
import { createNewChatSession } from "@/app/lib/functions/chats";

const useButtonHandlers = () => {
  const { setChatSession, setModelPick } = useChat();

  return {
    handleNewChat: () => {
      setChatSession(createNewChatSession(), "new");
    },
    handleGithubPage: () => {
      alert("Working");
    },
    handleModelTypePick: (model: string) => {
      setModelPick(model);
    },
  };
};

export default useButtonHandlers;
