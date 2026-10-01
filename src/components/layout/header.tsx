"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaDownload, FaXmark } from "react-icons/fa6";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { navigation, siteConfig } from "@/data/portfolio";

export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const button = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", escape);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);

  const active = (href: string) =>
    href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`);

  return (
    <header
      ref={header}
      className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/95 text-slate-800 shadow-sm backdrop-blur-xl dark:border-slate-700/70 dark:bg-[#0b1120]/92 dark:text-slate-100"
    >
      <nav aria-label="Primary navigation" className="mx-auto max-w-[1600px] px-3 sm:px-5 lg:px-6">
        <div className="flex min-h-[90px] items-center justify-between gap-2">
          <Link href="/" onClick={() => setOpen(false)} className="flex min-w-0 items-center gap-2 sm:gap-3" aria-label={`${siteConfig.name}, home`}>
            <Image src={siteConfig.logo} alt="" width={240} height={94} sizes="(max-width: 639px) 46px, 72px" className="h-auto w-[46px] shrink-0 sm:w-[72px]" />
            <span className="whitespace-nowrap text-[11px] font-extrabold leading-none text-slate-950 min-[370px]:text-xs sm:text-base xl:text-lg dark:text-white">
              {siteConfig.name}
            </span>
          </Link>

          <div className="hidden items-center gap-3 text-[13px] font-semibold xl:flex 2xl:gap-4 2xl:text-sm">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} aria-current={active(item.href) ? "page" : undefined} className={`nav-link ${active(item.href) ? "nav-active" : ""}`}>
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
            <a href={siteConfig.resume} className="button-primary !min-h-11 !gap-2 !px-4 !py-2 text-xs 2xl:text-sm" download>
              <FaDownload aria-hidden="true" /> Download Resume
            </a>
          </div>

          <div className="flex shrink-0 items-center gap-1 xl:hidden">
            <ThemeToggle compact />
            <button ref={button} type="button" className="flex h-11 w-11 items-center justify-center rounded-lg text-xl text-slate-900 transition hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
              {open ? <FaXmark aria-hidden="true" /> : <FaBars aria-hidden="true" />}
            </button>
          </div>
        </div>

        <div id="mobile-navigation" hidden={!open} className="max-h-[calc(100dvh-5.6rem)] overflow-y-auto border-t border-slate-200 pb-5 xl:hidden dark:border-slate-700">
          <div className="grid gap-1 pt-3">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} aria-current={active(item.href) ? "page" : undefined} className={`rounded-lg px-4 py-3 font-semibold ${active(item.href) ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-200" : "text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-white"}`}>
                {item.label}
              </Link>
            ))}
            <a href={siteConfig.resume} className="button-primary mt-3 gap-2" download>
              <FaDownload aria-hidden="true" /> Download Resume
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
