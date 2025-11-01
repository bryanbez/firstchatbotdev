"use client";

import { useEffect, useState, useRef } from "react";
import { ChatSession } from "@/app/lib/types/chats";
import { useChat } from "@/app/context/chatContext";

function HistoryButton() {
  const [chats, setChats] = useState<ChatSession[]>([]);
  const chatCache = useRef<ChatSession[]>([]);
  // const [activeChatSessionID, setActiveChatSessionID] = useState<string>("");
  const { setChatSession } = useChat();

  useEffect(() => {
    const loadChats = async () => {
      const res = await fetch("/api/chat/chats");
      const data = await res.json();
      const { chats } = data; // output: chats: {Array(6)} so destructure it
      chatCache.current = chats;
      setChats(chats);
    };
    loadChats();
  }, []);

  const displayMessages = (chat_id: string): ChatSession[] => {
    const findSession = chats.find((chat) => chat.chat_id === chat_id);
    if (!findSession) return [];
    setChatSession(findSession, "load");
    return [findSession];
  };

  return (
    <>
      {!chats ? (
        <div className="font-xl"> Loading </div>
      ) : (
        chats.map((chat: ChatSession) => (
          <div
            key={chat.chat_id}
            onClick={() => displayMessages(chat.chat_id || "")}
            className="rounded-xl p-3 mb-2 border border-black min-h-[10%] lifting-animation-btn">
            <div className="text-sm">
              <p className="font-normal"> {chat.title} </p>
            </div>
            {/* <div className="flex justify-between text-xs">
              <span> {chat.created?.toString().slice(0, 10)} </span>
              <span> {chat.messages?.length} messages</span>
            </div> */}
          </div>
        ))
      )}
    </>
  );
}

export default HistoryButton;
