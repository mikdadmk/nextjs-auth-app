"use client";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import { motion } from "framer-motion";

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/profile");
      }
    }
  }, [user, router]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600"
    >
     
        
        <LoginForm />
      
    </motion.div>
  );
}
