import React, { useEffect, useRef } from 'react';

/**
 * Cyber Square Grid Background
 * Full-bleed high-tech squares grid across the entire website:
 * - 44px x 44px crisp cyber square grid lines
 * - Luminous micro-dot intersections
 * - Interactive neon emerald cursor spotlight that illuminates nearby squares
 * - Soft radial cursor backlight wash
 * - Seamlessly integrates with frosted glass cards & floating ambient orbs
 */
export default function SquaresBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rafId = null;
    let targetX = -500;
    let targetY = -500;
    let currentX = -500;
    let currentY = -500;

    const handlePointerMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const handlePointerLeave = () => {
      targetX = -500;
      targetY = -500;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('mouseleave', handlePointerLeave);

    const updateGlow = () => {
      // Smooth lerp for buttery spotlight motion
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      el.style.setProperty('--mouse-x', `${currentX.toFixed(1)}px`);
      el.style.setProperty('--mouse-y', `${currentY.toFixed(1)}px`);

      rafId = requestAnimationFrame(updateGlow);
    };

    rafId = requestAnimationFrame(updateGlow);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="cyber-squares-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {/* 1. Base Subtle Cyber Square Grid (44px x 44px) */}
      <div className="cyber-grid-base" />

      {/* 2. Micro-Dot Intersections */}
      <div className="cyber-grid-crosses" />

      {/* 3. Interactive Neon Green Cursor Spotlight Grid */}
      <div className="cyber-grid-spotlight" />

      {/* 4. Soft Radial Emerald Cursor Backlight Wash */}
      <div className="cyber-cursor-glow-wash" />
    </div>
  );
}
