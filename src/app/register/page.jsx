"use client";
import RegisterForm from "@/components/RegisterForm";
import { motion } from "framer-motion";

export default function RegisterPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-500 to-blue-600"
    >
      <RegisterForm />
    </motion.div>
  );
}
