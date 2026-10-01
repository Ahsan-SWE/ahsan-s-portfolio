"use client";
import { useEffect, useRef, type ReactNode } from "react";
type RevealEffect = "fade-up" | "fade-right" | "fade-left" | "zoom-in";
type Props = {
  children: ReactNode;
  className?: string;
  effect?: RevealEffect;
  delay?: 0 | 100 | 200 | 300 | 400 | 500 | 600 | 800;
  duration?: 800 | 1000 | 1200 | 1500;
};
const transforms = {
  "fade-up": "translateY(30px)",
  "fade-right": "translateX(-30px)",
  "fade-left": "translateX(30px)",
  "zoom-in": "scale(.94)",
};
export function Reveal({
  children,
  className = "",
  effect = "fade-up",
  delay = 0,
  duration = 800,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || reduced.matches) return;
    let animation: Animation | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const initial = window.scrollY < 10;
        animation = element.animate(
          [
            { opacity: initial ? 1 : 0.25, transform: transforms[effect] },
            { opacity: 1, transform: "none" },
          ],
          {
            duration: initial ? (effect === "zoom-in" ? 120 : 350) : duration,
            delay: initial ? 0 : Math.min(delay, 150),
            easing: "cubic-bezier(.22,1,.36,1)",
          },
        );
        observer.unobserve(element);
      },
      { threshold: 0.04 },
    );
    const stop = () => {
      if (reduced.matches) {
        observer.disconnect();
        animation?.cancel();
      }
    };
    observer.observe(element);
    reduced.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      animation?.cancel();
      reduced.removeEventListener("change", stop);
    };
  }, [effect, delay, duration]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
