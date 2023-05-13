import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const CCHero = () => {
  return (
    <>
      {/* component */}
        <motion.img
          initial={{ scale: 0.5 }}
          animate={{ scale: [0.5, 1.2, 1] }}
          transition={{ duration: 1 }}
          src="/circle.svg"
          height={400}
          width={400}
          className="absolute hidden md:block -top-52 -left-48 z-40"
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
                <form action="" className="w-full mt-12">
                  <div className="relative flex p-1 rounded-full bg-[#81c690] item-center  shadow-lg md:p-4">
                    <div className="w-full shadow-2xl rounded-full mx-3">
                      <input
                        placeholder="Your favorite food"
                        className="w-full p-4 placeholder:text-black placeholder:bold placeholder:text-xl border-2 outline-none shadow-2xl border-black  bg-transparent rounded-full"
                        type="text"
                      />
                    </div>

                    <button
                      type="button"
                      title="Start buying"
                      className="ml-auto py-3 px-6 rounded-full  text-center transition bg-gradient-to-b from-[#017f01] to-[#017f01] hover:to-[#017f01] active:from-[#017f01] focus:from-green-600 shadow-2xl md:px-12"
                    >
                      <span className="hidden text-white font-semibold md:block">
                        Search
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 mx-auto text-yellow-900 md:hidden"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                      </svg>
                    </button>
                  </div>
                </form>
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
