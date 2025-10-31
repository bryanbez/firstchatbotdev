import { Message } from "../types/chats";
import { generateID, getCurrentDate } from "../utils";

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
