"use client";

import MainPage from "./pages/MainPage";
import { ChatProvider } from "./context/chatContext";

export default function Home() {
  return (
    <ChatProvider>
      <div className="flex h-screen items-center justify-center bg-gray-300">
        <div className="flex h-[90%] w-[90%] items-center justify-center bg-gray-50 rounded-2xl shadow-2xl">
          <MainPage />
        </div>
      </div>
    </ChatProvider>
  );
}
