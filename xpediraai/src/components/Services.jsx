import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  Bot,
  BrainCircuit,
  Eye,
  Database,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SERVICES_DATA = [
  {
    id: '01',
    icon: Bot,
    title: 'Autonomous Agents & Swarms',
    category: 'Agentic Intelligence',
    description:
      'Goal-directed multi-agent architectures featuring self-correcting reasoning loops, persistent episodic memory, and safe deterministic tool-calling.',
    tags: ['Multi-Agent Swarms', 'LangGraph', 'Self-Healing Loops', 'Tool Calling'],
  },
  {
    id: '02',
    icon: BrainCircuit,
    title: 'Custom Foundation LLMs',
    category: 'Model Architecture',
    description:
      'Domain-adapted large models fine-tuned with parameter-efficient LoRA, Direct Preference Optimization (DPO), and proprietary synthetic datasets.',
    tags: ['QLoRA / LoRA', 'DPO Alignment', 'vLLM Serving', 'Custom Tokenizers'],
  },
  {
    id: '03',
    icon: Eye,
    title: 'High-Throughput Computer Vision',
    category: 'Perception Systems',
    description:
      'Edge-accelerated spatial perception, zero-shot segmentation, multi-camera fusion, and microsecond visual anomaly detection for physical operations.',
    tags: ['Spatial Perception', 'SAM 2', 'YOLOv11', 'TensorRT-LLM'],
  },
  {
    id: '04',
    icon: Database,
    title: 'Enterprise Knowledge & GraphRAG',
    category: 'Retrieval Engines',
    description:
      'Sub-second hybrid sparse-dense vector retrieval powered by graph-augmented contextual recall and zero-hallucination verification barriers.',
    tags: ['GraphRAG', 'Vector DBs', 'Semantic Cache', 'Context Engines'],
  },
  {
    id: '05',
    icon: TrendingUp,
    title: 'Predictive Intelligence & Causal ML',
    category: 'Decision Platforms',
    description:
      'High-frequency time-series forecasting, counterfactual modeling, and deep reinforcement learning engines for complex market and industrial dynamics.',
    tags: ['Causal Inference', 'Time-Series MoE', 'Reinforcement Learning', 'Risk Simulators'],
  },
  {
    id: '06',
    icon: ShieldCheck,
    title: 'Zero-Trust AI Governance & Defense',
    category: 'Security & Alignment',
    description:
      'Adversarial red-teaming pipelines, real-time prompt-injection firewalls, cryptographic audit trails, and strict enterprise compliance guardrails.',
    tags: ['Air-Gapped Ops', 'Prompt Defense', 'SOC2 / ISO 27001', 'Guardrails'],
  },
];

function ServiceCard({ item }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const IconComponent = item.icon;

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate 3D tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;

    // Update glow spotlight position
    if (glow) {
      glow.style.opacity = '1';
      glow.style.transform = `translate(${x - 120}px, ${y - 120}px)`;
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card) return;

    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    if (glow) {
      glow.style.opacity = '0';
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-card service-card"
      style={{
        padding: '38px 32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        position: 'relative',
        borderRadius: 'var(--radius-xl)',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.14)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.55), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.3)',
        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Dynamic Cursor Spotlight Glow Refracting in Glass */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(214, 168, 79, 0.20) 0%, rgba(0, 229, 255, 0.08) 40%, transparent 70%)',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          zIndex: 1,
        }}
      />

      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Top Bar: Icon + ID */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '26px',
          }}
        >
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--green)',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
            }}
          >
            <IconComponent size={24} />
          </div>

          <span
            style={{
              fontFamily: 'SFMono-Regular, monospace',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--text-dim)',
              letterSpacing: '0.08em',
              background: 'rgba(255, 255, 255, 0.04)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            {item.id}
          </span>
        </div>

        {/* Category Pill */}
        <div
          style={{
            display: 'inline-block',
            fontSize: '0.72rem',
            fontFamily: 'var(--font-heading)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--green)',
            fontWeight: 700,
            marginBottom: '12px',
            padding: '4px 12px',
            borderRadius: 'var(--radius-pill)',
            background: 'rgba(214, 168, 79, 0.08)',
            border: '1px solid rgba(214, 168, 79, 0.25)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          }}
        >
          {item.category}
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: '1.4rem',
            fontWeight: 700,
            color: '#EDEDED',
            marginBottom: '14px',
            lineHeight: 1.25,
          }}
        >
          {item.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: '0.925rem',
            color: 'var(--text-muted)',
            lineHeight: 1.65,
            marginBottom: '26px',
          }}
        >
          {item.description}
        </p>
      </div>

      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Tags */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '24px',
          }}
        >
          {item.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '0.74rem',
                fontFamily: 'SFMono-Regular, monospace',
                padding: '5px 11px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.10)',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                color: 'var(--text-muted)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom Action Link */}
        <a
          href="#contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            color: '#EDEDED',
            textDecoration: 'none',
            transition: 'color 0.2s ease, gap 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--green)';
            e.currentTarget.style.gap = '10px';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#EDEDED';
            e.currentTarget.style.gap = '6px';
          }}
        >
          <span>Deploy Capability</span>
          <ArrowRight size={15} />
        </a>
      </div>
    </div>
  );
}

export default function Services() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(['.section-badge', '.section-title', '.section-subtitle', '.service-card'], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      // Staggered header reveal
      gsap.fromTo(
        '.section-badge, .section-title, .section-subtitle',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 82%',
          },
        }
      );

      // Staggered 3D reveal of service cards on scroll
      gsap.fromTo(
        '.service-card',
        { y: 55, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.08,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section id="services" ref={containerRef} className="section-padding">
      <div className="section-container">
        {/* Header */}
        <div style={{ maxWidth: '680px', marginBottom: '64px' }}>
          <div className="section-badge">
            <span className="section-badge-dot" />
            <span>What We Do</span>
          </div>

          <h2 className="section-title">
            Engineered For <span className="text-gradient-green">Autonomous Impact</span>
          </h2>

          <p className="section-subtitle">
            From foundational mathematical design to low-latency edge deployment, our
            systems are purpose-built to solve high-stakes enterprise bottlenecks.
          </p>
        </div>

        {/* 6 Glass Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {SERVICES_DATA.map((item, index) => (
            <ServiceCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
