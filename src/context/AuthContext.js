"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext(null); // Prevents undefined errors

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const res = await fetch(`/api/auth/get-user?uid=${currentUser.uid}`);
          if (!res.ok) throw new Error("User not found");
          const data = await res.json();
          setUser({ ...currentUser, role: data.role });
        } catch (error) {
          console.log("Error fetching user role:", error.message);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user }}>{!loading && children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext) || { user: null }; // Prevents undefined errors
}
