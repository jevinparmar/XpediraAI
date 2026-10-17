import React, { useState, useEffect, useRef } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import SquaresBackground from './components/SquaresBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Tech from './components/Tech';
import WhyUs from './components/WhyUs';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

// Dedicated hook component to synchronize Lenis scroll events with GSAP ScrollTrigger
function LenisSyncManager({ lenisRef }) {
  const lenis = useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    if (lenis) {
      window.lenis = lenis;
      if (lenisRef) {
        lenisRef.current = lenis;
      }
    }
  }, [lenis, lenisRef]);

  return null;
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const lenisRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    // Global anchor link smooth scroll handler for all internal navigation (#)
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const activeLenis = window.lenis || lenisRef.current?.lenis || lenisRef.current;
        if (activeLenis && typeof activeLenis.scrollTo === 'function') {
          activeLenis.scrollTo(targetEl, {
            offset: -70,
            duration: 1.3,
          });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  const handlePreloaderComplete = () => {
    setLoading(false);
    // Refresh ScrollTrigger calculations and resize Lenis dimensions once revealed
    setTimeout(() => {
      const activeLenis = window.lenis || lenisRef.current?.lenis || lenisRef.current;
      if (activeLenis && typeof activeLenis.resize === 'function') {
        activeLenis.resize();
      }
      ScrollTrigger.refresh();
    }, 150);
  };

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.08, // Buttery smooth continuous gliding interpolation
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
        infinite: false,
        autoRaf: true,
      }}
    >
      <LenisSyncManager lenisRef={lenisRef} />
      <div className="app-container" ref={mainRef}>
        {/* Full-Bleed Cyber Square Grid with Interactive Cursor Spotlight */}
        <SquaresBackground />

        {/* Matte Film Noise Overlay */}
        <div className="matte-noise" aria-hidden="true" />

        {/* Floating Multi-Hued Ambient Blobs for Glass Refraction */}
        <div className="ambient-bg" aria-hidden="true">
          <div className="ambient-blob ambient-blob-1" />
          <div className="ambient-blob ambient-blob-2" />
          <div className="ambient-blob ambient-blob-3" />
          <div className="ambient-blob ambient-blob-4" />
          <div className="ambient-blob ambient-blob-5" />
        </div>

        {/* Custom Cursor (Arrow + Smooth Lag Glass Ring) */}
        <Cursor />

        {/* Intro Preloader */}
        {loading && <Preloader onComplete={handlePreloaderComplete} />}

        {/* Fixed Glass Navbar */}
        <Navbar lenisRef={lenisRef} />

        {/* Main Single-Page Sections */}
        <main>
          <Hero lenisRef={lenisRef} />
          <Services />
          <Tech />
          <WhyUs />
          <Team />
          <Contact />
        </main>

        {/* Minimal Glass Footer */}
        <Footer lenisRef={lenisRef} />
      </div>
    </ReactLenis>
  );
}
