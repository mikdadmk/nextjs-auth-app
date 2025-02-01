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
  <div className="h-screen flex items-center justify-center">
    <p className="text-lg">Loading...</p>
  </div>
);

export default Page;
