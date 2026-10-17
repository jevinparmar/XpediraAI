import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LenisContext } from '../hooks/useLenisInstance';

gsap.registerPlugin(ScrollTrigger);

/**
 * Global SmoothScroll component powered by Lenis + GSAP Ticker.
 * - Single source of truth mounted at the app root.
 * - Safe under React StrictMode (cleans up previous instance cleanly).
 * - Connects Lenis directly to GSAP ticker for 120 FPS frame-perfect synchronization.
 * - lagSmoothing(0) prevents jumpy catch-up when scrolling resumes after a frame drop.
 * - Automatically refreshes ScrollTrigger when fonts and images finish loading.
 * - Handles global anchor link (#) clicks with precise offset.
 */
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // If user prefers reduced motion, do not initialize smooth scroll smoothing
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = new Lenis({
      lerp: prefersReducedMotion ? 1 : 0.085, // Buttery smooth continuous glide
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      syncTouch: false,
      infinite: false,
      autoRaf: false, // CRITICAL: GSAP ticker drives the RAF loop directly
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    // 1. Synchronize Lenis scroll position with GSAP ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', handleScroll);

    // 2. Drive Lenis through GSAP's high-precision Ticker
    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);

    // 3. Disable lag smoothing so scroll physics never stutter after tab inactive
    gsap.ticker.lagSmoothing(0);

    // 4. Global Anchor (#) Link smooth scroll interception
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        lenis.scrollTo(targetEl, {
          offset: -75,
          duration: 1.25,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential out
        });
      }
    };
    document.addEventListener('click', handleAnchorClick);

    // 5. Refresh ScrollTrigger after web fonts and images settle
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      });
    }

    const handleWindowLoad = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleWindowLoad);

    // Initial refresh after mount
    const initialRefreshTimeout = setTimeout(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(initialRefreshTimeout);
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('load', handleWindowLoad);
      lenis.off('scroll', handleScroll);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      if (window.lenis === lenis) {
        window.lenis = null;
      }
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  );
}
