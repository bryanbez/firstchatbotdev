import { ChatSession } from "./types/chats";

export async function saveOrUpdateChatsApi(session: ChatSession) {
  const saveOrUpdateinDB = await fetch("/api/chat/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(session),
  });
  const response = await saveOrUpdateinDB.json();
  return response;
}
