import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Scene3D from './Scene3D';
import MagneticButton from './MagneticButton';
import { ArrowDownRight, Cpu } from 'lucide-react';
import { scrambleText } from '../hooks/useAdvancedAnimations';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ lenisRef, loading = false }) {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const badgeRef = useRef(null);
  const badgeTextRef = useRef(null);
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
      activeLenis.scrollTo(el, { offset: -75, duration: 1.25 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useGSAP(
    () => {
      // Wait for preloader curtain to complete before launching hero choreography
      if (loading) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(['.hero-word-inner', badgeRef.current, subtextRef.current, ctaRef.current], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      // 1. Initial Cyber Scramble Decode on Badge
      if (badgeTextRef.current) {
        scrambleText(badgeTextRef.current, 'Next-Gen Applied Neural Architecture', 0.9);
      }

      const tl = gsap.timeline({ delay: 0.1 });

      // 2. Badge entrance
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'power3.out' }
      );

      // 3. Main Hero Heading: Masked word slide-up with character hover & 3D rotation settle
      tl.fromTo(
        '.hero-word-inner',
        { yPercent: 120, opacity: 0, rotateX: -30 },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.075,
          duration: 0.95,
          ease: 'power4.out',
        },
        '-=0.45'
      );

      // 4. Subtext paragraph reveal
      tl.fromTo(
        subtextRef.current,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' },
        '-=0.55'
      );

      // 5. CTA action buttons
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 24, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: 'power3.out' },
        '-=0.55'
      );

      // 6. Subtle scroll parallax depth on text content as user scrolls down
      gsap.to('.hero-left-content', {
        y: -85,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });
    },
    { scope: containerRef, dependencies: [loading] }
  );

  // Letter-hover effect: Characters dynamically elevate on mouse over
  const handleCharHover = (e) => {
    gsap.to(e.currentTarget, {
      y: -6,
      color: '#D6A84F',
      duration: 0.2,
      ease: 'power2.out',
      yoyo: true,
      repeat: 1,
    });
  };

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
          <div className="hero-left-content" style={{ maxWidth: '640px' }}>
            {/* Pill Badge with Scramble on Hover */}
            <div
              ref={badgeRef}
              style={{ display: 'inline-block' }}
              onMouseEnter={() => {
                if (badgeTextRef.current) {
                  scrambleText(badgeTextRef.current, 'Next-Gen Applied Neural Architecture', 0.6);
                }
              }}
            >
              <div className="section-badge">
                <span className="section-badge-dot" />
                <span ref={badgeTextRef}>Next-Gen Applied Neural Architecture</span>
              </div>
            </div>

            {/* Headline with Masked Character Stagger & Hover Kinetic Wave */}
            <h1
              ref={headlineRef}
              style={{
                fontSize: 'clamp(2.75rem, 6.2vw, 4.75rem)',
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: '-0.035em',
                marginBottom: '24px',
                color: '#EDEDED',
                perspective: '1000px',
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
                      paddingBottom: '0.08em',
                    }}
                  >
                    <span
                      className="hero-word-inner"
                      style={{
                        display: 'inline-block',
                        color: isGreen ? 'var(--green)' : '#EDEDED',
                        textShadow: isGreen ? '0 0 35px rgba(214, 168, 79, 0.45)' : 'none',
                        willChange: 'transform, opacity',
                      }}
                    >
                      {word.split('').map((char, charIdx) => (
                        <span
                          key={charIdx}
                          className="hero-char"
                          onMouseEnter={handleCharHover}
                          style={{
                            display: 'inline-block',
                            cursor: 'default',
                            transition: 'color 0.2s ease',
                          }}
                        >
                          {char}
                        </span>
                      ))}
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
              className="hero-cta-btns"
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
              minHeight: '520px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 1,
              visibility: 'visible',
            }}
            className="hero-canvas-wrapper"
          >
            {/* Soft Ambient Radial Behind the 3D Model */}
            <div
              style={{
                position: 'absolute',
                width: 'min(460px, 90vw)',
                height: 'min(460px, 90vw)',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(214, 168, 79, 0.22) 0%, rgba(17, 24, 39, 0.35) 55%, transparent 75%)',
                filter: 'blur(60px)',
                pointerEvents: 'none',
              }}
            />

            <Scene3D />
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 820px) {
          .hero-grid {
            grid-template-columns: 1.05fr 0.95fr !important;
          }
          .hero-canvas-wrapper {
            height: 640px !important;
          }
        }
        @media (max-width: 819px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-left-content {
            margin: 0 auto;
          }
          .hero-cta-btns {
            justify-content: center !important;
          }
          .hero-canvas-wrapper {
            height: min(440px, 55vh) !important;
            min-height: 320px !important;
            order: 2;
          }
        }
        @media (max-width: 480px) {
          .hero-canvas-wrapper {
            height: 340px !important;
            min-height: 280px !important;
          }
        }
      `}</style>
    </section>
  );
}
