import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <nav className="fixed top-0 w-full z-50 flex items-center justify-between flex-wrap bg-[#E8772E] p-6">
   <div>
          <a href="#" className=" text-sm px-4 py-2 leading-none border rounded text-white bg-primary hover:border-transparent hover:text-primary hover:bg-white mt-4 lg:mt-0">Sign up</a>
        </div>
      <div className="flex items-center flex-shrink-0 space-x-4 text-white mr-6">
        <svg className="h-8 w-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1 15H9l2.339-6.33L9 8h2l1.449 3.934L14 8h2l-2.339 2.67L15 17h-2z"/>
        </svg>
        <span className="font-semibold uppercase text-3xl tracking-tight">WaiterLess</span>
      </div>
   <div></div>
      
     
    </nav>
  )
}

export default Header;
