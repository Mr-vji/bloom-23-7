import { useRef, useEffect } from "react";
import { useGLTF, Environment } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

export const John = (props) => {
   const groupRef = useRef();

   const startingPosition = -2;
   const endingPosition = 5;
   const count = 10;
   const gap = 0.8;

   const { scene } = useGLTF("/models/DOT.glb");

   useEffect(() => {
      if (groupRef.current) {
         groupRef.current.children.forEach((child) => {
            const move = () => {
               let targetX = child.position.x + gap;

               if (targetX >= endingPosition) {
                  targetX = endingPosition;
               }

               gsap.to(child.position, {
                  x: targetX,
                  duration: 1.5,
                  ease: "power1.out",
                  onComplete: () => {
                     if (targetX >= endingPosition) {
                        child.position.x = startingPosition;
                     }
                     requestAnimationFrame(move);
                  },
               });
            };
            setTimeout(() => move(), 3500);
            // move();
         });
      }
   }, []);

   return (
      <>
         <Environment preset="city" />
         <group ref={groupRef} {...props}>
            {Array.from({ length: count }, (_, i) => {
               const cloned = scene.clone();

               // Traverse and replace material with yellow color only (no texture)
               cloned.traverse((child) => {
                  if (child.isMesh) {
                     child.material = new THREE.MeshStandardMaterial({
                        color: "blue",
                        emissive: "blue", // Add emissive
                        emissiveIntensity: 13, // Adjust as needed
                        roughness: 0,
                        metalness: 0,
                        side: THREE.DoubleSide,
                     });
                     child.material.needsUpdate = true;
                  }
               });
               return (
                  <primitive
                     object={cloned}
                     castShadow
                     key={i}
                     scale={0.05}
                     position={[startingPosition + i * gap, 0.5, 0]}
                  />
               );
            })}
         </group>
      </>
   );
};
