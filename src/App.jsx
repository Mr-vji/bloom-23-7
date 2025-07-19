import { Loader, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Home } from "./Yesca/Home";
import Content from "./Yesca/Content";

function App() {
   return (
      <>
         {/* <Stats /> */}
         <Loader />
         <Canvas gl={{ antialias: false }} shadows camera={{ position: [6, 2, 19], fov: 10 }}>
            <fog attach="fog" args={["#10141c", 20, 30]} />
            <color attach="background" args={["#10141c"]} />
            <Preload all />
            <Home />
         </Canvas>
         <Content />
      </>
   );
}

export default App;
