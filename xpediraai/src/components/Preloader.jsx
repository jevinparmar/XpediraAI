import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Custom 2-Second Celestial Orbital Comet Preloader
 * Modeled after user reference image:
 * - 4 orbiting comet nodes with tapering curved tails flowing in a circle
 * - Styled to match Xpedira AI's royal dark slate (#111827) & champagne gold (#D6A84F) theme
 * - Smooth 2-second loading sequence with a seamless fade-out reveal
 */

// Exact polygon path for a single tapered curved comet tail (in 120x120 space, radius 34, head radius 4.4)
const COMET_TAIL_PATH =
  'M 95.99 60.00 L 95.76 58.54 L 95.48 57.10 L 95.14 55.69 L 94.74 54.29 L 94.29 52.92 L 93.79 51.58 L 93.24 50.26 L 92.64 48.97 L 91.99 47.72 L 91.30 46.50 L 90.57 45.31 L 89.79 44.16 L 88.97 43.05 L 88.11 41.97 L 87.22 40.94 L 86.29 39.95 L 85.33 38.99 L 84.34 38.08 L 83.32 37.21 L 82.28 36.39 L 81.21 35.60 L 80.12 34.86 L 79.01 34.15 L 77.89 33.47 L 77.89 33.47 L 78.91 34.29 L 79.87 35.17 L 80.78 36.10 L 81.64 37.06 L 82.45 38.06 L 83.22 39.09 L 83.93 40.15 L 84.59 41.24 L 85.21 42.35 L 85.76 43.48 L 86.27 44.63 L 86.72 45.79 L 87.12 46.97 L 87.46 48.15 L 87.76 49.35 L 87.99 50.54 L 88.18 51.74 L 88.31 52.94 L 88.39 54.14 L 88.41 55.33 L 88.39 56.51 L 88.31 57.69 L 88.19 58.85 L 88.01 60.00 Z';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // If reduced motion is preferred, complete quickly
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (onComplete) onComplete();
      return;
    }

    // 2-second loading sequence
    const tl = gsap.timeline({
      delay: 2.0,
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    // Content fade & slight scale down
    tl.to(contentRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.35,
      ease: 'power3.in',
    });

    // Main preloader curtain fade out
    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out',
      },
      '-=0.15'
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        backgroundColor: '#111827',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        overflow: 'hidden',
      }}
    >
      {/* Soft Ambient Center Glow matching site palette */}
      <div
        style={{
          position: 'absolute',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(214, 168, 79, 0.18) 0%, rgba(56, 189, 248, 0.06) 45%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div
        ref={contentRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Orbital Comet Spinner matching reference image in site gold/white */}
        <div
          style={{
            width: '92px',
            height: '92px',
            position: 'relative',
            marginBottom: '28px',
          }}
        >
          <svg
            width="92"
            height="92"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="orbital-spinner-svg"
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              overflow: 'visible',
            }}
          >
            <defs>
              <filter id="cometGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#D6A84F" floodOpacity="0.95" />
                <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#D6A84F" floodOpacity="0.4" />
              </filter>
            </defs>

            {/* Comet 1: Leading Brightest Node (Pure White Head + Intense Champagne Gold Glow) */}
            <g transform="rotate(-66 60 60)">
              <path d={COMET_TAIL_PATH} fill="#D6A84F" fillOpacity="0.95" filter="url(#cometGlow)" />
              <circle cx="92" cy="60" r="4.6" fill="#FFFFFF" filter="url(#cometGlow)" />
            </g>

            {/* Comet 2: Medium-High Node (Vivid Gold, 75% Opacity) */}
            <g transform="rotate(24 60 60)">
              <path d={COMET_TAIL_PATH} fill="#D6A84F" fillOpacity="0.75" />
              <circle cx="92" cy="60" r="4.6" fill="#D6A84F" fillOpacity="0.82" />
            </g>

            {/* Comet 3: Medium-Low Node (Amber Gold, 48% Opacity) */}
            <g transform="rotate(114 60 60)">
              <path d={COMET_TAIL_PATH} fill="#D6A84F" fillOpacity="0.48" />
              <circle cx="92" cy="60" r="4.6" fill="#D6A84F" fillOpacity="0.55" />
            </g>

            {/* Comet 4: Trailing Deep Bronze Node (22% Opacity) */}
            <g transform="rotate(204 60 60)">
              <path d={COMET_TAIL_PATH} fill="#D6A84F" fillOpacity="0.22" />
              <circle cx="92" cy="60" r="4.6" fill="#D6A84F" fillOpacity="0.28" />
            </g>
          </svg>
        </div>

        {/* Brand Title with Neon Pulse Dot */}
        <div
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.25rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: '#EDEDED',
            marginBottom: '0px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          XPEDIRA AI
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--green)',
              boxShadow: '0 0 8px var(--green), 0 0 16px var(--green)',
              animation: 'pulseGlow 1.5s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        .orbital-spinner-svg {
          animation: orbitalSpin 1.1s linear infinite;
          transform-origin: center center;
        }

        @keyframes orbitalSpin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(0.9);
          }
          50% {
            opacity: 1;
            transform: scale(1.15);
          }
        }
      `}</style>
    </div>
  );
}
