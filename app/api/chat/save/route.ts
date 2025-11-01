import { NextResponse } from "next/server";
import { ChatSession } from "@/app/lib/types/chats";
import { saveOrUpdateChatSession } from "@/app/lib/db/chat";

export async function POST(req: Request) {
  const session: ChatSession = await req.json();
  // body expects the data as same as ChatSession
  if (!session) {
    return NextResponse.json(
      { success: false, error: "No chat session provided" },
      {}
    );
  }

  const saveOrUpdateChats = await saveOrUpdateChatSession(session);
  return NextResponse.json({ success: true, data: saveOrUpdateChats }, {});
}
