"use client";
import { useEffect, useRef } from "react";
export function TypewriterRoles({ roles }: { roles: readonly string[] }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !roles.length) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let role = 0,
      length = roles[0].length,
      deleting = false,
      timer = 0;
    const schedule = () => {
      window.clearTimeout(timer);
      if (reduced.matches || document.hidden) return;
      const current = roles[role];
      timer = window.setTimeout(
        () => {
          if (length === current.length && !deleting) deleting = true;
          else if (length === 0 && deleting) {
            deleting = false;
            role = (role + 1) % roles.length;
          } else length += deleting ? -1 : 1;
          element.textContent = roles[role].slice(0, length);
          schedule();
        },
        length === current.length && !deleting ? 1600 : deleting ? 45 : 75,
      );
    };
    const sync = () => {
      if (reduced.matches) {
        role = 0;
        length = roles[0].length;
        deleting = false;
        element.textContent = roles[0];
      }
      schedule();
    };
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      window.clearTimeout(timer);
      reduced.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [roles]);
  return (
    <>
      <span aria-hidden="true">
        <span ref={ref}>{roles[0]}</span>
        <span className="ml-0.5 animate-pulse text-blue-600">|</span>
      </span>
      <span className="sr-only">{roles.join(", ")}</span>
    </>
  );
}
