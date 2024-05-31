"use client";
import React from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Hero = () => {
  function sendToMonterya() {
    //toast.error("Oopes something went wrong Try Again Later");
  }

  return (
    <div className="relative min-h-screen w-full">
      <Image
        src={"/rabbit_nobg.png"}
        alt="Rabbit Image"
        layout="fill"
        objectFit="cover"
      />

      
      <div className="absolute inset-0 h-full w-full bg-gray-900/60" />
      <div className="grid min-h-screen px-8">
        <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
          <h1 className="text-white text-5xl lg:text-6xl xl:text-7xl font-bold lg:max-w-3xl">
            Monterya
          </h1>
          <p className="text-white text-lg lg:text-xl mt-4 mb-12 w-full md:max-w-full lg:max-w-2xl">
            Join us for the adventure that is coming this year - The Monterya
            Official 2024!
          </p>
        
          <div className="flex items-center gap-4">
            <a
              onClick={sendToMonterya}
              href="/testing"
              className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-blue-500 rounded-lg group"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-700 rounded-full group-hover:w-56 group-hover:h-56"></span>
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
              <span className="relative">Start Game</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
