"use client";
import React, { useEffect, useState } from "react";
import { AuthForm } from "./components/AuthForm";
import Image from "next/image";
import { UserAuth } from "../context/AuthContext";
import { redirect } from "next/navigation";

import "../globals.css"; // Adjust the path as necessary

export default function page() {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    
    checkAuthentication();
    console.log(user);

    if (user) {
      redirect("/"); // Redirect if user is already authenticated
    }
    if (!user) {
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="relative min-h-screen w-full">
      <Image
        src="/rabbit_nobg.png"
        alt="Rabbit Image"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute inset-0 h-full w-full bg-gray-900/60" />
      <div className="grid min-h-screen px-8">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="loader" />
        </div>
      ) : !user ? <div className="container relative my-auto mx-auto grid place-items-center text-center">
      <div className="flex justify-center items-center h-xl p-12 z-0 rounded-xl bg-white">
        <div className="w-96">
          <AuthForm />
        </div>
      </div>
    </div> : (
        null 
      )}
      </div>
    </div>
  );
}
