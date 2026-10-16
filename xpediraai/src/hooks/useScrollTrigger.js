import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook to safely wrap GSAP ScrollTrigger animations with automatic gsap.context cleanup.
 * @param {Function} animationCallback Function receiving gsap context
 * @param {Array} dependencies React dependency array
 */
export function useGSAPContext(animationCallback, dependencies = []) {
  const scopeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      animationCallback(scopeRef.current);
    }, scopeRef);

    return () => ctx.revert(); // Automatically clean up all animations and ScrollTriggers
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return scopeRef;
}
