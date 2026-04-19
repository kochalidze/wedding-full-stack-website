import { useEffect, useRef } from "react";

export default function useInfiniteScroll(speed = 1) {
  const ref = useRef(null);
  const animationRef = useRef(null);
  const position = useRef(0);
  const isPaused = useRef(false);

  useEffect(() => {
    const element = ref.current;

    const animate = () => {
      if (!isPaused.current) {
        position.current -= speed;

        if (Math.abs(position.current) >= element.scrollWidth / 2) {
          position.current = 0;
        }

        element.style.transform = `translateX(${position.current}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    const pause = () => (isPaused.current = true);
    const resume = () => (isPaused.current = false);

    element.addEventListener("mouseenter", pause);
    element.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(animationRef.current);
      element.removeEventListener("mouseenter", pause);
      element.removeEventListener("mouseleave", resume);
    };
  }, [speed]);

  return ref;
}