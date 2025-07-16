import { Box, Center, ContactShadows, Environment, OrbitControls, Plane } from "@react-three/drei";
import { YLogo } from "./Models/YLogo";
import { Flor } from "./Flor";
import { Vji } from "../components/Vji";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { degToRad } from "three/src/math/MathUtils.js";
import { MouseMove } from "./MouseMove";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { DotProduct } from "./DotProduct";
import { LoopBox } from "../components/LoopBox";
export const Home = () => {
   let vec3 = new THREE.Vector3();
   const initialCameraPos = useRef();

   useFrame(({ camera, mouse }) => {
      if (!initialCameraPos.current) {
         // Store initial position once
         initialCameraPos.current = camera.position.clone();
      }

      // Calculate target based on initial position
      vec3.set(
         initialCameraPos.current.x + mouse.x * 0.5 * 8,
         initialCameraPos.current.y + mouse.y * 0.3 * 8,
         initialCameraPos.current.z // keep original z fixed
      );

      // Lerp to target
      camera.position.lerp(vec3, 0.02);

      // Look at center
      camera.lookAt(0, 0, 0);
   });

   return (
      <>
         {/* <OrbitControls
            minDistance={19}
            maxDistance={19}
            minPolarAngle={Math.PI / 4 + 0.1}
            maxPolarAngle={Math.PI / 2}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
         /> */}
         {/* <OrbitControls /> */}
         <Environment preset="city" />
         <group position={[-0.25, 0.05, 0]}>
            <Vji position={[-0.6, 0, 0]} />
            <Vji position={[0.25, 0, 0]} />
         </group>
         <directionalLight
            position={[0, 10, -1]}
            castShadow
            intensity={2}
            shadow-mapSize-width={128}
            shadow-mapSize-height={128}
         />
         <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="#222C3D" roghness={0} metalness={0.9} />
         </mesh>
         <group position={[-1.8, 0, 0]}>
            <YLogo scale={0.049} position={[-0.1 + 0.1, -1, 0]} />
            <group position={[3.047, 0, 0]}>
               <DotProduct />
            </group>
            <mesh rotation={[-Math.PI / 2, 0, 0]} scale={1.25} position={[0.13, 0.45, 0]}>
               <planeGeometry args={[0.4, 0.17]} />
               <meshStandardMaterial color="white" emissive="blue" emissiveIntensity={12} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} scale={1.25} position={[-0.85, 0.45, 0]}>
               <planeGeometry args={[0.4, 0.17]} />
               <meshStandardMaterial color="white" emissive="blue" emissiveIntensity={12} />
            </mesh>
         </group>
         {/* <ContactShadows scale={[16, 16]} opacity={1} position={[0, -1, 0]} color="black" /> */}

         <EffectComposer>
            <Bloom intensity={0.3} luminanceThreshold={1.0} mipmapBlur />
         </EffectComposer>
      </>
   );
};
