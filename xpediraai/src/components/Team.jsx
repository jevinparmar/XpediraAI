import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IconLinkedin, IconGithub, IconTwitter } from './Icons';
import { Sparkles, ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Team() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="team" ref={containerRef} className="section-padding">
      <div className="section-container">
        {/* Section Header */}
        <div style={{ maxWidth: '680px', marginBottom: '56px' }}>
          <div className="section-badge">
            <span className="section-badge-dot" />
            <span>Leadership</span>
          </div>

          <h2 className="section-title">
            Executive <span className="text-gradient-green">Leadership</span>
          </h2>

          <p className="section-subtitle">
            Meet the visionary leading Xpedira AI's mission to architect scalable intelligence,
            autonomous agentic workflows, and mission-critical enterprise solutions.
          </p>
        </div>

        {/* Executive CEO Showcase Card */}
        <div
          ref={cardRef}
          className="glass-card ceo-showcase-card"
          style={{
            maxWidth: '1060px',
            margin: '0 auto',
            borderRadius: 'var(--radius-2xl)',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
            backdropFilter: 'blur(30px) saturate(180%)',
            WebkitBackdropFilter: 'blur(30px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '0',
            transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.4)';
            e.currentTarget.style.boxShadow =
              '0 30px 80px rgba(0, 0, 0, 0.7), 0 0 35px rgba(0, 255, 136, 0.15), inset 0 1px 1px 0 rgba(255, 255, 255, 0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)';
            e.currentTarget.style.boxShadow =
              '0 24px 60px rgba(0, 0, 0, 0.6), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)';
          }}
        >
          {/* Left Column: Portrait */}
          <div
            style={{
              position: 'relative',
              minHeight: '440px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'radial-gradient(circle at center, rgba(0, 255, 136, 0.08) 0%, rgba(10, 10, 10, 0.95) 75%)',
              overflow: 'hidden',
              borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            {/* CEO Portrait Image */}
            <img
              src="/team/ceo.jpg"
              alt="Jevin Parmar - Chief Executive Officer"
              className="ceo-avatar-img"
              style={{
                width: '100%',
                height: '100%',
                maxHeight: '520px',
                objectFit: 'cover',
                objectPosition: 'center 15%',
                filter: 'brightness(1.02) contrast(1.04)',
                transition: 'transform 0.6s var(--ease-out-expo), filter 0.6s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
              loading="lazy"
            />

            {/* Gradient Overlays for Cinematic Blending */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(10, 10, 10, 0.9) 0%, rgba(10, 10, 10, 0.1) 40%, transparent 80%)',
                pointerEvents: 'none',
              }}
            />

            {/* Top Floating Badge */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(10, 10, 10, 0.75)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(0, 255, 136, 0.35)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: 'var(--green)',
                  boxShadow: '0 0 8px var(--green)',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--green)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                Founder & CEO
              </span>
            </div>

            {/* Bottom Highlight Pill */}
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                right: '20px',
                padding: '10px 16px',
                borderRadius: 'var(--radius-lg)',
                background: 'rgba(15, 17, 16, 0.82)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: '#FFF',
                  }}
                >
                  Jevin Parmar
                </span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    color: 'var(--green-soft)',
                    fontFamily: 'var(--font-mono, monospace)',
                  }}
                >
                  Xpedira AI • Executive
                </span>
              </div>
              <div
                style={{
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-pill)',
                  background: 'rgba(0, 255, 136, 0.12)',
                  border: '1px solid rgba(0, 255, 136, 0.3)',
                  color: 'var(--green)',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                }}
              >
                Verified
              </div>
            </div>
          </div>

          {/* Right Column: Profile & Vision Details */}
          <div
            style={{
              padding: 'clamp(28px, 4vw, 44px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: 'linear-gradient(135deg, rgba(20, 24, 22, 0.35) 0%, rgba(10, 10, 10, 0.5) 100%)',
            }}
          >
            <div>
              {/* Badge & Title */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono, monospace)',
                  color: 'var(--green)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '10px',
                }}
              >
                <Sparkles size={14} />
                <span>Executive Leadership</span>
              </div>

              <h3
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  marginBottom: '6px',
                  letterSpacing: '-0.02em',
                }}
              >
                Jevin Parmar
              </h3>

              <div
                style={{
                  fontSize: '1rem',
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--green-soft)',
                  fontWeight: 600,
                  marginBottom: '20px',
                }}
              >
                Chief Executive Officer & Founder
              </div>

              {/* CEO Philosophy Quote */}
              <div
                style={{
                  position: 'relative',
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(0, 255, 136, 0.04)',
                  borderLeft: '3px solid var(--green)',
                  borderTop: '1px solid rgba(0, 255, 136, 0.12)',
                  borderRight: '1px solid rgba(0, 255, 136, 0.12)',
                  borderBottom: '1px solid rgba(0, 255, 136, 0.12)',
                  marginBottom: '28px',
                }}
              >
                <p
                  style={{
                    fontSize: '0.925rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: 1.65,
                    fontStyle: 'italic',
                    margin: 0,
                  }}
                >
                  "At Xpedira AI, we transform complex artificial intelligence into high-velocity,
                  production-grade engines that empower modern enterprises to operate autonomously
                  with speed, accuracy, and absolute precision."
                </p>
              </div>

              {/* Leadership Focus Areas */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.3)';
                    e.currentTarget.style.background = 'rgba(0, 255, 136, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: 'rgba(0, 255, 136, 0.1)',
                      border: '1px solid rgba(0, 255, 136, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--green)',
                      flexShrink: 0,
                    }}
                  >
                    <Cpu size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#FFFFFF' }}>
                      Strategic AI & Autonomous Systems
                    </div>
                    <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                      Architecting multi-agent reasoning systems and foundational AI workflows.
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.3)';
                    e.currentTarget.style.background = 'rgba(0, 255, 136, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: 'rgba(0, 229, 255, 0.1)',
                      border: '1px solid rgba(0, 229, 255, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--cyan, #00E5FF)',
                      flexShrink: 0,
                    }}
                  >
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#FFFFFF' }}>
                      Enterprise Architecture & Scalability
                    </div>
                    <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                      Engineering high-concurrency cloud pipelines with zero-downtime tolerance.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links & Connect CTA */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                paddingTop: '24px',
              }}
            >
              {/* Social Icons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-muted)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--green)';
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.4)';
                    e.currentTarget.style.background = 'rgba(0, 255, 136, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  aria-label="CEO LinkedIn"
                >
                  <IconLinkedin size={18} />
                </a>

                <a
                  href="https://github.com/jevinparmar"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-muted)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--green)';
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.4)';
                    e.currentTarget.style.background = 'rgba(0, 255, 136, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  aria-label="CEO GitHub"
                >
                  <IconGithub size={18} />
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-muted)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--green)';
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.4)';
                    e.currentTarget.style.background = 'rgba(0, 255, 136, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  aria-label="CEO Twitter"
                >
                  <IconTwitter size={18} />
                </a>
              </div>

              {/* Direct Connect Link to Contact */}
              <a
                href="#contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-pill)',
                  background: 'rgba(0, 255, 136, 0.12)',
                  border: '1px solid rgba(0, 255, 136, 0.4)',
                  color: 'var(--green)',
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--green)';
                  e.currentTarget.style.color = '#000000';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 255, 136, 0.12)';
                  e.currentTarget.style.color = 'var(--green)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span>Connect with CEO</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
