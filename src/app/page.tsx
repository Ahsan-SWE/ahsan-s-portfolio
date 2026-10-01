import Image from "next/image";
import Link from "next/link";
import {
  FaArrowDown, FaArrowRight, FaBriefcase, FaBullhorn, FaChartLine, FaChevronDown, FaCode, FaEnvelope, FaExternalLinkAlt, FaGithub, FaGraduationCap, FaHtml5, FaLaptopCode, FaLinkedin, FaMapMarkerAlt, FaPaperPlane, FaPhoneAlt, FaReact, FaRobot, FaSearch, FaSearchDollar, FaStar, FaTachometerAlt, FaUser, FaWordpress, FaWordpressSimple
} from "react-icons/fa";
import { MotionDiv } from "@/components/effects/motion-loop";
import { MotionSpan } from "@/components/effects/motion-span";
import { Reveal } from "@/components/effects/reveal";
import { TiltCard } from "@/components/effects/tilt-card";
import { TypewriterRoles } from "@/components/effects/typewriter-roles";
import { ScrollToButton } from "@/components/ui/scroll-to-button";
import { ContactForm } from "@/components/sections/contact-form";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";

const siteConfig = {
  name: "Ahsanul Haque Chowdhury",
  shortName: "Ahsanul Haque",
  title: "Front-End Developer, SEO Specialist & ORM Professional",
  description:
    "Software Engineering graduate specializing in Frontend Development, SEO, Online Reputation Management, WordPress, website performance, and AI-assisted content strategy.",
  email: "ahsan.chowdhury202@gmail.com",
  phone: "+8801629001359",
  phoneDisplay: "+880 1629 001359",
  locationShort: "Uttara, Dhaka, BD",
  address: {
    streetAddress: "Uttara",
    addressLocality: "Dhaka",
    postalCode: "1230",
    addressCountry: "BD",
    display: "Uttara, Dhaka-1230, Bangladesh",
  },
  company: "Aan-Nahl Software",
  university: "Daffodil International University",
  resume:
    "https://drive.google.com/uc?export=download&id=1NOWIHK20Vp7q-xfOaAP-apKsoSBUvpbW",
  image: "/images/profile-image.webp",
  logo: "/images/logo.webp",
  social: {
    linkedin: "https://www.linkedin.com/in/ahsan-swe",
    github: "https://github.com/Ahsan-SWE",
  },
  roles: [
    "Frontend Developer",
    "WordPress Expert",
    "SEO Specialist",
    "ORM Specialist",
  ],
  keywords: [
    "Ahsanul Haque Chowdhury",
    "Front-End Developer in Dhaka",
    "SEO Specialist in Bangladesh",
    "Online Reputation Management expert",
    "ORM Professional",
    "React.js Developer",
    "Next.js Developer",
    "WordPress Expert",
    "Website Performance Optimization",
    "AI Content Strategy",
  ],
} as const;

const competencies = [
  { label: "Frontend (HTML, Tailwind)", value: 90, tone: "brand" },
  { label: "React.js & Next.js", value: 80, tone: "brand" },
  { label: "SEO & ORM", value: 85, tone: "purple" },
  { label: "WordPress CMS", value: 85, tone: "brand" },
] as const;

const services = [
  {
    title: "Frontend Development",
    slug: "frontend-development",
    description:
      "Building responsive, fast, and accessible web applications using HTML, CSS, JS, Tailwind, React.js, and Next.js.",
    icon: "code",
    tone: "blue",
  },
  {
    title: "SEO & ORM",
    slug: "seo-and-orm",
    description:
      "Enhancing digital visibility through On-Page Optimization, Backlink Audits, and comprehensive Reputation Crisis Management.",
    icon: "search",
    tone: "purple",
  },
  {
    title: "WordPress & CMS",
    slug: "wordpress-development",
    description:
      "Customizing themes, integrating plugins, and maintaining robust CMS performance to ensure seamless functionality.",
    icon: "panels",
    tone: "teal",
  },
  {
    title: "Performance Optimization",
    slug: "performance-optimization",
    description:
      "Improving Core Web Vitals, enhancing website speed, and minimizing load times for better user experience and SEO ranking.",
    icon: "gauge",
    tone: "orange",
  },
  {
    title: "AI Content & Prompting",
    slug: "ai-content-strategy",
    description:
      "Crafting precise prompts for SEO-driven AI content using ChatGPT & Gemini, ensuring polished and publish-ready outputs.",
    icon: "bot",
    tone: "indigo",
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    description:
      "Executing effective marketing strategies with hands-on experience in Google Analytics, Google Ads, and content strategies.",
    icon: "megaphone",
    tone: "red",
  },
] as const;

const experiences = [
  {
    period: "02/2025 - Present",
    title: "Senior Executive Software Development",
    company: "Aan-Nahl Software",
    tone: "brand",
    responsibilities: [
      "Build full custom WordPress websites for clients using Advanced Custom Fields (ACF).",
      "Develop reusable theme sections, flexible layouts, and structured content fields.",
      "Implement responsive interfaces and client-specific website functionality.",
      "Integrate contact forms and maintain reliable content editing workflows.",
      "Improve technical SEO, accessibility, and website performance.",
      "Test, troubleshoot, and maintain custom websites through launch and updates.",
    ],
  },
  {
    period: "08/2024 - 01/2025",
    title: "Senior ORM Executive",
    company: "Aan-Nahl Software",
    tone: "brand",
    responsibilities: [
      "Online Reputation Management.",
      "Search Engine Optimization (SEO).",
      "Reputation Crisis Management.",
      "CMS Website Maintenance.",
      "Website Performance Tracking.",
      "Custom To-do Jobs.",
    ],
  },
  {
    period: "02/2024 - 01/2025",
    title: "Website Management",
    company: "Aan-Nahl Software",
    tone: "purple",
    responsibilities: [
      "WordPress Theme Customization & Building.",
      "Link Building Techniques & Backlink Audit.",
      "On-Page Optimization & Web 2.0s.",
      "Custom Feature add & Plugin Management.",
      "Content Creation and Management.",
      "Performance Optimization.",
    ],
  },
] as const;

const education = [
  {
    period: "2020 - 2023",
    title: "B.S.C in Software Engineering",
    institution: "Daffodil International University",
    result: "CGPA: 3.39 / 4.00",
    tone: "brand",
    description:
      "I completed my Bachelor's degree in Software Engineering. My university journey helped me grow personally and professionally, building confidence, discipline, and a continuous learning mindset.",
  },
  {
    period: "2017 - 2019",
    title: "HSC (Science)",
    institution: "Eminence College",
    result: "GPA: 3.50 / 5.00",
    tone: "purple",
    description:
      "My Higher Secondary education in Science strengthened my foundation in mathematics, analytical thinking, and structured problem-solving before I moved into software engineering.",
  },
] as const;

const projects = [
  {
    title: "Aan Nahl Website",
    slug: "aan-nahl",
    description:
      "A responsive web view for our company, redesigned with Next.js and Tailwind.",
    url: "https://aannahl-portfolio-with-nextjs.vercel.app/",
    image: "/images/portfolio-aan-nahl.webp",
    alt: "Aan Nahl software company website project",
    width: 1905,
    height: 916,
    tags: ["NEXT.JS", "TAILWIND CSS"],
  },
  {
    title: "A Cardiologist Website",
    slug: "peter-rentrop",
    description:
      "This website is based on wordpress for Peter Rentrop, MD, a cardiologist and medical director.",
    url: "https://demo-peter-rentrop.vercel.app/",
    image: "/images/portfolio-peter-rentrop.webp",
    alt: "Peter Rentrop cardiologist website project",
    width: 1902,
    height: 902,
    tags: ["HTML/CSS/JS", "WORDPRESS"],
  },
  {
    title: "A Consulting Firm Website",
    slug: "axia-consult",
    description:
      "This website is based on wordpress for Axia Consult | U.S.-based global consulting firm specializing in space domain awareness (SDA).",
    url: "https://axiaconsult.com/",
    image: "/images/portfolio-axia-consult.webp",
    alt: "Axia Consult global consulting firm website project",
    width: 1902,
    height: 949,
    tags: ["HTML/CSS/JS", "WORDPRESS"],
  },
  {
    title: "A Medical Doctor's Website",
    slug: "richard-pestell",
    description:
      "A Medical Doctor's Website for Richard Pestell | Working for Cancer Prevention.",
    url: "https://richardpestell.com/",
    image: "/images/portfolio-richard-pestell.webp",
    alt: "Richard Pestell medical doctor website project",
    width: 1901,
    height: 946,
    tags: ["HTML/CSS/JS", "WORDPRESS"],
  },
  {
    title: "Philanthropy Website",
    slug: "andrea-jaeger",
    description:
      "A custom WordPress one-pager landing page for the Philanthropy website of Andrea Jaeger.",
    url: "https://andreajaegerphilanthropy.com/",
    image: "/images/portfolio-little-star.webp",
    alt: "Andrea Jaeger philanthropy website project",
    width: 1896,
    height: 952,
    tags: ["HTML/CSS/JS", "CUSTOM LANDING PAGE WORDPRESS"],
  },
  {
    title: "Portfolio Website",
    slug: "adriana-kugler",
    description:
      "A Portfolio Website for a Former Federal Reserve Governor, Adriana Kugler.",
    url: "https://adrianakugler.com/",
    image: "/images/portfolio-adriana-kugler.webp",
    alt: "Adriana Kugler economist portfolio website project",
    width: 1899,
    height: 951,
    tags: ["HTML/CSS/JS", "WORDPRESS CUSTOM"],
  },
] as const;

const faqs = [
  {
    question: "What services does Ahsanul Haque Chowdhury provide?",
    answer:
      "Ahsanul provides frontend development, SEO and online reputation management, WordPress and CMS management, website performance optimization, AI content prompting, and digital marketing support.",
  },
  {
    question: "Which frontend technologies does Ahsanul work with?",
    answer:
      "He builds responsive and accessible websites with HTML, CSS, JavaScript, Tailwind CSS, React.js, and Next.js.",
  },
  {
    question: "Where is Ahsanul Haque Chowdhury based?",
    answer:
      "Ahsanul is based in Uttara, Dhaka-1230, Bangladesh, and is available for new opportunities.",
  },
  {
    question: "How can I contact Ahsanul for a project?",
    answer:
      "You can email ahsan.chowdhury202@gmail.com or call +880 1629 001359 to discuss a frontend, SEO, ORM, WordPress, or website optimization project.",
  },
] as const;

const heroGlass =
  "bg-white/[0.65] backdrop-blur-2xl dark:bg-slate-800/[0.65] dark:border-slate-700/50";

function Hero() {
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
            className={`inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 shadow-sm dark:border-slate-700 ${heroGlass}`}
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
              className={`group flex items-center gap-2 rounded-full border-2 border-gray-300 px-6 py-3.5 font-bold transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 sm:px-8 sm:py-4 dark:border-gray-700 dark:hover:border-blue-500 ${heroGlass}`}
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
              className={`absolute -left-4 top-4 z-20 flex items-center gap-2 rounded-2xl border border-gray-100 p-2 shadow-xl sm:-left-6 sm:top-10 sm:p-3 dark:border-gray-800 ${heroGlass}`}
            >
              <FaReact className="animate-[spin_10s_linear_infinite] text-2xl text-[#61DAFB] sm:text-3xl" />
              <p className="hidden text-xs font-bold leading-tight text-gray-900 sm:block sm:text-sm dark:text-white">
                React.js
              </p>
            </MotionDiv>

            <MotionDiv
              preset="float-delayed"
              className={`absolute -right-4 bottom-10 z-20 flex items-center gap-2 rounded-2xl border border-gray-100 p-2 shadow-xl sm:-right-6 sm:bottom-16 sm:p-3 dark:border-gray-800 ${heroGlass}`}
            >
              <FaWordpress className="text-2xl text-[#21759b] sm:text-3xl" />
              <p className="hidden text-xs font-bold leading-tight text-gray-900 sm:block sm:text-sm dark:text-white">
                CMS
              </p>
            </MotionDiv>

            <MotionDiv
              preset="float-fast"
              className={`absolute -bottom-6 left-1/4 z-20 flex items-center gap-2 rounded-full border border-gray-100 px-3 py-1.5 shadow-xl sm:px-4 sm:py-2 dark:border-gray-800 ${heroGlass}`}
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

const aboutGlass =
  "bg-white/[0.65] backdrop-blur-2xl dark:bg-slate-800/[0.65] dark:border-slate-700/50";

const skillStyles = [
  {
    width: "w-[90%]",
    bar: "from-blue-400 to-blue-600",
    icon: FaHtml5,
    iconColor: "text-orange-700 dark:text-orange-300",
  },
  {
    width: "w-[80%]",
    bar: "from-blue-400 to-blue-600",
    icon: FaReact,
    iconColor: "text-[#61DAFB]",
  },
  {
    width: "w-[85%]",
    bar: "from-purple-400 to-purple-600",
    icon: FaSearch,
    iconColor: "text-purple-700 dark:text-purple-300",
  },
  {
    width: "w-[85%]",
    bar: "from-blue-400 to-blue-600",
    icon: FaWordpress,
    iconColor: "text-[#21759b]",
  },
] as const;

const personalInfo = [
  {
    label: "Degree",
    value: "B.S.C Software Eng.",
    icon: FaGraduationCap,
    color: "text-blue-700 dark:text-blue-300",
  },
  {
    label: "Phone",
    value: siteConfig.phoneDisplay,
    icon: FaPhoneAlt,
    color: "text-purple-700 dark:text-purple-300",
  },
  {
    label: "Email",
    value: siteConfig.email,
    icon: FaEnvelope,
    color: "text-teal-700 dark:text-teal-300",
  },
  {
    label: "Location",
    value: siteConfig.locationShort,
    icon: FaMapMarkerAlt,
    color: "text-red-500",
  },
] as const;

function About() {
  return (
    <section
      id="about"
      className="relative border-y border-gray-200/50 bg-white/40 py-24 backdrop-blur-lg dark:border-gray-800/50 dark:bg-slate-900/40"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <Reveal
            effect="fade-up"
            duration={1000}
            className="space-y-8 lg:col-span-7"
          >
            <div
              className={`mb-2 inline-block rounded-full border border-blue-500/20 px-5 py-2 text-sm font-bold text-blue-700 dark:text-blue-300 shadow-sm ${aboutGlass}`}
            >
              <FaUser aria-hidden="true" className="mr-2 inline" /> About Me
            </div>
            <h2 className="font-heading text-4xl font-extrabold md:text-5xl dark:text-white">
              Engineering{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Digital Experiences
              </span>
            </h2>
            <p className="text-lg font-medium leading-relaxed text-gray-700 dark:text-gray-300">
              Graduating from Daffodil International University with a B.S.C in
              Software Engineering, I have developed a strong passion for
              front-end architecture and web optimization. My journey perfectly
              blends coding with digital strategy.
            </p>
            <p className="text-lg font-medium leading-relaxed text-gray-700 dark:text-gray-300">
              Currently working at Aan-Nahl Software, I manage Online
              Reputation, implement advanced SEO strategies, and build custom
              WordPress solutions. I focus on delivering seamless web
              experiences, ensuring brands maintain a powerful and positive
              online presence.
            </p>

            <Link href="/about" className="home-detail-link">
              More about Ahsanul
            </Link>
            <div className="grid gap-4 pt-6 sm:grid-cols-2">
              {personalInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className={`group rounded-xl border border-gray-200/50 p-4 transition-colors hover:border-blue-500 dark:border-gray-700/50 ${aboutGlass}`}
                  >
                    <Icon
                      aria-hidden="true"
                      className={`mb-2 block text-xl transition-transform group-hover:scale-110 ${item.color}`}
                    />
                    <span className={`text-xs font-bold uppercase tracking-wider ${item.color}`}>
                      {item.label}
                    </span>
                    <p
                      className={`mt-1 font-semibold dark:text-white ${item.label === "Email" ? "break-all text-sm md:text-base" : ""}`}
                    >
                      {item.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal effect="fade-left" duration={1200} className="lg:col-span-5">
            <TiltCard
              maxTilt={5}
              className={`rounded-3xl border border-gray-200/50 p-8 shadow-2xl dark:border-gray-700/50 ${aboutGlass}`}
            >
              <h3 className="mb-8 flex items-center gap-3 font-heading text-2xl font-bold text-blue-700 dark:text-blue-300">
                <span className="rounded-lg bg-blue-500/10 p-2 text-blue-700 dark:text-blue-300">
                  <FaCode aria-hidden="true" />
                </span>
                Core Competencies
              </h3>

              <div className="space-y-6">
                {competencies.map((skill, index) => {
                  const style = skillStyles[index];
                  const Icon = style.icon;
                  return (
                    <div key={skill.label} className="group">
                      <div className="mb-2 flex justify-between">
                        <span className="flex items-center gap-2 text-sm font-bold dark:text-gray-200">
                          <Icon
                            aria-hidden="true"
                            className={style.iconColor}
                          />
                          {skill.label}
                        </span>
                      </div>
                      <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200/50 dark:bg-gray-800/50">
                        <Reveal
                          effect="fade-right"
                          delay={([200, 400, 600, 800] as const)[index]}
                          duration={1000}
                          className={`h-2.5 rounded-full bg-gradient-to-r ${style.bar} ${style.width}`}
                        >
                          <span className="sr-only">{skill.value}%</span>
                        </Reveal>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const servicesGlass =
  "bg-white/[0.65] backdrop-blur-2xl dark:bg-slate-800/[0.65] dark:border-slate-700/50";

const serviceStyles = [
  {
    icon: FaLaptopCode,
    iconBox:
      "bg-blue-50/80 text-blue-700 dark:text-blue-300 dark:bg-blue-900/40",
    shadow: "hover:shadow-blue-500/20",
    title: "text-blue-700 dark:text-blue-300",
  },
  {
    icon: FaSearchDollar,
    iconBox:
      "bg-purple-50/80 text-purple-700 dark:text-purple-300 dark:bg-purple-900/40",
    shadow: "hover:shadow-purple-500/20",
    title: "text-purple-700 dark:text-purple-300",
  },
  {
    icon: FaWordpressSimple,
    iconBox:
      "bg-teal-50/80 text-teal-700 dark:text-teal-300 dark:bg-teal-900/40",
    shadow: "hover:shadow-teal-500/20",
    title: "text-teal-700 dark:text-teal-300",
  },
  {
    icon: FaTachometerAlt,
    iconBox:
      "bg-orange-50/80 text-orange-700 dark:text-orange-300 dark:bg-orange-900/40",
    shadow: "hover:shadow-orange-500/20",
    title: "text-orange-700 dark:text-orange-300",
  },
  {
    icon: FaRobot,
    iconBox: "bg-indigo-50/80 text-indigo-500 dark:bg-indigo-900/40",
    shadow: "hover:shadow-indigo-500/20",
    title: "text-indigo-600 dark:text-indigo-300",
  },
  {
    icon: FaBullhorn,
    iconBox: "bg-red-50/80 text-red-500 dark:bg-red-900/40",
    shadow: "hover:shadow-red-500/20",
    title: "text-red-600 dark:text-red-300",
  },
] as const;

const serviceDelays = [100, 200, 300, 400, 500, 600] as const;

function Services() {
  return (
    <section id="services" className="relative py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal effect="fade-up" className="mb-20 text-center">
          <div
            className={`mb-4 inline-block rounded-full border border-blue-500/20 px-5 py-2 text-sm font-bold text-blue-700 dark:text-blue-300 shadow-sm ${servicesGlass}`}
          >
            What I Do
          </div>
          <h2 className="font-heading text-4xl font-extrabold md:text-5xl dark:text-white">
            My Specializations
          </h2>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const style = serviceStyles[index];
            const Icon = style.icon;
            return (
              <Reveal
                key={service.title}
                effect="fade-up"
                delay={serviceDelays[index]}
                className="h-full"
              >
                <article
                  className={`group h-full overflow-hidden rounded-3xl border border-gray-200/50 p-10 shadow-lg transition-all duration-500 hover:shadow-2xl dark:border-gray-700/50 ${style.shadow} ${servicesGlass}`}
                >
                  <div
                    className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 ${style.iconBox}`}
                  >
                    <Icon aria-hidden="true" />
                  </div>
                  <h3 className={`mb-4 text-2xl font-bold ${style.title}`}>
                    {service.title}
                  </h3>
                  <p className="font-medium leading-relaxed text-gray-600 dark:text-gray-400">
                    {service.description}
                  </p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="home-detail-link"
                  >
                    Explore {service.title}
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const accentPhrases = [
  "custom WordPress websites",
  "Advanced Custom Fields (ACF)",
  "reusable theme sections",
  "responsive interfaces",
  "technical SEO",
  "Online Reputation Management",
  "Search Engine Optimization (SEO)",
  "CMS Website Maintenance",
  "Website Performance Tracking",
  "WordPress Theme Customization",
  "Backlink Audit",
  "On-Page Optimization",
  "Plugin Management",
  "Performance Optimization",
  "Software Engineering",
  "mathematics",
  "analytical thinking",
  "structured problem-solving",
  "SEO",
  "social media",
  "content strategy",
  "Google Analytics",
  "Google Ads",
  "ChatGPT",
  "Gemini",
  "Bing AI",
] as const;

function emphasize(text: string) {
  const escaped = accentPhrases.map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const matcher = new RegExp(`(${escaped.join("|")})`, "gi");
  return text.split(matcher).map((part, index) =>
    accentPhrases.some((phrase) => phrase.toLowerCase() === part.toLowerCase()) ? (
      <span key={`${part}-${index}`} className="focus-point">{part}</span>
    ) : part,
  );
}

const resumeGlass =
  "bg-white/[0.65] backdrop-blur-2xl dark:bg-slate-800/[0.65] dark:border-slate-700/50";

const experienceStyles = [
  {
    color: "bg-blue-500",
    text: "text-blue-700 dark:text-blue-300",
    soft: "bg-blue-500/10",
    hover: "hover:border-blue-500/50",
    icon: FaStar,
  },
  {
    color: "bg-purple-500",
    text: "text-purple-700 dark:text-purple-300",
    soft: "bg-purple-500/10",
    hover: "hover:border-purple-500/50",
    icon: FaWordpress,
  },
] as const;

const educationStyles = [
  {
    border: "border-blue-500",
    text: "text-blue-700 dark:text-blue-300",
    soft: "bg-blue-500/10",
  },
  {
    border: "border-purple-500",
    text: "text-purple-700 dark:text-purple-300",
    soft: "bg-purple-500/10",
  },
] as const;

function Resume() {
  return (
    <section
      id="expertise"
      className="relative border-y border-gray-200/50 bg-white/40 py-24 backdrop-blur-lg dark:border-gray-800/50 dark:bg-slate-900/40"
    >
      <span id="resume" className="absolute -top-20" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal effect="fade-up" className="mb-16 text-center">
          <div
            className={`mb-4 inline-block rounded-full border border-blue-500/20 px-5 py-2 text-sm font-bold text-blue-700 dark:text-blue-300 ${resumeGlass}`}
          >
            My Qualifications
          </div>
          <h2 className="font-heading text-4xl font-extrabold md:text-5xl dark:text-white">
            Expertise & Experience
          </h2>
          <Link href="/expertise" className="home-detail-link">
            Explore my full experience and education
          </Link>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal effect="fade-right">
              <h3 className="mb-8 flex items-center gap-3 text-2xl font-bold dark:text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300">
                  <FaBriefcase aria-hidden="true" />
                </span>
                Work Experience
              </h3>
            </Reveal>

            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-1 before:-translate-x-px before:bg-gradient-to-b before:from-blue-500 before:via-purple-500 before:to-transparent">
              {experiences.map((experience, index) => {
                const style = experienceStyles[index % experienceStyles.length];
                const Icon = style.icon;
                return (
                  <Reveal
                    key={`${experience.title}-${experience.period}`}
                    effect="fade-up"
                    delay={index === 0 ? 0 : 100}
                    className="group relative pl-14"
                  >
                    <div
                      className={`absolute left-0 top-1 flex h-11 w-11 items-center justify-center rounded-full border-4 border-white text-white shadow-lg transition-transform group-hover:scale-110 dark:border-[#0b1120] ${style.color}`}
                    >
                      <Icon aria-hidden="true" className="text-sm" />
                    </div>
                    <article
                      className={`rounded-2xl border border-gray-200/50 p-8 shadow-md transition-all hover:shadow-xl dark:border-gray-700/50 ${style.hover} ${resumeGlass}`}
                    >
                      <span
                        className={`mb-2 inline-block rounded-full px-3 py-1 text-sm font-bold ${style.text} ${style.soft}`}
                      >
                        {experience.period}
                      </span>
                      <h4 className={`mb-1 text-2xl font-extrabold ${style.text}`}>
                        {experience.title}
                      </h4>
                      <h5 className="mb-4 font-bold text-gray-500 dark:text-gray-400">
                        {experience.company}
                      </h5>
                      <ul className="list-inside list-disc space-y-2 text-sm font-medium text-gray-700 sm:text-base dark:text-gray-300">
                        {experience.responsibilities.map((responsibility) => (
                          <li key={responsibility}>{emphasize(responsibility)}</li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div>
            <Reveal effect="fade-left">
              <h3 className="mb-8 flex items-center gap-3 text-2xl font-bold dark:text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300">
                  <FaGraduationCap aria-hidden="true" />
                </span>
                Education & Certifications
              </h3>
            </Reveal>

            <div className="mb-12 space-y-6">
              {education.map((item, index) => {
                const style = educationStyles[index];
                return (
                  <Reveal
                    key={`${item.title}-${item.period}`}
                    delay={index === 0 ? 0 : 100}
                  >
                    <article
                      className={`rounded-2xl border-l-4 p-8 shadow-md transition-transform hover:-translate-y-1 ${style.border} ${resumeGlass}`}
                    >
                      <span className="mb-2 block text-sm font-bold text-gray-500 dark:text-gray-400">
                        {item.period}
                      </span>
                      <h4 className={`text-xl font-extrabold ${style.text}`}>
                        {item.title}
                      </h4>
                      <p className="mt-1 font-bold text-gray-600 dark:text-gray-400">
                        {item.institution}
                      </p>
                      <p
                        className={`mt-2 inline-block rounded px-3 py-1 text-sm font-black ${style.text} ${style.soft}`}
                      >
                        {item.result}
                      </p>
                      {"description" in item && item.description ? (
                        <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                          {emphasize(item.description)}
                        </p>
                      ) : null}
                    </article>
                  </Reveal>
                );
              })}

              <Reveal delay={200}>
                <article className="rounded-2xl border border-blue-100/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 p-8 shadow-sm dark:border-gray-700/50 dark:from-[#0b1120]/50 dark:to-gray-800/50">
                  <h4 className="mb-2 text-lg font-extrabold text-indigo-700 dark:text-indigo-300">
                    Digital Marketing & AI Tools
                  </h4>
                  <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                    {emphasize("Online coursework and continued learning (02/2024 - Present) in SEO, social media, content strategy, email campaigns, Google Analytics, and Google Ads.")}
                  </p>
                  <ul className="list-inside list-disc space-y-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                    <li>{emphasize("Craft precise prompts for SEO-driven AI content.")}</li>
                    <li>{emphasize("Expert with ChatGPT, Gemini & Bing AI.")}</li>
                  </ul>
                </article>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const projectsGlass =
  "bg-white/[0.65] backdrop-blur-2xl dark:bg-slate-800/[0.65] dark:border-slate-700/50";

const projectStyles = [
  {
    shadow: "hover:shadow-blue-500/30",
    tags: [
      "bg-blue-500/10 text-blue-700 dark:text-blue-300",
      "bg-teal-500/10 text-teal-700 dark:text-teal-300",
    ],
    tint: "bg-blue-500/20",
    title: "text-blue-700 dark:text-blue-300",
  },
  {
    shadow: "hover:shadow-purple-500/30",
    tags: [
      "bg-blue-500/10 text-blue-700 dark:text-blue-300",
      "bg-blue-500/10 text-blue-700 dark:text-blue-300",
    ],
    tint: "bg-purple-500/20",
    title: "text-purple-700 dark:text-purple-300",
  },
  {
    shadow: "hover:shadow-indigo-500/30",
    tags: [
      "bg-[#61DAFB]/10 text-cyan-800 dark:text-cyan-200",
      "bg-teal-500/10 text-teal-700 dark:text-teal-300",
    ],
    tint: "",
    title: "text-indigo-700 dark:text-indigo-300",
  },
  {
    shadow: "hover:shadow-orange-500/30",
    tags: [
      "bg-gray-500/10 text-gray-700 dark:text-gray-300",
      "bg-orange-500/10 text-orange-700 dark:text-orange-300",
    ],
    tint: "",
    title: "text-orange-700 dark:text-orange-300",
  },
  {
    shadow: "hover:shadow-blue-500/30",
    tags: [
      "bg-[#21759b]/10 text-blue-800 dark:text-blue-200",
      "bg-purple-500/10 text-purple-700 dark:text-purple-300",
    ],
    tint: "",
    title: "text-cyan-700 dark:text-cyan-300",
  },
  {
    shadow: "hover:shadow-green-500/30",
    tags: [
      "bg-yellow-500/10 text-amber-800 dark:text-amber-200",
      "bg-green-500/10 text-green-800 dark:text-green-200",
    ],
    tint: "",
    title: "text-green-700 dark:text-green-300",
  },
] as const;

const projectDelays = [100, 200, 300, 400, 500, 600] as const;

function Projects() {
  return (
    <section id="projects" className="relative py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal effect="fade-up" className="mb-20 text-center">
          <div
            className={`mb-4 inline-block rounded-full border border-blue-500/20 px-5 py-2 text-sm font-bold text-blue-700 dark:text-blue-300 ${projectsGlass}`}
          >
            Portfolio
          </div>
          <h2 className="font-heading text-4xl font-extrabold md:text-5xl dark:text-white">
            Featured Projects
          </h2>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const style = projectStyles[index];
            return (
              <Reveal
                key={project.title}
                effect="zoom-in"
                delay={projectDelays[index]}
                className="h-full"
              >
                <article
                  className={`group h-full overflow-hidden rounded-3xl border border-gray-200/50 shadow-lg transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl dark:border-gray-700/50 ${style.shadow} ${projectsGlass}`}
                >
                  <div className="relative m-0 overflow-hidden p-0">
                    {style.tint ? (
                      <div
                        className={`absolute inset-0 z-10 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100 ${style.tint}`}
                      />
                    ) : null}
                    <Image
                      src={project.image}
                      alt={project.alt}
                      width={project.width}
                      height={project.height}
                      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="m-0 block h-auto w-full object-contain p-0"
                    />
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-end bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent pb-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.title} live website`}
                        className="flex h-12 w-12 translate-y-8 items-center justify-center rounded-full bg-blue-500 text-lg text-white shadow-lg transition duration-500 group-hover:translate-y-0 hover:bg-white hover:text-blue-500"
                      >
                        <FaExternalLinkAlt aria-hidden="true" />
                      </a>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-3 flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tag}
                          className={`rounded-full px-3 py-1 text-xs font-bold ${style.tags[tagIndex]}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className={`mb-2 text-xl font-extrabold transition-colors ${style.title}`}>
                      {project.title}
                    </h3>
                    <p className="mb-4 text-sm font-medium leading-relaxed text-gray-600 dark:text-gray-400">
                      {project.description}
                    </p>
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="home-detail-link !mt-0 mb-4"
                    >
                      Read case study
                    </Link>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-bold text-blue-700 dark:text-blue-300 hover:underline"
                    >
                      Live Website <FaArrowRight aria-hidden="true" />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const faqGlass =
  "bg-white/[0.65] backdrop-blur-2xl dark:bg-slate-800/[0.65] dark:border-slate-700/50";

const faqTitleColors = [
  "text-blue-700 dark:text-blue-300",
  "text-violet-700 dark:text-violet-300",
  "text-emerald-700 dark:text-emerald-300",
  "text-amber-700 dark:text-amber-300",
] as const;

function Faq() {
  return (
    <section id="faq" className="relative py-24">
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal effect="fade-up" className="mb-16 text-center">
          <div
            className={`mb-4 inline-block rounded-full border border-blue-500/20 px-5 py-2 text-sm font-bold text-blue-700 dark:text-blue-300 shadow-sm ${faqGlass}`}
          >
            Helpful Answers
          </div>
          <h2 className="font-heading text-4xl font-extrabold md:text-5xl dark:text-white">
            Frequently Asked Questions
          </h2>
        </Reveal>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Reveal
              key={faq.question}
              effect="fade-up"
              delay={
                index === 0 ? 0 : index === 1 ? 100 : index === 2 ? 200 : 300
              }
            >
              <details
                className={`group rounded-2xl border border-gray-200/50 p-5 shadow-md transition-all open:border-blue-500/50 open:shadow-xl dark:border-gray-700/50 ${faqGlass}`}
              >
                <summary className={`flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-bold ${faqTitleColors[index % faqTitleColors.length]}`}>
                  {faq.question}
                  <FaChevronDown
                    aria-hidden="true"
                    className="shrink-0 text-blue-700 dark:text-blue-300 transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="pt-4 font-medium leading-relaxed text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const contactGlass =
  "bg-white/[0.65] backdrop-blur-2xl dark:bg-slate-800/[0.65] dark:border-slate-700/50";

function Contact() {
  return (
    <section
      id="contact"
      className="relative border-t border-gray-200/50 bg-white/40 py-24 backdrop-blur-lg dark:border-gray-800/50 dark:bg-slate-900/40"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Reveal effect="fade-right">
            <div
              className={`mb-4 inline-block rounded-full border border-blue-500/20 px-5 py-2 text-sm font-bold text-blue-700 dark:text-blue-300 ${contactGlass}`}
            >
              Get In Touch
            </div>
            <h2 className="mb-6 font-heading text-4xl font-extrabold md:text-5xl dark:text-white">
              Let&apos;s Work <br /> Together.
            </h2>
            <p className="mb-10 max-w-md text-lg font-medium leading-relaxed text-gray-600 dark:text-gray-400">
              Have a project in mind or looking for a dedicated Front-End
              Developer? Fill out the form or reach out directly.
            </p>
            <Link href="/contact" className="home-detail-link !mt-0 mb-7">
              Plan your project inquiry
            </Link>

            <div className="space-y-6">
              <a
                href={`mailto:${siteConfig.email}`}
                className={`group flex items-center gap-5 rounded-2xl border border-gray-200/50 p-5 transition-all hover:border-blue-500 hover:shadow-lg dark:border-gray-700/50 ${contactGlass}`}
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-2xl text-blue-700 dark:text-blue-300 transition-transform group-hover:scale-110">
                  <FaEnvelope aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                    Email Me
                  </span>
                  <span className="block break-all text-lg font-bold dark:text-white">
                    {siteConfig.email}
                  </span>
                </span>
              </a>

              <a
                href={`tel:${siteConfig.phone}`}
                className={`group flex items-center gap-5 rounded-2xl border border-gray-200/50 p-5 transition-all hover:border-blue-500 hover:shadow-lg dark:border-gray-700/50 ${contactGlass}`}
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-2xl text-blue-700 dark:text-blue-300 transition-transform group-hover:scale-110">
                  <FaPhoneAlt aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-bold uppercase tracking-wider text-violet-700 dark:text-violet-300">
                    Call Me
                  </span>
                  <span className="block text-lg font-bold dark:text-white">
                    {siteConfig.phoneDisplay}
                  </span>
                </span>
              </a>

              <div
                className={`group flex items-center gap-5 rounded-2xl border border-gray-200/50 p-5 dark:border-gray-700/50 ${contactGlass}`}
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-2xl text-blue-700 dark:text-blue-300 transition-transform group-hover:scale-110">
                  <FaMapMarkerAlt aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                    Location
                  </span>
                  <span className="block text-lg font-bold dark:text-white">
                    {siteConfig.address.display}
                  </span>
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal
            effect="fade-left"
            className={`rounded-3xl border border-gray-200/50 p-6 shadow-xl md:p-8 dark:border-gray-700/50 ${contactGlass}`}
          >
            <h3 className="mb-4 text-2xl font-bold text-indigo-700 dark:text-indigo-300">
              Send Me a Message
            </h3>
            <ContactForm compact />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export const metadata = pageMetadata(
  "Ahsanul Haque Chowdhury | Web Developer & SEO Specialist",
  "Custom WordPress, ACF, Next.js, SEO, and ORM services by Ahsanul Haque Chowdhury in Dhaka. Explore projects and get in touch about your website.",
  "/",
);

export default function Home() {
  return (
    <>
      <JsonLd />
      <Hero />
      <About />
      <Services />
      <Resume />
      <Projects />
      <Faq />
      <Contact />
    </>
  );
}
