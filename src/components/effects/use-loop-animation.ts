"use client";

import { useEffect, useRef } from "react";

export type MotionPreset =
  | "float"
  | "float-delayed"
  | "float-fast"
  | "pulse-glow"
  | "pulse-glow-delayed"
  | "gradient";

type MotionOptions = {
  keyframes: Keyframe[];
  options: KeyframeAnimationOptions;
};

const motions: Record<MotionPreset, MotionOptions> = {
  float: {
    keyframes: [
      { transform: "translateY(0)" },
      { transform: "translateY(-20px)" },
      { transform: "translateY(0)" },
    ],
    options: { duration: 6000, iterations: Infinity, easing: "ease-in-out" },
  },
  "float-delayed": {
    keyframes: [
      { transform: "translateY(0)" },
      { transform: "translateY(-15px)" },
      { transform: "translateY(0)" },
    ],
    options: {
      duration: 7000,
      delay: 1000,
      iterations: Infinity,
      easing: "ease-in-out",
    },
  },
  "float-fast": {
    keyframes: [
      { transform: "translateY(0)" },
      { transform: "translateY(-10px)" },
      { transform: "translateY(0)" },
    ],
    options: {
      duration: 5000,
      delay: 500,
      iterations: Infinity,
      easing: "ease-in-out",
    },
  },
  "pulse-glow": {
    keyframes: [
      { opacity: 0.2, transform: "translate(-50%, -50%) scale(1)" },
      { opacity: 0.5, transform: "translate(-50%, -50%) scale(1.05)" },
      { opacity: 0.2, transform: "translate(-50%, -50%) scale(1)" },
    ],
    options: { duration: 4000, iterations: Infinity, easing: "ease-in-out" },
  },
  "pulse-glow-delayed": {
    keyframes: [
      { opacity: 0.2, transform: "translate(-50%, -50%) scale(1)" },
      { opacity: 0.5, transform: "translate(-50%, -50%) scale(1.05)" },
      { opacity: 0.2, transform: "translate(-50%, -50%) scale(1)" },
    ],
    options: {
      duration: 4000,
      delay: 1000,
      iterations: Infinity,
      easing: "ease-in-out",
    },
  },
  gradient: {
    keyframes: [
      { backgroundPosition: "left center" },
      { backgroundPosition: "right center" },
      { backgroundPosition: "left center" },
    ],
    options: { duration: 3000, iterations: Infinity, easing: "ease-in-out" },
  },
};

export function useLoopAnimation<T extends HTMLElement>(preset: MotionPreset) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const { keyframes, options } = motions[preset];
    const animation = element.animate(keyframes, options);
    let inView = true;
    const sync = () => {
      if (preference.matches || document.hidden || !inView) animation.pause();
      else animation.play();
      if (preference.matches) animation.currentTime = 0;
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    observer.observe(element);
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      observer.disconnect();
      animation.cancel();
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [preset]);

  return elementRef;
}
