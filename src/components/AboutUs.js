import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <>
      <section className=" bg-[#bde6be] overflow-hidden pt-20 pb-12 lg:pt-[120px] lg:pb-[90px]">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap items-center justify-between">
            
            <motion.div
            
            className="w-full px-4 lg:w-6/12">
              <div className="-mx-3 flex items-center sm:-mx-4">
                <Image
                  src="/business-decisions-animate.svg"
                  height={4000}
                  width={4000}
                  alt="Buisness"
                />
              </div>
            </motion.div>
            <motion.div className="w-full px-4 lg:w-1/2 xl:w-5/12">
              <div className="mt-10 lg:mt-0">
                <span className="text-primary mb-2 block text-lg font-semibold">
                  Why choose us?
                </span>
                <h2 className="text-dark mb-8 text-3xl font-bold sm:text-4xl">
                  We Elevate Your Restaurant Business with Waiterless
                </h2>
                <p className="text-body-color mb-8 text-base">
                  Waiterless is a revolutionary platform that eliminates the
                  need for waiters by installing QR codes on tables for
                  ordering. Our platform helps restaurants streamline their
                  operations and provides resources to manage payments using
                  Razorpay. With our user-friendly dashboard, managing orders
                  has never been easier.
                </p>
                <p className="text-body-color mb-12 text-base">
                  At Waiterless, we understand that a strong brand image is
                  crucial for your restaurant&rsquo;s success. That&rsquo;s why
                  we provide you with a custom domain name that matches your
                  business and helps you establish a consistent brand image.
                  Start building your brand today with Waiterless.
                </p>

                {/* <a
                  href="/"
                  className="bg-primary inline-flex items-center justify-center rounded-lg py-4 px-10 text-center text-base font-normal text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  Get Started
                </a> */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* ====== About Section End */}
    </>
  );
}
