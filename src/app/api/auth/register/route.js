import clientPromise from "@/lib/mongodb";
import { registerWithEmail } from "@/lib/firebase";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Register user in Firebase
    const user = await registerWithEmail(email, password);
    if (!user) {
      console.error("Firebase Registration failed");
      return new Response(JSON.stringify({ error: "Registration failed" }), { status: 400 });
    }

    console.log("🔥 Firebase Registration Successful:", user.email);

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("fantastic");

    console.log("✅ Connected to MongoDB");

    // Check if user exists
    const existingUser = await db.collection("users").findOne({ uid: user.uid });
    if (existingUser) {
      console.log("⚠️ User already exists:", existingUser.email);
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
    }

    // Insert user
    const userCount = await db.collection("users").countDocuments();
    const role = userCount === 0 ? "admin" : "user"; // First user is admin

    const result = await db.collection("users").insertOne({
      uid: user.uid,
      email,
      role,
      createdAt: new Date(),
    });

    if (result.acknowledged) {
      console.log("✅ User inserted into MongoDB:", user.email);
    } else {
      console.error("❌ Failed to insert user into MongoDB");
      return new Response(JSON.stringify({ error: "Failed to insert user in DB" }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, user }), { status: 201 });

  } catch (error) {
    console.error("❌ Registration API Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// ✅ Ensure that only POST requests are allowed
export const config = {
  api: {
    methods: ["POST"],
  },
};
