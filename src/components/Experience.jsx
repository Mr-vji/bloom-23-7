import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Magic } from "./Magic";
import { Vji } from "./Vji";
import { LoopBox } from "./LoopBox";
import { Day2 } from "./Day2";

export const Experience = () => {
   return (
      <>
         <OrbitControls enabled={false} />
         {/* <Environment preset="night" /> */}
         <directionalLight
            position={[1.5, 5, -5]}
            castShadow
            intensity={0.5}
            shadow-mapSize-width={128}
            shadow-mapSize-height={128}
         />
         {/* <Magic /> */}
         <OrbitControls
            minDistance={8}
            maxDistance={8}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
         />
         {/* <group position={[0, -0.5, 0]}>
            <Vji />
         </group>

         <group position={[0.5, -0.5, 0]}>
            <LoopBox />
         </group> */}
         <group>
            <Day2 />
         </group>

         <EffectComposer>
            <Bloom intensity={0.3} luminanceThreshold={1.3} mipmapBlur />
         </EffectComposer>
      </>
   );
};
