import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
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

export default function App() {
  const [loading, setLoading] = useState(true);
  const lenisRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis Smooth Scroll with fine-tuned friction and momentum
    const lenisInstance = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenisInstance;
    window.lenis = lenisInstance;

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    lenisInstance.on('scroll', ScrollTrigger.update);

    // Drive Lenis RAF through GSAP's ticker for lockstep synchronization
    const updateTicker = (time) => {
      lenisInstance.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Global anchor link smooth scroll handler for all internal navigation (#)
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        lenisInstance.scrollTo(targetEl, {
          offset: -70,
          duration: 1.2,
        });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(updateTicker);
      lenisInstance.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.lenis = null;
    };
  }, []);

  const handlePreloaderComplete = () => {
    setLoading(false);
    // Refresh ScrollTrigger calculations and resize Lenis dimensions once revealed
    setTimeout(() => {
      if (lenisRef.current) {
        lenisRef.current.resize();
      }
      ScrollTrigger.refresh();
    }, 150);
  };

  return (
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
  );
}
