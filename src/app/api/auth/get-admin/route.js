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

    if (!user || user.role !== "admin") {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
    }

    return new Response(JSON.stringify({ role: user.role, message: "Welcome, Admin!" }), { status: 200 });

  } catch (error) {
    console.error("❌ get-admin API Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
