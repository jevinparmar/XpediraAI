import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, Center } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

// ── Configuration Constants ──
const MAX_HEAD_TURN_Y = 0.55; // Max horizontal head turn in radians (~31° left/right)
const MAX_HEAD_TURN_X = 0.45; // Max vertical head tilt in radians (~25° up/down)
const MAX_EYE_OFFSET = 0.055; // Max sliding distance for eyes on black screen
const LERP_FACTOR = 0.075; // Organic, damped interpolation speed
const BLINK_INTERVAL = 2.0; // Blink interval in seconds
const BLINK_DURATION = 0.16; // Blink duration in seconds (~160ms)

/**
 * Advanced Interactive 3D Cute Robot Component for Xpedira AI.
 * - Smooth intro scale-up and floating elevation.
 * - Continuous natural idle floating and breathing micro-rotation.
 * - Responsive cursor tracking with damped organic lerp.
 * - Interactive hover perk & click 360° spin reaction.
 * - Scroll-driven downward gaze guiding the user to lower sections.
 * - Native GLTF morph target blinking.
 * - Champagne Gold (#D6A84F) & Deep Navy Slate (#111827) cyber materials.
 */
export default function Robot({ scale = 0.95, position = [0, -0.05, 0] }) {
  const groupRef = useRef();
  const innerRef = useRef();
  const eyeMeshesRef = useRef([]);
  const eye1Ref = useRef(null);
  const eye2Ref = useRef(null);
  const eye1BasePos = useRef(null);
  const eye2BasePos = useRef(null);
  const eyeOffsetRef = useRef({ y: 0, z: 0 });

  // Interactive reaction states
  const [isHovered, setIsHovered] = useState(false);
  const spinAngleRef = useRef(0);
  const isSpinningRef = useRef(false);
  const currentScaleRef = useRef(0.2); // Starts small for intro scale-in
  const scrollGazeRef = useRef(0);

  const { scene } = useGLTF('/models/cute_robot.glb');

  // Track normalized cursor coordinates (-1..+1)
  const mouseRef = useRef({ x: 0, y: 0 });

  // 1. Pointer tracking across window (-1..+1) with auto-reset on leave
  useEffect(() => {
    const handlePointerMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handlePointerLeave = () => {
      mouseRef.current.x = 0;
      mouseRef.current.y = 0;
    };

    // Scroll-driven reaction: track scroll down to angle robot toward content
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      const progress = Math.min(1, Math.max(0, scrollY / heroHeight));
      scrollGazeRef.current = progress * 0.35; // Slight downward gaze as user scrolls down
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, []);

  // 2. Setup materials, identify eyes and preserve initial base positions
  useEffect(() => {
    if (!scene) return;

    eyeMeshesRef.current = [];

    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        const matName = child.material?.name || '';
        const meshName = child.name || '';

        // Collect eye meshes for morph target blink animation
        if (
          meshName === 'mesh_2' ||
          meshName === 'mesh_3' ||
          matName === 'EYES' ||
          (child.morphTargetInfluences && child.morphTargetInfluences.length > 0)
        ) {
          eyeMeshesRef.current.push(child);
          if (child.morphTargetInfluences) {
            child.morphTargetInfluences[0] = 0;
          }
        }

        if (child.material) {
          // Glowing champagne gold eyes
          if (
            matName === 'EYES' ||
            matName.toLowerCase().includes('eye') ||
            meshName.toLowerCase().includes('eye')
          ) {
            child.material.color = new THREE.Color('#D6A84F');
            child.material.emissive = new THREE.Color('#D6A84F');
            child.material.emissiveIntensity = isHovered ? 5.0 : 3.5;
            child.material.roughness = 0.05;
          }
          // Screen face: deep navy slate glass (#111827)
          else if (
            matName === 'SCREEN' ||
            meshName.toLowerCase().includes('screen') ||
            meshName.toLowerCase().includes('face')
          ) {
            child.material.color = new THREE.Color('#111827');
            child.material.metalness = 0.9;
            child.material.roughness = 0.12;
          }
          // Glow highlights: champagne gold accent
          else if (
            matName === 'GLOW' ||
            meshName.toLowerCase().includes('glow')
          ) {
            child.material.color = new THREE.Color('#D6A84F');
            child.material.emissive = new THREE.Color('#D6A84F');
            child.material.emissiveIntensity = isHovered ? 3.0 : 2.2;
          }
          // Main body: sleek titanium cyber finish
          else if (matName === 'BODY') {
            child.material.metalness = 0.65;
            child.material.roughness = 0.3;
          }
        }
      }
    });

    // Locate the two eye parent nodes
    const eye1 = scene.getObjectByName('Plane_2');
    const eye2 = scene.getObjectByName('Plane001_3') || scene.getObjectByName('Plane.001_3');

    if (eye1) {
      eye1Ref.current = eye1;
      if (!eye1BasePos.current) {
        eye1BasePos.current = { x: eye1.position.x, y: eye1.position.y, z: eye1.position.z };
      }
    }
    if (eye2) {
      eye2Ref.current = eye2;
      if (!eye2BasePos.current) {
        eye2BasePos.current = { x: eye2.position.x, y: eye2.position.y, z: eye2.position.z };
      }
    }
  }, [scene, isHovered]);

  // Click reaction: 360° spin with playful bounce
  const handleClick = (e) => {
    e.stopPropagation();
    if (isSpinningRef.current) return;
    isSpinningRef.current = true;

    const spinObj = { angle: 0, bounceY: 0 };
    gsap.to(spinObj, {
      angle: Math.PI * 2,
      duration: 1.15,
      ease: 'power3.out',
      onUpdate: () => {
        spinAngleRef.current = spinObj.angle;
      },
      onComplete: () => {
        spinAngleRef.current = 0;
        isSpinningRef.current = false;
      },
    });

    // Small celebratory bounce
    if (groupRef.current) {
      gsap.to(groupRef.current.position, {
        y: position[1] + 0.18,
        duration: 0.35,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      });
    }
  };

  // 3. Animation frame loop (Continuous idle floating + damped cursor tracking + blink + spin)
  useFrame((state) => {
    if (!innerRef.current || !groupRef.current) return;

    const time = state.clock.elapsedTime;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    // Smooth intro scale-in
    currentScaleRef.current = THREE.MathUtils.lerp(currentScaleRef.current, scale, 0.05);
    groupRef.current.scale.setScalar(currentScaleRef.current);

    // Natural idle floating: sine wave vertical glide
    const idleY = Math.sin(time * 1.8) * 0.05;
    const idleRoll = Math.cos(time * 1.4) * 0.02;

    groupRef.current.position.y = position[1] + idleY;

    // Target head rotation toward cursor + scroll gaze + hover perk
    const hoverTiltX = isHovered ? -0.12 : 0;
    const targetHeadRotY = mx * MAX_HEAD_TURN_Y + spinAngleRef.current;
    const targetHeadRotX = -my * MAX_HEAD_TURN_X + scrollGazeRef.current + hoverTiltX;

    innerRef.current.rotation.y = THREE.MathUtils.lerp(
      innerRef.current.rotation.y,
      targetHeadRotY,
      LERP_FACTOR
    );
    innerRef.current.rotation.x = THREE.MathUtils.lerp(
      innerRef.current.rotation.x,
      targetHeadRotX,
      LERP_FACTOR
    );
    innerRef.current.rotation.z = THREE.MathUtils.lerp(
      innerRef.current.rotation.z,
      idleRoll - mx * 0.06,
      LERP_FACTOR
    );

    // Natural human blink every 2.0 seconds (~160ms duration)
    const blinkCycle = time % BLINK_INTERVAL;
    let blinkWeight = 0;
    if (blinkCycle < BLINK_DURATION) {
      const progress = blinkCycle / BLINK_DURATION;
      blinkWeight = Math.sin(progress * Math.PI);
    }

    // Drive native morph targets on eye meshes (mesh_2, mesh_3)
    for (let i = 0; i < eyeMeshesRef.current.length; i++) {
      const mesh = eyeMeshesRef.current[i];
      if (mesh && mesh.morphTargetInfluences) {
        mesh.morphTargetInfluences[0] = blinkWeight;
      }
    }

    // Slide eyes along screen face:
    // In robot local coordinates, Z is horizontal (left/right) and Y is vertical (up/down)
    const targetOffsetZ = -mx * MAX_EYE_OFFSET;
    const targetOffsetY = (my * MAX_EYE_OFFSET) - (scrollGazeRef.current * 0.08);

    eyeOffsetRef.current.z = THREE.MathUtils.lerp(
      eyeOffsetRef.current.z,
      targetOffsetZ,
      LERP_FACTOR
    );
    eyeOffsetRef.current.y = THREE.MathUtils.lerp(
      eyeOffsetRef.current.y,
      targetOffsetY,
      LERP_FACTOR
    );

    if (eye1Ref.current && eye1BasePos.current) {
      eye1Ref.current.position.z = eye1BasePos.current.z + eyeOffsetRef.current.z;
      eye1Ref.current.position.y = eye1BasePos.current.y + eyeOffsetRef.current.y;
    }
    if (eye2Ref.current && eye2BasePos.current) {
      eye2Ref.current.position.z = eye2BasePos.current.z + eyeOffsetRef.current.z;
      eye2Ref.current.position.y = eye2BasePos.current.y + eyeOffsetRef.current.y;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onPointerOut={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <group ref={innerRef}>
        <Center>
          {/* Base rotation -Math.PI / 2 aligns raw +X screen normal directly forward toward camera (+Z) */}
          <primitive
            object={scene}
            rotation={[0, -Math.PI / 2, 0]}
          />
        </Center>
      </group>
    </group>
  );
}

useGLTF.preload('/models/cute_robot.glb');
