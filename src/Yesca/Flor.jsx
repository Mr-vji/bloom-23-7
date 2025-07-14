import { MeshReflectorMaterial } from "@react-three/drei";
import { useControls } from "leva";

export const Flor = () => {
   const { mirror, mixStrength, roughness, metalness, blurX, blurY, mixBlur, resolution } =
      useControls({
         mirror: { value: 0.3, min: 0, max: 1, step: 0.01 },
         mixStrength: { value: 0.9, min: 0, max: 1, step: 0.01 },
         roughness: { value: 1.0, min: 0, max: 1, step: 0.01 },
         metalness: { value: 0.88, min: 0, max: 1, step: 0.01 },
         blurX: { value: 400, min: 0, max: 1000, step: 1 },
         blurY: { value: 100, min: 0, max: 1000, step: 1 },
         mixBlur: { value: 0.21, min: 0, max: 1, step: 0.01 },
         resolution: { value: 1032, min: 128, max: 2048, step: 1 },
      });
   return (
      <>
         <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
            <planeGeometry args={[100, 100]} />
            <MeshReflectorMaterial
               color={"#3e3262"}
               mirror={mirror}
               mixStrength={mixStrength}
               roughness={roughness}
               metalness={metalness}
               blur={[blurX, blurY]}
               mixBlur={mixBlur}
               resolution={resolution}
               depthScale={0}
               minDepthThreshold={0.9}
               maxDepthThreshold={1}
               depthToBlurRatioBias={0.25}
               reflectorOffset={0.01}
            />
         </mesh>
         ;
      </>
   );
};
