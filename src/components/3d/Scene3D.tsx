import { Canvas } from '@react-three/fiber';
import { Suspense, ReactNode } from 'react';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';

interface Scene3DProps {
  children: ReactNode;
  cameraPosition?: [number, number, number];
  enableOrbit?: boolean;
  enableZoom?: boolean;
  className?: string;
}

const Scene3D = ({ 
  children, 
  cameraPosition = [0, 0, 5],
  enableOrbit = false,
  enableZoom = false,
  className = ""
}: Scene3DProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />
          
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={0.5} color="#ffffff" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4d9e96" />
          <pointLight position={[10, 10, 10]} intensity={0.2} color="#e07050" />
          
          {/* Scene Content */}
          {children}
          
          {/* Controls */}
          {enableOrbit && (
            <OrbitControls 
              enableZoom={enableZoom} 
              enablePan={false}
              maxPolarAngle={Math.PI / 1.5}
              minPolarAngle={Math.PI / 3}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
