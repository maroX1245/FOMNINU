'use client';

// 3D Interactive Timeline Component
// Developer: Mohamed Magdy - 5th Year Medical Student at FOMSCU

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, RoundedBox, Float } from '@react-three/drei';
import * as THREE from 'three';

interface TimelineData {
  year: number;
  title: string;
  description: string;
}

interface TimelineNodeProps {
  data: TimelineData;
  position: [number, number, number];
  isActive: boolean;
  onClick: () => void;
}

function TimelineNode({ data, position, isActive, onClick }: TimelineNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      if (isActive) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.3, 1.3, 1.3), 0.1);
      } else if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  const color = isActive ? '#06b6d4' : '#005b96';
  const emissive = isActive ? '#06b6d4' : '#000000';

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
        <mesh
          ref={meshRef}
          onClick={onClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <icosahedronGeometry args={[0.4, 1]} />
          <meshStandardMaterial
            color={color}
            emissive={emissive}
            emissiveIntensity={isActive ? 0.8 : 0.2}
            transparent
            opacity={0.9}
          />
        </mesh>
      </Float>
      
      <Text
        position={[0, 0.8, 0]}
        fontSize={0.3}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Tajawal-Regular.ttf"
      >
        {data.year.toString()}
      </Text>
      
      {isActive && (
        <Text
          position={[0, -0.8, 0]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={2}
        >
          {data.title}
        </Text>
      )}
    </group>
  );
}

function TimelinePath({ milestones }: { milestones: TimelineData[] }) {
  const points = milestones.map((_, i) => [
    (i - milestones.length / 2) * 2,
    Math.sin(i * 0.5) * 0.3,
    0,
  ] as [number, number, number]);

  const curve = new THREE.CatmullRomCurve3(
    points.map(p => new THREE.Vector3(...p))
  );

  const curvePoints = curve.getPoints(100);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={curvePoints.length}
          array={new Float32Array(curvePoints.flatMap(v => [v.x, v.y, v.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#06b6d4" transparent opacity={0.3} />
    </line>
  );
}

export default function Timeline3D({ 
  milestones, 
  activeIndex, 
  onNodeClick 
}: { 
  milestones: TimelineData[];
  activeIndex: number;
  onNodeClick: (index: number) => void;
}) {
  return (
    <div className="w-full h-64 md:h-80">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <TimelinePath milestones={milestones} />
        
        {milestones.map((milestone, i) => (
          <TimelineNode
            key={milestone.year}
            data={milestone}
            position={[(i - milestones.length / 2) * 2, Math.sin(i * 0.5) * 0.3, 0]}
            isActive={i === activeIndex}
            onClick={() => onNodeClick(i)}
          />
        ))}
      </Canvas>
    </div>
  );
}
