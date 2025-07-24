import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { useMobile } from "./useMobile";

export const Test = () => {
   const { isMobile } = useMobile();
   return (
      <>
         <Environment preset="city" />
         <OrbitControls />
         <ambientLight intensity={0.5} />
         <group position={[0, -0.5, 0]}>
            <mesh rotation={[0, 0.2, 0]} position={[isMobile ? 0 : -2.0, 0, 0]}>
               <boxGeometry args={[1, 2, 1]} />
               <meshStandardMaterial roughness={0} metalness={0.5} color="red" wireframe />
            </mesh>
            <ContactShadows position={[0, -1, 0]} scale={10} blur={2} far={2} opacity={1} />
         </group>
      </>
   );
};
