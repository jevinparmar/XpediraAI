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
  const scrollTriggerRef = useRef(null);
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

      // 2. Pinned Scroll-Driven Sequence (Desktop / Large Displays)
      const mm = gsap.matchMedia();

      mm.add('(min-width: 900px)', () => {
        if (!pinnedSectionRef.current) return;

        // Create pin that locks the section in viewport
        // Scroll distance: 2.6x screen height gives comfortable scrubbing room for 4 steps
        const st = ScrollTrigger.create({
          trigger: pinnedSectionRef.current,
          start: 'top 80px',
          end: () => `+=${window.innerHeight * 2.6}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.3,
          onUpdate: (self) => {
            // 4 discrete steps evenly mapped across the pinned scroll:
            // [0.00..0.25) -> Step 0 (01)
            // [0.25..0.50) -> Step 1 (02)
            // [0.50..0.75) -> Step 2 (03)
            // [0.75..1.00] -> Step 3 (04)
            const calculatedStep = Math.min(
              FEATURES.length - 1,
              Math.max(0, Math.floor(self.progress * FEATURES.length))
            );
            setActiveStep((prev) => (prev !== calculatedStep ? calculatedStep : prev));
          },
        });

        scrollTriggerRef.current = st;

        return () => {
          st.kill();
          scrollTriggerRef.current = null;
        };
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Handle clicking a specific tab to smoothly scroll to that step in the pinned sequence
  const handleTabClick = (idx) => {
    setActiveStep(idx);
    if (scrollTriggerRef.current) {
      const st = scrollTriggerRef.current;
      const targetRatio = (idx + 0.5) / FEATURES.length;
      const targetScroll = st.start + targetRatio * (st.end - st.start);
      if (window.lenis) {
        window.lenis.scrollTo(targetScroll, { duration: 0.9 });
      } else {
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    }
  };

  const currentFeature = FEATURES[activeStep];
  const IconComponent = currentFeature.icon;

  return (
    <section id="why" ref={containerRef} className="section-padding" style={{ paddingBottom: '60px' }}>
      <div className="section-container">
        {/* Section Header */}
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
            marginBottom: '80px',
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
                boxShadow:
                  '0 20px 50px rgba(0, 0, 0, 0.55), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.3)',
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
                    textShadow: '0 0 24px rgba(214, 168, 79, 0.35)',
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

      {/* Pinned Feature Swap Showcase Section (Scroll Locks Here and Cycles 1 -> 2 -> 3 -> 4) */}
      <div
        ref={pinnedSectionRef}
        className="why-pinned-container"
        style={{
          width: '100%',
          minHeight: 'calc(100vh - 80px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '24px 0',
        }}
      >
        <div className="section-container" style={{ width: '100%' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '44px',
              alignItems: 'center',
            }}
            className="why-pinned-grid"
          >
            {/* Left Column: Sticky Title & Step Navigation */}
            <div>
              {/* Dynamic Tagline Title with smooth fade-in */}
              <div
                key={`tagline-${activeStep}`}
                style={{
                  minHeight: '84px',
                  display: 'flex',
                  alignItems: 'center',
                  animation: 'whyTitleIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                }}
              >
                <h3
                  style={{
                    fontSize: 'clamp(1.85rem, 3.4vw, 2.75rem)',
                    fontWeight: 700,
                    color: '#EDEDED',
                    lineHeight: 1.18,
                    margin: 0,
                  }}
                >
                  {currentFeature.tagline}
                </h3>
              </div>

              {/* 4 Interactive Feature Selector Tabs */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginTop: '32px',
                }}
              >
                {FEATURES.map((feat, idx) => {
                  const isCurrent = idx === activeStep;
                  return (
                    <div
                      key={feat.id}
                      onClick={() => handleTabClick(idx)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Select feature ${feat.title}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleTabClick(idx);
                        }
                      }}
                      style={{
                        padding: '14px 20px',
                        borderRadius: 'var(--radius-md)',
                        background: isCurrent
                          ? 'linear-gradient(135deg, rgba(214, 168, 79, 0.16) 0%, rgba(214, 168, 79, 0.05) 100%)'
                          : 'rgba(255, 255, 255, 0.035)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: isCurrent
                          ? '1px solid rgba(214, 168, 79, 0.45)'
                          : '1px solid rgba(255, 255, 255, 0.08)',
                        boxShadow: isCurrent
                          ? '0 8px 24px rgba(214, 168, 79, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.25)'
                          : 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!isCurrent) {
                          e.currentTarget.style.borderColor = 'rgba(214, 168, 79, 0.3)';
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isCurrent) {
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.035)';
                        }
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

                      {/* Glowing Step Indicator Dot */}
                      {isCurrent ? (
                        <span
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--green)',
                            boxShadow: '0 0 10px var(--green)',
                            animation: 'pulseDot 2s ease-in-out infinite',
                          }}
                        />
                      ) : (
                        <span
                          style={{
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
                  padding: 'clamp(32px, 4vw, 44px)',
                  borderRadius: 'var(--radius-xl)',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.03) 100%)',
                  backdropFilter: 'blur(32px) saturate(200%)',
                  WebkitBackdropFilter: 'blur(32px) saturate(200%)',
                  border: '1px solid rgba(214, 168, 79, 0.35)',
                  boxShadow:
                    '0 24px 60px rgba(0, 0, 0, 0.65), 0 0 32px rgba(214, 168, 79, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: '440px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                {/* Background Ambient Glow */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-60px',
                    right: '-60px',
                    width: '220px',
                    height: '220px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(214, 168, 79, 0.22) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Animated Feature Content Body (Keyed to step for fluid transitions) */}
                <div
                  key={`content-${activeStep}`}
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    animation: 'whyCardIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '22px' }}>
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '16px',
                        backgroundColor: 'rgba(214, 168, 79, 0.12)',
                        border: '1px solid rgba(214, 168, 79, 0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--green)',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                      }}
                    >
                      <IconComponent size={28} />
                    </div>

                    <div>
                      <span
                        style={{
                          fontFamily: 'SFMono-Regular, monospace',
                          fontSize: '0.75rem',
                          color: 'var(--green)',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                        }}
                      >
                        FEATURE {currentFeature.id}
                      </span>
                      <h4
                        style={{
                          fontSize: 'clamp(1.35rem, 2.5vw, 1.65rem)',
                          fontWeight: 700,
                          color: '#EDEDED',
                          marginTop: '2px',
                        }}
                      >
                        {currentFeature.title}
                      </h4>
                    </div>
                  </div>

                  <p
                    style={{
                      fontSize: '1.025rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.7,
                      marginBottom: '32px',
                    }}
                  >
                    {currentFeature.desc}
                  </p>

                  {/* Highlights List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {currentFeature.highlights.map((item, idx) => (
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
      </div>

      <style>{`
        @keyframes whyCardIn {
          0% {
            opacity: 0.25;
            transform: translateY(14px) scale(0.985);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes whyTitleIn {
          0% {
            opacity: 0.25;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (min-width: 900px) {
          .why-pinned-grid {
            grid-template-columns: 1fr 1.15fr !important;
          }
        }
      `}</style>
    </section>
  );
}
