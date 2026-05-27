"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion/variants";

const steps = [
  {
    n: "01",
    title: "Upload or fill",
    body: "Drop a LinkedIn-exported PDF, import an existing JSON, or start blank.",
  },
  {
    n: "02",
    title: "Edit fearlessly",
    body: "A clean, distraction-free editor. Autosave on. Undo is your shoulder safety.",
  },
  {
    n: "03",
    title: "Pick a language",
    body: "Choose English or modern Japanese. Templates adapt automatically.",
  },
  {
    n: "04",
    title: "Pick a template",
    body: "Modern Minimal, Awesome-CV, Academic, or 職務経歴書 modern.",
  },
  {
    n: "05",
    title: "Export and apply",
    body: "Download a recruiter-ready PDF, .tex source, or JSON backup.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="border-t border-border/60 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            From rough notes to a finished PDF, in five steps.
          </h2>
          <p className="mt-3 text-[15px] text-muted-foreground">
            No onboarding. No tutorial videos. Open the editor and you understand it.
          </p>
        </motion.div>

        <motion.ol
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-5"
        >
          {steps.map((s) => (
            <motion.li
              key={s.n}
              variants={fadeUp}
              className="rounded-xl border border-border bg-background p-5"
            >
              <div className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground">
                {s.n}
              </div>
              <h3 className="mt-3 text-[15px] font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
