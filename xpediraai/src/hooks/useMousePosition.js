import { useState, useEffect } from 'react';

/**
 * Hook to track mouse position for 3D parallax, cursor lag, and tilt effects.
 * Returns normalized coordinates [-1 to 1] and absolute window coordinates.
 */
export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      
      const normalizedX = (clientX / innerWidth) * 2 - 1;
      const normalizedY = -(clientY / innerHeight) * 2 + 1;

      setMousePosition({
        x: clientX,
        y: clientY,
        normalizedX,
        normalizedY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return mousePosition;
}
