import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";

const imgUrls = {
   img1: "https://picsum.photos/200/300?random=1",
   img2: "https://picsum.photos/200/300?random=2",
   img3: "https://picsum.photos/200/300?random=3",
   img4: "https://picsum.photos/200/300?random=4",
   img5: "https://picsum.photos/200/300?random=5",
};

const randomKeys = Object.keys(imgUrls);

const Box = ({ url, position, rotation }) => {
   const texture = useTexture(url);

   return (
      <mesh scale={0.5} position={position} rotation={rotation}>
         <boxGeometry args={[1, 1, 1]} />
         <meshStandardMaterial map={texture} />
      </mesh>
   );
};

export const Products = () => {
   const radius = 2;
   const count = 2;

   return (
      <>
         <OrbitControls />
         <ambientLight intensity={0.5} />
         <directionalLight position={[5, 5, 5]} intensity={1} />

         {Array.from({ length: count }).map((_, i) => {
            const angle = (i / count) * Math.PI * 2; // divide full circle into equal parts
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;

            const randomIndex = Math.floor(Math.random() * randomKeys.length);
            const randomImage = imgUrls[randomKeys[randomIndex]];

            const rotation = [0, Math.random() * Math.PI, 0];

            return <Box key={i} url={randomImage} position={[x, 0, z]} rotation={rotation} />;
         })}
      </>
   );
};
