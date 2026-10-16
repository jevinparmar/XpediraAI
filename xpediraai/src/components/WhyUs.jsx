import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, Zap, Lock, RefreshCw, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  {
    target: 99.9,
    decimals: 1,
    prefix: '',
    suffix: '%',
    label: 'Model Accuracy',
    desc: 'Deterministic outputs backed by formal verification',
  },
  {
    target: 10,
    decimals: 0,
    prefix: '',
    suffix: 'x',
    label: 'Faster Delivery',
    desc: 'From initial design to production cluster deployment',
  },
  {
    target: 4.5,
    decimals: 1,
    prefix: '',
    suffix: 'M+',
    label: 'Daily Decisions',
    desc: 'Autonomous transactions processed with zero downtime',
  },
  {
    target: 8,
    decimals: 0,
    prefix: '< ',
    suffix: 'ms',
    label: 'Inference Latency',
    desc: 'Median time-to-first-token on optimized silicon',
  },
];

const FEATURES = [
  {
    id: '01',
    icon: Zap,
    title: 'Production-First Rigor',
    tagline: 'Beyond Prototypes: Production-Grade Engineering',
    desc: 'We never stop at proof-of-concept. Every AI workflow is compiled with high-performance runtime engines, load-tested against adversarial spikes, and hardened for mission-critical reliability.',
    highlights: [
      'Sub-millisecond token generation pipelines',
      'Continuous automated load-balancing across multi-GPU clusters',
      'Graceful degradation fallbacks and automatic circuit breakers',
    ],
  },
  {
    id: '02',
    icon: Lock,
    title: 'Data Sovereignty & Zero Leakage',
    tagline: 'Your IP Remains Untouchable',
    desc: 'Your proprietary datasets, customer records, and training weights never leave your sovereign control. We build air-gapped, zero-trust infrastructure that adheres to the strictest global regulatory standards.',
    highlights: [
      'Zero-data-retention agreements and air-gapped deployment',
      'Confidential GPU computing with cryptographic memory encryption',
      'Fully compliant with SOC2 Type II, HIPAA, and GDPR',
    ],
  },
  {
    id: '03',
    icon: RefreshCw,
    title: 'Continuous Self-Improvement Loops',
    tagline: 'Models That Grow Smarter In Real-Time',
    desc: 'Deploy static models and watch them decay; deploy Xpedira systems and watch them compound. Our autonomous feedback engines detect distribution drift and continuously retrain edge weights.',
    highlights: [
      'Automated semantic drift and embedding distortion detection',
      'Active learning pipelines prioritizing high-uncertainty data samples',
      'Shadow-model deployment and automatic zero-downtime hot swapping',
    ],
  },
  {
    id: '04',
    icon: Users,
    title: 'Dedicated Senior Research Squad',
    tagline: 'Direct Access to Frontier Scientists',
    desc: 'No junior intermediaries. You work directly with PhD-level AI scientists, distributed systems engineers, and kernel compilers with deep roots across frontier research institutions.',
    highlights: [
      'Direct Slack/Discord access to senior lead architects',
      'Weekly architectural reviews and throughput profiling audits',
      'Custom bespoke kernel development for proprietary hardware',
    ],
  },
];

export default function WhyUs() {
  const containerRef = useRef(null);
  const pinnedSectionRef = useRef(null);
  const statNumbersRef = useRef([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Counter animations for stats
      statNumbersRef.current.forEach((el, index) => {
        if (!el) return;
        const stat = STATS[index];
        const counter = { val: 0 };

        gsap.to(counter, {
          val: stat.target,
          duration: 2.0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
          onUpdate: () => {
            el.innerText = `${stat.prefix}${counter.val.toFixed(stat.decimals)}${stat.suffix}`;
          },
        });
      });

      // 2. Pinned ScrollTrigger section where features swap on scroll
      const featureCards = gsap.utils.toArray('.why-feature-step');
      
      if (featureCards.length > 0 && window.innerWidth >= 900) {
        ScrollTrigger.create({
          trigger: pinnedSectionRef.current,
          start: 'top top',
          end: `+=${featureCards.length * 100}%`,
          pin: true,
          scrub: 0.5,
          onUpdate: (self) => {
            const step = Math.min(
              featureCards.length - 1,
              Math.floor(self.progress * featureCards.length)
            );
            setActiveStep(step);
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="why" ref={containerRef} className="section-padding" style={{ paddingBottom: '80px' }}>
      <div className="section-container">
        {/* Header */}
        <div style={{ maxWidth: '680px', marginBottom: '56px' }}>
          <div className="section-badge">
            <span className="section-badge-dot" />
            <span>Why Choose Us</span>
          </div>

          <h2 className="section-title">
            Engineered For The <span className="text-gradient-green">Demands of Scale</span>
          </h2>

          <p className="section-subtitle">
            We don't build toys or fragile wrappers. We construct high-durability,
            enterprise-grade AI foundations designed to power the next generation of industry.
          </p>
        </div>

        {/* Big Stat Blocks with Count-Up */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            marginBottom: '100px',
          }}
        >
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '38px 30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 'var(--radius-xl)',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.55), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.3)',
              }}
            >
              <div>
                <div
                  ref={(el) => (statNumbersRef.current[idx] = el)}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(2.5rem, 4vw, 3.4rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    color: 'var(--green)',
                    textShadow: '0 0 24px rgba(0, 255, 136, 0.35)',
                    lineHeight: 1.1,
                    marginBottom: '12px',
                  }}
                >
                  {stat.prefix}0{stat.suffix}
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.15rem',
                    fontWeight: 600,
                    color: '#EDEDED',
                    marginBottom: '8px',
                  }}
                >
                  {stat.label}
                </div>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pinned Feature Swap Showcase Section */}
      <div
        ref={pinnedSectionRef}
        className="why-pinned-container"
        style={{
          width: '100%',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <div className="section-container" style={{ width: '100%' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '48px',
              alignItems: 'center',
            }}
            className="why-pinned-grid"
          >
            {/* Left Column: Sticky Title & Step Navigation */}
            <div>
              <div
                style={{
                  fontFamily: 'SFMono-Regular, monospace',
                  fontSize: '0.8rem',
                  color: 'var(--green)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>ARCHITECTURE SHOWCASE</span>
                <span style={{ color: 'var(--text-dim)' }}>//</span>
                <span>0{activeStep + 1} OF 0{FEATURES.length}</span>
              </div>

              <h3
                style={{
                  fontSize: 'clamp(2rem, 3.8vw, 3rem)',
                  fontWeight: 700,
                  color: '#EDEDED',
                  lineHeight: 1.15,
                  marginBottom: '28px',
                }}
              >
                {FEATURES[activeStep].tagline}
              </h3>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginTop: '36px',
                }}
              >
                {FEATURES.map((feat, idx) => {
                  const isCurrent = idx === activeStep;
                  return (
                    <div
                      key={feat.id}
                      onClick={() => setActiveStep(idx)}
                      style={{
                        padding: '14px 20px',
                        borderRadius: 'var(--radius-md)',
                        background: isCurrent
                          ? 'linear-gradient(135deg, rgba(0, 255, 136, 0.14) 0%, rgba(0, 255, 136, 0.04) 100%)'
                          : 'rgba(255, 255, 255, 0.04)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: isCurrent
                          ? '1px solid rgba(0, 255, 136, 0.4)'
                          : '1px solid rgba(255, 255, 255, 0.08)',
                        boxShadow: isCurrent
                          ? '0 8px 24px rgba(0, 255, 136, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.25)'
                          : 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <span
                          style={{
                            fontFamily: 'SFMono-Regular, monospace',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            color: isCurrent ? 'var(--green)' : 'var(--text-dim)',
                          }}
                        >
                          {feat.id}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '0.95rem',
                            fontWeight: isCurrent ? 600 : 500,
                            color: isCurrent ? '#EDEDED' : 'var(--text-muted)',
                          }}
                        >
                          {feat.title}
                        </span>
                      </div>
                      {isCurrent && (
                        <span
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--green)',
                            boxShadow: '0 0 8px var(--green)',
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Active Feature Showcase Glass Card */}
            <div className="why-active-feature-card">
              <div
                className="glass-card"
                style={{
                  padding: '44px 36px',
                  borderRadius: 'var(--radius-xl)',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.03) 100%)',
                  backdropFilter: 'blur(32px) saturate(200%)',
                  WebkitBackdropFilter: 'blur(32px) saturate(200%)',
                  border: '1px solid rgba(0, 255, 136, 0.3)',
                  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.65), 0 0 32px rgba(0, 255, 136, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Background Ambient Glow */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-60px',
                    right: '-60px',
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(0, 255, 136, 0.2) 0%, transparent 70%)',
                    filter: 'blur(35px)',
                    pointerEvents: 'none',
                  }}
                />

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '16px',
                      backgroundColor: 'rgba(0, 255, 136, 0.1)',
                      border: '1px solid rgba(0, 255, 136, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--green)',
                    }}
                  >
                    {React.createElement(FEATURES[activeStep].icon, { size: 28 })}
                  </div>

                  <div>
                    <span
                      style={{
                        fontFamily: 'SFMono-Regular, monospace',
                        fontSize: '0.75rem',
                        color: 'var(--green)',
                        letterSpacing: '0.08em',
                      }}
                    >
                      FEATURE {FEATURES[activeStep].id}
                    </span>
                    <h4
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: '#EDEDED',
                      }}
                    >
                      {FEATURES[activeStep].title}
                    </h4>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: '1.05rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.7,
                    marginBottom: '32px',
                  }}
                >
                  {FEATURES[activeStep].desc}
                </p>

                {/* Highlights List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {FEATURES[activeStep].highlights.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                      }}
                    >
                      <CheckCircle2
                        size={20}
                        color="var(--green)"
                        style={{ flexShrink: 0, marginTop: '2px' }}
                      />
                      <span style={{ fontSize: '0.925rem', color: '#EDEDED', lineHeight: 1.5 }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .why-pinned-grid {
            grid-template-columns: 1fr 1.1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
