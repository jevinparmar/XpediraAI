import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IconLinkedin, IconGithub, IconTwitter } from './Icons';

gsap.registerPlugin(ScrollTrigger);

const TEAM_MEMBERS = [
  {
    name: 'Dr. Elena Vance',
    role: 'Chief AI Scientist & Co-Founder',
    image: '/team/elena.jpg',
    bio: 'Ex-DeepMind Fellow with 40+ cited papers on neural architecture search, multimodal reasoning, and foundation model alignment.',
    focus: 'Neural Architecture Search & Alignment',
    social: { linkedin: '#', github: '#', twitter: '#' },
  },
  {
    name: 'Marcus Chen',
    role: 'Head of Autonomous Systems',
    image: '/team/marcus.jpg',
    bio: 'Previously led distributed robotics pipelines and low-latency autonomous vehicle perception architectures at scale.',
    focus: 'Multi-Agent Swarms & Edge Robotics',
    social: { linkedin: '#', github: '#', twitter: '#' },
  },
  {
    name: 'Sophia Al-Mansoor',
    role: 'VP of AI Infrastructure & Cloud',
    image: '/team/sophia.jpg',
    bio: 'Pioneered petascale multi-tenant GPU cluster orchestration, bare-metal CUDA memory optimizations, and zero-downtime serving.',
    focus: 'Petascale GPU Clusters & vLLM',
    social: { linkedin: '#', github: '#', twitter: '#' },
  },
  {
    name: 'David Thorne',
    role: 'Lead Research Engineer',
    image: '/team/david.jpg',
    bio: 'Specialist in structural causal inference, symbolic neural models, and formal mathematical verification for high-risk autonomous agents.',
    focus: 'Causal Inference & Quantum ML',
    social: { linkedin: '#', github: '#', twitter: '#' },
  },
];

export default function Team() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.team-member-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
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
        {/* Header */}
        <div style={{ maxWidth: '680px', marginBottom: '56px' }}>
          <div className="section-badge">
            <span className="section-badge-dot" />
            <span>The People Behind The AI</span>
          </div>

          <h2 className="section-title">
            Architects of <span className="text-gradient-green">Applied Intelligence</span>
          </h2>

          <p className="section-subtitle">
            A cohesive collective of machine learning researchers, high-performance computing
            veterans, and systems architects dedicated to rigorous engineering.
          </p>
        </div>

        {/* 4 Team Member Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={idx}
              className="glass-card team-member-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                borderRadius: 'var(--radius-xl)',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.55), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)',
                transition: 'all 0.4s var(--ease-out-expo)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.45)';
                e.currentTarget.style.boxShadow = '0 24px 60px rgba(0, 0, 0, 0.65), 0 0 32px rgba(0, 255, 136, 0.16), inset 0 1px 1px 0 rgba(255, 255, 255, 0.35)';
                const img = e.currentTarget.querySelector('.team-avatar-img');
                if (img) {
                  img.style.filter = 'grayscale(0%) brightness(1.05)';
                  img.style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.55), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)';
                const img = e.currentTarget.querySelector('.team-avatar-img');
                if (img) {
                  img.style.filter = 'grayscale(100%) brightness(0.95)';
                  img.style.transform = 'scale(1)';
                }
              }}
            >
              {/* Portrait Container */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1 / 1',
                  overflow: 'hidden',
                  backgroundColor: '#111312',
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-avatar-img"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(100%) brightness(0.95)',
                    transition: 'filter 0.5s ease, transform 0.6s var(--ease-out-expo)',
                  }}
                  loading="lazy"
                />

                {/* Subtle gradient vignette */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(10, 10, 10, 0.9) 0%, rgba(10, 10, 10, 0.1) 50%, transparent 100%)',
                  }}
                />

                {/* Focus Pill in bottom of photo */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '16px',
                    right: '16px',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-pill)',
                    background: 'rgba(10, 10, 10, 0.65)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(0, 255, 136, 0.3)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'SFMono-Regular, monospace',
                      fontSize: '0.7rem',
                      color: 'var(--green)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      fontWeight: 600,
                    }}
                  >
                    {member.focus}
                  </span>
                </div>
              </div>

              {/* Info Container */}
              <div
                style={{
                  padding: '24px 24px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flex: 1,
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#EDEDED',
                      marginBottom: '4px',
                    }}
                  >
                    {member.name}
                  </h3>

                  <div
                    style={{
                      fontSize: '0.825rem',
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--green-soft)',
                      fontWeight: 600,
                      marginBottom: '14px',
                    }}
                  >
                    {member.role}
                  </div>

                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.6,
                      marginBottom: '24px',
                    }}
                  >
                    {member.bio}
                  </p>
                </div>

                {/* Social Links as Frosted Glass Circles */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    paddingTop: '16px',
                  }}
                >
                  <a
                    href={member.social.linkedin}
                    style={{
                      width: '34px',
                      height: '34px',
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
                      e.currentTarget.style.background = 'rgba(0, 255, 136, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-muted)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    }}
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <IconLinkedin size={16} />
                  </a>

                  <a
                    href={member.social.twitter}
                    style={{
                      width: '34px',
                      height: '34px',
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
                      e.currentTarget.style.background = 'rgba(0, 255, 136, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-muted)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    }}
                    aria-label={`${member.name} Twitter`}
                  >
                    <IconTwitter size={16} />
                  </a>

                  <a
                    href={member.social.github}
                    style={{
                      width: '34px',
                      height: '34px',
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
                      e.currentTarget.style.background = 'rgba(0, 255, 136, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-muted)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    }}
                    aria-label={`${member.name} GitHub`}
                  >
                    <IconGithub size={16} />
                  </a>

                  <a
                    href={member.social.github}
                    style={{
                      color: 'var(--text-muted)',
                      transition: 'color 0.2s ease',
                      display: 'flex',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--green)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                    aria-label={`${member.name} GitHub`}
                  >
                    <IconGithub size={18} />
                  </a>

                  <a
                    href={member.social.twitter}
                    style={{
                      color: 'var(--text-muted)',
                      transition: 'color 0.2s ease',
                      display: 'flex',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--green)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                    aria-label={`${member.name} X Twitter`}
                  >
                    <IconTwitter size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
