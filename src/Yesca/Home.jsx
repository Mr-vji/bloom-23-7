import { Box, ContactShadows, Environment, OrbitControls, Plane } from "@react-three/drei";
import { YLogo } from "./Models/YLogo";
import { Flor } from "./Flor";
import { Vji } from "../components/Vji";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { degToRad } from "three/src/math/MathUtils.js";

export const Home = () => {
   return (
      <>
         <OrbitControls
            minDistance={19}
            maxDistance={19}
            minPolarAngle={Math.PI / 4 + 0.1}
            maxPolarAngle={Math.PI / 2}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
         />{" "}
         <Environment preset="city" />
         <group position={[-0.25, 0, 0]}>
            <Vji position={[0, 0, 0]} />
         </group>
         <YLogo scale={0.04} position={[-0.1, -1, 0]} />
         <ContactShadows scale={[16, 16]} opacity={1} position={[0, -1, 0]} color="black" />
         <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.01, 0.18, 0]}>
            <planeGeometry args={[0.4, 0.17]} />
            <meshStandardMaterial color="white" emissive="blue" emissiveIntensity={12} />
         </mesh>
         <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.8, 0.18, 0]}>
            <planeGeometry args={[0.4, 0.17]} />
            <meshStandardMaterial color="white" emissive="blue" emissiveIntensity={12} />
         </mesh>
         {/* <group position={[0, -1, 0]}><YLogo scale={0.04} position={[-1.5, 0, 0]} /></group> */}
         <EffectComposer>
            <Bloom intensity={0.3} luminanceThreshold={1.0} mipmapBlur />
         </EffectComposer>
      </>
   );
};
