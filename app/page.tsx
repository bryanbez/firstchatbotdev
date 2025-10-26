"use client";

import ChatInterface from "./components/ChatInterface";
import Textbox from "./components/Textbox";
import { ChatProvider } from "./context/chatContext";

export default function Home() {
  return (
    <ChatProvider>
      <div className="border rounded-xl border-gray-300 flex flex-col space-y-6 p-4 max-w-md mx-auto">
        <ChatInterface />
        <Textbox />
      </div>
    </ChatProvider>
  );
}
