import { Loader, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Home } from "./Yesca/Home";
import Content from "./Yesca/Content";
import { Test } from "./Test";

function App() {
   return (
      <>
         {/* <Stats /> */}
         <Loader />
         <Canvas gl={{ antialias: true }} shadows camera={{ position: [4, 2, 19], fov: 10 }}>
            <fog attach="fog" args={["#10141c", 20, 30]} />
            <color attach="background" args={["#10141c"]} />
            <Preload all />
            <Home />
            {/* <Test /> */}
         </Canvas>
         <Content />
      </>
   );
}

export default App;
