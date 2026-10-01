"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const available =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setProgress(available > 0 ? (window.scrollY / available) * 100 : 0);
      frame = 0;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[100] h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-[width] duration-200 ease-out"
      style={{ width: `${progress}%` }}
    />
  );
}
