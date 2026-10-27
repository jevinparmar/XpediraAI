import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * VantaFogBackground
 * Interactive 3D Procedural Fog / Smoke Shader
 * Inspired by Vanta.js FOG (Patricio Gonzalez Vivo & Morgan McGuire FBM)
 * Tailored for Xpedira AI with Champagne Gold & Midnight Royal Slate palette
 */

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform vec2 iResolution;
  uniform vec2 iMouse;
  uniform float iTime;

  uniform float blurFactor;
  uniform vec3 baseColor;
  uniform vec3 lowlightColor;
  uniform vec3 midtoneColor;
  uniform vec3 highlightColor;
  uniform float zoom;
  uniform float density;

  float random (in vec2 _st) {
    return fract(sin(dot(_st.xy, vec2(0.129898, 0.78233))) * 437.585453123);
  }

  // Morgan McGuire noise
  float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
           (c - a) * u.y * (1.0 - u.x) +
           (d - b) * u.x * u.y;
  }

  #define NUM_OCTAVES 6

  float fbm (in vec2 _st) {
    float v = 0.0;
    float a = blurFactor;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
      v += a * noise(_st);
      _st = rot * _st * 2.0 + shift;
      a *= (1.0 - blurFactor);
    }
    return v;
  }

  void main() {
    vec2 st = gl_FragCoord.xy / iResolution.xy * 3.0;
    st.x *= 0.7 * (iResolution.x / iResolution.y);
    st *= zoom;

    // Smooth subtle mouse coordinate influence
    st += (iMouse - 0.5) * 0.22;

    vec3 color = vec3(0.0);

    vec2 q = vec2(0.0);
    q.x = fbm(st + 0.00 * iTime);
    q.y = fbm(st + vec2(1.0));

    vec2 dir = vec2(0.15, 0.126);
    vec2 r = vec2(0.0);
    r.x = fbm(st + 1.0 * q + vec2(1.7, 9.2) + dir.x * iTime);
    r.y = fbm(st + 1.0 * q + vec2(8.3, 2.8) + dir.y * iTime);

    float f = fbm(st + r);

    // Color gradient mixing: base -> lowlight -> midtone -> highlight
    color = mix(baseColor,
                lowlightColor,
                clamp((f * f) * 4.0, 0.0, 1.0));

    color = mix(color,
                midtoneColor,
                clamp(length(q), 0.0, 1.0));

    color = mix(color,
                highlightColor,
                clamp(length(r.x), 0.0, 1.0));

    // Density factor controls fog thickness: lower density gives an ethereal, soft atmospheric wash
    float fogIntensity = clamp((f * f * f + 0.6 * f * f + 0.5 * f) * density, 0.0, 1.0);
    vec3 finalColor = mix(baseColor, color, fogIntensity);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function toVec3(c) {
  const color = new THREE.Color(c);
  return new THREE.Vector3(color.r, color.g, color.b);
}

export default function VantaFogBackground({
  highlightColor = 0xd6a84f, // Warm Champagne Gold (#D6A84F)
  midtoneColor = 0x3a2c14,   // Deep Smoked Amber/Bronze (#3A2C14)
  lowlightColor = 0x162032,  // Deep Royal Slate Navy (#162032)
  baseColor = 0x0c101b,      // Midnight Royal Obsidian (#0C101B)
  blurFactor = 0.6,
  zoom = 0.9,
  speed = 0.75,
  density = 0.52,            // Low density for soft, non-intrusive atmospheric feel
  mouseControls = true,
  touchControls = true,
  className = "",
  style = {},
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(width, height) },
      iMouse: { value: new THREE.Vector2(0.5, 0.5) },
      blurFactor: { value: blurFactor },
      baseColor: { value: toVec3(baseColor) },
      lowlightColor: { value: toVec3(lowlightColor) },
      midtoneColor: { value: toVec3(midtoneColor) },
      highlightColor: { value: toVec3(highlightColor) },
      zoom: { value: zoom },
      density: { value: density },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthWrite: false,
      depthTest: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let targetMouseX = 0.5;
    let targetMouseY = 0.5;
    let currentMouseX = 0.5;
    let currentMouseY = 0.5;

    const onPointerMove = (e) => {
      targetMouseX = e.clientX / window.innerWidth;
      targetMouseY = 1.0 - (e.clientY / window.innerHeight);
    };

    if (mouseControls || touchControls) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    const resize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
      uniforms.iResolution.value.set(width, height);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    window.addEventListener("resize", resize);

    let rafId = null;
    let clock = new THREE.Clock();

    const animate = () => {
      // Smooth lerp for responsive mouse turbulence
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;
      uniforms.iMouse.value.set(currentMouseX, currentMouseY);

      uniforms.iTime.value = clock.getElapsedTime() * speed;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      if (mouseControls || touchControls) {
        window.removeEventListener("pointermove", onPointerMove);
      }
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [
    highlightColor,
    midtoneColor,
    lowlightColor,
    baseColor,
    blurFactor,
    zoom,
    speed,
    density,
    mouseControls,
    touchControls,
  ]);

  return (
    <div
      ref={containerRef}
      className={className}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          outline: "none",
        }}
      />
    </div>
  );
}
