import { Environment } from "@react-three/drei";
import { VFXEmitter, VFXParticles } from "wawa-vfx";
import * as THREE from "three";

export const Vji = (props) => {
   const color = new THREE.Color("red");
   color.multiplyScalar(12);
   return (
      <>
         <group position={[0, 0, 0]} {...props}>
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
               intensity: 16,
               perParticleScale: (i) => [1, Math.random() * 8 + 0.5, 1],
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
               delay: 0,
               nbParticles: 180,
               spawnMode: "time",
               loop: true,
               startPositionMin: [0.1, 1.9, 0.05],
               startPositionMax: [-0.1, 2.2, -0.05],
               startRotationMin: [0, 0, 0],
               startRotationMax: [0, 0, 0],
               particlesLifetime: [0, 2.2],
               speed: [1, 1],
               directionMin: [0, -1, 0],
               directionMax: [0, -1, 0],
               rotationSpeedMin: [0, 0, 0],
               rotationSpeedMax: [0, 0, 0],
               colorStart: ["#ffffff", "#8d97eb", "#dec4c4"],
               colorEnd: ["#0010ff", "#d736ff", "#315dff"],
               size: [0.01, 0.03],
            }}
         />
         {/* <VFXEmitter
            emitter="capsules"
            debug
            settings={{
               duration: 2,
               delay: 0,
               nbParticles: 180,
               spawnMode: "time",
               loop: true,
               startPositionMin: [-0.2, 3, -0.3],
               startPositionMax: [0.2, -1, 0.3],
               startRotationMin: [0, 0, 0],
               startRotationMax: [0, 0, 0],
               particlesLifetime: [0.1, 8.9],
               speed: [0.5, 0.5],
               directionMin: [0, -1, 0],
               directionMax: [0, -1, 0],
               rotationSpeedMin: [0, 0, 0],
               rotationSpeedMax: [0, 0, 0],
               colorStart: ["#ffffff", "#45eaff"],
               colorEnd: ["#ff0000", "#ff359f"],
               size: [0.01, 0.03],
            }}
         /> */}
      </group>
   );
};
