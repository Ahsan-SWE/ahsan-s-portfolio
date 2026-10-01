"use client";

import type { ComponentPropsWithoutRef } from "react";

type ScrollToButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "onClick" | "type"
> & {
  targetId: string;
  focusTarget?: boolean;
  onAfterScroll?: () => void;
};

let activeAnimationFrame: number | undefined;

function animateScroll(targetTop: number, onComplete?: () => void) {
  if (activeAnimationFrame !== undefined) {
    window.cancelAnimationFrame(activeAnimationFrame);
  }

  const startTop = window.scrollY;
  const distance = targetTop - startTop;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reduceMotion || Math.abs(distance) < 2) {
    window.scrollTo({ top: targetTop, behavior: "auto" });
    onComplete?.();
    return;
  }

  const duration = Math.min(1_050, Math.max(650, Math.abs(distance) * 0.35));
  const startTime = performance.now();

  const tick = (currentTime: number) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const eased =
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, startTop + distance * eased);

    if (progress < 1) {
      activeAnimationFrame = window.requestAnimationFrame(tick);
    } else {
      activeAnimationFrame = undefined;
      onComplete?.();
    }
  };

  activeAnimationFrame = window.requestAnimationFrame(tick);
}

export function ScrollToButton({
  targetId,
  focusTarget = false,
  onAfterScroll,
  children,
  ...buttonProps
}: ScrollToButtonProps) {
  const scrollToTarget = () => {
    onAfterScroll?.();

    const beginScroll = () => {
      const target = document.getElementById(targetId);
      if (!target) return;

      const header = document.querySelector("header");
      const headerOffset =
        targetId === "home"
          ? 0
          : (header?.getBoundingClientRect().height ?? 80);
      const targetTop =
        targetId === "home"
          ? 0
          : Math.max(
              0,
              target.getBoundingClientRect().top +
                window.scrollY -
                headerOffset,
            );

      animateScroll(targetTop, () => {
        if (focusTarget) target.focus({ preventScroll: true });
      });
    };

    if (onAfterScroll) {
      window.requestAnimationFrame(beginScroll);
    } else {
      beginScroll();
    }
  };

  return (
    <button type="button" onClick={scrollToTarget} {...buttonProps}>
      {children}
    </button>
  );
}
