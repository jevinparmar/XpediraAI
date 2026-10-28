import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { IconLinkedin, IconGithub, IconTwitter } from './Icons';
import { Award, Cpu } from 'lucide-react';
import {
  useHeadingReveal,
  useParagraphHighlight,
  scrambleText,
} from '../hooks/useAdvancedAnimations';

gsap.registerPlugin(ScrollTrigger);

const TEAM_MEMBERS = [
  {
    name: 'Akshay Ranpariya',
    role: 'Chief Executive Officer',
    subRole: 'Data Scientist & AI Researcher',
    image: '/team/ceo.jpg',
    bio: 'Data Scientist and AI Researcher overseeing supercomputer facility operations with published research in deep learning, computer vision, and NLP. Indian patent grantee for assistive AI navigation, leading Xpedira AI in architecting autonomous intelligence and enterprise systems.',
    focus: 'Founder & Chief Executive Officer',
    badges: [
      { label: 'Indian Patent Grantee', type: 'patent' },
      { label: 'Supercomputer Facility In-Charge', type: 'hpc' },
    ],
    skills: [
      'Python',
      'PyTorch',
      'Generative AI',
      'Deep Learning',
      'Computer Vision',
      'NLP',
      'Data Science',
      'HPC / Supercomputing',
      'Robotics & IoT',
    ],
    social: { linkedin: '#', github: '#', twitter: '#' },
  },
];

export default function Team() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const badgeTextRef = useRef(null);
  const portraitWrapRef = useRef(null);
  const imageRef = useRef(null);

  // Advanced heading blur-to-sharp reveal
  useHeadingReveal(headingRef, { blur: 12, stagger: 0.02, start: 'top 82%' });

  // Paragraph word-by-word scrub highlight
  useParagraphHighlight(subtitleRef, { start: 'top 85%', end: 'bottom 65%' });

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(['.section-badge', '.team-member-card'], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      // Initial badge scramble
      if (badgeTextRef.current) {
        scrambleText(badgeTextRef.current, 'Leadership', 0.8);
      }

      // Badge entrance
      gsap.fromTo(
        '.section-badge',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
        }
      );

      // CEO Card reveal
      gsap.fromTo(
        '.team-member-card',
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
        }
      );

      // Cinematic Image Reveal: clipPath inset wipe + inner scale 1.25 -> 1.0 + subtle parallax
      if (portraitWrapRef.current && imageRef.current) {
        gsap.fromTo(
          portraitWrapRef.current,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: 'expo.inOut',
            scrollTrigger: {
              trigger: portraitWrapRef.current,
              start: 'top 80%',
            },
          }
        );

        gsap.fromTo(
          imageRef.current,
          { scale: 1.25 },
          {
            scale: 1.0,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: portraitWrapRef.current,
              start: 'top 80%',
            },
          }
        );

        // Gentle parallax scrub on the portrait as user glides
        gsap.to(imageRef.current, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: portraitWrapRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.0,
          },
        });
      }
    },
    { scope: containerRef }
  );

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
          <div
            className="section-badge"
            onMouseEnter={() => {
              if (badgeTextRef.current) {
                scrambleText(badgeTextRef.current, 'Leadership', 0.5);
              }
            }}
          >
            <span className="section-badge-dot" />
            <span ref={badgeTextRef}>Leadership</span>
          </div>

          <h2 ref={headingRef} className="section-title">
            Architect of <span className="text-gradient-green">Applied Intelligence</span>
          </h2>

          <p ref={subtitleRef} className="section-subtitle" style={{ margin: '0 auto' }}>
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
              className="glass-card team-member-card team-card-side-by-side"
              style={{
                display: 'flex',
                flexDirection: 'row',
                overflow: 'hidden',
                width: '100%',
                maxWidth: '860px',
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
              {/* Portrait Container with Cinematic Reveal */}
              <div
                ref={portraitWrapRef}
                className="team-portrait-container"
                style={{
                  position: 'relative',
                  width: '320px',
                  minWidth: '280px',
                  flexShrink: 0,
                  overflow: 'hidden',
                  backgroundColor: '#111312',
                }}
              >
                <img
                  ref={imageRef}
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
                    left: '14px',
                    right: '14px',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-pill)',
                    background: 'rgba(17, 24, 39, 0.75)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(214, 168, 79, 0.3)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'SFMono-Regular, monospace',
                      fontSize: '0.68rem',
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
                className="team-info-container"
                style={{
                  padding: '32px 34px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flex: 1,
                }}
              >
                <div>
                  {/* Executive Accomplishment Badges */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                      marginBottom: '12px',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '3px 10px',
                        borderRadius: 'var(--radius-pill)',
                        background: 'rgba(214, 168, 79, 0.12)',
                        border: '1px solid rgba(214, 168, 79, 0.35)',
                        color: 'var(--gold)',
                        fontSize: '0.68rem',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 700,
                        letterSpacing: '0.03em',
                      }}
                    >
                      <Award size={12} />
                      <span>Indian Patent Grantee</span>
                    </span>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '3px 10px',
                        borderRadius: 'var(--radius-pill)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#E5E7EB',
                        fontSize: '0.68rem',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 600,
                      }}
                    >
                      <Cpu size={12} color="var(--green)" />
                      <span>Supercomputer Facility In-Charge</span>
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.45rem',
                      fontWeight: 700,
                      color: '#EDEDED',
                      marginBottom: '4px',
                      fontFamily: 'var(--font-heading)',
                    }}
                  >
                    {member.name}
                  </h3>

                  <div
                    style={{
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--green-soft)',
                      fontWeight: 600,
                      marginBottom: '14px',
                    }}
                  >
                    {member.role} • <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{member.subRole}</span>
                  </div>

                  <p
                    style={{
                      fontSize: '0.84rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.6,
                      marginBottom: '18px',
                    }}
                  >
                    {member.bio}
                  </p>

                  {/* Core Technical Expertise Header */}
                  <div
                    style={{
                      fontSize: '0.70rem',
                      fontFamily: 'var(--font-heading)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--gold)',
                      fontWeight: 700,
                      marginBottom: '8px',
                    }}
                  >
                    Core Technical Expertise
                  </div>

                  {/* Technical Skills Pills */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '5px',
                      marginBottom: '20px',
                    }}
                  >
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          fontSize: '0.66rem',
                          fontFamily: 'SFMono-Regular, monospace',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#E5E7EB',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
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
