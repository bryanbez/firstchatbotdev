import { ChatSession } from "./types/chats";
import { SavingChatResponse } from "./types/apiCalls";

type ChatsResponse = { chats: ChatSession[] };

export async function saveOrUpdateChatsApi(
  session: ChatSession
): Promise<SavingChatResponse> {
  const res = await fetch("/api/chat/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(session),
  });
  if (!res.ok) throw new Error("Failed to save chat session");
  return await res.json();
}

export async function fetchAllChats(): Promise<ChatSession[]> {
  const res = await fetch("/api/chat/chats");
  const data: ChatsResponse = await res.json();
  return data.chats;
}
