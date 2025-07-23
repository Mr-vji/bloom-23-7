import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";

const imgUrls = {
   img1: "https://picsum.photos/200/300?random=1",
   img2: "https://picsum.photos/200/300?random=2",
   img3: "https://picsum.photos/200/300?random=3",
   img4: "https://picsum.photos/200/300?random=4",
   img5: "https://picsum.photos/200/300?random=5",
};

export const Products = () => {
   const radius = 2;
   const count = 2;

   return (
      <>
         <OrbitControls />
         <ambientLight intensity={0.5} />
         <directionalLight position={[5, 5, 5]} intensity={1} />

         {/* <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial roughness={0} metalness={0.5} color="red" />
         </mesh> */}
      </>
   );
};
