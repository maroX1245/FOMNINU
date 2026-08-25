'use client';

// 3D Rotating Strategy Icons Component
// Developer: Mohamed Magdy - 5th Year Medical Student at FOMNINU

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

interface StrategyIconProps {
  title: string;
  icon: string;
  position: [number, number, number];
  isActive: boolean;
}

function StrategyIcon3D({ title, icon, position, isActive }: StrategyIconProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * (isActive ? 1 : 0.3);
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
    
    if (meshRef.current && isActive) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  const color = isActive ? '#06b6d4' : '#005b96';
  const emissive = isActive ? '#06b6d4' : '#000000';

  return (
    <group position={position} ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Main shape based on icon type */}
        {icon === 'pbl' && (
          <mesh ref={meshRef}>
            <dodecahedronGeometry args={[0.6, 0]} />
            <meshStandardMaterial
              color={color}
              emissive={emissive}
              emissiveIntensity={isActive ? 0.6 : 0.2}
              transparent
              opacity={0.9}
            />
          </mesh>
        )}
        
        {icon === 'hybrid' && (
          <mesh ref={meshRef}>
            <torusGeometry args={[0.5, 0.2, 16, 32]} />
            <meshStandardMaterial
              color={color}
              emissive={emissive}
              emissiveIntensity={isActive ? 0.6 : 0.2}
              transparent
              opacity={0.9}
            />
          </mesh>
        )}
        
        {icon === 'clinical' && (
          <mesh ref={meshRef}>
            <octahedronGeometry args={[0.6, 0]} />
            <meshStandardMaterial
              color={color}
              emissive={emissive}
              emissiveIntensity={isActive ? 0.6 : 0.2}
              transparent
              opacity={0.9}
            />
          </mesh>
        )}
        
        {icon === 'research' && (
          <mesh ref={meshRef}>
            <torusKnotGeometry args={[0.4, 0.15, 64, 8]} />
            <meshStandardMaterial
              color={color}
              emissive={emissive}
              emissiveIntensity={isActive ? 0.6 : 0.2}
              transparent
              opacity={0.9}
            />
          </mesh>
        )}
        
        {/* Glow ring */}
        {isActive && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.7, 0.8, 32]} />
            <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} />
          </mesh>
        )}
      </Float>
      
      <Text
        position={[0, -1.2, 0]}
        fontSize={0.25}
        color={color}
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {title}
      </Text>
    </group>
  );
}

export default function StrategyIcons3D({ 
  strategies, 
  activeIndex 
}: { 
  strategies: { title: string; icon: string }[];
  activeIndex: number;
}) {
  const positions: [number, number, number][] = [
    [-3, 0, 0],
    [-1, 0, 0],
    [1, 0, 0],
    [3, 0, 0],
  ];

  return (
    <div className="w-full h-48 md:h-64">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#06b6d4" />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#005b96" />
        
        {strategies.map((strategy, i) => (
          <StrategyIcon3D
            key={strategy.title}
            title={strategy.title}
            icon={strategy.icon}
            position={positions[i]}
            isActive={i === activeIndex}
          />
        ))}
      </Canvas>
    </div>
  );
}
