"use client";
import React, { useState, useRef, useEffect } from "react";
import { useChat } from "../../context/chatContext";
import { handleChatKeyDown } from "../../lib/handleKeyDown";
import { useChatHistoryContext } from "@/app/context/chatHistoryContext";
import { SavingChatResponse } from "@/app/lib/types/apiCalls";

function Textbox() {
  const { sendToBot } = useChat(); // addchatmessage is moved in chatcontextfunc
  const { refreshChats } = useChatHistoryContext();

  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const handleSubmit = async () => {
    const textTrimmed = text.trim();
    if (!textTrimmed) return;
    setText("");
    const saving = await sendToBot(textTrimmed);
    if (saving && saving.success === true) {
      await refreshChats();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 p-3 bg-white border border-gray-600 rounded-2xl shadow-sm w-[95%]">
      <div className="flex-1">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => handleChatKeyDown(e, handleSubmit, setText)}
          placeholder="Type a message..."
          rows={1}
          className="w-full resize-none overflow-hidden bg-transparent focus:outline-none text-sm placeholder-gray-400 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={!text.trim()}
        className={`p-2 rounded-md transition-colors ${
          text.trim()
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
        aria-label="Send">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-6 h-6">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </button>
    </form>
  );
}

export default Textbox;
