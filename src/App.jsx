import { Loader, Preload, Scroll, ScrollControls, Stats, useScroll } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect } from "react";

import { Home } from "./Yesca/Home";
import { UI } from "./UI";
import Header from "./Header";
import { BackgroundChanger } from "./BackgroundChanger.jsx";
import { Background } from "./Background.jsx";

function App() {
   return (
      <>
         <Loader />

         <Canvas gl={{ antialias: true }} shadows camera={{ position: [4, 2, 19], fov: 10 }}>
            <Preload all />

            <ScrollControls pages={4} damping={0.2}>
               <BackgroundChanger />
               {/* <Background /> */}
               <Home />

               <Scroll html>
                  <UI />
                  <Header />
               </Scroll>
            </ScrollControls>
         </Canvas>
      </>
   );
}

export default App;
