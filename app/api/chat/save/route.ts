import { getDB } from "@/app/lib/db/config";
import { NextResponse } from "next/server";
import { ChatSession } from "@/app/lib/types/chats";

export async function POST(req: Request) {
  try {
    const session: ChatSession = await req.json();
    // body expects the data as same as ChatSession
    const db = await getDB();

    const existing = await db
      .collection<ChatSession>("chats")
      .findOne({ chat_id: session.chat_id });

    if (existing) {
      // Update only messages & updated time
      const result = await db
        .collection<ChatSession>("chats")
        .updateOne(
          { chat_id: session.chat_id },
          { $set: { messages: session.messages, updated: new Date() } }
        );

      return NextResponse.json({
        message: "Chat session saved",
        updated: result,
      });
    } else {
      // Insert new session
      await db.collection<ChatSession>("chats").insertOne({
        ...session,
        created: new Date(),
        updated: new Date(),
      });
    }
    return NextResponse.json({
      message: "Chat session created successfully.",
      created: true,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { success: false, error: "Failed to save chat" },
      {}
    );
  }
}
