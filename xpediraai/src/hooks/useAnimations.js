import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/**
 * Standard animation defaults adhering to strict guidelines:
 * - Easing: power3.out / power4.out / expo.out
 * - Duration: 0.8s - 1.2s
 * - Stagger: 0.06s - 0.12s
 * - Transform and opacity only (autoAlpha, y, scale, rotate)
 * - Safe under StrictMode via @gsap/react useGSAP
 */

/**
 * Hook to reveal an element on scroll with a smooth fade & slide up.
 */
export function useFadeUp(targetRef, options = {}) {
  const {
    delay = 0,
    duration = 0.9,
    y = 40,
    start = 'top 85%',
    toggleActions = 'play none none reverse',
    ease = 'power3.out',
  } = options;

  useGSAP(
    () => {
      if (!targetRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(targetRef.current, { autoAlpha: 1 });
        return;
      }

      gsap.fromTo(
        targetRef.current,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          delay,
          ease,
          scrollTrigger: {
            trigger: targetRef.current,
            start,
            toggleActions,
          },
        }
      );
    },
    { scope: targetRef, dependencies: [y, duration, delay, start] }
  );
}

/**
 * Hook for staggered grid or list card entrances.
 */
export function useStaggerGrid(containerRef, itemSelector, options = {}) {
  const {
    stagger = 0.08,
    duration = 0.9,
    y = 50,
    scale = 0.96,
    start = 'top 82%',
    ease = 'power3.out',
  } = options;

  useGSAP(
    () => {
      if (!containerRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(itemSelector, { autoAlpha: 1 });
        return;
      }

      const elements = containerRef.current.querySelectorAll(itemSelector);
      if (!elements.length) return;

      gsap.fromTo(
        elements,
        { autoAlpha: 0, y, scale },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          stagger,
          duration,
          ease,
          scrollTrigger: {
            trigger: containerRef.current,
            start,
          },
        }
      );
    },
    { scope: containerRef, dependencies: [itemSelector, stagger, duration, y] }
  );
}

/**
 * Hook for subtle scroll parallax scrub on an element.
 */
export function useParallax(targetRef, options = {}) {
  const {
    yPercent = 15,
    start = 'top bottom',
    end = 'bottom top',
    scrub = 1.0,
  } = options;

  useGSAP(
    () => {
      if (!targetRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.to(targetRef.current, {
        yPercent,
        ease: 'none',
        scrollTrigger: {
          trigger: targetRef.current,
          start,
          end,
          scrub,
        },
      });
    },
    { scope: targetRef, dependencies: [yPercent, scrub] }
  );
}

/**
 * Hook for smooth numeric count-up animation on scroll.
 */
export function useCounter(elementRef, targetNumber, options = {}) {
  const {
    decimals = 0,
    prefix = '',
    suffix = '',
    duration = 2.0,
    start = 'top 85%',
    ease = 'power2.out',
  } = options;

  useGSAP(
    () => {
      if (!elementRef.current) return;
      const el = elementRef.current;
      const counter = { val: 0 };

      gsap.to(counter, {
        val: targetNumber,
        duration,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
        onUpdate: () => {
          if (el) {
            el.innerText = `${prefix}${counter.val.toFixed(decimals)}${suffix}`;
          }
        },
      });
    },
    { scope: elementRef, dependencies: [targetNumber, decimals, prefix, suffix] }
  );
}
