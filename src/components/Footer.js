import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className=" bg-gray-800 text-gray-500">
      <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <Link href="/" legacyBehavior>
            <a className="text-gray-200 text-2xl font-bold uppercase tracking-wide">
              WaiterLess
            </a>
          </Link>
        </div>
        <div className="text-center">
          <ul className="flex flex-col md:flex-row">
            <li className="mt-3 md:mt-0 md:ml-6 text-sm">
              <Link href="/Support/ContactUs" legacyBehavior>
                <a className="text-gray-300 hover:text-gray-100">
                  Contact Us
                </a>
              </Link>
            </li>
            <li className="mt-3 md:mt-0 md:ml-6 text-sm">
              <Link href="/Support/ContactUs" legacyBehavior>
                <a className="text-gray-300 hover:text-gray-100">
                  Help &amp; Support
                </a>
              </Link>
            </li>
            <li className="mt-3 md:mt-0 md:ml-6 text-sm">
              <Link href="/Support/Feedback" legacyBehavior>
                <a className="text-gray-300 hover:text-gray-100">
                  Feedback
                </a>
              </Link>
            </li>
            <li className="mt-3 md:mt-0 md:ml-6 text-sm">
              <a href="https://www.flourishersedge.com/" className="text-gray-100 hover:text-gray-100">
                Made by Flourishers Edge
              </a>
            </li>
          </ul>
        </div>
        <div className="text-center md:text-right mt-4 md:mt-0">
          <p className="text-sm text-gray-300">&copy; {currentYear} Flourishers Edge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
