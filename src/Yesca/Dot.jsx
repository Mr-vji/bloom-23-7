import { useRef, useEffect } from "react";
import { useGLTF, Environment } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

export const Dot = (props) => {
   const groupRef = useRef();

   const startingPosition = -2;
   const endingPosition = 5;
   const count = 10;
   const gap = 0.8;

   const { scene } = useGLTF("/models/DOTBloom.glb");

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
            // setTimeout(() => move(), 3500);
            move();
         });
      }
   }, []);

   return (
      <>
         {/* <Environment preset="city" /> */}
         <directionalLight position={[1, 1, 1]} intensity={2} />
         <group ref={groupRef} {...props}>
            {Array.from({ length: count }, (_, i) => {
               const cloned = scene.clone();

               // Traverse and replace material with yellow color only (no texture)
               // cloned.traverse((child) => {
               //    if (child.isMesh) {
               //       child.material = new THREE.MeshStandardMaterial({
               //          color: "blue",
               //          emissive: "blue",
               //          emissiveIntensity: 1,
               //          roughness: 0.5,
               //          metalness: 0.5,
               //          side: THREE.DoubleSide,
               //       });
               //       child.material.needsUpdate = true;
               //       console.log(child.name);
               //    }
               // });
               cloned.traverse((child) => {
                  if (child.isMesh) {
                     // Check if the current child's name is 'Plane'
                     child.castShadow = true;
                     if (child.name === "Plane") {
                        child.material = new THREE.MeshPhongMaterial({
                           color: "blue", // Changed color to
                           emissive: "blue", // You might also want to change emissive to red for consistency with bloom
                           emissiveIntensity: 1,
                           roughness: 0.5,
                           metalness: 0.5,
                           side: THREE.DoubleSide,
                        });
                        child.material.needsUpdate = true;
                        console.log(`Changed material of ${child.name} to red.`);
                     } else {
                        // For other meshes, apply your original blue material
                        child.material = new THREE.MeshStandardMaterial({
                           color: "blue",
                           emissive: "blue",
                           emissiveIntensity: 10,
                           roughness: 0.5,
                           metalness: 0.5,
                           side: THREE.DoubleSide,
                        });
                        child.material.needsUpdate = true;
                     }
                  }
               });
               return (
                  <primitive
                     object={cloned}
                     castShadow
                     key={i}
                     scale={0.053}
                     position={[startingPosition + i * gap, 0.47, 0]}
                  />
               );
            })}
         </group>
      </>
   );
};
