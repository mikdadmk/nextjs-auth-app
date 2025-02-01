import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const uid = url.searchParams.get("uid");

    if (!uid) {
      return new Response(JSON.stringify({ error: "Missing UID" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("fantastic");

    const user = await db.collection("users").findOne({ uid });

    if (!user) {
      // If user does not exist, create a new user in MongoDB
      await db.collection("users").insertOne({
        uid,
        email: url.searchParams.get("email"), // Extract email from request
        role: "user", // Default role is "user"
        createdAt: new Date(),
      });

      return new Response(JSON.stringify({ role: "user" }), { status: 200 });
    }

    return new Response(JSON.stringify({ role: user.role }), { status: 200 });

  } catch (error) {
    console.error("❌ get-user API Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
