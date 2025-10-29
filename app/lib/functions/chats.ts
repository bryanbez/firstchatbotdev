import { Message } from "../types/chats";
import { generateID, getCurrentDate } from "../utils";

export const createUserMessage = (text: string): Message => ({
  id: "user-" + generateID(),
  sender: "user",
  text,
  timestamp: getCurrentDate(),
});

export const createBotMessage = (text: string): Message => ({
  id: "bot-" + generateID(),
  sender: "bot",
  text,
  timestamp: getCurrentDate(),
});
