interface Metadata {
  chat_model?: string;
  temperature?: number;
  max_tokens?: number;
}

export interface Message {
  id: string;
  sender: "user" | "bot";
  replyingTo?: string;
  text: string;
  timestamp: string;
}
export interface ChatSession {
  _id?: string;
  chat_id?: string;
  user_id?: string | null;
  bot_id?: string | null;
  messages?: Message[];
  created?: Date;
  updated?: Date;
  title?: string | null;
  metadata?: Metadata[];
}

export type ChatAction = "new" | "load";
