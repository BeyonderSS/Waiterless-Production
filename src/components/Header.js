import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BiDish } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
const Header = () => {
  const { user, signInWithGoogle, handleSignOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

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
          <nav className="flex rounded-b-2xl justify-between bg-[#E8772E] text-white w-full">
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
                  <Link className="hover:text-gray-200" href="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-gray-200" href="/Menu">
                    Menu
                  </Link>
                </li>
                <li>
                  <a className="hover:text-gray-200" href="#">
                    Collections
                  </a>
                </li>
              </ul>
              {/* Header Icons */}
              <div className="hidden xl:flex space-x-5 items-center">
                {user && (
                  <div className="hover:text-gray-200">
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
                <a className="flex items-center hover:text-gray-200" href="#">
                  <BiDish className="h-8 w-8 hover:text-gray-200" />
                </a>
                {/* Sign In / Register      */}
                <div className="flex items-center hover:text-gray-200">
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
                      <div className="relative  w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ">
                        <svg
                          className="absolute w-10 h-10 text-gray-400 "
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
              <BiDish className="h-8 w-8 hover:text-gray-200" />
            </a>
            <button
              className="navbar-burger self-center mr-12 xl:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <RxHamburgerMenu className="h-7 w-7 hover:text-gray-200" />
            </button>
          </nav>
          {/* responsive nav bar  */}
          <div
            className={`${
              isOpen ? " translate-y-0" : "-translate-y-24"
            } md:hidden w-full absolute rounded-b-3xl transform duration-500 ease-in-out top-0 h-auto bg-[#E8772E] -z-50 block flex-grow lg:flex lg:items-center lg:w-auto`}
          >
            <div className="pt-20 flex flex-row p-5 justify-center items-center text-white text-xl uppercase font-semibold">
              {user ? (
                <p>Hey, {user.displayName} Have a Great Meal! </p>
              ) : (
                <div className="flex flex-row  space-x-20">
                  {" "}
                  <div className="cursor-pointer">Menu</div>
                  <div className="cursor-pointer">Home</div>
                  <div className="cursor-pointer">Login</div>
                </div>
              )}
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default Header;
