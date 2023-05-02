import { useAuth } from "../context/AuthContext";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
const {user,signInWithGoogle,handleSignOut} = useAuth();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 w-full z-50 flex items-center justify-between flex-wrap bg-[#E8772E] p-6">
      <div>
        {!user ? (
          <button
            
            className=" text-sm px-4 py-2 flex justify-center items-center leading-none border rounded text-white hover:text-[#E8772E] bg-primary hover:border-transparent hover:text-primary hover:bg-white  transition ease-in-out  lg:mt-0"
            onClick={signInWithGoogle}
          >
            LogIn
          </button>
        ) : (
          <button
            
            className=" text-sm px-4 py-2 flex justify-center items-center leading-none border rounded text-white hover:text-[#E8772E] bg-primary hover:border-transparent hover:text-primary hover:bg-white transition ease-in-out  lg:mt-0"
            onClick={handleSignOut}
          >
            LogOut
          </button>
        )}
      </div>
      <div className="flex items-center flex-shrink-0 space-x-4 text-white mr-6">
     
        <span className="font-semibold uppercase text-3xl tracking-tight">
          WaiterLess
        </span>
      </div>
      <div></div>
    </nav>
  );
};

export default Header;
