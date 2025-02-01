import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const client = await clientPromise;
    client.db("fantastic");
    db.collection("users");
    
    if (!client) {
      console.error("❌ MongoDB connection failed");
      return new Response(JSON.stringify({ error: "MongoDB not connected" }), { status: 500 });
    }

    console.log("✅ MongoDB Test Connection Successful!");
    return new Response(JSON.stringify({ success: true, message: "MongoDB is connected!" }), { status: 200 });

  } catch (error) {
    console.error("❌ MongoDB Test Connection Failed:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
