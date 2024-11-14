import { useRef, useEffect } from "react";

export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

/**
 * Observer entering about me portview.
 */
export const useIntersection = (
  options: { rootMargin: string },
  callback: (isIntersecting: boolean) => void
) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => callback(entry.isIntersecting));
    }, options);

    const current = ref.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    }
  }, [options, callback]);
  return ref;
};