import React from "react";

export default function Header() {
   return (
      <header className="absolute top-0 left-0 w-full py-6 px-8 z-10">
         <nav className="flex justify-between items-center w-full">
            {/* Left side logo image */}
            <div>
               <img src="images/FULL-LOGO.svg" alt="Site Logo" className="h-10 w-auto" />
            </div>

            {/* Navigation Links */}
            <ul className="flex space-x-10 text-white text-base font-medium mr-19 ">
               <li>
                  <a href="#" className="hover:text-blue-200 transition-colors duration-200">
                     Home
                  </a>
               </li>
               <li>
                  <a href="#" className="hover:text-blue-200 transition-colors duration-200">
                     Products
                  </a>
               </li>
               <li>
                  <a href="#" className="hover:text-blue-200 transition-colors duration-200">
                     It services
                  </a>
               </li>
               <li>
                  <a href="#" className="hover:text-blue-200 transition-colors duration-200">
                     Dev services
                  </a>
               </li>
               <li>
                  <a href="#" className="hover:text-blue-200 transition-colors duration-200">
                     About
                  </a>
               </li>
               <li>
                  <a href="#" className="hover:text-blue-200 transition-colors duration-200">
                     Contact
                  </a>
               </li>
            </ul>
         </nav>
      </header>
   );
}
