// ./app/layout.js
"use client";
import NavbarApp from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "./context/AuthContext";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer  } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUIProvider>
          <ToastContainer />
          <AuthContextProvider>
            <NavbarApp />
              {children}
            <Footer/>
          </AuthContextProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
