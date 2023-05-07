import React from "react";
import { motion } from "framer-motion";
import { CiForkAndKnife } from "react-icons/ci";
const CategoryBubble = ({ category }) => {
  return (
    <motion.div
      className="flex flex-col justify-center items-center cursor-pointer bg-orange-500 hover:text-orange-500 hover:bg-white transition ease-in-out h-24 w-24 rounded-xl px-4 py-2 text-white mr-2 mb-2"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <CiForkAndKnife  className="h-12 w-12 rounded-lg p-1"/>
      <div>{category}</div>
    </motion.div>
  );
};

export default CategoryBubble;
