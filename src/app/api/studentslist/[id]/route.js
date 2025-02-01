import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from 'mongodb';

// Handle PUT (update) and DELETE (remove)
export async function PUT(req, { params }) {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);
        const collection = db.collection('studentslist');
        const { id } = params;

        const body = await req.json();
        const { name, chestNumber, team, category } = body;

        if (!name || !chestNumber || !team || !category) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { name, chestNumber, team, category } }
        );

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update student record" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);
        const collection = db.collection('studentslist');
        const { id } = params;

        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete student record" }, { status: 500 });
    }
}

