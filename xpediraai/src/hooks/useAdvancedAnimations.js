import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Cyber Scramble Text Effect
 * Decodes random futuristic glyphs into target text on enter or hover.
 */
const SCRAMBLE_CHARS = '01ABCDEF_#/><~*+=-';

export function scrambleText(element, originalText, duration = 0.8) {
  if (!element) return;
  let frame = 0;
  const totalFrames = Math.round(duration * 60);
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
        output += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
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

/**
 * Hook for Scramble Text on ScrollTrigger / Hover
 */
export function useScrambleOnHover(elementRef, originalText) {
  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;
    const text = originalText || el.innerText;

    const handleMouseEnter = () => {
      scrambleText(el, text, 0.55);
    };

    el.addEventListener('mouseenter', handleMouseEnter);
    return () => el.removeEventListener('mouseenter', handleMouseEnter);
  }, [elementRef, originalText]);
}

/**
 * Heading SplitText Reveal (Char-by-char with Blur-to-Sharp)
 * Words and chars animate with masked lines, filter blur(12px -> 0px), opacity, and elevation.
 */
export function useHeadingReveal(headingRef, options = {}) {
  const {
    start = 'top 85%',
    duration = 0.95,
    stagger = 0.02,
    ease = 'power3.out',
    blur = 12,
  } = options;

  useGSAP(
    () => {
      if (!headingRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(headingRef.current, { opacity: 1 });
        return;
      }

      const split = new SplitText(headingRef.current, {
        type: 'lines,words,chars',
        linesClass: 'split-line',
      });

      gsap.fromTo(
        split.chars,
        {
          opacity: 0,
          y: 28,
          filter: `blur(${blur}px)`,
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger,
          duration,
          ease,
          scrollTrigger: {
            trigger: headingRef.current,
            start,
            once: true,
          },
          onComplete: () => {
            // Clean up inline styles so letter-hover interaction works smoothly
            gsap.set(split.chars, { clearProps: 'filter,transform' });
          },
        }
      );

      return () => {
        split.revert();
      };
    },
    { scope: headingRef }
  );
}

/**
 * Paragraph Word-by-Word Scroll Scrub Highlight
 * Words start dim (opacity 0.22) and illuminate to 1.0 as the user scrolls past.
 */
export function useParagraphHighlight(paragraphRef, options = {}) {
  const {
    start = 'top 85%',
    end = 'bottom 60%',
    dimOpacity = 0.25,
  } = options;

  useGSAP(
    () => {
      if (!paragraphRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const split = new SplitText(paragraphRef.current, {
        type: 'words',
        wordsClass: 'scrub-word',
      });

      gsap.fromTo(
        split.words,
        { opacity: dimOpacity },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.05,
          scrollTrigger: {
            trigger: paragraphRef.current,
            start,
            end,
            scrub: 0.6,
          },
        }
      );

      return () => {
        split.revert();
      };
    },
    { scope: paragraphRef }
  );
}

/**
 * Line Draw Underline / Border scaleX Animation
 */
export function useLineDraw(lineRef, options = {}) {
  const {
    start = 'top 90%',
    duration = 1.1,
    ease = 'power3.out',
    delay = 0,
  } = options;

  useGSAP(
    () => {
      if (!lineRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(lineRef.current, { scaleX: 1 });
        return;
      }

      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration,
          delay,
          ease,
          scrollTrigger: {
            trigger: lineRef.current,
            start,
            once: true,
          },
        }
      );
    },
    { scope: lineRef }
  );
}
