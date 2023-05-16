import { useState } from "react";
import { motion } from "framer-motion";
import { FiLogIn } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { VscSignOut } from "react-icons/vsc";
import { AiOutlineDatabase } from "react-icons/ai";
import Link from "next/link";

const ProfileDropdown = () => {
  const { user, signInWithGoogle, handleSignOut, role, restaurantId } =
    useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="relative">
      <div onClick={toggleMenu} className="cursor-pointer">
        <img className="w-10 h-10 rounded-full" src={user?.photoURL} alt="" />
      </div>
      {showMenu && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="absolute top-12 right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
        >
          <div className="py-1">
            <Link href="/Dashboard/UpdateProfile" className="flex flex-row justify-start space-x-1 items-center  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
              <AiOutlineDatabase />
              <span>Update Details</span>
            </Link>
          </div>
          <div className="py-1">
            <button
              onClick={handleSignOut}
              className="flex flex-row justify-start space-x-1 items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left "
            >
              <VscSignOut />
              <span>Sign Out</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
export default ProfileDropdown;
