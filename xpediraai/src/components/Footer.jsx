import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUp } from 'lucide-react';
import { IconLinkedin, IconGithub, IconTwitter } from './Icons';

gsap.registerPlugin(ScrollTrigger);

export default function Footer({ lenisRef }) {
  const containerRef = useRef(null);

  const scrollToTop = () => {
    const activeLenis = window.lenis || (lenisRef && lenisRef.current?.lenis) || lenisRef?.current;
    if (activeLenis && typeof activeLenis.scrollTo === 'function') {
      activeLenis.scrollTo(0, { duration: 1.25 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(['.footer-divider-glow', '.footer-grid > div'], {
          opacity: 1,
          scaleX: 1,
          y: 0,
        });
        return;
      }

      // Glowing top divider line expansion
      gsap.fromTo(
        '.footer-divider-glow',
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%',
          },
        }
      );

      // Staggered footer columns reveal
      gsap.fromTo(
        '.footer-grid > div',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <footer
      ref={containerRef}
      style={{
        position: 'relative',
        backgroundColor: 'rgba(7, 7, 7, 0.75)',
        backdropFilter: 'blur(28px) saturate(180%)',
        WebkitBackdropFilter: 'blur(28px) saturate(180%)',
        paddingTop: '64px',
        paddingBottom: '40px',
        borderTop: '1px solid rgba(255, 255, 255, 0.10)',
        overflow: 'hidden',
      }}
    >
      {/* Small Glowing Green Divider Line */}
      <div
        className="footer-divider-glow"
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '70%',
          maxWidth: '800px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--green), transparent)',
          boxShadow: '0 0 16px var(--green)',
        }}
      />

      <div className="section-container">
        {/* Main Footer Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '48px',
            marginBottom: '56px',
          }}
          className="footer-grid"
        >
          {/* Brand Info */}
          <div style={{ maxWidth: '380px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '5px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.25)',
                }}
              >
                <img
                  src="/Xpedira_logo_dark_theme.png"
                  alt="Xpedira AI"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#EDEDED',
                  }}
                >
                  Xpedira <span style={{ color: 'var(--green)' }}>AI</span>
                </span>
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--green)',
                    boxShadow: '0 0 10px var(--green)',
                  }}
                />
              </div>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                color: 'var(--green)',
                fontWeight: 600,
                letterSpacing: '0.04em',
                marginBottom: '12px',
              }}
            >
              Engineering Applied Intelligence
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
              Architecting sovereign foundation models, autonomous multi-agent swarms,
              and enterprise-grade intelligence platforms for the next era of computing.
            </p>

            {/* Live Status Pill */}
            <div
              className="glass-pill"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(214, 168, 79, 0.08)',
                border: '1px solid rgba(214, 168, 79, 0.25)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                marginTop: '20px',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--green)',
                  boxShadow: '0 0 6px var(--green)',
                }}
              />
              <span
                style={{
                  fontFamily: 'SFMono-Regular, monospace',
                  fontSize: '0.72rem',
                  color: '#EDEDED',
                }}
              >
                All Clusters Operational • 99.99% SLA
              </span>
            </div>
          </div>

          {/* Links Columns */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '32px',
            }}
          >
            {/* Architecture */}
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  color: '#EDEDED',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '18px',
                }}
              >
                Solutions
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['Autonomous Agents', 'Custom Foundation Models', 'Computer Vision', 'GraphRAG Engines', 'Zero-Trust AI'].map((item) => (
                  <li key={item}>
                    <a
                      href="#services"
                      style={{
                        fontSize: '0.85rem',
                        color: 'var(--text-muted)',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--green)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Architecture */}
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  color: '#EDEDED',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '18px',
                }}
              >
                Ecosystem
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['Technology Stack', 'Inference Benchmarks', 'Air-Gapped Cloud', 'Open Research', 'API Documentation'].map((item) => (
                  <li key={item}>
                    <a
                      href="#tech"
                      style={{
                        fontSize: '0.85rem',
                        color: 'var(--text-muted)',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--green)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  color: '#EDEDED',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '18px',
                }}
              >
                Company
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['Why Choose Us', 'Leadership & Research', 'Security Whitepaper', 'Contact Us'].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().includes('why') ? 'why' : item.toLowerCase().includes('lead') ? 'team' : 'contact'}`}
                      style={{
                        fontSize: '0.85rem',
                        color: 'var(--text-muted)',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--green)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '28px',
          }}
        >
          <div
            style={{
              fontSize: '0.8rem',
              color: 'var(--text-dim)',
              fontFamily: 'SFMono-Regular, monospace',
            }}
          >
            © 2026 Xpedira AI Inc. All rights reserved.
          </div>

          {/* Social Icons + Scroll to Top */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <a
                href="#"
                style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--green)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                aria-label="LinkedIn"
              >
                <IconLinkedin size={16} />
              </a>
              <a
                href="#"
                style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--green)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                aria-label="GitHub"
              >
                <IconGithub size={16} />
              </a>
              <a
                href="#"
                style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--green)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                aria-label="Twitter"
              >
                <IconTwitter size={16} />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.25)',
                color: 'var(--text)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s var(--ease-out-expo)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(214, 168, 79, 0.5)';
                e.currentTarget.style.color = 'var(--green)';
                e.currentTarget.style.background = 'rgba(214, 168, 79, 0.08)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(214, 168, 79, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.4)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.16)';
                e.currentTarget.style.color = 'var(--text)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              aria-label="Scroll back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .footer-grid {
            grid-template-columns: 1.4fr 1.6fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
