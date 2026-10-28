import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import emailjs from '@emailjs/browser';
import MagneticButton from './MagneticButton';
import {
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  Loader2,
  Copy,
  Check,
  AlertCircle,
} from 'lucide-react';

import {
  useHeadingReveal,
  useParagraphHighlight,
  scrambleText,
} from '../hooks/useAdvancedAnimations';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const badgeTextRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    service: 'Autonomous Agents & Swarms',
    message: '',
  });

  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('intelligence@xpedira.ai');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading');
    setErrorMessage('');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.warn('EmailJS keys are missing in .env');
      setFormStatus('error');
      setErrorMessage(
        'EmailJS configuration missing. Please add your VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in .env.'
      );
      return;
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      organization: formData.organization || 'Not specified',
      service: formData.service,
      message: formData.message,
      to_name: 'XpediraAI Leadership',
      reply_to: formData.email,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, {
        publicKey: publicKey,
      });

      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        organization: '',
        service: 'Autonomous Agents & Swarms',
        message: '',
      });

      setTimeout(() => {
        setFormStatus('idle');
      }, 6000);
    } catch (err) {
      console.error('EmailJS Send Error:', err);
      setFormStatus('error');
      setErrorMessage(
        err?.text || err?.message || 'Transmission failed. Please check network connection or verify your EmailJS keys.'
      );
    }
  };

  // Advanced heading blur-to-sharp reveal
  useHeadingReveal(headingRef, { blur: 12, stagger: 0.02, start: 'top 82%' });

  // Paragraph word-by-word scrub highlight
  useParagraphHighlight(subtitleRef, { start: 'top 85%', end: 'bottom 65%' });

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(['.section-badge', '.contact-fade'], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      // Initial badge scramble
      if (badgeTextRef.current) {
        scrambleText(badgeTextRef.current, "Let's Build Together", 0.8);
      }

      // Badge entrance
      gsap.fromTo(
        '.section-badge',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
        }
      );

      // Glass cards staggered entrance
      gsap.fromTo(
        '.contact-fade',
        { y: 50, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.12,
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
    <section id="contact" ref={containerRef} className="section-padding">
      <div className="section-container">
        {/* Header */}
        <div style={{ maxWidth: '680px', marginBottom: '56px' }}>
          <div
            className="section-badge"
            onMouseEnter={() => {
              if (badgeTextRef.current) scrambleText(badgeTextRef.current, "Let's Build Together", 0.5);
            }}
          >
            <span className="section-badge-dot" />
            <span ref={badgeTextRef}>Let's Build Together</span>
          </div>

          <h2 ref={headingRef} className="section-title">
            Initiate An <span className="text-gradient-green">Architecture Briefing</span>
          </h2>

          <p ref={subtitleRef} className="section-subtitle">
            Whether deploying autonomous agent swarms, fine-tuning custom foundation weights,
            or architecting zero-trust RAG systems, our research team is ready.
          </p>
        </div>

        {/* 2-Column Contact Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '32px',
          }}
          className="contact-grid"
        >
          {/* Left Info Panel */}
          <div
            className="glass-card contact-fade contact-info-panel"
            style={{
              padding: '44px 38px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRadius: 'var(--radius-xl)',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
              backdropFilter: 'blur(28px) saturate(180%)',
              WebkitBackdropFilter: 'blur(28px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.55), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)',
            }}
          >
            <div>
              {/* Live Status Badge */}
              <div
                className="section-badge"
                style={{
                  marginBottom: '28px',
                }}
              >
                <span className="section-badge-dot" />
                <span>NOW ACCEPTING Q4 / Q1 CLIENTS</span>
              </div>

              <h3
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: '#EDEDED',
                  marginBottom: '16px',
                }}
              >
                Direct Access To Senior AI Engineering
              </h3>

              <p
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.65,
                  marginBottom: '36px',
                }}
              >
                We collaborate directly with CTOs, VP of Engineering, and AI founders.
                Schedule an exploratory architecture deep-dive or send us your technical RFC.
              </p>

              {/* Contact Channels */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
                {/* Email with copy button */}
                <div
                  className="contact-channel-item contact-email-card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px',
                    padding: '16px 20px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.18)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: 'rgba(214, 168, 79, 0.1)',
                        border: '1px solid rgba(214, 168, 79, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Mail size={18} color="var(--green)" />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-heading)' }}>
                        Direct Inquiries
                      </div>
                      <a
                        href="mailto:intelligence@xpedira.ai"
                        className="contact-email-link"
                        style={{
                          fontSize: '0.95rem',
                          color: '#EDEDED',
                          textDecoration: 'none',
                          fontWeight: 500,
                          wordBreak: 'break-word',
                        }}
                      >
                        intelligence@xpedira.ai
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="contact-copy-btn"
                    style={{
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: 'var(--radius-sm)',
                      color: copiedEmail ? 'var(--green)' : 'var(--text-muted)',
                      cursor: 'pointer',
                      padding: '6px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.75rem',
                      fontFamily: 'SFMono-Regular, monospace',
                      transition: 'all 0.2s ease',
                      flexShrink: 0,
                      marginLeft: 'auto',
                    }}
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {/* Locations */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '16px 20px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.18)',
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: 'rgba(214, 168, 79, 0.1)',
                      border: '1px solid rgba(214, 168, 79, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <MapPin size={18} color="var(--green)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-heading)' }}>
                      Research Hubs
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#EDEDED', lineHeight: 1.5 }}>
                      San Francisco, CA • London, UK • Distributed Global Cloud
                    </div>
                  </div>
                </div>

                {/* Response SLA */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px 20px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.18)',
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: 'rgba(214, 168, 79, 0.1)',
                      border: '1px solid rgba(214, 168, 79, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Clock size={18} color="var(--green)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-heading)' }}>
                      Response Guarantee
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#EDEDED' }}>
                      Within 4 business hours for enterprise evaluations
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <ShieldCheck size={18} color="var(--green)" />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Protected under Mutual NDA • Zero Data Retention Default
              </span>
            </div>
          </div>

          {/* Right Contact Form */}
          <div
            className="glass-card contact-fade contact-form-panel"
            style={{
              padding: '44px 38px',
              borderRadius: 'var(--radius-xl)',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.03) 100%)',
              backdropFilter: 'blur(32px) saturate(200%)',
              WebkitBackdropFilter: 'blur(32px) saturate(200%)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.65), 0 0 32px rgba(214, 168, 79, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.28)',
            }}
          >
            <form ref={formRef} onSubmit={handleSubmit}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '20px',
                  marginBottom: '20px',
                }}
                className="form-inner-grid"
              >
                {/* Name */}
                <div className="floating-group">
                  <label htmlFor="contact-name" className="form-label">
                    Full Name *
                  </label>
                  <input
                    id="contact-name"
                    name="from_name"
                    type="text"
                    required
                    placeholder="e.g. Dr. Arthur Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                {/* Email */}
                <div className="floating-group">
                  <label htmlFor="contact-email" className="form-label">
                    Work Email *
                  </label>
                  <input
                    id="contact-email"
                    name="from_email"
                    type="email"
                    required
                    placeholder="e.g. arthur@enterprise.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '20px',
                  marginBottom: '20px',
                }}
                className="form-inner-grid"
              >
                {/* Organization */}
                <div className="floating-group">
                  <label htmlFor="contact-org" className="form-label">
                    Organization / Company
                  </label>
                  <input
                    id="contact-org"
                    name="organization"
                    type="text"
                    placeholder="e.g. NextEra Robotics"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="form-input"
                  />
                </div>

                {/* Service of Interest */}
                <div className="floating-group">
                  <label htmlFor="contact-service" className="form-label">
                    Target Capability
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="form-input"
                    style={{ appearance: 'none', backgroundColor: 'rgba(17, 19, 18, 0.85)', backdropFilter: 'blur(16px)' }}
                  >
                    <option value="Autonomous Agents & Swarms">Autonomous Agents & Swarms</option>
                    <option value="Custom Foundation LLMs">Custom Foundation LLMs</option>
                    <option value="High-Throughput Computer Vision">High-Throughput Computer Vision</option>
                    <option value="Enterprise Knowledge & GraphRAG">Enterprise Knowledge & GraphRAG</option>
                    <option value="Predictive Analytics & Causal ML">Predictive Analytics & Causal ML</option>
                    <option value="Zero-Trust AI Governance">Zero-Trust AI Governance</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="floating-group" style={{ marginBottom: '28px' }}>
                <label htmlFor="contact-msg" className="form-label">
                  Project Brief & Compute Requirements *
                </label>
                <textarea
                  id="contact-msg"
                  name="message"
                  required
                  rows={4}
                  placeholder="Outline your workload, expected throughput, dataset dimensions, or architectural targets..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-input"
                  style={{ resize: 'vertical', minHeight: '110px' }}
                />
              </div>

              {/* Submit Button */}
              <div>
                <MagneticButton
                  variant="primary"
                  type="submit"
                  disabled={formStatus === 'loading'}
                  style={{
                    width: '100%',
                    padding: '16px 28px',
                    fontSize: '1rem',
                  }}
                >
                  {formStatus === 'loading' && (
                    <>
                      <Loader2 size={18} className="spin-animation" />
                      <span>Transmitting Payload...</span>
                    </>
                  )}
                  {formStatus === 'success' && (
                    <>
                      <CheckCircle2 size={18} />
                      <span>Transmitted Successfully!</span>
                    </>
                  )}
                  {formStatus === 'idle' && (
                    <>
                      <span>Transmit Architecture Brief</span>
                      <Send size={18} />
                    </>
                  )}
                  {formStatus === 'error' && (
                    <>
                      <span>Retry Transmission</span>
                      <Send size={18} />
                    </>
                  )}
                </MagneticButton>
              </div>

              {formStatus === 'success' && (
                <div
                  style={{
                    marginTop: '16px',
                    padding: '14px 18px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(214, 168, 79, 0.1)',
                    border: '1px solid rgba(214, 168, 79, 0.35)',
                    color: 'var(--green)',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
                  <span>Brief received! Your message has been sent directly to our team.</span>
                </div>
              )}

              {formStatus === 'error' && (
                <div
                  style={{
                    marginTop: '16px',
                    padding: '14px 18px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.35)',
                    color: '#F87171',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    fontFamily: 'var(--font-heading)',
                    lineHeight: 1.5,
                  }}
                >
                  <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: '2px' }}>Transmission Notice</div>
                    <div style={{ fontSize: '0.825rem', opacity: 0.9 }}>{errorMessage}</div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .form-label {
          display: block;
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
          margin-bottom: 8px;
          letter-spacing: 0.02em;
        }
        .form-input {
          width: 100%;
          padding: 14px 16px;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #EDEDED;
          font-family: var(--font-body);
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }
        .form-input:focus {
          border-color: var(--green);
          background: rgba(214, 168, 79, 0.04);
          box-shadow: 0 0 16px rgba(214, 168, 79, 0.18);
        }
        .spin-animation {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
        @media (min-width: 900px) {
          .contact-grid {
            grid-template-columns: 0.9fr 1.1fr !important;
          }
          .form-inner-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
