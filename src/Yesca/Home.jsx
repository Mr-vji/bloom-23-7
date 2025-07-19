import { Environment, OrbitControls } from "@react-three/drei";
import { Vji } from "../components/Vji";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import { useRef } from "react";
import { John } from "./John";
import { MainModel } from "./MainModel";
import { useFrame } from "@react-three/fiber";
import { Products } from "./Products";

export const Home = () => {
   let vec3 = new THREE.Vector3();
   const initialCameraPos = useRef();

   // useFrame(({ camera, mouse }) => {
   //    if (!initialCameraPos.current) {
   //       // Store initial position once
   //       initialCameraPos.current = camera.position.clone();
   //    }

   //    // Calculate target based on initial position
   //    vec3.set(
   //       initialCameraPos.current.x + mouse.x * 0.3 * 8,
   //       initialCameraPos.current.y + mouse.y * 0.3 * 8,
   //       initialCameraPos.current.z // keep original z fixed
   //    );
   //    camera.position.lerp(vec3, 0.02);
   //    camera.lookAt(0, 0, 0);
   // });

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
         <directionalLight
            position={[0, 10, -1]}
            castShadow
            intensity={3}
            shadow-mapSize-width={128}
            shadow-mapSize-height={128}
         />
         <directionalLight position={[0, 1, 1]} color={"blue"} intensity={1.4} />
         <group position={[-0.1, 0, 0]}>
            <Vji position={[-0.62, -0.1, 0]} />
            <Vji position={[-1.5, -0.1, 0]} />
         </group>
         <MainModel position={[-1.3, -1, 0]} scale={1.5} />
         <John scale={0.9} position={[-0.61, -1.11, 0]} />
         {/* <Products /> */}
         <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="#222C3D" roghness={0} metalness={0.9} />
         </mesh>

         <EffectComposer>
            <Bloom intensity={0.3} luminanceThreshold={1.0} mipmapBlur />
         </EffectComposer>
      </>
   );
};
