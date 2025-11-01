import { getDB } from "./config";
import { ChatSession } from "../types/chats";

export async function saveOrUpdateChatSession(session: ChatSession) {
  const db = await getDB();

  // check if chat_id exists
  const existing = await db
    .collection<ChatSession>("chats")
    .findOne({ chat_id: session.chat_id });

  if (existing) {
    // Update only messages & updated time
    const updateChats = await db
      .collection<ChatSession>("chats")
      .updateOne(
        { chat_id: session.chat_id },
        { $set: { messages: session.messages, updated: new Date() } }
      );

    if (!updateChats) {
      return {
        message: "Theres an problem updating the chat session",
        updated: false,
      };
    }
    return {
      message: "Chat session updated",
      updated: true,
    };
  } else {
    // Insert new session
    const createChat = await db.collection<ChatSession>("chats").insertOne({
      ...session,
      created: new Date(),
      updated: new Date(),
    });
    if (!createChat) {
      return {
        message: "There was a problem creating the chat session",
        created: false,
      };
    }
    return {
      message: "Chat session created successfully.",
      created: true,
    };
  }
}

export async function getChatSessionById(chatId: string) {
  const db = await getDB();
  const collection = db.collection<ChatSession>("chats");
  return await collection.find({ chat_id: chatId }).toArray();
}
