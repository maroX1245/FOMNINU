'use client';

// Animated Particle Background
// Developer: Mohamed Magdy - 5th Year Medical Student at FOMSCU

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function MicroscopicParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  
  const particleCount = 300;
  
  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    const colorPalette = [
      new THREE.Color('#06b6d4'),
      new THREE.Color('#005b96'),
      new THREE.Color('#0891b2'),
      new THREE.Color('#22d3ee'),
    ];
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
      
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      sizes[i] = Math.random() * 0.08 + 0.02;
    }
    
    return [positions, colors, sizes];
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.elapsedTime;
      particlesRef.current.rotation.y = time * 0.02;
      particlesRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
      
      // Animate positions
      const positionAttr = particlesRef.current.geometry.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positionAttr.array[i3 + 1] += Math.sin(time + i) * 0.001;
      }
      positionAttr.needsUpdate = true;
    }
    
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <>
      {/* Floating particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      
      {/* Central DNA-like structure */}
      <mesh ref={meshRef} position={[0, 0, -5]}>
        <torusKnotGeometry args={[2, 0.4, 128, 16]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
          wireframe
        />
      </mesh>
    </>
  );
}

function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(8)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(i * Math.PI * 0.25) * 5,
            Math.cos(i * Math.PI * 0.25) * 3,
            Math.sin(i * 0.5) * 2 - 3,
          ]}
        >
          <octahedronGeometry args={[0.3 + Math.random() * 0.2, 0]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#06b6d4' : '#005b96'}
            transparent
            opacity={0.3}
            emissive={i % 2 === 0 ? '#06b6d4' : '#005b96'}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#06b6d4" />
        <pointLight position={[-10, -10, 5]} intensity={0.5} color="#005b96" />
        
        <MicroscopicParticles />
        <FloatingShapes />
      </Canvas>
    </div>
  );
}
