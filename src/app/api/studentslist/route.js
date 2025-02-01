import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);
        const collection = db.collection('studentslist');

        const students = await collection.find({}).toArray();
        return NextResponse.json(students, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);
        const collection = db.collection('studentslist');

        const body = await req.json();
        const { name, chestNumber, team, category } = body;

        if (!name || !chestNumber || !team || !category) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const result = await collection.insertOne({ name, chestNumber, team, category });
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create student record" }, { status: 500 });
    }
}
