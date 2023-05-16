import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaBars } from "react-icons/fa";
import Link from "next/link";
import { FiLogIn } from "react-icons/fi";
import {
  AiFillSignal,
  AiOutlineBell,
  AiOutlineAppstoreAdd,
} from "react-icons/ai";
import { useAuth } from "@/context/AuthContext";
import { GrUpdate } from "react-icons/gr";
import { HiOutlineQrCode } from "react-icons/hi2";
import { RxUpdate } from "react-icons/rx";
import ProfileDropdown from "./ProfileDropdown";
const DashNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const { user, signInWithGoogle, handleSignOut, role, restaurantId } =
    useAuth();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="w-full  bg-green-400 shadow-lg fixed top-0 z-50">
        <div className="flex flex-row justify-between items-center p-5">
          <div>
            <button
              type="button"
              className="md:hidden block"
              onClick={toggleMenu}
            >
              <FaBars className="h-8 w-8  fill-current text-gray-100 cursor-pointer" />
            </button>
          </div>
          <div className="flex items-center hover:text-green-800 ">
            {user ? (
              <ProfileDropdown/>
            ) : (
              <div onClick={signInWithGoogle} className="cursor-pointer">
                <div className="flex justify-center items-center space-x-2 text-lg bg-green-200 px-2 rounded-full   ">
                  <FiLogIn />
                  <span>Login</span>
                </div>
              </div>
            )}
          </div>{" "}
        </div>
        <div className="hidden md:block">
          <div className="scrollbar-none h-screen transform duration-500 ease-in-out fixed top-0 left-0 w-80 z-50 overflow-y-auto bg-green-400 rounded-r-3xl  translate-x-0 md:translate-x-0">
            <Link href={"/"}>
              <h1 className="text-3xl font-semibold flex flex-col justify-center items-center text-white py-4 cursor-pointer  transform duration-100 ease-in-out ">
                Waiterless.Tech{" "}
                <span className="w-full h-[2px] bg-gray-200 lg:w-72 rounded-full my-4 hover:bg-white"></span>
              </h1>
            </Link>
            <div className="flex flex-col space-y-4 px-4 justify-center items-center text-white mt-7 p-2">
              <Link
                className="hover:bg-black/20 p-2 w-full  rounded-xl cursor-pointer"
                href="/Dashboard/Dashboard"
              >
                {" "}
                <div className="px-1 flex flex-row justify-start space-x-2 text-lg items-center">
                  <AiFillSignal className="text-2xl" /> <span>Analytics</span>
                </div>
              </Link>
              <Link
                className="hover:bg-black/20 p-2 w-full  rounded-xl cursor-pointer"
                href="/Dashboard/OrdersDashboard"
              >
                {" "}
                <div className="px-1 flex flex-row justify-start space-x-2 text-lg items-center">
                  <AiOutlineBell className="text-2xl" />{" "}
                  <span>Realtime Orders</span>
                </div>
              </Link>
              <Link
                className="hover:bg-black/20 p-2 w-full  rounded-xl cursor-pointer"
                href="/Dashboard/AddItems"
              >
                {" "}
                <div className="px-1 flex flex-row justify-start space-x-2 text-lg items-center">
                  <AiOutlineAppstoreAdd className="text-2xl" />{" "}
                  <span>Add to Menu</span>
                </div>
              </Link>
              <Link
                className="hover:bg-black/20 p-2 w-full  rounded-xl cursor-pointer"
                href="/Dashboard/UpdateMenu"
              >
                {" "}
                <div className="px-1 flex flex-row justify-start space-x-2 text-lg items-center ">
                  <RxUpdate className="text-2xl" />
                  <span>Update Menu</span>
                </div>
              </Link>
              <Link
                className="hover:bg-black/20 p-2 w-full  rounded-xl cursor-pointer"
                href="/Dashboard/GenerateQr"
              >
                {" "}
                <div className="px-1 flex flex-row justify-start space-x-2 text-lg items-center">
                  <HiOutlineQrCode className="text-2xl" />
                  <span>Qr Codes</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="block md:hidden">
          <div
            ref={menuRef}
            onClick={() => setIsMenuOpen(false)}
            className={`scrollbar-none h-screen transform duration-500 ease-in-out fixed top-0 left-0 w-80 z-50 overflow-y-auto bg-teal-400 rounded-r-3xl shadow-xl ${
              isMenuOpen ? "translate-x-0" : "-translate-x-96"
            }`}
          >
            <div className="scrollbar-none h-screen transform duration-500 ease-in-out fixed top-0 left-0 w-80 z-50 overflow-y-auto bg-teal-400 rounded-r-3xl  translate-x-0 md:translate-x-0">
              <Link href={"/"}>
                <h1 className="text-3xl font-semibold flex flex-col justify-center items-center text-white py-4 cursor-pointer  transform duration-100 ease-in-out ">
                  Waiterless.Tech{" "}
                  <span className=" h-[2px] bg-gray-200 w-72 rounded-full my-4 hover:bg-white"></span>
                </h1>
              </Link>
              <div className="flex flex-col space-y-4 px-4 justify-center items-center text-white mt-7 p-2">
                <Link
                  className="hover:bg-black/20 p-2 w-full  rounded-xl cursor-pointer"
                  href="/Dashboard/Dashboard"
                >
                  {" "}
                  <div className="px-1 flex flex-row justify-start space-x-2 text-lg items-center">
                    <AiFillSignal className="text-2xl" /> <span>Analytics</span>
                  </div>
                </Link>
                <Link
                  className="hover:bg-black/20 p-2 w-full  rounded-xl cursor-pointer"
                  href="/Dashboard/OrdersDashboard"
                >
                  {" "}
                  <div className="px-1 flex flex-row justify-start space-x-2 text-lg items-center">
                    <AiOutlineBell className="text-2xl" />{" "}
                    <span>Realtime Orders</span>
                  </div>
                </Link>
                <Link
                  className="hover:bg-black/20 p-2 w-full  rounded-xl cursor-pointer"
                  href="/Dashboard/AddItems"
                >
                  {" "}
                  <div className="px-1 flex flex-row justify-start space-x-2 text-lg items-center">
                    <AiOutlineAppstoreAdd className="text-2xl" />{" "}
                    <span>Add to Menu</span>
                  </div>
                </Link>
                <Link
                  className="hover:bg-black/20 p-2 w-full  rounded-xl cursor-pointer"
                  href="/Dashboard/UpdateMenu"
                >
                  {" "}
                  <div className="px-1 flex flex-row justify-start space-x-2 text-lg items-center ">
                    <RxUpdate className="text-2xl" />
                    <span>Update Menu</span>
                  </div>
                </Link>
                <Link
                  className="hover:bg-black/20 p-2 w-full  rounded-xl cursor-pointer"
                  href="/Dashboard/GenerateQr"
                >
                  {" "}
                  <div className="px-1 flex flex-row justify-start space-x-2 text-lg items-center">
                    <HiOutlineQrCode className="text-2xl" />
                    <span>Qr Codes</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashNav;
