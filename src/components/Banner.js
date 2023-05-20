import React from "react";

const Banner = () => {
  return (
    <div className="bg-[#bde6be] flex justify-center items-center md:h-screen pb-16">
      {/* Container for demo purpose */}
      <div className="container  px-6 ">
        {/* Section: Design Block */}
        <section className="mb-32 text-gray-800 text-center lg:text-left">
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n      @media (min-width: 992px) {\n        .rotate-lg-6 {\n          transform: rotate(6deg);\n        }\n      }\n\n      /* These are the KEY styles - you can add them directly to any object you want in your project */\n      .fancy-border-radius {\n        border-radius: 53% 47% 52% 48% / 36% 41% 59% 64%;\n      }\n    ",
            }}
          />
          {/* Jumbotron */}
          <div className="container  xl:px-32 text-center lg:text-left">
            <div className="grid lg:grid-cols-2  items-center">
              <div className="mb-12 lg:mb-0">
                <div
                  className="relative block rounded-lg shadow-lg px-6 py-12 md:px-12 lg:-mr-14"
                  style={{
                    background: "hsla(0, 0%, 100%, 0.55)",
                    backdropFilter: "blur(30px)",
                    zIndex: 1,
                  }}
                >
                  <h2 className="text-3xl font-bold mb-4 display-5">
                    Discover the Power of Waiterless
                  </h2>
                  <p className="text-gray-500 mb-12">
                    Elevate your dining experience with Waiterless, the
                    innovative web app designed to enhance convenience and
                    efficiency.
                  </p>
                  <div className="grid md:grid-cols-3 gap-x-6">
                    <div className="mb-12 md:mb-0">
                      <h2 className="text-3xl font-bold text-dark mb-4">
                        Intuitive Ordering
                      </h2>
                      <p className="text-lg font-medium text-gray-500 mb-0">
                        Streamline your dining experience through our seamless
                        and user-friendly ordering system.
                      </p>
                    </div>
                    <div className="mb-12 md:mb-0">
                      <h2 className="text-3xl font-bold text-dark mb-4">
                        Flexible Payments
                      </h2>
                      <p className="text-lg font-medium text-gray-500 mb-0">
                        Enjoy the convenience of both prepaid and postpaid
                        options for hassle-free payments.
                      </p>
                    </div>
                    <div className="">
                      <h2 className="text-3xl font-bold text-dark mb-4">
                        Real-time Analytics
                      </h2>
                      <p className="text-lg font-medium text-gray-500 mb-0">
                        Gain valuable insights into your restaurant's
                        performance with comprehensive analytics and sales
                        tracking.
                      </p>
                    </div>
                    <div className="mb-12 md:mb-0">
                      <h2 className="text-3xl font-bold text-dark mb-4">
                        Effortless Payments
                      </h2>
                      <p className="text-lg font-medium text-gray-500 mb-0">
                        Seamlessly integrate Razor Pay for secure and efficient
                        payment processing.
                      </p>
                    </div>
                    <div className="mb-12 md:mb-0">
                      <h2 className="text-3xl font-bold text-dark mb-4">
                        Interactive Menus
                      </h2>
                      <p className="text-lg font-medium text-gray-500 mb-0">
                        Engage your customers with interactive menus, allowing
                        them to explore and personalize their dining experience.
                      </p>
                    </div>
                    <div className="">
                      <h2 className="text-3xl font-bold text-dark mb-4">
                        Instant Feedback
                      </h2>
                      <p className="text-lg font-medium text-gray-500 mb-0">
                        Capture valuable customer feedback in real-time to
                        improve service quality and satisfaction levels.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <img
                  src="/coffee-shop-animate.svg"
                  className=" w-full shadow-lg fancy-border-radius -rotate-6"
                  alt=""
                />
              </div>
            </div>
          </div>
          {/* Jumbotron */}
        </section>
        {/* Section: Design Block */}
      </div>
      {/* Container for demo purpose */}
    </div>
  );
};

export default Banner;
