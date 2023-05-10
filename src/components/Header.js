import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { GrUpdate } from "react-icons/gr";
import { FiLogIn } from "react-icons/fi";
import { RxCross2, RxHamburgerMenu, RxUpdate } from "react-icons/rx";
import {
  MdFoodBank,
  MdOutlineDashboard,
  MdOutlineExitToApp,
} from "react-icons/md";
const Header = () => {
  const { user, signInWithGoogle, handleSignOut, role, restaurantId } =
    useAuth();
  const [isOpen, setIsOpen] = useState(false);
  // console.log(role);
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
        className="flex fixed flex-wrap  w-full z-50 "
      >
        <section className=" w-full ">
          {/* navbar */}
          <nav
            className={`flex rounded-b-2xl justify-between   w-full  ${
              isOpen
                ? " shadow-none bg-orange-500 text-white transition ease-in-out duration-500"
                : "shadow-lg bg-white/30 backdrop-blur-sm text-orange-500  transition ease-in-out duration-500 "
            }`}
          >
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
              </ul>
              {/* Header Icons */}
              <div className="hidden xl:flex space-x-5 items-center">
              
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
                      <div className="flex justify-center items-center space-x-2 text-lg bg-orange-200 px-2 rounded-full   ">
                       <FiLogIn/><span>Login</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Responsive navbar */}
      
            <button
              className="navbar-burger self-center mr-12 xl:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <RxCross2 className="h-7 w-7 " />
              ) : (
                <RxHamburgerMenu className="h-7 w-7 " />
              )}
            </button>
          </nav>
          {/* responsive nav bar  */}
          <div
            className={`${
              isOpen
                ? " translate-y-0  text-white bg-orange-500 "
                : "lg:-translate-y-96  -translate-y-64 bg-orange-500 text-orange-500 transition ease-in-out duration-500"
            }  w-full absolute rounded-b-3xl shadow-lg transform duration-500  ease-in-out top-0 h-auto  -z-50 block flex-grow lg:flex lg:items-center lg:w-auto`}
          >
            <div className="pt-20 flex flex-row p-5 justify-center items-center   uppercase font-semibold">
              {user ? (
                <div className=" flex flex-col justify-center items-start space-y-2">
                  <button
                    onClick={handleSignOut}
                    className="cursor-pointer text-xl text-white  px-10   bg-orange-500 rounded-full"
                  >
                    Welcome {user.displayName}!
                  </button>{" "}
                  {role == "Admin" && (
                    <Link
                      href="/Dashboard"
                      className="flex flex-row justify-center items-center space-x-2 cursor-pointer text-lg font-semibold "
                    >
                      <MdOutlineDashboard /> <span>Item Dashboard</span>
                    </Link>
                  )}
                  {role == "Admin" && (
                    <Link
                      href="/AddItems"
                      className="flex flex-row justify-center items-center space-x-2 cursor-pointer text-lg font-semibold  "
                    >
                      <RxUpdate /> <span>Update Menu</span>
                    </Link>
                  )}
                  {/* <Link
                    href="/Orders"
                    className="cursor-pointer text-lg font-semibold flex flex-row justify-center items-center space-x-2"
                  >
                    <MdFoodBank /> <span>Past Orders</span>
                  </Link> */}
                  <Link
                    href="/Orders"
                    className="cursor-pointer text-lg font-semibold  flex flex-row justify-center items-center space-x-2"
                  >
                    <MdOutlineExitToApp />
                    <span> Check Out</span>
                  </Link>
                </div>
              ) : (
                <button
                  onClick={signInWithGoogle}
                  className="cursor-pointer text-xl text-white p-1 px-14   bg-orange-500 rounded-full"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default Header;
