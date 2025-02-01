"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link"; 
import Image from "next/image"; 
import "@fortawesome/fontawesome-free/css/all.min.css";

const WelcomePage = () => {
  useEffect(() => {
    let timeoutId;

    const createCircle = (e) => {
      const colors = [
        "rgba(255, 99, 132, 0.6)", 
        "rgba(54, 162, 235, 0.6)", 
        "rgba(255, 159, 64, 0.6)", 
        "rgba(75, 192, 192, 0.6)", 
        "rgba(153, 102, 255, 0.6)", 
        "rgba(255, 205, 86, 0.6)", 
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      const circle = document.createElement("div");
      circle.classList.add("circle");
      circle.style.backgroundColor = randomColor;
      circle.style.left = `${e.pageX - 25}px`;
      circle.style.top = `${e.pageY - 25}px`;

      document.body.appendChild(circle);
      setTimeout(() => {
        circle.remove();
      }, 1000);
    };

    const handleMouseMove = (e) => {
      clearTimeout(timeoutId);
      createCircle(e);
      timeoutId = setTimeout(() => {}, 200);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="h-screen w-full bg-gradient-to-br from-purple-500 to-indigo-600 flex flex-col items-center justify-center text-white text-center">
      {/* Arts & Fest Icons */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 opacity-20 hidden md:block">
        <i className="fas fa-headphones-alt text-8xl"></i>
      </div>
      <div className="absolute top-1/4 right-20 opacity-30">
        <i className="fas fa-palette text-6xl"></i>
      </div>
      <div className="absolute top-1/2 right-1/4 opacity-20 hidden md:block">
        <i className="fas fa-microphone-alt text-7xl"></i>
      </div>
      <div className="absolute top-1/2 left-1/4 opacity-20 hidden md:block">
        <i className="fas fa-music text-7xl"></i>
      </div>
      <div className="absolute bottom-20 left-20 opacity-30">
        <i className="fas fa-guitar text-6xl"></i>
      </div>
      <div className="absolute bottom-10 right-10 opacity-30">
        <i className="fas fa-camera-retro text-6xl"></i>
      </div>

      {/* Logo */}
      <div className="absolute top-5 left-5 w-20 h-20 md:top-[4rem] md:left-[4rem] bg-white p-2 flex items-center justify-center rounded-full shadow-lg">
        <Image
          src="https://res.cloudinary.com/dhksqekbo/image/upload/v1737868178/fantastic-logo_aqa6bo.png"
          alt="fantastic-logo"
          width={500}
          height={500}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Title and Description */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="mb-6 max-w-3xl"
      >
        <h1 className="text-5xl md:text-7xl font-medium font-aesthetic">
          Fantastic 2k25 Arts Fest
        </h1>
        <p className="mt-4 text-lg md:text-2xl font-poppins">
          Experience creativity and culture like never before!
        </p>
      </motion.div>

      {/* Logo Image */}
      <motion.img
        src="https://res.cloudinary.com/dhksqekbo/image/upload/v1737868178/fantastic-logo_aqa6bo.png"
        alt="fantastic-logo"
        className="w-1/2 md:w-1/4 lg:w-1/4 h-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Buttons */}
      <div className="mt-10 flex space-x-4">
        <Link href="/profile" passHref>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="px-6 sm:px-8 md:px-12 py-2 sm:py-3 bg-white text-purple-600 font-bold rounded-lg shadow-lg hover:bg-gray-200 transition duration-300"
          >
            Check Result
          </motion.button>
        </Link>

        {/* Login Button */}
        <Link href="/login" passHref>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="px-6 sm:px-8 md:px-12 py-2 sm:py-3 bg-yellow-400 text-black font-bold rounded-lg shadow-lg hover:bg-yellow-500 transition duration-300"
          >
            Login
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default WelcomePage;
