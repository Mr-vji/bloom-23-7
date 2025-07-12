import { Environment } from "@react-three/drei";
import { VFXEmitter, VFXParticles } from "wawa-vfx";
import * as THREE from "three";

export const Vji = () => {
   const color = new THREE.Color("red");
   color.multiplyScalar(12);
   return (
      <>
         <group position={[0, 0.5, 0]}>
            <VFXS />;
            <Spells />
            <mesh position={[0, 0.01, 0]} scale={1}>
               <boxGeometry args={[0.5, 0.01, 0.7]} />
               <meshStandardMaterial color="#45eaff" emissive="#45eaff" emissiveIntensity={1} />
            </mesh>
            <Environment preset="city" />
            <mesh position={[0, -5 + 0.002, 0]}>
               <boxGeometry args={[0.5, 10, 0.7]} />
               <meshStandardMaterial color="red" roughness={0.5} metalness={0.5} />
            </mesh>
         </group>
      </>
   );
};
const VFXS = () => {
   return (
      <>
         <VFXParticles
            name="sparks"
            settings={{
               nbParticles: 10000,
               renderMode: "billboard",
               intensity: 3,
               fadeSize: [0.1, 0.1],
            }}
         />
         <VFXParticles
            name="capsules"
            geometry={<capsuleGeometry args={[0.1, 3, 16, 32]} />}
            settings={{
               nbParticles: 1000,
               renderMode: "mesh",
               intensity: 5,
               perParticleScale: (i) => [1, Math.random() * 2 + 0.5, 1], // random height between 0.5 - 2.5
            }}
         />
      </>
   );
};

const Spells = () => {
   return (
      <>
         <Void />
      </>
   );
};

const Void = ({ ...props }) => {
   return (
      <group {...props}>
         <VFXEmitter
            emitter="capsules"
            // debug
            settings={{
               duration: 1,
               delay: 1,
               nbParticles: 80,
               spawnMode: "time",
               loop: true,
               startPositionMin: [-0.2, 2, -0.3],
               startPositionMax: [0.2, -1, 0.3],
               startRotationMin: [0, 0, 0],
               startRotationMax: [0, 0, 0],
               particlesLifetime: [0.1, 8.9],
               speed: [0, 0.3],
               directionMin: [0, -1, 0],
               directionMax: [0, 0, 0],
               rotationSpeedMin: [0, 0, 0],
               rotationSpeedMax: [0, 0, 0],
               colorStart: ["#ffffff", "#45eaff"],
               colorEnd: ["#ff0000", "#ff359f"],
               size: [0.01, 0.03],
            }}
         />
      </group>
   );
};
