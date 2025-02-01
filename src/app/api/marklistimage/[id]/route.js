import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  const { id } = params; // Get `id` from URL params

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const studentslist = await db
      .collection("studentslist")
      .findOne({ _id: new ObjectId(id) });

    if (!studentslist) {
      return NextResponse.json({ error: "studentslist item not found" }, { status: 404 });
    }

    return NextResponse.json(studentslist, { status: 200 });
  } catch (error) {
    console.error("Error fetching studentslist by ID:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  const { id } = params;  // Get `id` from URL params
  const { image } = await req.json();  // Get `image` link from the request body

  if (!image) {
    return NextResponse.json({ error: "Image link is required" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const result = await db
      .collection("studentslist")
      .updateOne({ _id: new ObjectId(id) }, { $set: { image } });

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "studentslist item not found or image not updated" }, { status: 404 });
    }

    return NextResponse.json({ message: "Image updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating image:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}