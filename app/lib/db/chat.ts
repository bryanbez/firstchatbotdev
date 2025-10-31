import { getDB } from "./config";
import { ChatSession } from "../types/chats";

export async function saveChatSession(session: ChatSession) {
  const db = await getDB();
  const collection = db.collection<ChatSession>("brychatbot");
  await collection.insertOne(session);
}

export async function getChatSessionById(chatId: string) {
  const db = await getDB();
  const collection = db.collection<ChatSession>("chats");
  return await collection.find({ chat_id: chatId }).toArray();
}
