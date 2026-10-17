import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import SmoothScroll from './components/SmoothScroll';
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

export default function App() {
  const [loading, setLoading] = useState(true);
  const mainRef = useRef(null);
  const lenisRef = useRef(null);

  // Synchronize lenisRef with global window.lenis
  React.useEffect(() => {
    if (window.lenis) {
      lenisRef.current = window.lenis;
    }
  }, []);

  // Ambient floating blobs subtle scroll parallax
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.to('.ambient-blob-1', {
        y: 200,
        x: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      });

      gsap.to('.ambient-blob-2', {
        y: -180,
        x: 60,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      });

      gsap.to('.ambient-blob-3', {
        y: 150,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.0,
        },
      });
    },
    { scope: mainRef }
  );

  const handlePreloaderComplete = () => {
    setLoading(false);
    // Refresh ScrollTrigger calculations and resize Lenis dimensions once revealed
    setTimeout(() => {
      if (window.lenis && typeof window.lenis.resize === 'function') {
        window.lenis.resize();
      }
      ScrollTrigger.refresh();
    }, 150);
  };

  return (
    <SmoothScroll>
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
    </SmoothScroll>
  );
}
