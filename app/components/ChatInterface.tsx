"use client";
import React, { useEffect, useRef } from "react";
import { useChat } from "../context/chatContext";

function ChatInterface() {
  const { chatMessages, addChatMessage, loading } = useChat();
  const autoScrollOnEndOnNewMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatMessages.length === 0) {
      addChatMessage({
        id: "bot-" + Date.now() + Math.floor(Math.random() * 999) + 1,
        sender: "bot",
        text: "Feel Free to ask...",
      });
    }
    autoScrollOnEndOnNewMessageRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chatMessages, addChatMessage]);

  if (!chatMessages || chatMessages.length === 0) {
    return (
      <div className="flex items-center justify-center text-center overflow-y-auto p-4 h-[400px] text-gray-400">
        No messages yet - start the conversation!
      </div>
    );
  }

  return (
    <div className="p-2">
      {chatMessages.map((m) => (
        <div
          key={m.id}
          className={`mb-2 ${
            m.sender === "user"
              ? "text-right justify-end"
              : "text-left justify-start"
          }`}>
          <span
            className={`inline-block px-3 py-2 rounded-xl wrap-break-words ${
              m.sender === "user"
                ? "bg-gray-300 text-black max-w-[80%]"
                : "bg-[#EAE4D5] text-black max-w-[80%] ml-auto border border-[#EAE4D5]"
            }`}>
            {m.text}
          </span>
        </div>
      ))}
      {/* bot thinking */}
      {loading && (
        <div className="flex justify-start">
          <div className="text-gray-700 px-4 py-2 rounded-2xl max-w-[75%] italic animate-pulse">
            Thinking<span className="animate-pulse">...</span>
          </div>
        </div>
      )}

      {/* hidden mark to auto scroll on end */}
      <div ref={autoScrollOnEndOnNewMessageRef} />
    </div>
  );
}

export default ChatInterface;
