interface Metadata {
  chat_model?: string;
  temperature?: number;
  max_tokens?: number;
}

export interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

export interface ChatSession {
  _id?: string;
  chat_id: string;
  messages: Message[];
  created: Date;
  updated: Date;
  title?: string;
  metadata?: Metadata[];
}
