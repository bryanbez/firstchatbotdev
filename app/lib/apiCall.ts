import { ChatSession } from "./types/chats";
import { SavingChatResponse } from "./types/apiCalls";

type ChatsResponse = { chats: ChatSession[] };
type BotParams = {
  prompt: string;
  modelPick: string;
};
type BotResponse = {
  title: string;
  answer: string;
};

export async function botResponseApi({
  prompt,
  modelPick,
}: BotParams): Promise<BotResponse> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, modelPick }),
  });

  if (!res.ok) throw new Error(`API Bot Error: ${res.statusText}`);
  const response = await res.json();

  // const cleanedText = response
  //   .replace(/^```[\s\S]*?\n?/, "")
  //   .replace(/```$/, "");

  // let data;
  // try {
  //   data = JSON.parse(cleanedText);
  // } catch (err) {
  //   console.error(`Failed to parse bot response as JSON: ${err}`);
  //   data = { title: "Proxy Bot", answer: response };
  // }

  const parseText =
    typeof response.text === "string"
      ? JSON.parse(response.text)
      : response.text;

  const { title, answer } = parseText;

  console.log(title);
  console.log(answer);

  return {
    title,
    answer,
  };
}

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
