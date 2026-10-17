import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import MagneticButton from './MagneticButton';
import { ArrowUpRight, Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { name: 'Services', href: '#services' },
  { name: 'Tech', href: '#tech' },
  { name: 'Why Us', href: '#why' },
  { name: 'Team', href: '#team' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ lenisRef }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('services');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const linksContainerRef = useRef(null);

  // Smooth scroll handler using Lenis or native
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(targetId);
    if (!element) return;

    const activeLenis = window.lenis || (lenisRef && lenisRef.current?.lenis) || lenisRef?.current;
    if (activeLenis && typeof activeLenis.scrollTo === 'function') {
      activeLenis.scrollTo(element, { offset: -70, duration: 1.25 });
    } else {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useGSAP(
    () => {
      // Elegant slide-down entrance animation
      if (navRef.current) {
        gsap.fromTo(
          navRef.current,
          { y: -80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.1 }
        );
      }

      // Hide navbar on scroll down, reveal on scroll up
      ScrollTrigger.create({
        start: 'top top',
        end: 'max',
        onUpdate: (self) => {
          if (mobileMenuOpen) return;
          if (self.direction === 1 && self.scroll() > 130) {
            // Scrolling down
            gsap.to(navRef.current, { y: -90, duration: 0.35, ease: 'power3.out' });
          } else if (self.direction === -1) {
            // Scrolling up
            gsap.to(navRef.current, { y: 0, duration: 0.35, ease: 'power3.out' });
          }
        },
      });

      // Track active section with ScrollTrigger
      const sections = ['services', 'tech', 'why', 'team', 'contact'];
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: 'top 45%',
          end: 'bottom 45%',
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id),
        });
      });
    },
    { scope: navRef, dependencies: [mobileMenuOpen] }
  );

  // Toggle glass backdrop when scrolling
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile menu staggered animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.35,
        ease: 'power3.out',
      });
      gsap.fromTo(
        '.mobile-nav-link',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.45, ease: 'power3.out', delay: 0.1 }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.25,
        ease: 'power3.in',
      });
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 1000,
          padding: isScrolled ? '12px 0' : '22px 0',
          transition: 'padding 0.35s ease, background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
          backgroundColor: isScrolled ? 'rgba(17, 24, 39, 0.70)' : 'rgba(17, 24, 39, 0.25)',
          backdropFilter: isScrolled ? 'blur(24px) saturate(180%)' : 'blur(12px) saturate(140%)',
          WebkitBackdropFilter: isScrolled ? 'blur(24px) saturate(180%)' : 'blur(12px) saturate(140%)',
          borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: isScrolled ? '0 12px 40px rgba(0, 0, 0, 0.5), inset 0 -1px 0 rgba(255, 255, 255, 0.06)' : 'none',
        }}
      >
        <div className="section-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              const activeLenis = window.lenis || (lenisRef && lenisRef.current?.lenis) || lenisRef?.current;
              if (activeLenis && typeof activeLenis.scrollTo === 'function') {
                activeLenis.scrollTo(0, { duration: 1.3 });
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
              color: 'var(--text)',
            }}
            aria-label="Xpedira AI Home"
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '5px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
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
                  letterSpacing: '-0.02em',
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
          </a>

          {/* Desktop Nav Links */}
          <nav
            ref={linksContainerRef}
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 10px',
              borderRadius: 'var(--radius-pill)',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 1px 0 rgba(255, 255, 255, 0.22)',
            }}
            className="desktop-nav"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    position: 'relative',
                    padding: '8px 18px',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    color: isActive ? 'var(--green)' : 'var(--text-muted)',
                    borderRadius: 'var(--radius-pill)',
                    transition: 'all 0.25s ease',
                    background: isActive
                      ? 'linear-gradient(135deg, rgba(214, 168, 79, 0.14) 0%, rgba(214, 168, 79, 0.04) 100%)'
                      : 'transparent',
                    border: isActive ? '1px solid rgba(214, 168, 79, 0.35)' : '1px solid transparent',
                    boxShadow: isActive ? '0 0 16px rgba(214, 168, 79, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#EDEDED';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--text-muted)';
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {link.name}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '2px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '14px',
                        height: '2px',
                        backgroundColor: 'var(--green)',
                        borderRadius: '2px',
                        boxShadow: '0 0 8px var(--green)',
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right CTA Button & Mobile Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="desktop-cta" style={{ display: 'none' }}>
              <MagneticButton
                variant="primary"
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                style={{
                  padding: '10px 22px',
                  fontSize: '0.875rem',
                }}
              >
                Get in touch
                <ArrowUpRight size={16} />
              </MagneticButton>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-hamburger-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.25)',
                color: 'var(--text)',
                cursor: 'pointer',
              }}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} color="var(--green)" /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          backgroundColor: 'rgba(17, 24, 39, 0.85)',
          backdropFilter: 'blur(32px) saturate(200%)',
          WebkitBackdropFilter: 'blur(32px) saturate(200%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px 24px',
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            width: '100%',
            maxWidth: '360px',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="mobile-nav-link"
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.75rem',
                fontWeight: 600,
                color: activeSection === link.href.substring(1) ? 'var(--green)' : '#EDEDED',
                textDecoration: 'none',
                letterSpacing: '-0.02em',
                textAlign: 'center',
                width: '100%',
                padding: '12px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              {link.name}
            </a>
          ))}

          <div style={{ marginTop: '20px', width: '100%' }}>
            <MagneticButton
              variant="primary"
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              style={{ width: '100%', padding: '16px 24px' }}
            >
              Get in touch
              <ArrowUpRight size={18} />
            </MagneticButton>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 860px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-cta {
            display: block !important;
          }
          .mobile-hamburger-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
