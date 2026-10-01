"use client";

/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaExpand, FaXmark } from "react-icons/fa6";

type GalleryItem = {
  title: string;
  image: string;
  alt: string;
  description: string;
  caption: string;
  keywords: string[];
};

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return null;
      return current === 0 ? items.length - 1 : current - 1;
    });
  }, [items.length]);
  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return null;
      return current === items.length - 1 ? 0 : current + 1;
    });
  }, [items.length]);

  useEffect(() => {
    if (activeIndex === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close, showNext, showPrevious]);

  const activeItem = activeIndex === null ? null : items[activeIndex];

  return (
    <>
      <div className="grid auto-rows-fr gap-7 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <figure key={`${item.title}-${index}`} className="gallery-card surface-panel animated-card flex h-full flex-col overflow-hidden !p-0">
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group relative flex h-80 w-full items-center justify-center overflow-hidden bg-slate-100 p-3 text-left dark:bg-slate-950 sm:h-[22rem] lg:h-[23rem]"
              aria-label={`Open larger image: ${item.title}`}
            >
              <img src={item.image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-25 blur-xl transition duration-700 group-hover:scale-125 dark:opacity-20" />
              <img
                src={item.image}
                alt={item.alt}
                title={item.title}
                loading={index < 4 ? "eager" : "lazy"}
                width="900"
                height="900"
                className="relative z-10 h-full w-full object-contain transition duration-500 group-hover:scale-[1.025]"
              />
              <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-slate-950/75 text-sm text-white opacity-0 shadow-lg transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true">
                <FaExpand />
              </span>
            </button>
            <figcaption className="flex flex-1 items-center border-t border-slate-200 p-5 dark:border-slate-800">
              <h2 className="text-lg font-bold leading-snug text-slate-950 dark:text-white">{item.caption || item.title}</h2>
            </figcaption>
          </figure>
        ))}
      </div>

      {activeItem ? (
        <div
          className="gallery-lightbox fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/95 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Image viewer: ${activeItem.title}`}
          onClick={close}
        >
          <button type="button" onClick={close} aria-label="Close image viewer" className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-slate-900/80 text-xl text-white transition hover:scale-105 hover:bg-slate-800 sm:right-6 sm:top-6">
            <FaXmark />
          </button>

          {items.length > 1 ? (
            <button type="button" onClick={(event) => { event.stopPropagation(); showPrevious(); }} aria-label="View previous image" className="lightbox-arrow left-3 sm:left-6">
              <FaChevronLeft />
            </button>
          ) : null}

          <div className="flex h-[92vh] w-full max-w-6xl flex-col items-center justify-center gap-4" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={close} className="flex min-h-0 flex-1 items-center justify-center" aria-label="Close enlarged image">
              <img src={activeItem.image} alt={activeItem.alt} title={activeItem.title} className="max-h-[78vh] max-w-full object-contain drop-shadow-2xl" />
            </button>
            <div className="max-w-3xl text-center text-white">
              <p className="font-heading text-lg font-bold sm:text-xl">{activeItem.caption || activeItem.title}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-300">Click the image again to close</p>
            </div>
          </div>

          {items.length > 1 ? (
            <button type="button" onClick={(event) => { event.stopPropagation(); showNext(); }} aria-label="View next image" className="lightbox-arrow right-3 sm:right-6">
              <FaChevronRight />
            </button>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
