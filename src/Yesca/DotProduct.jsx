import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import * as THREE from "three";
import { Gltf, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const MovingBox = ({ startX, gap }) => {
   const ref = useRef();
   const matRef = useRef();
   const [bloomActive, setBloomActive] = useState(0);

   const STARTING_POSITION = -4;
   const ENDING_POSITION = 6;

   const { scene, materials } = useGLTF(`/models/DOT.glb`);

   useEffect(() => {
      scene.traverse((child) => {
         if (child.isMesh) {
            child.castShadow = true; // 👈 enables casting shadows
            child.receiveShadow = true; // 👈 enables receiving shadows (optional)

            child.material = new THREE.MeshStandardMaterial({
               color: "white",
               emissive: new THREE.Color("white"),
               roughness: 1,
               metalness: 0.5,
               emissiveIntensity: 2.5,
               side: THREE.DoubleSide,
            });
         }
      });
   }, [scene]);

   useEffect(() => {
      if (ref.current) {
         ref.current.position.x = startX; // initialize each box at its otytwn startX

         const animate = () => {
            const currentX = ref.current.position.x;
            let targetX = currentX + gap; // move by gap amount each time
            const v = -3.7;

            // Enable bloom if crossing x >= 0
            if (currentX < v && targetX >= v) {
               setBloomActive(5);
            }

            // If targetX reaches ENDING_POSITION, animate to ENDING_POSITION then reset
            if (targetX >= ENDING_POSITION) {
               gsap.to(ref.current.position, {
                  x: ENDING_POSITION,
                  duration: 1.5,
                  ease: "elastic.out(1.1,1)",
                  onComplete: () => {
                     ref.current.position.x = STARTING_POSITION;
                     setBloomActive(0);
                     animate(); // continue loop
                  },
               });
            } else {
               gsap.to(ref.current.position, {
                  x: targetX,
                  duration: 1.5,
                  ease: "elastic.out(1.1,1)",
                  onComplete: animate,
               });
            }
         };

         animate();
      }
   }, [gap]);

   useEffect(() => {
      if (matRef.current) {
         const color = new THREE.Color("white");
         color.multiplyScalar(bloomActive > 0 ? bloomActive : 1);
         matRef.current.color = color;
      }
   }, [bloomActive]);

   return (
      <group scale={0.2} ref={ref} position={[STARTING_POSITION, 0.3, 0]}>
         <Gltf src="/models/DOT.glb" position={[2, -5.45, 0]} scale={[0.25, 0.25, 0.25]} />
      </group>
   );
};

export const DotProduct = () => {
   const NUM_OBJECTS = 10; // number of objects
   const GAP = 1.0; // gap increment per movement

   return (
      <>
         <group position={[0.4, 0, 0]}>
            {Array.from({ length: NUM_OBJECTS }, (_, i) => (
               <MovingBox key={i} startX={-4 - i * GAP} gap={GAP} />
            ))}
         </group>
      </>
   );
};
