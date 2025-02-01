import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const marklist = await db.collection("studentslist").find().toArray();

    if (!marklist || marklist.length === 0) {
      return NextResponse.json({ error: "No data found" }, { status: 404 });
    }

    return NextResponse.json(marklist, { status: 200 });
  } catch (error) {
    console.error("Error fetching marklist:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}