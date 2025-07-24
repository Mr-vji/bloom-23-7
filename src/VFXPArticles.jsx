import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { Color, DynamicDrawUsage, Euler, Matrix4, PlaneGeometry, Quaternion, Vector3 } from "three";

import { randFloat, randFloatSpread } from "three/src/math/MathUtils.js";

const tmpPosition = new Vector3();
const tmpRotationEuler = new Euler();
const tmpRotation = new Quaternion();
const tmpScale = new Vector3(0.4, 0.4, 0.4);
const tmpMatrix = new Matrix4();
const tmpColor = new Color();

const PARTICLE_COLORS = [
   new Color("#B0B0B0"), // Light Grey
   new Color("#1B1C5A"), // Very Dark Blue
   new Color("#7EC8E3"), // Sky Blue
   new Color("#008080"), // Teal
   new Color("#C0C0C0"), // Silver
];

export const VFXParticles = ({ settings = {}, ...props }) => {
   const { nbParticles = 600 } = settings;
   const mesh = useRef();

   const defaultGeometry = useMemo(() => new PlaneGeometry(0.5, 0.5), []);

   const particleLifetimes = useMemo(
      () =>
         new Array(nbParticles).fill(0).map(() => ({
            startTime: 0,
            duration: 0,
         })),
      [nbParticles]
   );

   const emit = (index, currentTime = 0) => {
      const instanceColor = mesh.current.geometry.getAttribute("instanceColor");
      const instanceColorEnd = mesh.current.geometry.getAttribute("instanceColorEnd");
      const instanceDirection = mesh.current.geometry.getAttribute("instanceDirection");
      const instanceLifetime = mesh.current.geometry.getAttribute("instanceLifetime");
      const instanceSpeed = mesh.current.geometry.getAttribute("instanceSpeed");
      const instanceRotationSpeed = mesh.current.geometry.getAttribute("instanceRotationSpeed");

      const position = [randFloatSpread(0.33), randFloatSpread(0.1), randFloatSpread(0.1)];
      const scale = [randFloatSpread(0.25), randFloatSpread(0.25), randFloatSpread(0.25)];
      const rotation = [
         randFloatSpread(Math.PI),
         randFloatSpread(Math.PI),
         randFloatSpread(Math.PI),
      ];
      tmpPosition.set(...position);
      tmpRotationEuler.set(...rotation);
      tmpRotation.setFromEuler(tmpRotationEuler);
      tmpScale.set(...scale);
      tmpMatrix.compose(tmpPosition, tmpRotation, tmpScale);

      mesh.current.setMatrixAt(index, tmpMatrix);

      tmpColor.setRGB(0, 0, 0);
      instanceColor.set([tmpColor.r, tmpColor.g, tmpColor.b], index * 3);

      const randomColor = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
      tmpColor.copy(randomColor);
      instanceColorEnd.set([tmpColor.r, tmpColor.g, tmpColor.b], index * 3);

      const direction = [randFloatSpread(0.5), 0.5, randFloatSpread(0.5)];
      instanceDirection.set(direction, index * 3);

      const duration = randFloat(0.1, 2);
      particleLifetimes[index].startTime = currentTime;
      particleLifetimes[index].duration = duration;
      instanceLifetime.set([currentTime, duration], index * 2);

      const speed = randFloat(0, 0.6);
      instanceSpeed.set([speed], index);

      const rotationSpeed = [randFloatSpread(1), randFloatSpread(1), randFloatSpread(1)];
      instanceRotationSpeed.set(rotationSpeed, index * 3);
   };

   useEffect(() => {
      if (mesh.current) {
         for (let i = 0; i < nbParticles; i++) {
            emit(i, 0);
         }
         mesh.current.instanceMatrix.needsUpdate = true;
         mesh.current.geometry.getAttribute("instanceColor").needsUpdate = true;
         mesh.current.geometry.getAttribute("instanceColorEnd").needsUpdate = true;
         mesh.current.geometry.getAttribute("instanceDirection").needsUpdate = true;
         mesh.current.geometry.getAttribute("instanceLifetime").needsUpdate = true;
         mesh.current.geometry.getAttribute("instanceSpeed").needsUpdate = true;
         mesh.current.geometry.getAttribute("instanceRotationSpeed").needsUpdate = true;
      }
   }, [nbParticles, mesh]);

   useFrame(({ clock }) => {
      if (!mesh.current) {
         return;
      }
      const currentTime = clock.elapsedTime;
      mesh.current.material.uniforms.uTime.value = currentTime;

      let needsAttributeUpdate = false;
      for (let i = 0; i < nbParticles; i++) {
         const p = particleLifetimes[i];
         const effectiveAge = currentTime - p.startTime;

         if (effectiveAge >= p.duration) {
            emit(i, currentTime);
            needsAttributeUpdate = true;
         }
      }

      if (needsAttributeUpdate) {
         mesh.current.instanceMatrix.needsUpdate = true;
         mesh.current.geometry.getAttribute("instanceColor").needsUpdate = true;
         mesh.current.geometry.getAttribute("instanceColorEnd").needsUpdate = true;
         mesh.current.geometry.getAttribute("instanceDirection").needsUpdate = true;
         mesh.current.geometry.getAttribute("instanceLifetime").needsUpdate = true;
         mesh.current.geometry.getAttribute("instanceSpeed").needsUpdate = true;
         mesh.current.geometry.getAttribute("instanceRotationSpeed").needsUpdate = true;
      }
   });

   const [attributeArrays] = useState({
      instanceColor: new Float32Array(nbParticles * 3),
      instanceColorEnd: new Float32Array(nbParticles * 3),
      instanceDirection: new Float32Array(nbParticles * 3),
      instanceLifetime: new Float32Array(nbParticles * 2),
      instanceSpeed: new Float32Array(nbParticles * 1),
      instanceRotationSpeed: new Float32Array(nbParticles * 3),
   });

   return (
      <group {...props}>
         <instancedMesh args={[defaultGeometry, null, nbParticles]} ref={mesh}>
            <particlesMaterial color="orange" side={THREE.DoubleSide} />
            <instancedBufferAttribute
               attach="geometry-attributes-instanceColor"
               args={[attributeArrays.instanceColor, 3]}
               usage={DynamicDrawUsage}
            />
            <instancedBufferAttribute
               attach="geometry-attributes-instanceColorEnd"
               args={[attributeArrays.instanceColorEnd, 3]}
               usage={DynamicDrawUsage}
            />
            <instancedBufferAttribute
               attach="geometry-attributes-instanceDirection"
               args={[attributeArrays.instanceDirection, 3]}
               usage={DynamicDrawUsage}
            />
            <instancedBufferAttribute
               attach="geometry-attributes-instanceLifetime"
               args={[attributeArrays.instanceLifetime, 2]}
               usage={DynamicDrawUsage}
            />
            <instancedBufferAttribute
               attach="geometry-attributes-instanceSpeed"
               args={[attributeArrays.instanceSpeed, 1]}
               usage={DynamicDrawUsage}
            />
            <instancedBufferAttribute
               attach="geometry-attributes-instanceRotationSpeed"
               args={[attributeArrays.instanceRotationSpeed, 3]}
               usage={DynamicDrawUsage}
            />
         </instancedMesh>
      </group>
   );
};

const ParticlesMaterial = shaderMaterial(
   {
      uTime: 0,
      color: new Color("white"),
   },
   /* glsl */ `
uniform float uTime;

varying vec2 vUv;
varying vec3 vColor;
varying vec3 vColorEnd;
varying float vProgress;

attribute float instanceSpeed;
attribute vec3 instanceRotationSpeed;
attribute vec3 instanceDirection;
attribute vec3 instanceColor;
attribute vec3 instanceColorEnd;
attribute vec2 instanceLifetime;

void main() {
    float duration = instanceLifetime.y;
    float startTime = instanceLifetime.x;

    float effectiveAge = mod(uTime - startTime, duration);

    vProgress = 1.0 - (effectiveAge / duration);

    vec3 normalizedDirection = length(instanceDirection) > 0.0 ? normalize(instanceDirection) : vec3(0.0);
    
    float remainingLifetime = duration - effectiveAge;
    vec3 offset = normalizedDirection * remainingLifetime * instanceSpeed;

    vec4 startPosition = modelMatrix * instanceMatrix * vec4(position, 1.0);
    vec3 instancePosition = startPosition.xyz;

    vec3 finalPosition = instancePosition + offset;
    vec4 mvPosition = modelViewMatrix * vec4(finalPosition, 1.0);

    gl_Position = projectionMatrix * mvPosition;

    vUv = uv;
    vColor = instanceColor;
    vColorEnd = instanceColorEnd;
}
`,
   /* glsl */ `
varying vec3 vColor;
varying vec3 vColorEnd;
varying float vProgress;
varying vec2 vUv;


void main() {
    vec3 finalColor = mix(vColor, vColorEnd, 1.0 - vProgress); 
    gl_FragColor = vec4(finalColor, vProgress);
}
`
);

ParticlesMaterial.transparent = true;

extend({ ParticlesMaterial });
