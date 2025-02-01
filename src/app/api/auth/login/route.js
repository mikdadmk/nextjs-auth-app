import clientPromise from "@/lib/mongodb";
import { loginWithEmail, auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Authenticate with Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (!userCredential.user) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
    }

    // Get MongoDB connection
    const client = await clientPromise;
    const db = client.db("fantastic");

    // Find user role in MongoDB
    const userData = await db.collection("users").findOne({ uid: userCredential.user.uid });

    if (!userData) {
      return new Response(JSON.stringify({ error: "User not found in DB" }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, user: userData }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
