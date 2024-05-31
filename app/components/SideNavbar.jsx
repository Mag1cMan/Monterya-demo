"use client"
import { Disclosure } from "@headlessui/react";
import React, { useState } from "react";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Disclosure as="div" className="relative">
      <Disclosure.Button
        className="fixed top-4 right-4 inline-flex items-center justify-center rounded-md p-2 text-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Add your sidebar toggle icon here */}
      </Disclosure.Button>

      {/* Sidebar content */}
      <Disclosure.Panel
        className={`fixed inset-y-0 right-0 w-64 bg-gray-800 transition-transform transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Add your sidebar content here */}
        {/* Example: <SidebarContent /> */}
      </Disclosure.Panel>

      {/* Overlay to close sidebar when clicked outside */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </Disclosure>


  );
};

export default SideBar;
