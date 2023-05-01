import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#E8772E] pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/3 px-4 mb-4 lg:mb-0">
            <h3 className="text-white font-bold text-xl mb-2">FlorishersEdge</h3>
            <p className="text-white text-sm">Made with love and passion by FlorishersEdge</p>
          </div>
          <div className="w-full lg:w-1/3 px-4">
            <h3 className="text-white font-bold text-xl mb-2">Terms and Conditions</h3>
            <ul className="list-reset">
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" className="text-white text-sm hover:text-gray-400">Privacy Policy</a>
              </li>
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" className="text-white text-sm hover:text-gray-400">Terms of Use</a>
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-1/3 px-4">
            <h3 className="text-white font-bold text-xl mb-2">Contact Us</h3>
            <ul className="list-reset">
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" className="text-white text-sm hover:text-gray-400">Email</a>
              </li>
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" className="text-white text-sm hover:text-gray-400">Phone</a>
              </li>
            </ul>
            <div className="mt-4">
              <a href="#" className="text-white hover:text-gray-400 mr-4"><FaFacebook /></a>
              <a href="#" className="text-white hover:text-gray-400 mr-4"><FaTwitter /></a>
              <a href="#" className="text-white hover:text-gray-400"><FaInstagram /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
