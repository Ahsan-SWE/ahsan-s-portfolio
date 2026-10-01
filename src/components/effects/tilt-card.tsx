"use client";

import { useRef, type ComponentPropsWithoutRef, type MouseEvent } from "react";

type TiltCardProps = ComponentPropsWithoutRef<"div"> & {
  maxTilt?: number;
};

export function TiltCard({
  maxTilt = 10,
  className = "",
  children,
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (
      !card ||
      window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)")
        .matches
    )
      return;

    const bounds = card.getBoundingClientRect();
    const xRatio = (event.clientX - bounds.left) / bounds.width - 0.5;
    const yRatio = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.transform = `perspective(1000px) rotateX(${-yRatio * maxTilt * 2}deg) rotateY(${xRatio * maxTilt * 2}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const resetTilt = () => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={resetTilt}
      className={`transform-gpu transition-transform duration-[400ms] ease-out ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
