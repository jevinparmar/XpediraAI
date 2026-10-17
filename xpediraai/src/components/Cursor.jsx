import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Premium Custom Electric Glow Cursor with Magnetic Effects
 * Crafted specifically for Xpedira AI's royal dark slate (#111827) & champagne gold (#D6A84F) theme.
 *
 * Features:
 * 1. Central Dot (6px): Crisp white/gold core tracking pointer with ultra-low latency.
 * 2. Outer Glow Ring (32px default): Thin champagne gold border with fluid GSAP quickTo trailing lag.
 * 3. Electric Glow: Controlled, elegant radial aura and subtle inner wash matching brand tokens.
 * 4. Contextual States: Dynamic response on buttons, links, cards ("VIEW" label), and text inputs.
 * 5. Subtle Magnetic Effects: 3–8px smooth displacement on eligible nav links, buttons, and icons.
 * 6. Accessibility & Performance: Strict fine-pointer detection, touch-disabled, prefers-reduced-motion safe,
 *    and zero React re-renders on mousemove.
 */

export default function Cursor() {
  const containerRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    // 1. Accessibility & Device Detection
    if (typeof window === 'undefined') return;

    const isFinePointer =
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(pointer: coarse)').matches;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isFinePointer || prefersReducedMotion) {
      return;
    }

    // Add root marker class so global CSS hides native cursor cleanly (preserving inputs/textareas)
    document.documentElement.classList.add('has-custom-cursor');

    const containerEl = containerRef.current;
    const dotEl = dotRef.current;
    const ringEl = ringRef.current;
    const labelEl = labelRef.current;

    if (!containerEl || !dotEl || !ringEl) return;

    // 2. High-performance GSAP quickTo setters (translate transforms, zero layout shifts)
    // Central dot: 6px diameter -> offset -3px
    const xToDot = gsap.quickTo(dotEl, 'x', { duration: 0.08, ease: 'power3.out' });
    const yToDot = gsap.quickTo(dotEl, 'y', { duration: 0.08, ease: 'power3.out' });

    // Outer glow ring: 32px diameter -> offset -16px
    const xToRing = gsap.quickTo(ringEl, 'x', { duration: 0.32, ease: 'power3.out' });
    const yToRing = gsap.quickTo(ringEl, 'y', { duration: 0.32, ease: 'power3.out' });

    let isVisible = false;
    let currentState = 'default';
    let isMouseDown = false;
    let currentMagneticEl = null;

    // Helper to apply contextual states with GSAP
    const applyState = (state) => {
      if (currentState === state && !isMouseDown) return;
      currentState = state;

      const clickScaleFactor = isMouseDown ? 0.85 : 1;

      switch (state) {
        case 'text':
          // Fade out custom cursor completely over inputs / textareas to yield to native text cursor
          gsap.to(containerEl, { opacity: 0, duration: 0.18, overwrite: 'auto' });
          break;

        case 'button':
          // Enlarged ring with intensified champagne gold electric glow
          gsap.to(containerEl, { opacity: 1, duration: 0.18, overwrite: 'auto' });
          gsap.to(ringEl, {
            scale: 1.55 * clickScaleFactor,
            borderColor: 'rgba(214, 168, 79, 0.95)',
            boxShadow:
              '0 0 24px rgba(214, 168, 79, 0.55), 0 0 48px rgba(214, 168, 79, 0.22), inset 0 0 12px rgba(214, 168, 79, 0.28)',
            background: 'radial-gradient(circle, rgba(214, 168, 79, 0.15) 0%, transparent 70%)',
            duration: 0.32,
            ease: 'power2.out',
            overwrite: 'auto',
          });
          gsap.to(dotEl, {
            scale: 0.45 * (isMouseDown ? 1.4 : 1),
            opacity: 0.6,
            duration: 0.25,
            overwrite: 'auto',
          });
          if (labelEl) {
            gsap.to(labelEl, { opacity: 0, scale: 0.7, duration: 0.2, overwrite: 'auto' });
          }
          break;

        case 'link':
          // Subtly enlarged ring for navigation links and interactive icons
          gsap.to(containerEl, { opacity: 1, duration: 0.18, overwrite: 'auto' });
          gsap.to(ringEl, {
            scale: 1.25 * clickScaleFactor,
            borderColor: 'rgba(214, 168, 79, 0.85)',
            boxShadow:
              '0 0 18px rgba(214, 168, 79, 0.42), 0 0 32px rgba(214, 168, 79, 0.15), inset 0 0 10px rgba(214, 168, 79, 0.18)',
            background: 'radial-gradient(circle, rgba(214, 168, 79, 0.10) 0%, transparent 70%)',
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
          });
          gsap.to(dotEl, {
            scale: 0.65 * (isMouseDown ? 1.3 : 1),
            opacity: 0.75,
            duration: 0.25,
            overwrite: 'auto',
          });
          if (labelEl) {
            gsap.to(labelEl, { opacity: 0, scale: 0.7, duration: 0.2, overwrite: 'auto' });
          }
          break;

        case 'card':
          // Expanded showcase ring with contextual "VIEW" badge
          gsap.to(containerEl, { opacity: 1, duration: 0.18, overwrite: 'auto' });
          gsap.to(ringEl, {
            scale: 1.8 * clickScaleFactor,
            borderColor: 'rgba(214, 168, 79, 0.90)',
            boxShadow:
              '0 0 28px rgba(214, 168, 79, 0.50), 0 0 54px rgba(214, 168, 79, 0.20), inset 0 0 14px rgba(214, 168, 79, 0.24)',
            background: 'radial-gradient(circle, rgba(214, 168, 79, 0.16) 0%, transparent 70%)',
            duration: 0.35,
            ease: 'power2.out',
            overwrite: 'auto',
          });
          gsap.to(dotEl, { scale: 0, opacity: 0, duration: 0.2, overwrite: 'auto' });
          if (labelEl) {
            gsap.to(labelEl, {
              opacity: 1,
              scale: 1,
              duration: 0.25,
              ease: 'back.out(1.5)',
              overwrite: 'auto',
            });
          }
          break;

        default:
          // Default resting electric glow state
          gsap.to(containerEl, { opacity: 1, duration: 0.18, overwrite: 'auto' });
          gsap.to(ringEl, {
            scale: 1 * clickScaleFactor,
            borderColor: 'rgba(214, 168, 79, 0.75)',
            boxShadow:
              '0 0 16px rgba(214, 168, 79, 0.36), 0 0 28px rgba(214, 168, 79, 0.12), inset 0 0 10px rgba(214, 168, 79, 0.16)',
            background: 'radial-gradient(circle, rgba(214, 168, 79, 0.08) 0%, transparent 70%)',
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
          });
          gsap.to(dotEl, {
            scale: 1 * (isMouseDown ? 1.3 : 1),
            opacity: 1,
            duration: 0.25,
            overwrite: 'auto',
          });
          if (labelEl) {
            gsap.to(labelEl, { opacity: 0, scale: 0.7, duration: 0.2, overwrite: 'auto' });
          }
          break;
      }
    };

    // 3. Pointer move & Magnetic displacement handler
    const handlePointerMove = (e) => {
      const { clientX, clientY } = e;

      if (!isVisible) {
        isVisible = true;
        gsap.to(containerEl, { opacity: 1, duration: 0.2 });
      }

      // Smooth coordinate interpolation (centered on pointer)
      xToDot(clientX - 3);
      yToDot(clientY - 3);
      xToRing(clientX - 16);
      yToRing(clientY - 16);

      // Determine hovered element context
      const target = e.target;
      if (!target || typeof target.closest !== 'function') return;

      // A. Input / Form fields
      if (target.closest('input, textarea, select, [contenteditable="true"]')) {
        applyState('text');
        resetMagnetic();
        return;
      }

      // B. Buttons & Primary CTAs
      if (
        target.closest(
          'button, .btn, [role="button"], .nav-action-btn, input[type="submit"], .glass-dock button'
        )
      ) {
        applyState('button');
        handleMagneticElement(target, e, 0.28, 7);
        return;
      }

      // C. Navigation Links & Icons
      if (
        target.closest(
          'a, .nav-link, .desktop-nav a, .social-icon, .icon-btn, [data-magnetic="true"]'
        )
      ) {
        applyState('link');
        handleMagneticElement(target, e, 0.22, 5);
        return;
      }

      // D. Interactive Cards (Services, Team, Features)
      if (target.closest('.service-card, .glass-card, .team-member-card, [data-cursor-view]')) {
        applyState('card');
        resetMagnetic();
        return;
      }

      // E. Default State
      applyState('default');
      resetMagnetic();
    };

    // 4. Magnetic displacement calculation
    const handleMagneticElement = (target, e, strength = 0.25, maxDist = 6) => {
      const eligible = target.closest(
        '.desktop-nav a, a[aria-label="LinkedIn"], a[aria-label="GitHub"], a[aria-label="Twitter"], button[aria-label="Scroll back to top"], button[title="Copy email to clipboard"], .nav-action-btn, [data-magnetic="true"]'
      );

      // If element is already managed by dedicated component (e.g. MagneticButton), do not conflict
      if (!eligible || eligible.closest('[data-magnetic-button]')) {
        resetMagnetic();
        return;
      }

      if (currentMagneticEl && currentMagneticEl !== eligible) {
        gsap.to(currentMagneticEl, { x: 0, y: 0, duration: 0.45, ease: 'power3.out', overwrite: 'auto' });
      }

      currentMagneticEl = eligible;
      const rect = eligible.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      const moveX = Math.max(-maxDist, Math.min(maxDist, dx * strength));
      const moveY = Math.max(-maxDist, Math.min(maxDist, dy * strength));

      gsap.to(eligible, {
        x: moveX,
        y: moveY,
        duration: 0.32,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const resetMagnetic = () => {
      if (currentMagneticEl) {
        gsap.to(currentMagneticEl, {
          x: 0,
          y: 0,
          duration: 0.55,
          ease: 'power3.out',
          overwrite: 'auto',
        });
        currentMagneticEl = null;
      }
    };

    // 5. Click compression interactions
    const handleMouseDown = () => {
      if (currentState === 'text') return;
      isMouseDown = true;
      applyState(currentState);
    };

    const handleMouseUp = () => {
      isMouseDown = false;
      applyState(currentState);
    };

    // 6. Viewport boundary handling
    const handleMouseLeave = () => {
      isVisible = false;
      gsap.to(containerEl, { opacity: 0, duration: 0.25 });
      resetMagnetic();
    };

    const handleMouseEnter = () => {
      if (currentState !== 'text') {
        isVisible = true;
        gsap.to(containerEl, { opacity: 1, duration: 0.25 });
      }
    };

    // Attach listeners
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    // Cleanup on unmount
    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      resetMagnetic();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        opacity: 0,
        willChange: 'opacity',
      }}
      aria-hidden="true"
    >
      {/* Outer Electric Glow Ring (32px diameter, centered via quickTo with -16px offset) */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1.5px solid rgba(214, 168, 79, 0.75)',
          background: 'radial-gradient(circle, rgba(214, 168, 79, 0.08) 0%, transparent 70%)',
          boxShadow:
            '0 0 16px rgba(214, 168, 79, 0.36), 0 0 28px rgba(214, 168, 79, 0.12), inset 0 0 10px rgba(214, 168, 79, 0.16)',
          pointerEvents: 'none',
          willChange: 'transform, border-color, box-shadow, background',
          transformOrigin: 'center center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Contextual Card Hover Label */}
        <span
          ref={labelRef}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '8.5px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: 'var(--green, #D6A84F)',
            textShadow: '0 0 8px rgba(214, 168, 79, 0.65)',
            opacity: 0,
            transform: 'scale(0.7)',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          VIEW
        </span>
      </div>

      {/* Central Crisp Dot (6px diameter, centered via quickTo with -3px offset) */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: '#EDEDED',
          boxShadow:
            '0 0 10px rgba(214, 168, 79, 0.95), 0 0 16px rgba(214, 168, 79, 0.5), 0 0 2px #FFFFFF',
          pointerEvents: 'none',
          willChange: 'transform, opacity',
          transformOrigin: 'center center',
        }}
      />
    </div>
  );
}
