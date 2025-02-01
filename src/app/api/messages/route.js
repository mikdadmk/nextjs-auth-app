import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const messages = await db
      .collection("messages")
      .find({})
      .sort({ createdAt: -1 }) // Sort messages by newest first
      .toArray();

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error.message);
    return NextResponse.json({ error: "Failed to load messages." }, { status: 500 });
  }
}
