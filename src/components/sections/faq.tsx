import { FaChevronDown } from "react-icons/fa";

import { Reveal } from "@/components/effects/reveal";
import { faqs } from "@/data/portfolio";

const glass =
  "bg-white/[0.65] backdrop-blur-2xl dark:bg-slate-800/[0.65] dark:border-slate-700/50";

const faqTitleColors = [
  "text-blue-700 dark:text-blue-300",
  "text-violet-700 dark:text-violet-300",
  "text-emerald-700 dark:text-emerald-300",
  "text-amber-700 dark:text-amber-300",
] as const;

export function Faq() {
  return (
    <section id="faq" className="relative py-24">
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal effect="fade-up" className="mb-16 text-center">
          <div
            className={`mb-4 inline-block rounded-full border border-blue-500/20 px-5 py-2 text-sm font-bold text-blue-700 dark:text-blue-300 shadow-sm ${glass}`}
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
                className={`group rounded-2xl border border-gray-200/50 p-5 shadow-md transition-all open:border-blue-500/50 open:shadow-xl dark:border-gray-700/50 ${glass}`}
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
