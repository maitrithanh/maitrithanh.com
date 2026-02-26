"use client";

import React, { memo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import type { Group, Mesh } from "three";

function FloatingOrb({
  position,
  color,
  scale,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
}) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    mesh.rotation.y = state.clock.elapsedTime * 0.12;
    mesh.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.25;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 8]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.15}
          metalness={0.35}
          emissive={color}
          emissiveIntensity={0.08}
          distort={0.35}
          speed={1.5}
          transparent
          opacity={0.5}
        />
      </mesh>
    </Float>
  );
}

function Ribbons() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;

    group.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.12;
    group.rotation.y = state.clock.elapsedTime * 0.06;
  });

  return (
    <group ref={groupRef} position={[0, 0, -3]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.4, 0]}>
        <torusGeometry args={[5.8, 0.03, 16, 180]} />
        <meshStandardMaterial color="#7c9cff" transparent opacity={0.38} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0.25, 0]} position={[0.3, -1.3, 0]}>
        <torusGeometry args={[4.8, 0.04, 16, 180]} />
        <meshStandardMaterial color="#9e7bff" transparent opacity={0.34} />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight intensity={1.1} position={[3, 5, 2]} color="#d6dcff" />
      <pointLight intensity={0.9} position={[-4, 1, 4]} color="#88a6ff" />
      <pointLight intensity={0.85} position={[4, -2, 3]} color="#b290ff" />

      <FloatingOrb position={[-2.9, 1.8, -0.2]} color="#86a8ff" scale={1.1} />
      <FloatingOrb position={[2.8, -0.2, 0.4]} color="#a98aff" scale={1.25} />
      <FloatingOrb position={[0.2, 2.6, -1.2]} color="#7fb5ff" scale={0.75} />

      <Ribbons />
    </>
  );
}

const SceneBackground = memo(function SceneBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 1.6]}>
        <Scene />
      </Canvas>
    </div>
  );
});

export default SceneBackground;
