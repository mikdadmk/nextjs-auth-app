"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import the Home component (prevents blocking SSR)
const Home = dynamic(() => import("@/app/home"), { ssr: false });

function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <p className="text-lg">Loading...</p>
        </div>
      ) : (
        <Home />
      )}
    </div>
  );
}

export default Page;
