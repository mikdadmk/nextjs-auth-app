// src/app/api/auth/google-login/route.js
import clientPromise from "@/lib/mongodb";
import { signInWithGoogle } from "@/lib/firebase";

export async function POST(req) {
  try {
    const user = await signInWithGoogle();
    if (!user) return new Response(JSON.stringify({ error: "Google Sign-In failed" }), { status: 400 });

    const client = await clientPromise;
    const db = client.db("fantastic");
    let userData = await db.collection("users").findOne({ uid: user.uid });

    if (!userData) {
      userData = { uid: user.uid, email: user.email, role: "user", createdAt: new Date() };
      await db.collection("users").insertOne(userData);
    }

    return new Response(JSON.stringify({ success: true, user: userData }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
