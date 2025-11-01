import { Message } from "../types/chats";
import { generateID, getCurrentDate } from "../utils";
import { ChatSession } from "../types/chats";

export const createSessionMessage = (
  text: string,
  whosMessage: "user" | "bot",
  replyingTo?: string
): Message => ({
  id: "chat-" + generateID(),
  sender: whosMessage,
  replyingTo: replyingTo,
  text,
  timestamp: getCurrentDate(),
});

export const createNewChatSession = (): ChatSession => ({
  chat_id: generateID(),
  user_id: "user-" + generateID(),
  bot_id: "bot-" + generateID(),
  title: null,
  messages: [],
  created: new Date(),
  updated: new Date(),
});
