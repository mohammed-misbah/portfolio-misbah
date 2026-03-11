import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

interface ProjectCard3DProps {
  title: string;
  index: number;
  position: [number, number, number];
  onClick?: () => void;
}

const ProjectCard3D = ({ title, index, position, onClick }: ProjectCard3DProps) => {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(time + index) * 0.1;
      ref.current.rotation.y = hovered 
        ? THREE.MathUtils.lerp(ref.current.rotation.y, 0.2, 0.1)
        : THREE.MathUtils.lerp(ref.current.rotation.y, 0, 0.1);
    }
  });

  return (
    <group
      ref={ref}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
    >
      <RoundedBox
        args={[2.5, 1.5, 0.1]}
        radius={0.1}
        smoothness={4}
      >
        <meshStandardMaterial
          color={hovered ? "#1a3a5c" : "#0d2137"}
          emissive={hovered ? "#00d4ff" : "#003366"}
          emissiveIntensity={hovered ? 0.3 : 0.1}
          metalness={0.5}
          roughness={0.3}
          transparent
          opacity={0.9}
        />
      </RoundedBox>
      
      {/* Glowing Border */}
      <mesh position={[0, 0, 0.051]}>
        <planeGeometry args={[2.55, 1.55]} />
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={hovered ? 0.3 : 0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      <Text
        position={[0, 0, 0.08]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
        textAlign="center"
      >
        {title}
      </Text>
    </group>
  );
};

export default ProjectCard3D;
