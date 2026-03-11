import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, Box, Cylinder, Text } from '@react-three/drei';
import * as THREE from 'three';

interface MicroservicesSceneProps {
  mousePosition?: { x: number; y: number };
}

const nodeData = [
  { label: 'API Gateway', position: [0, 0, 0] as [number, number, number], color: '#4d9e96', type: 'sphere' },
  { label: 'Database', position: [-2.5, -1, 0.5] as [number, number, number], color: '#e07050', type: 'cylinder' },
  { label: 'Cloud', position: [2.5, -0.5, -0.5] as [number, number, number], color: '#7db4d8', type: 'box' },
  { label: 'Auth', position: [-1.5, 1.5, -0.3] as [number, number, number], color: '#4d9e96', type: 'sphere' },
  { label: 'Cache', position: [1.8, 1.8, 0.2] as [number, number, number], color: '#e07050', type: 'box' },
  { label: 'Queue', position: [0, -2, 0.3] as [number, number, number], color: '#7db4d8', type: 'cylinder' },
];

const connections = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 5], [2, 4], [3, 4],
];

const MicroservicesScene = ({ mousePosition = { x: 0, y: 0 } }: MicroservicesSceneProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05 + mousePosition.x * 0.2;
      groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.05 + mousePosition.y * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} scale={1.1}>
        {connections.map(([from, to], i) => (
          <ConnectionLine
            key={i}
            start={nodeData[from].position}
            end={nodeData[to].position}
            color={nodeData[from].color}
          />
        ))}
        {nodeData.map((node, i) => (
          <ServiceNode key={node.label} {...node} index={i} />
        ))}
      </group>
    </Float>
  );
};

interface ServiceNodeProps {
  label: string;
  position: [number, number, number];
  color: string;
  type: string;
  index: number;
}

const ServiceNode = ({ label, position, color, type, index }: ServiceNodeProps) => {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(time * 0.8 + index * 1.2) * 0.12;
    }
  });

  return (
    <group ref={ref} position={position}>
      <Sphere args={[0.45, 16, 16]}>
        <meshBasicMaterial color={color} transparent opacity={0.04} side={THREE.BackSide} />
      </Sphere>

      {type === 'sphere' && (
        <Sphere args={[0.25, 32, 32]}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} metalness={0.6} roughness={0.3} />
        </Sphere>
      )}
      {type === 'cylinder' && (
        <Cylinder args={[0.2, 0.2, 0.35, 8]}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} metalness={0.6} roughness={0.3} />
        </Cylinder>
      )}
      {type === 'box' && (
        <Box args={[0.35, 0.35, 0.35]}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} metalness={0.6} roughness={0.3} />
        </Box>
      )}

      <Text
        position={[0, -0.45, 0]}
        fontSize={0.12}
        color="#6b7280"
        anchorX="center"
        anchorY="top"
      >
        {label}
      </Text>
    </group>
  );
};

interface ConnectionLineProps {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
}

const ConnectionLine = ({ start, end, color }: ConnectionLineProps) => {
  const lineObj = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints([new THREE.Vector3(...start), new THREE.Vector3(...end)]);
    const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.2 });
    return new THREE.Line(geometry, material);
  }, [start, end, color]);

  useFrame((state) => {
    if (lineObj.material instanceof THREE.LineBasicMaterial) {
      const time = state.clock.getElapsedTime();
      lineObj.material.opacity = 0.15 + Math.sin(time * 2) * 0.1;
    }
  });

  return <primitive object={lineObj} />;
};

export default MicroservicesScene;
