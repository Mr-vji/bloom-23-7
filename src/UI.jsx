import React from "react";

export function UI() {
   return (
      <main className="w-screen font-sans">
         {/* First Section: Full Width and content aligned to the right */}
         <Section className="flex items-center justify-end" fullWidth={true}>
            <div className="relative flex flex-col md:flex-row-reverse w-full h-full overflow-hidden">
               <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center text-right items-end">
                  <h1
                     className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black italic mb-4 leading-tight"
                     style={{ color: "#afd3f8" }}
                  >
                     WE MAKE TECH <br /> ACCESSIBLE
                  </h1>
               </div>
            </div>
         </Section>

         {/* Second Section: Redesigned with title on left, paragraph on right */}
         <Section className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
            <div className="flex-1 text-center md:text-left">
               <h2 className="text-4xl md:text-6xl text-white font-extrabold leading-tight">
                  Innovative Solutions <br /> For Tomorrow
               </h2>
            </div>
            <div className="flex-1 text-center md:text-left text-white text-lg md:text-xl font-light">
               <p className="mb-4">
                  We are dedicated to creating seamless, secure, and accessible platforms for
                  everyone. Our innovative approach ensures that advanced technology is no longer a
                  privilege but a universal right. We empower individuals and businesses with tools
                  for growth and prosperity in an evolving digital landscape.
               </p>
               <p>
                  Explore our offerings and experience the next generation of technological freedom.
                  With robust features and a user-friendly interface, our solutions are designed for
                  both experts and newcomers alike.
               </p>
            </div>
         </Section>

         {/* Third Section: New section with similar layout */}
         <Section className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
            <div className="flex-1 text-center md:text-left">
               <h2 className="text-4xl md:text-6xl text-black font-extrabold leading-tight">
                  Our Mission: <br /> Empowering Communities
               </h2>
            </div>
            <div className="flex-1 text-center md:text-left text-black text-lg md:text-xl font-light">
               <p className="mb-4">
                  Our mission extends beyond just digital products. We aim to build a global
                  ecosystem where technology fosters genuine connections and creates opportunities
                  for all. We believe in a future where innovation serves humanity, breaking down
                  barriers and building bridges.
               </p>
               <p>
                  Through continuous development and community engagement, we strive to create
                  solutions that are not only advanced but also deeply impactful. Discover how our
                  initiatives are shaping a more inclusive and interconnected world.
               </p>
            </div>
         </Section>

         {/* Fourth Section: Coming Soon */}
         <Section className="flex items-center justify-center bg-white">
            <div className="text-center">
               <h2 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-gray-900 tracking-wider leading-tight animate-pulse">
                  COMING SOON
               </h2>
               <p className="text-xl md:text-2xl text-gray-600 mt-4">
                  We're working hard to bring you something amazing!
               </p>
            </div>
         </Section>
      </main>
   );
}

const Section = ({ children, className = "", fullWidth = false }) => {
   return (
      <section
         className={`${fullWidth ? "w-full" : "max-w-[1024px] mx-auto"} h-screen p-10 ${className}`}
      >
         {children}
      </section>
   );
};
