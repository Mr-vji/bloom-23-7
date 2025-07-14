import { Environment } from "@react-three/drei";
import { VFXEmitter, VFXParticles } from "wawa-vfx";
import * as THREE from "three";

export const Day2 = () => {
   const color = new THREE.Color("red");
   color.multiplyScalar(12);
   return (
      <>
         <group position={[0, 0, 0]}>
            <VFXS />;
            <Spells />
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
               intensity: 6,
               fadeSize: [0.1, 0.1],
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
            emitter="sparks"
            debug
            settings={{
               duration: 1,
               delay: 0,
               nbParticles: 1000,
               spawnMode: "time",
               loop: true,
               startPositionMin: [0, 0, 0],
               startPositionMax: [0, 0, 0],
               startRotationMin: [0, 0, 0],
               startRotationMax: [0, 0, 0],
               particlesLifetime: [0.1, 6.1000000000000005],
               speed: [0, 1],
               directionMin: [-1, 1, -1],
               directionMax: [1, 1, 1],
               rotationSpeedMin: [0, 0, 0],
               rotationSpeedMax: [0, 0, 0],
               colorStart: ["#294eff", "#ffffff", "#ff0000"],
               colorEnd: ["#1e70ff", "#31ff74", "#ff0000"],
               size: [0, 0.02],
            }}
         />
      </group>
   );
};
