"use client";
import React, { useState, useEffect, useRef } from "react";
import { UserAuth } from "../context/AuthContext";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { addUserToDatabase } from "../auth-server-action/action";
import { toast } from "react-toastify";
const navigation = [
  { name: "StartGame", href: "#", current: true },
  {
    name: "Game Wiki",
    href: "#",
    current: false,
    dropdown: true,
    dropdownItems: ["Stoies", "Fetures", "Resouces"],
  },
  { name: "Community", href: "auth-server-action", current: false },
  { name: "M-Shop", href: "transaction-server-action", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Navbar = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };

    console.log(user);

    checkAuthentication();

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [user]);



  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };
  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignOut = async () => {
    try {
      await logOut();
      toast("Log out");
    } catch (error) {
      console.log(error);
    }
  };

  async function Testing() {
    addUserToDatabase();
  }

  

  
  return (
    <Disclosure as="nav" className="bg-transparent	fixed top-0 left-0 w-full z-10">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8 sticky">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden ">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white ">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex items-center justify-center sm:justify-start">
                <div className="flex items-center">
                  <a href="/">
                    <img
                      className="h-32 sm:ml-auto sm:block"
                      src="/MonteryaNoicon.png"
                      alt="Monterya"
                    />
                  </a>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <React.Fragment key={item.name}>
                        {item.dropdown ? (
                          <div
                            ref={dropdownRef}
                            className="relative inline-block text-left"
                          >
                            <button
                              className={classNames(
                                item.current
                                  ? "bg-blue-500 text-white"
                                  : "px-4 py-2 text-white hover:text-white hover:bg-zinc-800 transition-all duration-200",
                                "flex items-center rounded-md px-3 py-2 text-sm font-medium"
                              )}
                              onClick={handleDropdownClick}
                              aria-haspopup="true"
                              aria-expanded={showDropdown ? "true" : "false"}
                            >
                              {item.name}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 ml-2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                />
                              </svg>
                            </button>
                            {showDropdown && (
                              <div
                                className="origin-top-right absolute mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="options-menu"
                              >
                                <div className="py-1" role="none">
                                  {item.dropdownItems.map(
                                    (dropdownItem, index) => (
                                      <a
                                        key={index}
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                        role="menuitem"
                                        onClick={() => setShowDropdown(false)}
                                      >
                                        {dropdownItem}
                                      </a>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <a
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-blue-500 text-white"
                                : "px-4 py-2 text-white hover:text-white hover:bg-zinc-800 transition-all duration-200",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side  */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {loading ? null : !user ? (
                  // Content to render if user exists

                <a href="/auth-server-action" className="inline-block px-4 py-1 mx-auto text-white bg-blue-600 rounded-md hover:bg-blue-600 ">
                  Login
                </a>

                ) : // Render nothing if user doesn't exist
                
                  <>
                    {/* <button
                      type="button"
                      className="relative rounded-full bg-white p-1 text-black hover:text-black focus:outline-none "
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button> */}

                      <button type="button" className="px-4 py-2 text-white ">
                        {user.email}
                      </button>
                    
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="/images/avatars/DrMundo_3.jpg"
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Your Profile
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                onClick={addUserToDatabase}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Settings
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                onClick={handleSignOut} // Call the signOut function when the menu item is clicked
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Sign out
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </>           
                }
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-rose-500 text-grey-600"
                      : "text-white hover:bg-zinc-600 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
