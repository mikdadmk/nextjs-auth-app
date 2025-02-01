"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { logOut } from "@/lib/firebase";
import Image from "next/image";

const ProfileButton = () => {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function fetchUserData() {
      try {
        const res = await fetch(`/api/auth/get-user?uid=${user.uid}`);
        if (!res.ok) throw new Error("Failed to fetch user data");
        const data = await res.json();
        setUserData(data); // ✅ Store fetched user data
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [user]);

  const handleLogout = async () => {
    await logOut();
    router.push("/login");
  };

  return (
    <div className="relative">
      {/* Profile Avatar Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center justify-center rounded-full w-12 h-12 border-2 border-white bg-gray-200 hover:bg-gray-300 transition duration-300"
      >
        <Image
          src="https://res.cloudinary.com/dhksqekbo/image/upload/v1737868178/fantastic-logo_aqa6bo.png"
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full"
        />
      </button>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b text-center">
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : userData ? (
              <>
                <p className="font-bold">{userData.name || "No Name"}</p>
                <p className="text-sm text-gray-500">{user?.email || "No email available"}</p>
                <p className={`mt-1 font-semibold ${userData.role === "admin" ? "text-red-600" : "text-indigo-600"}`}>
                  Role: {userData.role || "Unknown"}
                </p>
              </>
            ) : (
              <p className="text-gray-500">User data not found</p>
            )}
          </div>
          <div className="p-2">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
