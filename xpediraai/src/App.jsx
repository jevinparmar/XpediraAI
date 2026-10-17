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
      // Luxury scroll progress indicator
      gsap.fromTo(
        '.scroll-progress-bar',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.15,
          },
        }
      );
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
        {/* Luxury Top Scroll Progress Bar */}
        <div
          className="scroll-progress-bar"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #D6A84F, #FFE7B3, #D6A84F)',
            boxShadow: '0 0 12px rgba(214, 168, 79, 0.8), 0 0 4px rgba(255, 255, 255, 0.9)',
            zIndex: 99998,
            pointerEvents: 'none',
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
          }}
          aria-hidden="true"
        />

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
