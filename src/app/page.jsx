"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import the Home component
const Home = dynamic(() => import("@/app/home"));

function Page() {
  const [showHome, setShowHome] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowHome(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showHome ? <Home /> : <LoadingScreen />}
    </div>
  );
}

const LoadingScreen = () => (
  <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
    {/* Spinner */}
    <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>

    {/* Stylish Loading Text */}
    <p className="mt-4 text-white text-lg font-semibold animate-pulse">
      Getting Ready...
    </p>
  </div>
);

export default Page;
