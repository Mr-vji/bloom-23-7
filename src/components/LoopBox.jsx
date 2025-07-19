import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import * as THREE from "three";

const MovingBox = ({ startX, gap }) => {
   const ref = useRef();
   const matRef = useRef();
   const [bloomActive, setBloomActive] = useState(0);

   const STARTING_POSITION = 0; // changed to 0
   const ENDING_POSITION = 6;

   useEffect(() => {
      if (ref.current) {
         ref.current.position.x = startX; // initialize each box at its own startX

         const animate = () => {
            const currentX = ref.current.position.x;
            let targetX = currentX + gap; // move by gap amount each time

            // Enable bloom if crossing x >= 0
            if (currentX < -0.7 && targetX >= -0.7) {
               setBloomActive(5);
            }

            // If targetX reaches ENDING_POSITION, animate to ENDING_POSITION then reset
            if (targetX >= ENDING_POSITION) {
               gsap.to(ref.current.position, {
                  x: ENDING_POSITION,
                  duration: 1.5,
                  ease: "elastic.out(1.1,1)",
                  onComplete: () => {
                     ref.current.position.x = STARTING_POSITION; // reset to 0
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

   // Update material color based on bloomActive
   useEffect(() => {
      if (matRef.current) {
         const color = new THREE.Color("white");
         color.multiplyScalar(bloomActive > 0 ? bloomActive : 1);
         matRef.current.color = color;
      }
   }, [bloomActive]);

   return (
      <group scale={0.2} ref={ref} position={[STARTING_POSITION, 0.3, 0]}>
         <mesh rotation={[0, 0, 0]}>
            <boxGeometry args={[1.2, 1, 0.5]} />
            <meshBasicMaterial ref={matRef} color={"white"} />
         </mesh>
      </group>
   );
};

export const LoopBox = () => {
   const NUM_OBJECTS = 10; // number of objects
   const GAP = 1.0; // gap increment per movement

   return (
      <>
         <group position={[0, 0, 0]}>
            {Array.from({ length: NUM_OBJECTS }, (_, i) => (
               <MovingBox key={i} startX={0 - i * GAP} gap={GAP} />
            ))}
         </group>
      </>
   );
};
