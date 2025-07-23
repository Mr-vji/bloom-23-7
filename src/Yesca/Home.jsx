import { Environment, OrbitControls } from "@react-three/drei";
import { Vji } from "../components/Vji";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import { useRef } from "react";
import { Dot } from "./Dot";
import { MainModel } from "./MainModel";
import { useFrame } from "@react-three/fiber";
import { Products } from "./Products";
import { YLogo } from "./Models/YLogo";
import { VFXParticles } from "../VFXPArticles";

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
         initialCameraPos.current.x + mouse.x * 0.3 * 8,
         initialCameraPos.current.y + mouse.y * 0.3 * 8,
         initialCameraPos.current.z // keep original z fixed
      );
      camera.position.lerp(vec3, 0.02);
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
         <OrbitControls />
         <Environment preset="city" />

         <directionalLight
            position={[0, 8, -1]}
            castShadow
            intensity={3}
            shadow-mapSize-width={128}
            shadow-mapSize-height={128}
         />
         <directionalLight position={[0, 8, -1]} />
         <directionalLight position={[0, 1, 1]} color={"blue"} intensity={2} />
         <Dot scale={0.85} position={[-0.45, -1.2, 0]} />
         <YLogo position={[-2, -0.99, 0]} scale={0.045} />
         <VFXParticles position={[-1.38, 0.15, 0]} />
         <VFXParticles position={[-0.95, 0.15, 0]} />

         <mesh position={[-1.88, 0.34, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.45, 0.2]} />
            <meshPhongMaterial color={"white"} emissive={"blue"} emissiveIntensity={20} />
         </mesh>
         <mesh position={[-2.78, 0.34, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.45, 0.2]} />
            <meshPhongMaterial color={"white"} emissive={"blue"} emissiveIntensity={20} />
         </mesh>

         {/* <Products /> */}
         <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="#222C3D" roghness={0} metalness={0.9} />
         </mesh>

         {/* <EffectComposer>
            <Bloom intensity={0.9} luminanceThreshold={1.0} mipmapBlur />
         </EffectComposer> */}
         <EffectComposer>
            <Bloom mipmapBlur intensity={1.2} luminanceThreshold={1} />
         </EffectComposer>
      </>
   );
};
