import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, useTexture } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

export const VjiLoop = () => {
   const groupRef = useRef();

   const startingPosition = -4;
   const endingPosition = 4;
   const count = 10;
   const gap = 1;

   // Array of image paths
   const imgPaths = [
      "/images/1.jpg",
      "/images/2.jpg",
      "/images/3.jpg",
      "/images/4.jpg",
      "/images/5.jpg",
      "/images/6.jpg",
      "/images/7.jpg",
   ];

   // Load all textures at once as an array
   const textures = useTexture(imgPaths);
   textures.forEach((texture) => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1); // repeat texture 2 times horizontally and vertically
   });

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
                  duration: 1,
                  ease: "power4.out",
                  onComplete: () => {
                     if (targetX >= endingPosition) {
                        child.position.x = startingPosition;
                     }
                     // Continue the loop
                     requestAnimationFrame(move);
                  },
               });
            };
            move();
         });
      }
   }, []);

   return (
      <group ref={groupRef}>
         {Array.from({ length: count }, (_, i) => {
            // Get a random texture from the loaded textures array
            const randomIndex = Math.floor(Math.random() * textures.length);
            const randomTexture = textures[randomIndex];

            return (
               <>
                  <Environment preset="city" />
                  <mesh
                     castShadow
                     key={i}
                     scale={1.2}
                     position={[startingPosition + i * gap, 0.5, 0]}
                  >
                     <boxGeometry args={[0.5, 0.5, 0.5]} />
                     <meshStandardMaterial map={randomTexture} roughness={1} metalness={0} />
                  </mesh>
               </>
            );
         })}
      </group>
   );
};
