import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaBars } from "react-icons/fa";

const DashNav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
      <div className="hidden md:block">
        <div className="scrollbar-none h-screen transform duration-500 ease-in-out fixed top-0 left-0 w-80 z-50 overflow-y-auto bg-green-200 rounded-r-3xl shadow-2xl translate-x-0 md:translate-x-0">
          <div className="flex flex-col space-y-4 px-2 justify-start">
            <div>icon1</div>
            <div>icon2</div>
            <div>icon3</div>
          </div>
        </div>
      </div>
      <div className="block md:hidden">
        <button type="button" className="block" onClick={toggleMenu}>
          <FaBars className="h-8 w-8 fill-current text-gray-300 hover:text-blue-600 cursor-pointer" />
        </button>
        <div
          ref={menuRef}
          onClick={() => setIsMenuOpen(false)}
          className={`scrollbar-none h-screen transform duration-500 ease-in-out fixed top-0 left-0 w-80 z-50 overflow-y-auto bg-green-200 rounded-r-3xl shadow-xl ${
            isMenuOpen ? "translate-x-0" : "-translate-x-96"
          }`}
        >
          <div className="flex flex-col space-y-4 px-2 justify-start">
            <div>icon1</div>
            <div>icon2</div>
            <div>icon3</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashNav;
