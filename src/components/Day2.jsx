import { Environment } from "@react-three/drei";

export const Day2 = () => {
   return (
      <>
         <group position={[0, 0, 0]}>
            <Environment preset="city" />
            <mesh position={[0, -3, 0]}>
               <boxGeometry args={[1, 5, 1]} />
               <meshStandardMaterial color="red" roughness={0.5} metalness={0.5} />
            </mesh>
         </group>
      </>
   );
};
