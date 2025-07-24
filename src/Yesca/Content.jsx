import React from "react";

export default function Content() {
   return (
      <>
         <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap"
            rel="stylesheet"
         />

         <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none p-6 font-[Inter]">
            <div className="relative flex flex-col md:flex-row-reverse w-full h-full overflow-hidden">
               <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center text-right items-end -translate-y-4">
                  <h1
                     className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black italic mb-4 leading-tight"
                     style={{ color: "#afd3f8" }}
                  >
                     WE MAKE TECH <br /> ACCESSIBLE
                  </h1>
               </div>
            </div>
         </div>
      </>
   );
}
