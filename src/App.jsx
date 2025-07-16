import { ContactShadows, Loader, PositionalAudio, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";
import { LoopBox } from "./components/LoopBox";
import { Home } from "./Yesca/Home";
import { Leva } from "leva";
import Content from "./Yesca/Content";

function App() {
   return (
      <>
         {/* <Stats /> */}
         {/* <UI /> */}
         <Loader />
         <Canvas shadows camera={{ position: [0, 1, 19], fov: 10 }}>
            {/* <fog attach="fog" args={["black", 20, 30]} />
            <color attach="background" args={["black"]} /> */}
            {/* <Experience /> */}

            {/* <fog attach="fog" args={["#222C3D", 40, 50]} />
            <color attach="background" args={["#222C3D"]} /> */}
            <fog attach="fog" args={["#10141c", 20, 30]} />
            <color attach="background" args={["#10141c"]} />
            <Home />
         </Canvas>
         <Content />
      </>
   );
}

export default App;
