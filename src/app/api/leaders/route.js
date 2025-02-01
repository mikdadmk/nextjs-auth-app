import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const imagesCollection = db.collection("leaders-image");

    const images = await imagesCollection
      .find({})
      .project({ _id: 0, id: 1, url: 1, title: 1, description: 1 })
      .toArray();

    console.log("Fetched images:", images);

    if (images.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(images, { status: 200 });
  } catch (error) {
    console.error("Error fetching images from database:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}