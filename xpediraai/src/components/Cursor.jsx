import React, { useEffect, useRef, useState } from 'react';

/**
 * Custom Supersonic Neon Cursor
 * Modeled with mathematical precision after the user's reference image:
 * - Crisp white-bordered aerospace chevron pointer with volumetric neon green aura
 * - 4 cascading green ghost afterimages that dock neatly behind the notch at rest
 *   and fluidly stretch/curve into a supersonic motion trail when moving
 * - Sub-pixel hotspot alignment at the sharp tip
 * - Interactive magnetic hover blooming and snappy click compression
 */

const GHOST_COUNT = 4;

// Rest offsets along the arrow notch axis (dx=4.2px, dy=5.8px per step)
const REST_STEP_X = 4.2;
const REST_STEP_Y = 5.8;

const GHOST_CONFIG = [
  {
    scale: 0.94,
    restOpacity: 0.84,
    stroke: '#D6A84F',
    strokeWidth: 2.2,
    fill: 'rgba(214, 168, 79, 0.26)',
    glow: 'drop-shadow(0 0 6px rgba(214, 168, 79, 0.95)) drop-shadow(0 0 12px rgba(214, 168, 79, 0.5))',
    lerp: 0.44,
  },
  {
    scale: 0.86,
    restOpacity: 0.68,
    stroke: '#E2B964',
    strokeWidth: 1.9,
    fill: 'rgba(214, 168, 79, 0.20)',
    glow: 'drop-shadow(0 0 5px rgba(214, 168, 79, 0.80)) drop-shadow(0 0 10px rgba(214, 168, 79, 0.4))',
    lerp: 0.35,
  },
  {
    scale: 0.78,
    restOpacity: 0.52,
    stroke: '#C59740',
    strokeWidth: 1.6,
    fill: 'rgba(214, 168, 79, 0.14)',
    glow: 'drop-shadow(0 0 4px rgba(214, 168, 79, 0.65)) drop-shadow(0 0 8px rgba(214, 168, 79, 0.3))',
    lerp: 0.27,
  },
  {
    scale: 0.70,
    restOpacity: 0.36,
    stroke: '#B38531',
    strokeWidth: 1.3,
    fill: 'rgba(214, 168, 79, 0.08)',
    glow: 'drop-shadow(0 0 3px rgba(214, 168, 79, 0.50)) drop-shadow(0 0 6px rgba(214, 168, 79, 0.2))',
    lerp: 0.19,
  },
];

export default function Cursor() {
  const leaderRef = useRef(null);
  const ghostRefs = useRef([]);

  const mousePos = useRef({ x: -200, y: -200 });
  const prevMousePos = useRef({ x: -200, y: -200 });
  const speedRef = useRef(0);

  // Ghost positions array
  const ghosts = useRef(
    Array.from({ length: GHOST_COUNT }, (_, i) => ({
      x: -200 + (i + 1) * REST_STEP_X,
      y: -200 + (i + 1) * REST_STEP_Y,
    }))
  );

  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);
  const isHoveredRef = useRef(false);
  const isClickingRef = useRef(false);
  const currentScale = useRef(1);

  const [isTouchDevice] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
  });

  useEffect(() => {
    if (isTouchDevice) return;

    let rafId = null;
    let initialized = false;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      mousePos.current.x = clientX;
      mousePos.current.y = clientY;

      if (!initialized) {
        initialized = true;
        prevMousePos.current.x = clientX;
        prevMousePos.current.y = clientY;
        for (let i = 0; i < GHOST_COUNT; i++) {
          ghosts.current[i].x = clientX + (i + 1) * REST_STEP_X;
          ghosts.current[i].y = clientY + (i + 1) * REST_STEP_Y;
        }
      }

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
    };

    const handleMouseDown = () => {
      isClickingRef.current = true;
    };

    const handleMouseUp = () => {
      isClickingRef.current = false;
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('.interactive-target') ||
        target.closest('.glass-card') ||
        target.closest('.glass-pill') ||
        target.closest('.glass-dock') ||
        target.closest('.nav-action-btn')
      ) {
        isHoveredRef.current = true;
      } else {
        isHoveredRef.current = false;
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    // High performance RAF trailing physics loop
    const render = (time) => {
      // 1. Calculate target scale based on hover/clicking state
      let targetScale = 1;
      if (isClickingRef.current) {
        targetScale = 0.88;
      } else if (isHoveredRef.current) {
        targetScale = 1.15;
      }
      currentScale.current += (targetScale - currentScale.current) * 0.22;

      // 2. Compute motion speed
      const mx = mousePos.current.x;
      const my = mousePos.current.y;
      const dx = mx - prevMousePos.current.x;
      const dy = my - prevMousePos.current.y;
      const instantSpeed = Math.hypot(dx, dy);
      speedRef.current += (instantSpeed - speedRef.current) * 0.2;
      prevMousePos.current.x = mx;
      prevMousePos.current.y = my;

      // Moving factor: 0 when stationary, up to 1 when moving quickly
      const movingFactor = Math.min(1, speedRef.current / 6);

      // Subtle breathing pulse when resting
      const pulse = Math.sin(time * 0.003) * 0.03 * (1 - movingFactor);

      if (initialized) {
        // Ghost 0 tracks towards mouse with resting offset reduced dynamically during fast motion
        const restScale = 1 - movingFactor * 0.65;
        const target0X = mx + REST_STEP_X * restScale;
        const target0Y = my + REST_STEP_Y * restScale;

        ghosts.current[0].x += (target0X - ghosts.current[0].x) * GHOST_CONFIG[0].lerp;
        ghosts.current[0].y += (target0Y - ghosts.current[0].y) * GHOST_CONFIG[0].lerp;

        // Ghosts 1..3 track preceding ghost with offset
        for (let i = 1; i < GHOST_COUNT; i++) {
          const targetIX = ghosts.current[i - 1].x + REST_STEP_X * restScale;
          const targetIY = ghosts.current[i - 1].y + REST_STEP_Y * restScale;

          ghosts.current[i].x += (targetIX - ghosts.current[i].x) * GHOST_CONFIG[i].lerp;
          ghosts.current[i].y += (targetIY - ghosts.current[i].y) * GHOST_CONFIG[i].lerp;
        }
      }

      // 3. Update Leader pointer transform (hotspot at tip: clientX - 1.2px, clientY - 1.2px)
      if (leaderRef.current) {
        const s = (currentScale.current + pulse).toFixed(3);
        leaderRef.current.style.transform = `translate3d(${(mx - 1.2).toFixed(1)}px, ${(my - 1.2).toFixed(1)}px, 0) scale(${s})`;
      }

      // 4. Update Ghost transforms & dynamic opacities
      for (let i = 0; i < GHOST_COUNT; i++) {
        const el = ghostRefs.current[i];
        if (el) {
          const cfg = GHOST_CONFIG[i];
          const s = (cfg.scale * (currentScale.current + pulse)).toFixed(3);
          const gx = ghosts.current[i].x - 1.2;
          const gy = ghosts.current[i].y - 1.2;

          // Motion boosts ghost trail opacity slightly for high-speed streaming
          const dynamicOpacity = Math.min(1, cfg.restOpacity + movingFactor * 0.15).toFixed(3);

          el.style.transform = `translate3d(${gx.toFixed(1)}px, ${gy.toFixed(1)}px, 0) scale(${s})`;
          el.style.opacity = dynamicOpacity;
        }
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      aria-hidden="true"
    >
      {/* Shared SVG gradients definition */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="cursorLeaderStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="75%" stopColor="#FFFDF7" />
            <stop offset="100%" stopColor="#F5DFB0" />
          </linearGradient>
          <linearGradient id="cursorLeaderFill" x1="15%" y1="15%" x2="85%" y2="85%">
            <stop offset="0%" stopColor="rgba(214, 168, 79, 0.25)" />
            <stop offset="55%" stopColor="rgba(50, 38, 15, 0.40)" />
            <stop offset="100%" stopColor="rgba(25, 18, 8, 0.55)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Trailing Ghost Arrows (rendered underneath leader, furthest to closest) */}
      {GHOST_CONFIG.slice().reverse().map((cfg, revIdx) => {
        const realIdx = GHOST_COUNT - 1 - revIdx;
        return (
          <div
            key={realIdx}
            ref={(el) => (ghostRefs.current[realIdx] = el)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '28px',
              height: '33px',
              willChange: 'transform, opacity',
              pointerEvents: 'none',
              filter: cfg.glow,
            }}
          >
            <svg
              width="28"
              height="33"
              viewBox="0 0 46 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: 'block', overflow: 'visible' }}
            >
              <path
                d="M 2 2 L 43 28 L 24 32 L 16 51 Z"
                fill={cfg.fill}
                stroke={cfg.stroke}
                strokeWidth={cfg.strokeWidth}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </div>
        );
      })}

      {/* Primary Crisp White Arrow with Radiant Champagne Gold Aura */}
      <div
        ref={leaderRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '28px',
          height: '33px',
          willChange: 'transform',
          pointerEvents: 'none',
          filter:
            'drop-shadow(0 0 3px #FFFFFF) drop-shadow(0 0 8px #D6A84F) drop-shadow(0 0 16px rgba(214, 168, 79, 0.85)) drop-shadow(0 0 26px rgba(214, 168, 79, 0.45))',
        }}
      >
        <svg
          width="28"
          height="33"
          viewBox="0 0 46 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block', overflow: 'visible' }}
        >
          <path
            d="M 2 2 L 43 28 L 24 32 L 16 51 Z"
            fill="url(#cursorLeaderFill)"
            stroke="url(#cursorLeaderStroke)"
            strokeWidth="2.4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
