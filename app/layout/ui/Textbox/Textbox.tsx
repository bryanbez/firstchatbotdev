"use client";
import React, { useRef, useEffect } from "react";

import { SendIcon } from "@/app/svg";
import { ChatArea } from "./textbox.constants";
import { useTextBoxHandlers } from "./textbox.handler";

function Textbox() {
  const handlers = useTextBoxHandlers();
  const textareaProps = ChatArea(handlers);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [handlers.text]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!handlers.text.trim()) return;
    handlers.handleSendToBotChat(handlers.text);
    textareaRef.current?.focus();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 p-3 bg-white border border-gray-600 rounded-2xl shadow-sm w-[95%]">
      <div className="flex-1">
        <textarea {...textareaProps} ref={textareaRef}></textarea>
      </div>

      <button
        type="submit"
        disabled={!handlers.text.trim()}
        className={`p-2 rounded-md transition-colors ${
          handlers.text.trim()
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
        aria-label="Send">
        <SendIcon></SendIcon>
      </button>
    </form>
  );
}

export default Textbox;
