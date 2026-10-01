"use client";

import type { ComponentPropsWithoutRef } from "react";

import {
  useLoopAnimation,
  type MotionPreset,
} from "@/components/effects/use-loop-animation";

type MotionLoopProps = ComponentPropsWithoutRef<"div"> & {
  preset: MotionPreset;
};

export function MotionDiv({ preset, children, ...props }: MotionLoopProps) {
  const elementRef = useLoopAnimation<HTMLDivElement>(preset);
  return (
    <div ref={elementRef} {...props}>
      {children}
    </div>
  );
}
