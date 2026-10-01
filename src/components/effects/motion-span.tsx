"use client";

import type { ComponentPropsWithoutRef } from "react";

import {
  useLoopAnimation,
  type MotionPreset,
} from "@/components/effects/use-loop-animation";

type MotionSpanProps = ComponentPropsWithoutRef<"span"> & {
  preset: MotionPreset;
};

export function MotionSpan({ preset, children, ...props }: MotionSpanProps) {
  const elementRef = useLoopAnimation<HTMLSpanElement>(preset);
  return (
    <span ref={elementRef} {...props}>
      {children}
    </span>
  );
}
