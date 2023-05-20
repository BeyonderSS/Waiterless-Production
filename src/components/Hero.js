import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const CCHero = () => {
  return (
    <>
      {/* component */}
      <motion.img
        initial={{ scale: 0.5 }}
        animate={{ scale: [0.1, 1.2, 1.2, 1.2, 1.5, 0.7, 1] }}
        transition={{ duration: 2 }}
        src="/circle.svg"
        height={400}
        width={400}
        className="absolute hidden md:block -top-52 -left-48 z-40 "
      />
      <div className="relative w-full min-h-screen">
        <div className="relative bg-[#bde6be] min-h-screen ">
          <div className="container m-auto px-6 pt-32 md:px-12 lg:pt-[4.8rem] lg:px-7">
            <div className="flex items-center flex-wrap px-2 md:px-0">
              <div className="relative lg:w-6/12 lg:py-24 xl:py-32">
                {/* <img src="/circle.svg" alt="hello" height={100} width={100}/> */}
                <h1 className="font-bold text-4xl text-black md:text-5xl lg:w-10/12">
                  Your favorite dishes, right at your table
                </h1>
                <motion.div
                  className="w-full mt-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="relative flex flex-col justify-center items-center p-1 rounded-full bg-[#81c690] item-center shadow-lg md:p-4"
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <h1 className="text-4xl text-gray-100 uppercase">
                      Waiterless.Tech
                    </h1>
                    <h1 className="text-xl">
                      Powered by{" "}
                      <a
                        href="https://www.flourishersedge.com/"
                        className="hover:text-green-800 transition ease-in-out duration-300"
                      >
                        {" "}
                        Flourishers Edge
                        <span className="text-2xl text-purple-600">.</span>
                      </a>
                    </h1>
                  </motion.div>
                </motion.div>
                <p className="mt-8 text-gray-700 lg:w-10/12">
                  Experience dining like never before with waiterless.tech.
                  Order and pay with ease, eliminate wait times, and enjoy
                  contactless service. The future of dining is here.
                </p>
              </div>
              <div className="ml-auto -mb-24  lg:w-6/12">
                <Image
                  src="/hamburger-animate.svg"
                  className="relative"
                  alt="food illustration"
                  loading="lazy"
                  width={3000}
                  height={3000}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CCHero;
