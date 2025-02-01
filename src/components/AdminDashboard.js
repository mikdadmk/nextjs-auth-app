"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { logOut } from "@/lib/firebase";

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logOut();
    router.push("/login"); // Redirect to login after logout
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      {user ? (
        <>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role || "Admin"}</p>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white p-2 rounded mt-4"
          >
            Logout
          </button>
        </>
      ) : (
        <p className="text-center text-lg">Loading user...</p>
      )}
    </div>
  );
}
