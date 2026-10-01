"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
type ParticleRuntime = {
  particles: {
    color: { value: string };
    line_linked: { color: string };
    array: unknown[];
  };
  interactivity: { events: { onclick: { enable: boolean } } };
  fn: {
    drawAnimFrame: number;
    particlesRefresh: () => void;
    vendors: { draw: () => void; destroypJS?: () => void };
  };
};
type ParticleWindow = Window & {
  particlesJS?: (id: string, config: Record<string, unknown>) => void;
  pJSDom?: Array<{ pJS: ParticleRuntime }> | null;
};
const originalParticleConfig = {
  particles: {
    number: { value: 60, density: { enable: true, value_area: 800 } },
    color: { value: "#3b82f6" },
    shape: { type: "circle" },
    opacity: {
      value: 0.4,
      random: false,
      anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false },
    },
    size: { value: 3, random: true, anim: { enable: false } },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#3b82f6",
      opacity: 0.3,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: true, rotateX: 600, rotateY: 1200 },
    },
  },
  interactivity: {
    detect_on: "window",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      grab: { distance: 200, line_linked: { opacity: 0.6 } },
      push: { particles_nb: 3 },
    },
  },
  retina_detect: true,
} satisfies Record<string, unknown>;

export function BackgroundNetwork() {
  const isHome = usePathname() === "/";
  const runtime = useRef<ParticleRuntime | null>(null);
  const onHome = useRef(isHome);
  useEffect(() => {
    onHome.current = isHome;
    let cancelled = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      const p = runtime.current;
      if (!p) return;
      window.cancelAnimationFrame(p.fn.drawAnimFrame);
      p.interactivity.events.onclick.enable = isHome && !reduced.matches;
      if (isHome && !document.hidden && !reduced.matches) p.fn.vendors.draw();
    };
    async function initialize() {
      if (!isHome || runtime.current || reduced.matches) {
        sync();
        return;
      }
      await import("particles.js");
      if (cancelled) return;
      const w = window as ParticleWindow;
      if (!w.particlesJS) return;
      const config = structuredClone(originalParticleConfig);
      if (window.matchMedia("(max-width: 767px)").matches) {
        config.particles.number.value = 28;
        config.retina_detect = false;
      }
      const color = document.documentElement.classList.contains("dark")
        ? "#60a5fa"
        : "#3b82f6";
      config.particles.color.value = color;
      config.particles.line_linked.color = color;
      w.particlesJS("particles-js", config);
      const p = w.pJSDom?.[0]?.pJS;
      if (!p) return;
      runtime.current = p;
      const draw = p.fn.vendors.draw;
      p.fn.vendors.draw = () => {
        if (!onHome.current || document.hidden || reduced.matches) return;
        if (p.particles.array.length > 100) p.particles.array.length = 100;
        draw();
      };
      sync();
    }
    const idle = window.setTimeout(() => void initialize(), 600);
    const updateMotion = () => {
      if (!runtime.current) void initialize();
      else sync();
    };
    reduced.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      cancelled = true;
      window.clearTimeout(idle);
      reduced.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", sync);
      if (runtime.current)
        window.cancelAnimationFrame(runtime.current.fn.drawAnimFrame);
    };
  }, [isHome]);
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const p = runtime.current;
      if (!p) return;
      const color = document.documentElement.classList.contains("dark")
        ? "#60a5fa"
        : "#3b82f6";
      p.particles.color.value = color;
      p.particles.line_linked.color = color;
      p.fn.particlesRefresh();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => {
      observer.disconnect();
      runtime.current?.fn.vendors.destroypJS?.();
      (window as ParticleWindow).pJSDom = [];
      runtime.current = null;
    };
  }, []);
  return (
    <div
      id="particles-js"
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-0 h-full w-full ${isHome ? "visible" : "invisible"}`}
    />
  );
}
