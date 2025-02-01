"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminRoute({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user && user.role === "admin") {
      setIsLoading(false);
    } else if (user && user.role !== "admin") {
      router.push("/"); // Redirect non-admins to home
    }
  }, [user, router]);

  if (isLoading) {
    return <p className="text-center text-xl">Checking admin access...</p>;
  }

  return children;
}
