import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function MagneticButton({
  children,
  className = '',
  variant = 'primary', // 'primary' | 'glass' | 'custom'
  href,
  onClick,
  strength = 0.35,
  textStrength = 0.5,
  ...props
}) {
  const buttonRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const el = buttonRef.current;
    const content = contentRef.current;
    if (!el) return;

    // Check if user has reduced motion enabled
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.35,
        ease: 'power2.out',
      });

      if (content) {
        gsap.to(content, {
          x: x * textStrength,
          y: y * textStrength,
          duration: 0.35,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      });

      if (content) {
        gsap.to(content, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        });
      }
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, textStrength]);

  const buttonClasses = `btn ${
    variant === 'primary' ? 'btn-primary' : variant === 'glass' ? 'btn-glass' : ''
  } ${className}`;

  if (href) {
    return (
      <a
        ref={buttonRef}
        href={href}
        className={buttonClasses}
        onClick={onClick}
        {...props}
      >
        <span ref={contentRef} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          {children}
        </span>
      </a>
    );
  }

  return (
    <button
      ref={buttonRef}
      className={buttonClasses}
      onClick={onClick}
      {...props}
    >
      <span ref={contentRef} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        {children}
      </span>
    </button>
  );
}
