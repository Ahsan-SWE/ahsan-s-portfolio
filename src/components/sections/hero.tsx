import Link from "next/link";
import Image from "next/image";
import {
  FaArrowDown,
  FaArrowRight,
  FaChartLine,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
  FaReact,
  FaWordpress,
} from "react-icons/fa";

import { MotionDiv } from "@/components/effects/motion-loop";
import { MotionSpan } from "@/components/effects/motion-span";
import { Reveal } from "@/components/effects/reveal";
import { TiltCard } from "@/components/effects/tilt-card";
import { TypewriterRoles } from "@/components/effects/typewriter-roles";
import { ScrollToButton } from "@/components/ui/scroll-to-button";
import { siteConfig } from "@/data/portfolio";

const glass =
  "bg-white/[0.65] backdrop-blur-2xl dark:bg-slate-800/[0.65] dark:border-slate-700/50";

export function Hero() {
  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 pb-16 pt-32 sm:px-6 lg:px-8"
    >
      <div className="flex w-full flex-col-reverse items-center gap-12 xl:flex-row xl:gap-8">
        <Reveal
          effect="fade-right"
          duration={1200}
          className="z-10 w-full flex-1 space-y-6 text-center xl:text-left"
        >
          <MotionDiv
            preset="float"
            className={`inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 shadow-sm dark:border-slate-700 ${glass}`}
          >
            <span className="h-2 w-2 animate-ping rounded-full bg-green-500" />
            <span className="text-xs font-medium text-gray-600 sm:text-sm dark:text-gray-300">
              Available for new opportunities
            </span>
          </MotionDiv>

          <h1 className="font-heading text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            Hi, I&apos;m <br className="xl:hidden" />
            <MotionSpan
              preset="gradient"
              className="mt-1 block bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[length:200%_auto] bg-clip-text pb-2 text-transparent"
            >
              Ahsanul Haque Chowdhury
            </MotionSpan>
          </h1>

          <div className="h-[40px] sm:h-[50px] lg:h-[60px]">
            <span className="text-2xl font-bold text-gray-800 sm:text-3xl lg:text-5xl dark:text-gray-200">
              <TypewriterRoles roles={siteConfig.roles} />
            </span>
          </div>

          <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-gray-600 sm:text-lg lg:text-xl xl:mx-0 dark:text-gray-400">
            Software Engineering graduate specializing in building premium
            digital presence through modern{" "}
            <span className="font-bold text-blue-700 dark:text-blue-300">
              Frontend Development
            </span>
            , strategic{" "}
            <span className="font-bold text-purple-700 dark:text-purple-300">
              SEO
            </span>
            , and
            <span className="font-bold text-teal-700 dark:text-teal-300">
              {" "}
              WordPress
            </span>{" "}
            management.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4 sm:gap-5 xl:justify-start">
            <ScrollToButton
              targetId="contact"
              className="rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3.5 font-bold text-white shadow-xl shadow-blue-500/40 transition-all duration-300 hover:-translate-y-2 hover:from-blue-600 hover:to-blue-700 sm:px-8 sm:py-4"
            >
              Hire Me Now{" "}
              <FaPaperPlane aria-hidden="true" className="ml-2 inline" />
            </ScrollToButton>
            <Link
              href="/portfolio"
              className={`group flex items-center gap-2 rounded-full border-2 border-gray-300 px-6 py-3.5 font-bold transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 sm:px-8 sm:py-4 dark:border-gray-700 dark:hover:border-blue-500 ${glass}`}
            >
              Explore Portfolio
              <FaArrowRight
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-2"
              />
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 pt-6 text-2xl text-gray-500 xl:justify-start dark:text-gray-400">
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="transition-all hover:-translate-y-1 hover:scale-125 hover:text-blue-500"
            >
              <FaLinkedin />
            </a>
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="transition-all hover:-translate-y-1 hover:scale-125 hover:text-blue-500"
            >
              <FaGithub />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="Send email"
              className="transition-all hover:-translate-y-1 hover:scale-125 hover:text-blue-500"
            >
              <FaEnvelope />
            </a>
          </div>
        </Reveal>

        <Reveal
          effect="zoom-in"
          duration={1500}
          className="relative z-10 mt-10 flex w-full flex-1 justify-center xl:mt-0"
        >
          <MotionDiv
            preset="pulse-glow"
            className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/30 sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]"
          />
          <MotionDiv
            preset="pulse-glow-delayed"
            className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-500/20 sm:h-[480px] sm:w-[480px] lg:h-[600px] lg:w-[600px]"
          />

          <TiltCard
            maxTilt={10}
            className="relative h-64 w-64 sm:h-80 sm:w-80 lg:h-[450px] lg:w-[450px] xl:h-[500px] xl:w-[500px]"
          >
            <div className="absolute inset-0 animate-[spin_20s_linear_infinite] rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 opacity-40 blur-3xl dark:opacity-30" />
            <Image
              src={siteConfig.image}
              alt="Ahsanul Haque Chowdhury"
              fill
              sizes="(max-width: 639px) 16rem, (max-width: 1023px) 20rem, (max-width: 1279px) 28.125rem, 31.25rem"
              className="relative z-10 rounded-full border-4 border-white/50 object-cover shadow-2xl backdrop-blur-sm dark:border-slate-800/50"
              priority
              fetchPriority="high"
              quality={60}
            />

            <MotionDiv
              preset="float"
              className={`absolute -left-4 top-4 z-20 flex items-center gap-2 rounded-2xl border border-gray-100 p-2 shadow-xl sm:-left-6 sm:top-10 sm:p-3 dark:border-gray-800 ${glass}`}
            >
              <FaReact className="animate-[spin_10s_linear_infinite] text-2xl text-[#61DAFB] sm:text-3xl" />
              <p className="hidden text-xs font-bold leading-tight text-gray-900 sm:block sm:text-sm dark:text-white">
                React.js
              </p>
            </MotionDiv>

            <MotionDiv
              preset="float-delayed"
              className={`absolute -right-4 bottom-10 z-20 flex items-center gap-2 rounded-2xl border border-gray-100 p-2 shadow-xl sm:-right-6 sm:bottom-16 sm:p-3 dark:border-gray-800 ${glass}`}
            >
              <FaWordpress className="text-2xl text-[#21759b] sm:text-3xl" />
              <p className="hidden text-xs font-bold leading-tight text-gray-900 sm:block sm:text-sm dark:text-white">
                CMS
              </p>
            </MotionDiv>

            <MotionDiv
              preset="float-fast"
              className={`absolute -bottom-6 left-1/4 z-20 flex items-center gap-2 rounded-full border border-gray-100 px-3 py-1.5 shadow-xl sm:px-4 sm:py-2 dark:border-gray-800 ${glass}`}
            >
              <FaChartLine className="text-purple-700 dark:text-purple-300" />
              <p className="text-xs font-bold text-gray-900 sm:text-sm dark:text-white">
                SEO & ORM
              </p>
            </MotionDiv>
          </TiltCard>
        </Reveal>
      </div>

      <ScrollToButton
        targetId="about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-bounce flex-col items-center gap-2 text-gray-400 md:flex"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <FaArrowDown aria-hidden="true" />
      </ScrollToButton>
    </section>
  );
}
