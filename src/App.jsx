import { Loader, PositionalAudio, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";
import { LoopBox } from "./components/LoopBox";

function App() {
   return (
      <>
         {/* <Stats /> */}
         {/* <UI /> */}
         <Loader />
         <Canvas shadows camera={{ position: [0, 1, 4], fov: 30 }}>
            {/* <fog attach="fog" args={["black", 8, 22]} />
            <color attach="background" args={["black"]} /> */}
            <Experience />
            {/* <Preloader /> */}
            <group position={[0.5, -0.5, 0]}>
               <LoopBox />
            </group>
         </Canvas>
      </>
   );
}

// const sfxs = [
//    "/sfxs/fire.mp3",
//    "/sfxs/freeze.mp3",
//    "/sfxs/buildup.mp3",
//    "/sfxs/gravity.mp3",
//    "/sfxs/blast.mp3",
// ];

// const Preloader = () => {
//    return (
//       <>
//          {sfxs.map((url) => (
//             <PositionalAudio url={url} autoplay={false} key={url} />
//          ))}
//       </>
//    );
// };

export default App;
