"use client";

import { motion } from "framer-motion";

const faqs = [
  {
    q: "Is my data stored on a server?",
    a: "No. Your resume is saved in your browser's local storage. Export JSON to back it up or move between devices.",
  },
  {
    q: "Why no signup?",
    a: "Friction kills momentum. You can build, export, and apply in one sitting without ever creating an account.",
  },
  {
    q: "How is the PDF generated?",
    a: "We compile real XeLaTeX on the server using Tectonic, with Inter, Charter, and Noto Sans/Serif JP for clean Japanese rendering.",
  },
  {
    q: "Is it ATS-friendly?",
    a: "Yes — single-column layouts, no graphics, no sidebars, no profile photo. Tested against major ATS parsers.",
  },
  {
    q: "Does the Japanese template look like a traditional 履歴書?",
    a: "No. We follow modern 職務経歴書 conventions used by tech companies and international teams — no photo, no marital status, no commute time.",
  },
  {
    q: "Can I edit the LaTeX source myself?",
    a: "Yes. Export the .tex file and customize it in Overleaf or your local LaTeX environment.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="border-t border-border/60 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-balance text-center text-3xl font-semibold tracking-tight md:text-4xl"
        >
          Questions, answered.
        </motion.h2>

        <div className="mt-12 divide-y divide-border border-y border-border">
          {faqs.map((item, i) => (
            <motion.details
              key={item.q}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="group py-5"
            >
              <summary className="flex cursor-pointer items-start justify-between gap-6 list-none">
                <span className="text-[15px] font-medium text-foreground">{item.q}</span>
                <span className="mt-1 text-muted-foreground transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                {item.a}
              </p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}
