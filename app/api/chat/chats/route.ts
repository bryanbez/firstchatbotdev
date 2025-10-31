import { getDB } from "@/app/lib/db/config";
import { NextResponse } from "next/server";
import { ChatSession } from "@/app/lib/types/chats";

export async function GET() {
  const db = await getDB();
  const collection = db.collection<ChatSession>("chats");
  const result = await collection.find({}).toArray();
  return NextResponse.json({ chats: result });
}
