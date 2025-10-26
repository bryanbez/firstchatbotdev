import React from "react";
import { useChat } from "../context/chatContext";

function ChatInterface() {
  const { chatMessages } = useChat();

  if (!chatMessages || chatMessages.length === 0) {
    return (
      <div className="flex items-center justify-center text-center overflow-y-auto p-4 h-[400px] text-gray-400">
        No messages yet - start the conversation!
      </div>
    );
  }
  return (
    <div className="p-4 space-y-2 overflow-y-auto h-[400px] bg-gray-50 rounded-lg shadow-inner">
      {chatMessages.map((m) => (
        <div
          key={m.id}
          className={`mb-2 ${
            m.sender === "user" ? "text-right" : "text-left"
          }`}>
          <span
            className={`inline-block px-3 py-2 rounded-xl ${
              m.sender === "user"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}>
            {m.text}
          </span>
        </div>
      ))}
    </div>
  );
}

export default ChatInterface;
