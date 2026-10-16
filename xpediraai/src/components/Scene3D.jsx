import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import Robot from './Robot';

// ── Error Boundary for 3D GLTF Loading ──
class GLTFErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.warn('Robot model could not be loaded, switching to procedural neural core:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// ── Floating Cyber Particles ──
function AmbientCyberParticles() {
  const particlesRef = useRef();

  const [positions] = useMemo(() => {
    const count = 100;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const p1 = ((i * 9301 + 49297) % 233280) / 233280;
      const p2 = ((i * 12345 + 67891) % 233280) / 233280;
      const p3 = ((i * 54321 + 13579) % 233280) / 233280;
      const r = 2.4 + p1 * 1.8;
      const theta = p2 * Math.PI * 2;
      const phi = Math.acos(2 * p3 - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return [pos];
  }, []);

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.038}
        color="#00FF88"
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ── Procedural Fallback if GLTF is absent ──
function ProceduralNeuralCore() {
  const outerSphereRef = useRef();
  const innerCoreRef = useRef();

  const nodePositions = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.6, 1);
    const pos = geo.attributes.position;
    const points = [];
    const set = new Set();
    for (let i = 0; i < pos.count; i++) {
      const key = `${pos.getX(i).toFixed(2)},${pos.getY(i).toFixed(2)},${pos.getZ(i).toFixed(2)}`;
      if (!set.has(key)) {
        set.add(key);
        points.push(new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)));
      }
    }
    return points;
  }, []);

  return (
    <group>
      <mesh ref={outerSphereRef}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshStandardMaterial
          wireframe
          color="#00FF88"
          emissive="#00FF88"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.9}
          transparent
          opacity={0.45}
        />
      </mesh>

      {nodePositions.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshStandardMaterial
            color="#00FF88"
            emissive="#00FF88"
            emissiveIntensity={2.5}
            roughness={0.1}
          />
        </mesh>
      ))}

      <mesh ref={innerCoreRef}>
        <octahedronGeometry args={[0.85, 0]} />
        <meshPhysicalMaterial
          color="#111312"
          emissive="#00FF88"
          emissiveIntensity={0.3}
          metalness={0.95}
          roughness={0.15}
        />
      </mesh>
      <pointLight color="#00FF88" intensity={2.5} distance={3} decay={2} />
    </group>
  );
}

// ── Interactive Controller ──
function InteractiveScene() {
  return (
    <group>
      <Float speed={2.0} rotationIntensity={0} floatIntensity={0.65} floatingRange={[-0.1, 0.1]}>
        <GLTFErrorBoundary fallback={<ProceduralNeuralCore />}>
          {/* Big, heroic scale for the 3D robot */}
          <Robot scale={0.95} position={[0, -0.05, 0]} />
        </GLTFErrorBoundary>
        <AmbientCyberParticles />
      </Float>
    </group>
  );
}

// ── Canvas Loader Fallback ──
function Loader3D() {
  return (
    <mesh>
      <sphereGeometry args={[0.8, 16, 16]} />
      <meshBasicMaterial color="#00FF88" wireframe />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '520px',
      }}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Cinematic Lighting System */}
        <ambientLight intensity={0.75} color="#FFFFFF" />
        <directionalLight position={[5, 6, 5]} intensity={2.2} color="#FFFFFF" />
        {/* Neon Green Rim Light */}
        <directionalLight position={[-5, -2, -3]} intensity={4.5} color="#00FF88" />
        {/* Soft Secondary Fill Lights */}
        <pointLight position={[2, -3, 2]} intensity={1.5} color="#1FD67A" />
        <pointLight position={[0, 4, 2]} intensity={1.0} color="#FFFFFF" />
        <pointLight position={[0, -2, 3]} intensity={0.6} color="#00FF88" />

        <Suspense fallback={<Loader3D />}>
          <InteractiveScene />
          <Environment preset="city" environmentIntensity={0.3} />
        </Suspense>
      </Canvas>
    </div>
  );
}
