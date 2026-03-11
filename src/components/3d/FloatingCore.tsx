import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Sphere, Ring, Torus } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingCoreProps {
  mousePosition?: { x: number; y: number };
}

const FloatingCore = ({ mousePosition = { x: 0, y: 0 } }: FloatingCoreProps) => {
  const coreRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (coreRef.current) {
      coreRef.current.rotation.x = Math.sin(time * 0.2) * 0.1 + mousePosition.y * 0.3;
      coreRef.current.rotation.y = time * 0.1 + mousePosition.x * 0.3;
    }
    
    if (innerRef.current) {
      innerRef.current.rotation.x = time * 0.5;
      innerRef.current.rotation.y = time * 0.3;
    }
    
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.3;
      ring1Ref.current.rotation.z = time * 0.2;
    }
    
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = time * 0.4;
      ring2Ref.current.rotation.z = -time * 0.1;
    }
    
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = -time * 0.2;
      ring3Ref.current.rotation.y = time * 0.3;
    }
  });

  const glowMaterial = useMemo(() => (
    <meshBasicMaterial
      color="#00d4ff"
      transparent
      opacity={0.1}
      side={THREE.BackSide}
    />
  ), []);

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={1}
    >
      <group ref={coreRef} scale={1.2}>
        {/* Central Core */}
        <Sphere ref={innerRef} args={[0.8, 64, 64]}>
          <MeshDistortMaterial
            color="#00d4ff"
            emissive="#0066aa"
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={0.9}
            distort={0.3}
            speed={2}
          />
        </Sphere>
        
        {/* Inner Glow */}
        <Sphere args={[0.85, 32, 32]}>
          {glowMaterial}
        </Sphere>
        
        {/* Outer Glow */}
        <Sphere args={[1.1, 32, 32]}>
          <meshBasicMaterial
            color="#00d4ff"
            transparent
            opacity={0.05}
            side={THREE.BackSide}
          />
        </Sphere>

        {/* Orbital Ring 1 */}
        <Torus 
          ref={ring1Ref} 
          args={[1.3, 0.02, 16, 100]}
          rotation={[Math.PI / 3, 0, 0]}
        >
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.8} />
        </Torus>

        {/* Orbital Ring 2 */}
        <Torus 
          ref={ring2Ref} 
          args={[1.5, 0.015, 16, 100]}
          rotation={[Math.PI / 2, Math.PI / 4, 0]}
        >
          <meshBasicMaterial color="#a855f7" transparent opacity={0.6} />
        </Torus>

        {/* Orbital Ring 3 */}
        <Torus 
          ref={ring3Ref} 
          args={[1.7, 0.01, 16, 100]}
          rotation={[Math.PI / 6, Math.PI / 3, 0]}
        >
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.4} />
        </Torus>

        {/* Orbiting Nodes */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <OrbitingNode key={i} index={i} />
        ))}
      </group>
    </Float>
  );
};

const OrbitingNode = ({ index }: { index: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  const angle = (index / 6) * Math.PI * 2;
  const radius = 1.4 + (index % 2) * 0.3;
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ref.current) {
      const currentAngle = angle + time * (0.3 + index * 0.05);
      ref.current.position.x = Math.cos(currentAngle) * radius;
      ref.current.position.z = Math.sin(currentAngle) * radius;
      ref.current.position.y = Math.sin(time * 2 + index) * 0.2;
    }
  });

  return (
    <Sphere ref={ref} args={[0.05, 16, 16]}>
      <meshBasicMaterial 
        color={index % 2 === 0 ? "#00d4ff" : "#a855f7"} 
        toneMapped={false}
      />
    </Sphere>
  );
};

export default FloatingCore;
