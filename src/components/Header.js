import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
const Header = () => {
  const { user, signInWithGoogle, handleSignOut, role, restaurantId } =
    useAuth();
  const [isOpen, setIsOpen] = useState(false);
  console.log(role)
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 1, y: -200 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="flex fixed flex-wrap  w-full z-50"
      >
        <section className=" w-full ">
          {/* navbar */}
          <nav className="flex rounded-b-2xl justify-between bg-white/30 backdrop-blur-sm text-orange-500 w-full">
            <div className="px-5 xl:px-12 py-6 flex w-full items-center">
              <Link
                className="text-3xl cursor-pointer font-bold font-heading"
                href="/"
              >
                WaiterLess
              </Link>
              {/* Nav Links */}
              <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                <li>
                  <Link className="hover:text-orange-800" href="/">
                    Home
                  </Link>
                </li>
                {role == "Admin" && (
                  <li>
                    <Link className="hover:text-orange-800" href="/Dashboard">
                      Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <a className="hover:text-orange-800" href="#">
                    Collections
                  </a>
                </li>
              </ul>
              {/* Header Icons */}
              <div className="hidden xl:flex space-x-5 items-center">
                {user && (
                  <div className="hover:text-orange-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                )}
                <a className="flex items-center hover:text-orange-800" href="#">
                  <IoMdNotificationsOutline className="h-8 w-8 hover:text-orange-800" />
                </a>
                {/* Sign In / Register      */}
                <div className="flex items-center hover:text-orange-800">
                  {user ? (
                    <div onClick={handleSignOut} className="cursor-pointer">
                      <img
                        className="w-10 h-10  rounded-full"
                        src={user?.photoURL}
                        alt=""
                      />{" "}
                    </div>
                  ) : (
                    <div onClick={signInWithGoogle} className="cursor-pointer">
                      <div className="relative  w-10 h-10 overflow-hidden bg-orange-500 rounded-full  ">
                        <svg
                          className="absolute w-10 h-10 text-white "
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Responsive navbar */}
            <a className="xl:hidden flex mr-6 items-center" href="#">
              <IoMdNotificationsOutline className="h-8 w-8 hover:text-orange-800" />
            </a>
            <button
              className="navbar-burger self-center mr-12 xl:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <RxHamburgerMenu className="h-7 w-7 text-orange-500 hover:text-orange-800" />
            </button>
          </nav>
          {/* responsive nav bar  */}
          <div
            className={`${
              isOpen ? " translate-y-0" : "-translate-y-52"
            } md:hidden w-full absolute rounded-b-3xl transform duration-500 ease-in-out top-0 h-auto bg-white/30 backdrop-blur-sm text-orange-500 -z-50 block flex-grow lg:flex lg:items-center lg:w-auto`}
          >
            <div className="pt-20 flex flex-row p-5 justify-center items-center   uppercase font-semibold">
              <div className="flex flex-row  space-x-20">
                {user ? (
                  <div className=" flex flex-col justify-center items-center">
                    <button onClick={handleSignOut} className="cursor-pointer">
                      Welcome {user.displayName}
                    </button>{" "}
                    <Link href="/Orders" className="cursor-pointer">
                      Your Orders
                    </Link>
                  </div>
                ) : (
                  <button onClick={signInWithGoogle} className="cursor-pointer">
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default Header;
