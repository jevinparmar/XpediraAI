import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
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
    // Initialize Lenis Smooth Scroll
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenisInstance;

    // Synchronize Lenis with GSAP ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update);

    const updateRaf = (time) => {
      lenisInstance.raf(time * 1000);
    };

    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateRaf);
      lenisInstance.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handlePreloaderComplete = () => {
    setLoading(false);
    // Refresh ScrollTrigger calculations once the DOM is revealed
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
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
