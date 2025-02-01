"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginWithEmail, signInWithGoogle } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { user } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const loggedInUser = await loginWithEmail(email, password);
    if (!loggedInUser) {
      setError("Invalid email or password");
      return;
    }

    const res = await fetch(`/api/auth/get-user?uid=${loggedInUser.uid}`);
    const data = await res.json();
    if (data.error) {
      setError("Error fetching user data");
      return;
    }

    if (data.role === "admin") {
      router.push("/dashboard");
    } else {
      router.push("/profile");
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    const googleUser = await signInWithGoogle();
    if (!googleUser) {
      setError("Google Sign-In failed");
      return;
    }

    const res = await fetch(`/api/auth/get-user?uid=${googleUser.uid}`);
    const data = await res.json();
    if (data.error) {
      setError("User not found in database");
      return;
    }

    if (data.role === "admin") {
      router.push("/dashboard");
    } else {
      router.push("/profile");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 text-white"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
      
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <motion.input
          whileFocus={{ scale: 1.05 }}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 border border-white/30 bg-transparent rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <motion.input
          whileFocus={{ scale: 1.05 }}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 border border-white/30 bg-transparent rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        
        {error && <p className="text-red-400 text-center">{error}</p>}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-600 transition-all"
        >
          Login
        </motion.button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-300">or</p>
      </div>

      {/* Google Sign-In Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleGoogleSignIn}
        className="bg-red-500 text-white p-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-red-600 transition-all mt-4 w-full"
      >
        Sign in with Google
      </motion.button>

      {/* Register Button */}
      <div className="mt-6 text-center">
        <p className="text-gray-300">Don't have an account?</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/register")}
          className="bg-green-500 text-white p-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-green-600 transition-all mt-4 w-full"
        >
          Register
        </motion.button>
      </div>
    </motion.div>
  );
}
