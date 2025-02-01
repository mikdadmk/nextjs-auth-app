"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { logOut } from "@/lib/firebase";
import Image from "next/image";

const ProfileButton = () => {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

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
          <div className="p-4 border-b text-center overflow-hidden">
            <p className="font-bold"></p>
            <p className="text-sm text-gray-500 overflow-hidden ">{user?.email || "No email available"}</p>
            <p className="text-indigo-600 font-semibold mt-1">Role: User</p>
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
