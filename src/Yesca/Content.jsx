import React from "react";

export default function Content() {
   return (
      <>
         <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap"
            rel="stylesheet"
         />

         <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none p-6 font-[Inter]">
            <div className="relative flex flex-col md:flex-row-reverse w-full h-full rounded-lg border border-gray-700 text-white overflow-hidden shadow-lg">
               {/* Left section (now on right) */}
               <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-start text-left items-end">
                  <h2 className="text-xl md:text-2xl uppercase font-semibold text-purple-400 mb-2 mt-4">
                     Welcome to Yesca
                  </h2>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                     Crafting Digital Experiences
                  </h1>
                  <p className="text-lg md:text-xl max-w-md mb-4">
                     At Yesca, we empower businesses with cutting-edge web solutions, immersive
                     interactive experiences, and powerful software development tailored to your
                     goals.
                  </p>
                  <p className="text-lg md:text-xl max-w-md mb-8">
                     We specialise in building innovative websites, interactive 3D applications, and
                     digital products that elevate your brand and engage your customers.
                  </p>
               </div>

               {/* Right section (now on left) */}
               <div className="flex flex-col items-start justify-between p-8 md:p-12 lg:p-16">
                  {/* Explore Icon */}
                  <div className="flex items-center space-x-2 text-purple-400 cursor-pointer">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 md:h-8 md:w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                     </svg>
                     <span className="text-lg md:text-xl">Explore</span>
                  </div>

                  {/* Website link bottom left */}
                  <p className="text-lg md:text-xl mt-4 md:mt-0">yesca.in</p>
               </div>

               {/* Bottom Right Button */}
               <div className="absolute bottom-8 right-8">
                  <button className="pointer-events-auto bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded shadow text-lg md:text-xl">
                     Contact Us
                  </button>
               </div>
            </div>
         </div>
      </>
   );
}
