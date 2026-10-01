export const siteConfig = {
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

export const navigation = [
  { label: "Home", targetId: "home", href: "/" },
  { label: "About", targetId: "about", href: "/about" },
  { label: "Services", targetId: "services", href: "/services" },
  { label: "Expertise", targetId: "expertise", href: "/expertise" },
  { label: "Portfolio", targetId: "projects", href: "/portfolio" },
  { label: "Blog", targetId: "blog", href: "/blog" },
  { label: "Gallery", targetId: "gallery", href: "/gallery" },
  { label: "Contact", targetId: "contact", href: "/contact" },
] as const;

export const competencies = [
  { label: "Frontend (HTML, Tailwind)", value: 90, tone: "brand" },
  { label: "React.js & Next.js", value: 80, tone: "brand" },
  { label: "SEO & ORM", value: 85, tone: "purple" },
  { label: "WordPress CMS", value: 85, tone: "brand" },
] as const;

export const services = [
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

export const experiences = [
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

export const education = [
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

export const projects = [
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

export const faqs = [
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
