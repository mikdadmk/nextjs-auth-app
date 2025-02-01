// src/app/api/teamsoverview/route.ts
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const client = await clientPromise; // ✅ Get the MongoClient instance
    const db = client.db(process.env.MONGODB_DB); // ✅ Get the database instance

    const marksData = await db
      .collection("marklist")
      .aggregate([
        {
          $group: {
            _id: "$team",
            totalMarks: { $sum: { $toInt: "$mark" } },
          },
        },
        {
          $project: {
            team: "$_id",
            totalMarks: 1,
            _id: 0,
          },
        },
      ])
      .toArray();

    return NextResponse.json(marksData);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
