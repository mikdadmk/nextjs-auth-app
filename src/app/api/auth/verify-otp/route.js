// src/app/api/auth/verify-otp/route.js
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function POST(req) {
  try {
    const { email, otp } = await req.json();
    
    // In real case, verify OTP with Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, otp);
    const user = userCredential.user;
    if (!user) return new Response(JSON.stringify({ error: "OTP Verification failed" }), { status: 400 });
    
    return new Response(JSON.stringify({ success: true, user }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
