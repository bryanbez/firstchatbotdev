"use client";

import { KeyboardEvent, Dispatch, SetStateAction } from "react";

export function handleChatKeyDown(
  e: KeyboardEvent<HTMLTextAreaElement>,
  handleSend: () => void,
  setText: Dispatch<SetStateAction<string>>
) {
  // if user clicks enter = send
  if (e.key === "Enter" && !e.ctrlKey && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }

  // if user click CTRL + ENTER = newline
  else if (e.key === "Enter" && e.ctrlKey) {
    e.preventDefault();
    setText((prev) => prev + "\n");
  }
}
