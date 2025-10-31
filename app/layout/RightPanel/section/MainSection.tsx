"use client";
import { useChat } from "@/app/context/chatContext";
import React, { useEffect, useRef } from "react";

function ChatInterface() {
  const { chatMessages, addChatMessage, loadingSession } = useChat();
  const autoScrollOnEndOnNewMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
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
          className={`mb-4 flex flex-col ${
            m.sender === "user" ? "items-end" : "items-start"
          }`}>
          <span
            className={`px-3 py-2 rounded-xl max-w-[75%] wrap-break-word ${
              m.sender === "user"
                ? "bg-gray-300 text-black text-right"
                : "bg-[#EAE4D5] text-black text-left"
            }`}>
            {m.text}
          </span>
          <span className="text-xs text-gray-400 mt-1 ml-2 opacity-80">
            {m.timestamp}
          </span>
        </div>
      ))}
      {/* bot thinking */}
      {loadingSession && (
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
