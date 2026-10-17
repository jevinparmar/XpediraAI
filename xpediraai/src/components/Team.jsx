import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IconLinkedin, IconGithub, IconTwitter } from './Icons';

gsap.registerPlugin(ScrollTrigger);

const TEAM_MEMBERS = [
  {
    name: 'Akshay Ranpariya',
    role: 'Chief Executive Officer',
    image: '/team/ceo.jpg',
    bio: 'Visionary founder and executive leading Xpedira AI in architecting autonomous agents, enterprise intelligence systems, and mission-critical cloud pipelines.',
    focus: 'Founder & Chief Executive Officer',
    social: { linkedin: '#', github: '#', twitter: '#' },
  },
];

export default function Team() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        '#team .section-badge, #team .section-title, #team .section-subtitle',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#team',
            start: 'top 80%',
          },
        }
      );

      // CEO Card reveal
      gsap.fromTo(
        '.team-member-card',
        { y: 55, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.95,
          ease: 'back.out(1.15)',
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
        {/* Header (Centered) */}
        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto 56px auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className="section-badge">
            <span className="section-badge-dot" />
            <span>Leadership</span>
          </div>

          <h2 className="section-title">
            Architect of <span className="text-gradient-green">Applied Intelligence</span>
          </h2>

          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Visionary leadership driving Xpedira AI's mission to engineer high-performance autonomous agents,
            enterprise infrastructure, and next-generation AI systems.
          </p>
        </div>

        {/* CEO Card (Exact Original Card Design Centered) */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
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
                width: '100%',
                maxWidth: '380px',
                borderRadius: 'var(--radius-xl)',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.55), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)',
                transition: 'all 0.4s var(--ease-out-expo)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(214, 168, 79, 0.45)';
                e.currentTarget.style.boxShadow =
                  '0 24px 60px rgba(0, 0, 0, 0.65), 0 0 32px rgba(214, 168, 79, 0.16), inset 0 1px 1px 0 rgba(255, 255, 255, 0.35)';
                const img = e.currentTarget.querySelector('.team-avatar-img');
                if (img) {
                  img.style.filter = 'grayscale(0%) brightness(1.05)';
                  img.style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)';
                e.currentTarget.style.boxShadow =
                  '0 20px 50px rgba(0, 0, 0, 0.55), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)';
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
                    objectPosition: 'center 15%',
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
                    background:
                      'linear-gradient(to top, rgba(17, 24, 39, 0.9) 0%, rgba(17, 24, 39, 0.1) 50%, transparent 100%)',
                    pointerEvents: 'none',
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
                    background: 'rgba(17, 24, 39, 0.65)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(214, 168, 79, 0.3)',
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
                      e.currentTarget.style.borderColor = 'rgba(214, 168, 79, 0.4)';
                      e.currentTarget.style.background = 'rgba(214, 168, 79, 0.08)';
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
                      e.currentTarget.style.borderColor = 'rgba(214, 168, 79, 0.4)';
                      e.currentTarget.style.background = 'rgba(214, 168, 79, 0.08)';
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
                      e.currentTarget.style.borderColor = 'rgba(214, 168, 79, 0.4)';
                      e.currentTarget.style.background = 'rgba(214, 168, 79, 0.08)';
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
