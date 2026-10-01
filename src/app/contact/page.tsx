import {
  FaClock,
  FaEnvelope,
  FaLink,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaProjectDiagram,
  FaRegLightbulb,
  FaTools,
} from "react-icons/fa";
import { PageHero, Section } from "@/components/pages/page-shell";
import { ContactForm } from "@/components/sections/contact-form";
import { pageMetadata } from "@/lib/seo";

const contactPageInfo = {
  email: "ahsan.chowdhury202@gmail.com",
  phone: "+8801629001359",
  phoneDisplay: "+880 1629 001359",
  address: "Uttara, Dhaka-1230, Bangladesh",
} as const;

const helpfulDetails = [
  {
    text: "Current website or project link",
    icon: FaLink,
    titleClass: "text-blue-700 dark:text-blue-300",
  },
  {
    text: "The main problem or goal",
    icon: FaRegLightbulb,
    titleClass: "text-violet-700 dark:text-violet-300",
  },
  {
    text: "Required service or functionality",
    icon: FaTools,
    titleClass: "text-emerald-700 dark:text-emerald-300",
  },
  {
    text: "Timing or important references",
    icon: FaClock,
    titleClass: "text-amber-700 dark:text-amber-300",
  },
];

export const metadata = pageMetadata(
  "Contact Ahsanul Haque Chowdhury | Discuss Your Project",
  "Contact Ahsanul Haque Chowdhury for WordPress, Next.js, SEO, ORM, website performance, or custom development work.",
  "/contact",
);

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell me what you want to build or improve."
        description="Share your website, project goal, reference, or technical problem. A short description is enough to begin, and more detail helps me understand whether the work involves development, WordPress, SEO, ORM, performance, content, or a combination of these areas."
        path="/contact"
        type="ContactPage"
      />

      <section className="page-container grid items-start gap-6 py-8 lg:grid-cols-[.8fr_1.2fr]">
        <div className="surface-panel animated-card !p-6">
          <span
            className="feature-icon !h-11 !w-11"
            aria-hidden="true"
          >
            <FaProjectDiagram />
          </span>

          <h2 className="section-title mt-4 !text-3xl">
            Start a conversation
          </h2>

          <p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-200">
            I work across{" "}
            <span className="focus-point">
              custom WordPress and ACF, frontend development, SEO, ORM, website
              performance, and structured content workflows
            </span>
            . Share the main outcome you want, and we can identify the most
            useful starting point.
          </p>

          <address className="mt-5 space-y-4 not-italic">
            <div className="flex gap-3">
              <span
                className="feature-icon !h-9 !w-9 shrink-0 !text-sm"
                aria-hidden="true"
              >
                <FaEnvelope />
              </span>

              <div>
                <p className="eyebrow">Email</p>
                <a
                  href={`mailto:${contactPageInfo.email}`}
                  className="mt-1.5 block break-all font-semibold text-blue-700 dark:text-blue-300"
                >
                  {contactPageInfo.email}
                </a>
              </div>
            </div>

            <div className="flex gap-3">
              <span
                className="feature-icon !h-9 !w-9 shrink-0 !text-sm"
                aria-hidden="true"
              >
                <FaPhoneAlt />
              </span>

              <div>
                <p className="eyebrow">Phone</p>
                <a
                  href={`tel:${contactPageInfo.phone}`}
                  className="mt-1.5 block font-semibold"
                >
                  {contactPageInfo.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="flex gap-3">
              <span
                className="feature-icon !h-9 !w-9 shrink-0 !text-sm"
                aria-hidden="true"
              >
                <FaMapMarkerAlt />
              </span>

              <div>
                <p className="eyebrow">Location</p>
                <p className="mt-1.5 font-semibold">
                  {contactPageInfo.address}
                </p>
              </div>
            </div>
          </address>
        </div>

        <div className="surface-panel animated-card !p-6">
          <h2 className="text-2xl font-bold">
            Send a project inquiry
          </h2>

          <p className="mb-4 mt-2 leading-relaxed text-slate-700 dark:text-slate-200">
            Include the current link, the result you want, and any important
            deadline or reference. Clear context helps keep the first response
            focused and useful.
          </p>

          <ContactForm compact />
        </div>
      </section>

      <Section
        title="Helpful details to include"
        intro="You do not need a complete technical brief. These four details usually provide enough context to understand the project and decide what should be reviewed first."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {helpfulDetails.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.text}
                className="surface-panel animated-card !p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="feature-icon !h-10 !w-10"
                    aria-hidden="true"
                  >
                    <Icon />
                  </span>

                  <p className="eyebrow">
                    0{index + 1}
                  </p>
                </div>

                <p
                  className={`mt-4 font-semibold leading-relaxed ${item.titleClass}`}
                >
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
}