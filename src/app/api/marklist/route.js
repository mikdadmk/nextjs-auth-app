import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const marklist = await db
      .collection("marklist")
      .find()
      .project({
        _id: 1,
        programme: 1,
        chestNumber: 1,
        position: 1,
        mark: 1,
        name: 1,
        category: 1,
        team: 1,
        type: 1,
        item: 1,
      })
      .toArray();

    return NextResponse.json(marklist, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch marklist." }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    if (body.type === "general") {
      if (!body.team || !["dhamak", "jhalak", "chamak"].includes(body.team)) {
        return NextResponse.json({ error: "Invalid team for general entry." }, { status: 400 });
      }
      body.name = "General";
      body.chestNumber = "N/A";
      body.category = "General";
    }

    if (body.type === "individual") {
      const student = await db.collection("studentslist").findOne({ chestNumber: body.chestNumber });

      if (student) {
        body.name = student.name;
        body.category = student.category;
        body.team = student.team;
      } else {
        return NextResponse.json({ error: "Chest number not found." }, { status: 404 });
      }
    }

    const result = await db.collection("marklist").insertOne({
      programme: body.programme,
      chestNumber: body.chestNumber || "",
      position: body.position,
      mark: body.mark,
      name: body.name,
      category: body.category,
      team: body.team || "",
      type: body.type,
      item: body.item,
    });

    return NextResponse.json({ success: true, insertedId: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add mark." }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { _id, update } = await req.json();
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const result = await db.collection("marklist").updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          ...update,
          type: update.type || "",
          item: update.item || "",
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Mark not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to edit mark." }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { _id } = await req.json();
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const result = await db.collection("marklist").deleteOne({ _id: new ObjectId(_id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Mark not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete mark." }, { status: 500 });
  }
}