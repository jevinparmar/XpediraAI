import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Flip } from 'gsap/Flip';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';

// ── 1. Register GSAP Plugins ──
gsap.registerPlugin(ScrollTrigger, SplitText, Flip, CustomEase);

// ── 2. Signature Custom Eases ──
// High-end Awwwards silky curves:
export const EASES = {
  expoSoft: CustomEase.create('expo-soft', 'M0,0 C0.16,1 0.3,1 1,1'),
  cinematic: CustomEase.create('cinematic', 'M0,0 C0.25,1 0.5,1 1,1'),
  elasticSubtle: CustomEase.create('elastic-subtle', 'M0,0 C0.3,1.15 0.5,1 1,1'),
  fluidInOut: CustomEase.create('fluid-in-out', 'M0,0 C0.65,0 0.35,1 1,1'),
  power4Out: 'power4.out',
  power3Out: 'power3.out',
  expoOut: 'expo.out',
  expoInOut: 'expo.inOut',
};

// ── 3. Motion System Design Tokens ──
export const MOTION_TOKENS = {
  durations: {
    instant: 0.15,
    fast: 0.35,
    normal: 0.65,
    deliberate: 0.95,
    cinematic: 1.35,
    hero: 1.75,
  },
  staggers: {
    micro: 0.015,
    char: 0.024,
    word: 0.045,
    item: 0.08,
    card: 0.12,
  },
  distances: {
    micro: 6,
    subtle: 18,
    normal: 34,
    deep: 58,
    hero: 110,
  },
  breakpoints: {
    desktop: '(min-width: 1024px)',
    tablet: '(min-width: 768px) and (max-width: 1023px)',
    mobile: '(max-width: 767px)',
    reducedMotion: '(prefers-reduced-motion: reduce)',
  },
};

// ── 4. Cyber Scramble / Text Decode Utility ──
const SCRAMBLE_GLYPHS = '01ABCDEF_#/><~*+=-';

export function scrambleText(element, originalText, duration = 0.8) {
  if (!element) return () => {};
  let frame = 0;
  const totalFrames = Math.max(12, Math.round(duration * 60));
  const length = originalText.length;
  let animId;

  const animate = () => {
    frame++;
    const progress = frame / totalFrames;
    const revealedLength = Math.floor(progress * length);

    let output = '';
    for (let i = 0; i < length; i++) {
      if (originalText[i] === ' ') {
        output += ' ';
      } else if (i < revealedLength) {
        output += originalText[i];
      } else {
        output += SCRAMBLE_GLYPHS[Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)];
      }
    }

    element.innerText = output;

    if (frame < totalFrames) {
      animId = requestAnimationFrame(animate);
    } else {
      element.innerText = originalText;
    }
  };

  animId = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(animId);
}

// ── 5. Reusable Motion Hook: useRevealText ──
/**
 * Advanced SplitText reveal supporting 3 distinct modes:
 * - 'masked-slide': Hero H1 line-by-line masked reveal with char tilt & skew settle
 * - 'blur-to-sharp': Char-by-char blur (12px -> 0px) with subtle y elevation
 * - 'scrub-highlight': Word-by-word paragraph scrub illumination (0.2 -> 1.0)
 */
export function useRevealText(elementRef, options = {}) {
  const {
    type = 'blur-to-sharp', // 'masked-slide' | 'blur-to-sharp' | 'scrub-highlight'
    start = 'top 85%',
    end = 'bottom 60%',
    stagger = 0.024,
    duration = 0.95,
    ease = 'expo-soft',
  } = options;

  useGSAP(
    () => {
      if (!elementRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(elementRef.current, { opacity: 1 });
        return;
      }

      if (type === 'masked-slide') {
        const split = new SplitText(elementRef.current, {
          type: 'lines,words,chars',
          linesClass: 'split-line-masked',
        });

        gsap.fromTo(
          split.chars,
          {
            yPercent: 115,
            rotateX: -35,
            skewY: 4,
            opacity: 0,
          },
          {
            yPercent: 0,
            rotateX: 0,
            skewY: 0,
            opacity: 1,
            stagger,
            duration: duration || 1.15,
            ease: EASES.expoSoft || 'power4.out',
            scrollTrigger: {
              trigger: elementRef.current,
              start,
              once: true,
            },
            onComplete: () => {
              gsap.set(split.chars, { clearProps: 'transform' });
            },
          }
        );

        return () => split.revert();
      }

      if (type === 'scrub-highlight') {
        const split = new SplitText(elementRef.current, {
          type: 'words',
          wordsClass: 'scrub-word',
        });

        gsap.fromTo(
          split.words,
          { opacity: 0.2 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.05,
            scrollTrigger: {
              trigger: elementRef.current,
              start,
              end,
              scrub: 0.6,
            },
          }
        );

        return () => split.revert();
      }

      // Default: 'blur-to-sharp' / word elevation
      const split = new SplitText(elementRef.current, {
        type: 'lines,words',
        linesClass: 'split-line',
        wordsClass: 'split-word',
      });

      gsap.fromTo(
        split.words,
        {
          opacity: 0,
          y: 28,
        },
        {
          opacity: 1,
          y: 0,
          stagger: stagger || 0.045,
          duration,
          ease: EASES.expoSoft || ease,
          scrollTrigger: {
            trigger: elementRef.current,
            start,
            once: true,
          },
          onComplete: () => {
            gsap.set(split.words, { clearProps: 'transform,opacity' });
          },
        }
      );

      return () => split.revert();
    },
    { scope: elementRef }
  );
}

// ── 6. Reusable Motion Hook: useFadeUp ──
export function useFadeUp(elementRef, options = {}) {
  const {
    y = 36,
    duration = 0.85,
    stagger = 0.1,
    start = 'top 85%',
    ease = 'expo-soft',
    once = true,
  } = options;

  useGSAP(
    () => {
      if (!elementRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(elementRef.current, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        elementRef.current,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          stagger,
          duration,
          ease: EASES.expoSoft || ease,
          scrollTrigger: {
            trigger: elementRef.current,
            start,
            once,
          },
        }
      );
    },
    { scope: elementRef }
  );
}

// ── 7. Reusable Motion Hook: useImageReveal ──
export function useImageReveal(containerRef, imageRef, options = {}) {
  const {
    start = 'top 82%',
    duration = 1.25,
    ease = 'expo-soft',
  } = options;

  useGSAP(
    () => {
      if (!containerRef.current || !imageRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          once: true,
        },
      });

      // Curtain clip-path wipe
      tl.fromTo(
        containerRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration,
          ease: EASES.fluidInOut || ease,
        }
      );

      // Inner image scale settle
      tl.fromTo(
        imageRef.current,
        { scale: 1.28 },
        {
          scale: 1,
          duration: duration * 1.15,
          ease: EASES.expoSoft || ease,
        },
        0
      );

      // Parallax scrub after reveal settles
      gsap.to(imageRef.current, {
        y: 28,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    },
    { scope: containerRef }
  );
}

// ── 8. Reusable Motion Hook: useParallax ──
export function useParallax(elementRef, options = {}) {
  const { speed = 0.2, direction = 'y', start = 'top bottom', end = 'bottom top' } = options;

  useGSAP(
    () => {
      if (!elementRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const distance = 100 * speed;
      const prop = direction === 'x' ? 'x' : 'y';

      gsap.fromTo(
        elementRef.current,
        { [prop]: -distance },
        {
          [prop]: distance,
          ease: 'none',
          scrollTrigger: {
            trigger: elementRef.current,
            start,
            end,
            scrub: 1.2,
          },
        }
      );
    },
    { scope: elementRef }
  );
}

// ── 9. Reusable Motion Hook: useMagnetic ──
export function useMagnetic(elementRef, options = {}) {
  const { strength = 0.25, maxDistance = 8 } = options;

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      const moveX = Math.max(-maxDistance, Math.min(maxDistance, dx * strength));
      const moveY = Math.max(-maxDistance, Math.min(maxDistance, dy * strength));

      gsap.to(el, {
        x: moveX,
        y: moveY,
        duration: 0.32,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.55,
        ease: EASES.expoSoft || 'power3.out',
        overwrite: 'auto',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [elementRef, strength, maxDistance]);
}

// ── 10. Reusable Motion Hook: useCounter ──
export function useCounter(elementRef, targetNumber, options = {}) {
  const {
    duration = 1.6,
    prefix = '',
    suffix = '',
    decimals = 0,
    start = 'top 85%',
  } = options;

  useGSAP(
    () => {
      if (!elementRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        elementRef.current.innerText = `${prefix}${targetNumber}${suffix}`;
        return;
      }

      const counterObj = { val: 0 };

      gsap.to(counterObj, {
        val: targetNumber,
        duration,
        ease: EASES.expoSoft || 'power3.out',
        scrollTrigger: {
          trigger: elementRef.current,
          start,
          once: true,
        },
        onUpdate: () => {
          if (elementRef.current) {
            const formatted = decimals > 0 ? counterObj.val.toFixed(decimals) : Math.round(counterObj.val);
            elementRef.current.innerText = `${prefix}${formatted}${suffix}`;
          }
        },
      });
    },
    { scope: elementRef }
  );
}

// ── 11. Reusable Motion Hook: useTilt (3D Glare & Card Tilt) ──
export function useTilt(elementRef, options = {}) {
  const { maxAngle = 8, scale = 1.02 } = options;

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      const rotX = (py - 0.5) * -maxAngle;
      const rotY = (px - 0.5) * maxAngle;

      gsap.to(el, {
        rotateX: rotX,
        rotateY: rotY,
        scale,
        transformPerspective: 1000,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.65,
        ease: EASES.expoSoft || 'power3.out',
        overwrite: 'auto',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      gsap.set(el, { rotateX: 0, rotateY: 0, scale: 1 });
    };
  }, [elementRef, maxAngle, scale]);
}

// ── 12. Reusable Motion Hook: useMarquee (Velocity-Reactive) ──
export function useMarquee(trackRef, options = {}) {
  const { baseSpeed = 0.8 } = options;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let progress = 0;
    let animId;

    const tick = () => {
      const lenis = window.lenis;
      const velocity = lenis ? Math.abs(lenis.velocity || 0) : 0;
      const dynamicBoost = Math.min(velocity * 0.12, 3.5);
      const step = (baseSpeed + dynamicBoost) * 0.08;

      progress = (progress + step) % 100;
      track.style.transform = `translate3d(-${progress}%, 0, 0)`;

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [trackRef, baseSpeed]);
}

// ── 13. Reusable Motion Hook: useScrollVelocity ──
export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);

  useEffect(() => {
    const lenis = window.lenis;
    if (!lenis) return;

    const handleScroll = (e) => {
      setVelocity(e.velocity || 0);
    };

    lenis.on('scroll', handleScroll);
    return () => lenis.off('scroll', handleScroll);
  }, []);

  return velocity;
}

// ── 14. Global Lenis Singleton Accessor ──
export function getLenis() {
  return window.lenis || null;
}

export function smoothScrollTo(target, options = {}) {
  const lenis = window.lenis;
  if (lenis && typeof lenis.scrollTo === 'function') {
    lenis.scrollTo(target, {
      offset: options.offset ?? -75,
      duration: options.duration ?? 1.25,
      easing: options.easing ?? ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
    });
  } else if (typeof target === 'string') {
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  } else if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}
