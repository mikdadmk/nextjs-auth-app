"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { logOut } from "@/lib/firebase";

export default function UserProfile() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login"); // Redirect to login if user is null
      return;
    }

    async function fetchUserData() {
      try {
        const res = await fetch(`/api/auth/get-user?uid=${user.uid}`);
        if (!res.ok) throw new Error("Failed to fetch user data");
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [user, router]);

  const handleLogout = async () => {
    await logOut();
    router.push("/login"); // Redirect to login after logout
  };

  if (!user) return <p className="text-center text-lg">Redirecting...</p>;

  if (loading) return <p className="text-center text-lg">Loading...</p>;

  if (!userData) return <p className="text-center text-red-500">User data not found.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <p><strong>Email:</strong> {user?.email || "No email available"}</p>
      <p><strong>Role:</strong> {userData?.role || "Unknown"}</p>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-2 rounded mt-4"
      >
        Logout
      </button>
    </div>
  );
}
