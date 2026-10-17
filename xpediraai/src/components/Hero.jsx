import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Scene3D from './Scene3D';
import MagneticButton from './MagneticButton';
import { ArrowDownRight, Cpu } from 'lucide-react';

export default function Hero({ lenisRef }) {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const badgeRef = useRef(null);
  const ctaRef = useRef(null);

  const headlineWords = [
    'Intelligence,',
    'engineered',
    'for',
    "what's",
    'next.',
  ];

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const el = document.querySelector(targetId);
    if (!el) return;
    const activeLenis = window.lenis || (lenisRef && lenisRef.current?.lenis) || lenisRef?.current;
    if (activeLenis && typeof activeLenis.scrollTo === 'function') {
      activeLenis.scrollTo(el, { offset: -60, duration: 1.3 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Badge reveal
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );

      // Split words stagger entrance
      tl.fromTo(
        '.hero-word-inner',
        { y: '115%', opacity: 0, rotateZ: 3 },
        {
          y: '0%',
          opacity: 1,
          rotateZ: 0,
          stagger: 0.08,
          duration: 0.85,
          ease: 'power4.out',
        },
        '-=0.3'
      );

      // Subtext
      tl.fromTo(
        subtextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.4'
      );

      // CTAs
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.4'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '100px',
        paddingBottom: '60px',
        overflow: 'hidden',
      }}
    >
      <div className="section-container" style={{ width: '100%' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '40px',
            alignItems: 'center',
            position: 'relative',
            zIndex: 10,
          }}
          className="hero-grid"
        >
          {/* Left Hero Content */}
          <div style={{ maxWidth: '640px' }}>
            {/* Pill Badge */}
            <div ref={badgeRef} style={{ display: 'inline-block' }}>
              <div className="section-badge">
                <span className="section-badge-dot" />
                <span>Next-Gen Applied Neural Architecture</span>
              </div>
            </div>

            {/* Headline with Staggered Split Words */}
            <h1
              ref={headlineRef}
              style={{
                fontSize: 'clamp(2.75rem, 6.2vw, 4.75rem)',
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: '-0.035em',
                marginBottom: '24px',
                color: '#EDEDED',
              }}
            >
              {headlineWords.map((word, i) => {
                const isGreen = word.includes("next.");
                return (
                  <span
                    key={i}
                    style={{
                      display: 'inline-block',
                      overflow: 'hidden',
                      marginRight: '0.28em',
                      verticalAlign: 'top',
                    }}
                  >
                    <span
                      className="hero-word-inner"
                      style={{
                        display: 'inline-block',
                        color: isGreen ? 'var(--green)' : '#EDEDED',
                        textShadow: isGreen ? '0 0 35px rgba(214, 168, 79, 0.45)' : 'none',
                      }}
                    >
                      {word}
                    </span>
                  </span>
                );
              })}
            </h1>

            {/* Subtext */}
            <p
              ref={subtextRef}
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                color: 'var(--text-muted)',
                lineHeight: 1.65,
                marginBottom: '36px',
                maxWidth: '540px',
              }}
            >
              We engineer autonomous agentic systems, sovereign foundation models, and
              high-throughput AI infrastructure designed to outpace the future.
            </p>

            {/* Two Action Buttons */}
            <div
              ref={ctaRef}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                flexWrap: 'wrap',
                marginBottom: '48px',
              }}
            >
              <MagneticButton
                variant="primary"
                href="#services"
                onClick={(e) => handleScrollTo(e, '#services')}
              >
                Explore Services
                <ArrowDownRight size={18} />
              </MagneticButton>

              <MagneticButton
                variant="glass"
                href="#tech"
                onClick={(e) => handleScrollTo(e, '#tech')}
              >
                <Cpu size={18} />
                Our Tech Stack
              </MagneticButton>
            </div>
          </div>

          {/* Right 3D Model Canvas */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '560px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="hero-canvas-wrapper"
          >
            {/* Soft Ambient Radial Behind the 3D Model */}
            <div
              style={{
                position: 'absolute',
                width: '460px',
                height: '460px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(214, 168, 79, 0.22) 0%, rgba(11, 61, 42, 0.12) 50%, transparent 75%)',
                filter: 'blur(60px)',
                pointerEvents: 'none',
              }}
            />

            <Scene3D />
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 980px) {
          .hero-grid {
            grid-template-columns: 1.05fr 0.95fr !important;
          }
          .hero-canvas-wrapper {
            height: 680px !important;
          }
        }
      `}</style>
    </section>
  );
}
