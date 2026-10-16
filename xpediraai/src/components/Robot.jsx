import React, { useRef, useEffect } from 'react';
import { useGLTF, Center } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ── Configuration Constants (Tweakable) ──
const MAX_HEAD_TURN_Y = 0.6; // Max horizontal head turn in radians (~34.4° left/right)
const MAX_HEAD_TURN_X = 0.6; // Max vertical head tilt in radians (~34.4° up/down)
const MAX_EYE_OFFSET = 0.12; // Max sliding distance for eyes on black screen (units)
const LERP_FACTOR = 0.08; // Smoothing factor (0.08 = soft, natural motion)
const BLINK_INTERVAL = 2.0; // Human blink every 2.0 seconds
const BLINK_DURATION = 0.16; // Duration of human blink in seconds (~160ms)

/**
 * Interactive 3D Cute Robot Component for Xpedira AI.
 * - Round teal ring-shaped head with black screen and two white/neon-green pill eyes.
 * - Tracks cursor globally (-1..+1) on window with pointer events (touch-compatible).
 * - Smoothly rotates head toward cursor (rot.y follows mouse.x, rot.x follows -mouse.y).
 * - Slides both eyes together as a grouped unit on the black screen (pos.x & pos.y clamped to 0.12).
 * - Smoothly resets to center when cursor leaves the window.
 * - Human-like eye blink every 2.0 seconds (morph targets + scale.y).
 */
export default function Robot({ scale = 0.95, position = [0, -0.05, 0] }) {
  const groupRef = useRef();
  const innerRef = useRef();
  const eyesSliderRef = useRef();
  const eyeMeshesRef = useRef([]);
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

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, []);

  // 2. Setup materials, eyes grouping under a single slider parent & eye mesh collection
  useEffect(() => {
    if (!scene) return;

    eyeMeshesRef.current = [];

    // Apply materials and locate eye meshes
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
            child.material.emissiveIntensity = 3.5;
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
            child.material.emissiveIntensity = 2.2;
          }
          // Main body: sleek titanium-black cyber finish
          else if (matName === 'BODY') {
            child.material.metalness = 0.65;
            child.material.roughness = 0.3;
          }
        }
      }
    });

    // Group the two separate eye objects under a single parent slider group
    // In Three.js GLTFLoader, dot in "Plane.001_3" is sanitized to "Plane001_3"
    const eye1 = scene.getObjectByName('Plane_2');
    const eye2 = scene.getObjectByName('Plane001_3') || scene.getObjectByName('Plane.001_3');

    if (eye1 && eye2 && eye1.parent && !eyesSliderRef.current) {
      const parent = eye1.parent;

      // Group that aligns with front face coordinates
      const eyesGroup = new THREE.Group();
      eyesGroup.name = 'EyesAnchorGroup';
      eyesGroup.position.set(0.47284, 1.23455, -0.00079);
      eyesGroup.rotation.set(0, -Math.PI / 2, 0);
      parent.add(eyesGroup);

      // Slider group for position.x / position.y sliding and scale.y blinking
      const eyesSlider = new THREE.Group();
      eyesSlider.name = 'EyesSliderGroup';
      eyesGroup.add(eyesSlider);

      // Attach both eyes to maintain their exact visual appearance & world transform
      eyesSlider.attach(eye1);
      eyesSlider.attach(eye2);

      eyesSliderRef.current = eyesSlider;
    }
  }, [scene]);

  // 3. Animation loop: Smooth lerped head rotation + eye sliding + human blink every 2s
  useFrame((state) => {
    if (!innerRef.current) return;

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    // Head rotation toward cursor (smoothed with lerp)
    const targetHeadRotY = mx * MAX_HEAD_TURN_Y;
    const targetHeadRotX = -my * MAX_HEAD_TURN_X;

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

    // Natural human blink every 2.0 seconds (~160ms blink duration)
    const blinkCycle = state.clock.elapsedTime % BLINK_INTERVAL;
    let blinkWeight = 0; // 0 = open, 1 = fully closed
    if (blinkCycle < BLINK_DURATION) {
      const progress = blinkCycle / BLINK_DURATION;
      // Smooth sinusoidal eyelid close & open curve
      blinkWeight = Math.sin(progress * Math.PI);
    }

    // Drive native 3D morph targets on eye meshes (mesh_2, mesh_3)
    for (let i = 0; i < eyeMeshesRef.current.length; i++) {
      const mesh = eyeMeshesRef.current[i];
      if (mesh && mesh.morphTargetInfluences) {
        mesh.morphTargetInfluences[0] = blinkWeight;
      }
    }

    // Eyes sliding on the screen toward cursor + vertical eyelid compression
    if (eyesSliderRef.current) {
      const targetEyeX = THREE.MathUtils.clamp(mx * MAX_EYE_OFFSET, -MAX_EYE_OFFSET, MAX_EYE_OFFSET);
      const targetEyeY = THREE.MathUtils.clamp(my * MAX_EYE_OFFSET, -MAX_EYE_OFFSET, MAX_EYE_OFFSET);

      eyesSliderRef.current.position.x = THREE.MathUtils.lerp(
        eyesSliderRef.current.position.x,
        targetEyeX,
        LERP_FACTOR
      );
      eyesSliderRef.current.position.y = THREE.MathUtils.lerp(
        eyesSliderRef.current.position.y,
        targetEyeY,
        LERP_FACTOR
      );

      // Scale Y down to 0.05 during peak blink for prominent visual closure
      eyesSliderRef.current.scale.y = 1.0 - blinkWeight * 0.95;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <group ref={innerRef}>
        <Center>
          {/* Base rotation -Math.PI / 2 aligns raw +X screen normal directly forward toward camera (+Z) */}
          <primitive
            object={scene}
            scale={scale}
            rotation={[0, -Math.PI / 2, 0]}
          />
        </Center>
      </group>
    </group>
  );
}

useGLTF.preload('/models/cute_robot.glb');
