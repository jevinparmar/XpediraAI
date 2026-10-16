import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Smartphone,
  Globe,
  LayoutTemplate,
  Flame,
  Coffee,
  Terminal,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ── The 6 Core Company Technologies ──
const CORE_TECH_STACK = [
  {
    id: 'flutter',
    name: 'Flutter',
    category: 'Cross-Platform Mobile',
    icon: Smartphone,
    color: '#D6A84F',
    summary:
      'High-performance cross-platform mobile apps for iOS and Android with Dart native compilation, delivering buttery-smooth 60/120 FPS experiences from a single codebase.',
    highlights: ['iOS & Android Native', 'Dart AOT Engine', 'Custom UI Kits', 'Fluid 120 FPS'],
    metric: 'Unified Codebase',
    experience: 'Production Ready',
  },
  {
    id: 'mern',
    name: 'MERN Stack',
    category: 'Full-Stack Web Architecture',
    icon: Globe,
    color: '#D6A84F',
    summary:
      'Robust end-to-end web applications powered by MongoDB, Express.js, React, and Node.js. Built for rapid scaling, high concurrency, and reactive modern user interfaces.',
    highlights: ['MongoDB Atlas', 'Express.js APIs', 'React SPAs & SSR', 'Node.js Runtime'],
    metric: 'High Concurrency',
    experience: 'Scalable Systems',
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    category: 'Enterprise Content Management',
    icon: LayoutTemplate,
    color: '#E2B964',
    summary:
      'Custom theme and plugin engineering, headless WordPress decoupled architectures with modern frontends, and enterprise-grade WooCommerce solutions built for speed and security.',
    highlights: ['Custom Themes & Plugins', 'Headless REST / GraphQL', 'WooCommerce Scaling', 'SEO Optimized'],
    metric: 'Enterprise CMS',
    experience: 'Tailored Portals',
  },
  {
    id: 'firebase',
    name: 'Firebase',
    category: 'Cloud Infrastructure & Backend',
    icon: Flame,
    color: '#FFB800',
    summary:
      'Serverless cloud scalability featuring Firestore realtime databases, cloud storage, authentication pipelines, push messaging, and instantaneous edge synchronization.',
    highlights: ['Firestore NoSQL', 'Authentication Pipelines', 'Cloud Functions', 'Realtime Sync'],
    metric: 'Serverless Edge',
    experience: '99.99% Uptime',
  },
  {
    id: 'java',
    name: 'Java',
    category: 'Enterprise Backend & Microservices',
    icon: Coffee,
    color: '#D6A84F',
    summary:
      'Rock-solid backend foundations built on Java and Spring Boot. High-throughput multithreading, robust security enclaves, and enterprise-grade maintainability.',
    highlights: ['Spring Boot Microservices', 'High-Throughput Concurrency', 'JVM Optimization', 'Zero-Trust Security'],
    metric: 'Enterprise Grade',
    experience: 'Mission Critical',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'AI, Data & Intelligent Automation',
    icon: Terminal,
    color: '#D6A84F',
    summary:
      'Advanced artificial intelligence engines, neural network pipelines, process automation, data engineering, and asynchronous high-throughput REST APIs with FastAPI.',
    highlights: ['Machine Learning & AI', 'FastAPI & Asynchronous', 'Automated Workflows', 'Data Science Pipelines'],
    metric: 'Neural Core',
    experience: 'Intelligent Scale',
  },
];

// Marquee Stream 1: Frontline Technologies
const ROW_ONE = [
  { name: 'Flutter 3.x', role: 'Mobile Framework' },
  { name: 'React.js', role: 'Frontend UI' },
  { name: 'Node.js', role: 'Asynchronous Engine' },
  { name: 'MongoDB', role: 'Document Database' },
  { name: 'Express.js', role: 'RESTful Routing' },
  { name: 'Firebase', role: 'Serverless Realtime' },
  { name: 'Java 21 LTS', role: 'Enterprise Core' },
  { name: 'Python 3.12', role: 'AI & Automation' },
];

// Marquee Stream 2: Tooling, Frameworks & Cloud
const ROW_TWO = [
  { name: 'Spring Boot', role: 'Java Microservices' },
  { name: 'Dart Language', role: 'AOT Native Engine' },
  { name: 'WordPress VIP', role: 'Headless CMS' },
  { name: 'FastAPI', role: 'Python Speed Backend' },
  { name: 'Firestore', role: 'NoSQL Cloud DB' },
  { name: 'WooCommerce', role: 'Digital Commerce' },
  { name: 'PyTorch', role: 'Deep Learning' },
  { name: 'Cloud Functions', role: 'Event-Driven Edge' },
];

// ── Secondary 3D Rotating Orbit Element ──
function Secondary3DOrbit() {
  const groupRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state, delta) => {
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.4;
    if (ring2Ref.current) ring2Ref.current.rotation.x += delta * 0.35;
    if (ring3Ref.current) ring3Ref.current.rotation.y += delta * 0.3;
  });

  return (
    <group ref={groupRef}>
      {/* Central Pulsing Node */}
      <mesh>
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshStandardMaterial
          color="#D6A84F"
          emissive="#D6A84F"
          emissiveIntensity={2}
          roughness={0.1}
        />
      </mesh>

      {/* Orbit 1 */}
      <group ref={ring1Ref}>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.1, 0.015, 16, 64]} />
          <meshStandardMaterial color="#D6A84F" emissive="#D6A84F" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[1.1, 0, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#D6A84F" emissiveIntensity={2} />
        </mesh>
      </group>

      {/* Orbit 2 */}
      <group ref={ring2Ref}>
        <mesh rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[1.5, 0.012, 16, 64]} />
          <meshStandardMaterial color="#EDEDED" emissive="#D6A84F" emissiveIntensity={0.4} />
        </mesh>
        <mesh position={[-1.5, 0, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#D6A84F" emissive="#D6A84F" emissiveIntensity={2} />
        </mesh>
      </group>

      {/* Orbit 3 */}
      <group ref={ring3Ref}>
        <mesh rotation={[0, Math.PI / 3, 0]}>
          <torusGeometry args={[1.85, 0.01, 16, 64]} />
          <meshStandardMaterial color="#8A8F8C" transparent opacity={0.5} />
        </mesh>
        <mesh position={[0, 1.85, 0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#D6A84F" emissiveIntensity={1.5} />
        </mesh>
      </group>
    </group>
  );
}

export default function Tech() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.tech-core-card',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.tech-core-grid',
            start: 'top 82%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="tech" ref={containerRef} className="section-padding" style={{ overflow: 'hidden' }}>
      <div className="section-container">
        {/* Header */}
        <div style={{ maxWidth: '780px', marginBottom: '52px' }}>
          <div className="section-badge">
            <span className="section-badge-dot" />
            <span>Our Technology Stack</span>
          </div>

          <h2 className="section-title">
            Built with <span className="text-gradient-green">Trusted Technology</span>
          </h2>

          <p className="section-subtitle">
            Modern tools chosen for performance, security, and long-term maintainability.
          </p>
        </div>

        {/* 6 Core Technology Showcase Grid */}
        <div
          className="tech-core-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '64px',
          }}
        >
          {CORE_TECH_STACK.map((tech) => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.id}
                className="glass-card tech-core-card"
                style={{
                  padding: '34px 28px',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
                  backdropFilter: 'blur(24px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  boxShadow: '0 16px 40px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.22)',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'rgba(214, 168, 79, 0.45)';
                  e.currentTarget.style.boxShadow =
                    '0 24px 50px rgba(0, 0, 0, 0.65), 0 0 30px rgba(214, 168, 79, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)';
                  e.currentTarget.style.boxShadow =
                    '0 16px 40px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.22)';
                }}
              >
                {/* Internal Glow Blob on Hover */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '-40px',
                    width: '140px',
                    height: '140px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(214, 168, 79, 0.15) 0%, transparent 70%)',
                    filter: 'blur(24px)',
                    pointerEvents: 'none',
                  }}
                />

                <div>
                  {/* Top Bar: Icon + Category Badge */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '22px',
                    }}
                  >
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '14px',
                        backgroundColor: 'rgba(214, 168, 79, 0.1)',
                        border: '1px solid rgba(214, 168, 79, 0.3)',
                        backdropFilter: 'blur(12px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--green)',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                      }}
                    >
                      <Icon size={24} />
                    </div>

                    <span
                      style={{
                        fontFamily: 'SFMono-Regular, monospace',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        color: 'var(--green)',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-pill)',
                        background: 'rgba(214, 168, 79, 0.08)',
                        border: '1px solid rgba(214, 168, 79, 0.22)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {tech.metric}
                    </span>
                  </div>

                  {/* Technology Title & Category */}
                  <div style={{ marginBottom: '14px' }}>
                    <h3
                      style={{
                        fontSize: '1.45rem',
                        fontWeight: 700,
                        color: '#EDEDED',
                        marginBottom: '4px',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {tech.name}
                    </h3>
                    <div
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--green-soft)',
                        fontWeight: 500,
                        fontFamily: 'var(--font-heading)',
                      }}
                    >
                      {tech.category}
                    </div>
                  </div>

                  {/* Summary Text */}
                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.62,
                      marginBottom: '22px',
                    }}
                  >
                    {tech.summary}
                  </p>

                  {/* Highlight Feature Tags */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                      marginBottom: '24px',
                    }}
                  >
                    {tech.highlights.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        style={{
                          fontSize: '0.75rem',
                          color: '#EDEDED',
                          background: 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          padding: '3px 10px',
                          borderRadius: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                        }}
                      >
                        <CheckCircle2 size={11} color="var(--green)" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Bottom Status */}
                <div
                  style={{
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'SFMono-Regular, monospace',
                      fontSize: '0.72rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    Status
                  </span>
                  <span
                    style={{
                      fontFamily: 'SFMono-Regular, monospace',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--green)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
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
                    {tech.experience}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Infinite Horizontal Marquee 1 */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          marginBottom: '16px',
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        }}
      >
        <div
          className="marquee-track marquee-left"
          style={{
            display: 'flex',
            gap: '16px',
            width: 'max-content',
          }}
        >
          {[...ROW_ONE, ...ROW_ONE].map((item, idx) => (
            <div
              key={idx}
              className="glass-pill"
              style={{
                padding: '12px 20px',
                borderRadius: 'var(--radius-pill)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                whiteSpace: 'nowrap',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(16px) saturate(160%)',
                WebkitBackdropFilter: 'blur(16px) saturate(160%)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(214, 168, 79, 0.45)';
                e.currentTarget.style.backgroundColor = 'rgba(214, 168, 79, 0.08)';
                e.currentTarget.style.boxShadow =
                  '0 6px 20px rgba(214, 168, 79, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.boxShadow =
                  '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--green)',
                  boxShadow: '0 0 8px var(--green)',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#EDEDED',
                }}
              >
                {item.name}
              </span>
              <span
                style={{
                  fontFamily: 'SFMono-Regular, monospace',
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
                  paddingLeft: '10px',
                }}
              >
                {item.role}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Horizontal Marquee 2 */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          marginBottom: '64px',
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        }}
      >
        <div
          className="marquee-track marquee-right"
          style={{
            display: 'flex',
            gap: '16px',
            width: 'max-content',
          }}
        >
          {[...ROW_TWO, ...ROW_TWO].map((item, idx) => (
            <div
              key={idx}
              className="glass-pill"
              style={{
                padding: '12px 20px',
                borderRadius: 'var(--radius-pill)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                whiteSpace: 'nowrap',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(16px) saturate(160%)',
                WebkitBackdropFilter: 'blur(16px) saturate(160%)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(214, 168, 79, 0.45)';
                e.currentTarget.style.backgroundColor = 'rgba(214, 168, 79, 0.08)';
                e.currentTarget.style.boxShadow =
                  '0 6px 20px rgba(214, 168, 79, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.boxShadow =
                  '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--green-soft)',
                  boxShadow: '0 0 6px var(--green-soft)',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#EDEDED',
                }}
              >
                {item.name}
              </span>
              <span
                style={{
                  fontFamily: 'SFMono-Regular, monospace',
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
                  paddingLeft: '10px',
                }}
              >
                {item.role}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Engineering Standards & 3D Interactive Ecosystem Panel */}
      <div className="section-container">
        <div
          className="glass-panel tech-bottom-banner"
          style={{
            borderRadius: '24px',
            padding: '40px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 100%)',
            backdropFilter: 'blur(28px) saturate(180%)',
            WebkitBackdropFilter: 'blur(28px) saturate(180%)',
            border: '1px solid rgba(214, 168, 79, 0.25)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.25)',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '32px',
            alignItems: 'center',
          }}
        >
          {/* Left Text / Guarantee */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'SFMono-Regular, monospace',
                fontSize: '0.75rem',
                color: 'var(--green)',
                background: 'rgba(214, 168, 79, 0.08)',
                padding: '4px 12px',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid rgba(214, 168, 79, 0.25)',
                marginBottom: '18px',
              }}
            >
              <Sparkles size={13} />
              <span>PRODUCTION EXCELLENCE</span>
            </div>

            <h3
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 700,
                color: '#EDEDED',
                marginBottom: '14px',
                lineHeight: 1.2,
              }}
            >
              Engineered for <span className="text-gradient-green">Enterprise Resilience</span>
            </h3>

            <p
              style={{
                fontSize: '0.95rem',
                color: 'var(--text-muted)',
                lineHeight: 1.65,
                marginBottom: '24px',
                maxWidth: '600px',
              }}
            >
              From agile mobile apps in Flutter to high-concurrency MERN architectures, custom WordPress portals, scalable Firebase backends, enterprise Java microservices, and intelligent Python automations — we select and tailor each tool to solve your exact challenges with zero technical debt.
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--green)',
                    boxShadow: '0 0 8px var(--green)',
                  }}
                />
                <span style={{ fontSize: '0.875rem', color: '#EDEDED', fontWeight: 500 }}>
                  100% CI/CD Automated
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--green)',
                    boxShadow: '0 0 8px var(--green)',
                  }}
                />
                <span style={{ fontSize: '0.875rem', color: '#EDEDED', fontWeight: 500 }}>
                  Air-Gapped & Secure
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--green)',
                    boxShadow: '0 0 8px var(--green)',
                  }}
                />
                <span style={{ fontSize: '0.875rem', color: '#EDEDED', fontWeight: 500 }}>
                  24/7 Monitoring & Support
                </span>
              </div>
            </div>
          </div>

          {/* Right 3D Orbit Display */}
          <div
            style={{
              position: 'relative',
              height: '240px',
              borderRadius: '16px',
              overflow: 'hidden',
              background: 'rgba(17, 24, 39, 0.45)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <Canvas
              camera={{ position: [0, 0, 3.8], fov: 45 }}
              dpr={[1, 2]}
              style={{ width: '100%', height: '100%' }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[4, 4, 3]} intensity={1.5} />
              <pointLight position={[-3, -3, -2]} color="#D6A84F" intensity={2} />
              <Float speed={2} rotationIntensity={0.6} floatIntensity={0.5}>
                <Secondary3DOrbit />
              </Float>
            </Canvas>
          </div>
        </div>
      </div>

      <style>{`
        .marquee-left {
          animation: marqueeLeft 36s linear infinite;
        }
        .marquee-right {
          animation: marqueeRight 36s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @media (min-width: 980px) {
          .tech-bottom-banner {
            grid-template-columns: 1.4fr 0.8fr !important;
          }
        }
      `}</style>
    </section>
  );
}
