import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
  { name: 'Python', color: '#3776ab' },
  { name: 'FastAPI', color: '#009688' },
  { name: 'Django', color: '#44b78b' },
  { name: 'Flask', color: '#61dafb' },
  { name: 'React', color: '#61dafb' },
  { name: 'Angular', color: '#dd0031' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'Redis', color: '#dc382d' },
  { name: 'AWS', color: '#ff9900' },
  { name: 'Azure', color: '#0078d4' },
  { name: 'Docker', color: '#2496ed' },
];

// Connections between related skills
const connections: [number, number][] = [
  [0, 1], [0, 2], [0, 3], // Python -> frameworks
  [4, 5], // Frontend
  [6, 7], // Databases
  [8, 9], // Cloud
  [10, 8], [10, 9], // Docker -> Cloud
  [1, 6], [2, 6], // Frameworks -> DB
];

const SkillsSphere = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.08;
    }
  });

  // Compute node positions using Fibonacci sphere
  const nodePositions = useMemo(() => {
    const radius = 2.5;
    return skills.map((_, index) => {
      const phi = Math.acos(1 - 2 * (index + 0.5) / skills.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (index + 0.5);
      return [
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
      ] as [number, number, number];
    });
  }, []);

  return (
    <group ref={groupRef}>
      {/* Central Hub */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Sphere args={[0.5, 32, 32]}>
          <meshStandardMaterial
            color="#00d4ff"
            emissive="#0066aa"
            emissiveIntensity={0.3}
            metalness={0.9}
            roughness={0.1}
            wireframe
          />
        </Sphere>
        <Text
          position={[0, 0, 0.55]}
          fontSize={0.12}
          color="#00d4ff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.005}
          outlineColor="#000000"
        >
          Backend{'\n'}Engineering
        </Text>
      </Float>

      {/* Connection Lines */}
      {connections.map(([from, to], i) => (
        <ConnectionLine
          key={i}
          start={nodePositions[from]}
          end={nodePositions[to]}
        />
      ))}

      {/* Lines from center to each node */}
      {nodePositions.map((pos, i) => (
        <ConnectionLine key={`center-${i}`} start={[0, 0, 0]} end={pos} dimmed />
      ))}

      {/* Skill Nodes */}
      {skills.map((skill, index) => (
        <SkillNode
          key={skill.name}
          name={skill.name}
          color={skill.color}
          index={index}
          basePosition={nodePositions[index]}
        />
      ))}
    </group>
  );
};

interface SkillNodeProps {
  name: string;
  color: string;
  index: number;
  basePosition: [number, number, number];
}

const SkillNode = ({ name, color, index, basePosition }: SkillNodeProps) => {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.x = basePosition[0] + Math.sin(time + index) * 0.08;
      ref.current.position.y = basePosition[1] + Math.cos(time + index) * 0.08;
      ref.current.position.z = basePosition[2] + Math.sin(time * 0.5 + index) * 0.08;
      ref.current.lookAt(state.camera.position);
    }
  });

  return (
    <group 
      ref={ref}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Sphere args={[hovered ? 0.2 : 0.15, 16, 16]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </Sphere>
      
      <Text
        position={[0, 0.3, 0]}
        fontSize={hovered ? 0.18 : 0.12}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#000000"
      >
        {name}
      </Text>
    </group>
  );
};

interface ConnectionLineProps {
  start: [number, number, number];
  end: [number, number, number];
  dimmed?: boolean;
}

const ConnectionLine = ({ start, end, dimmed }: ConnectionLineProps) => {
  const lineObj = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints([new THREE.Vector3(...start), new THREE.Vector3(...end)]);
    const material = new THREE.LineBasicMaterial({
      color: '#00d4ff',
      transparent: true,
      opacity: dimmed ? 0.08 : 0.25,
    });
    return new THREE.Line(geometry, material);
  }, [start, end, dimmed]);

  useFrame((state) => {
    if (lineObj.material instanceof THREE.LineBasicMaterial) {
      const t = state.clock.getElapsedTime();
      lineObj.material.opacity = dimmed
        ? 0.08 + Math.sin(t) * 0.03
        : 0.25 + Math.sin(t * 1.5) * 0.1;
    }
  });

  return <primitive object={lineObj} />;
};

export default SkillsSphere;
