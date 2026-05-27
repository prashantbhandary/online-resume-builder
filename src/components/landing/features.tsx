"use client";

import { motion } from "framer-motion";
import {
  FileType,
  Languages,
  Shield,
  Upload,
  FileDown,
  Wand2,
} from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion/variants";

const features = [
  {
    title: "LinkedIn PDF import",
    description:
      "Drop your LinkedIn-exported PDF. We parse experience, education, skills, and certifications into a structured form you can edit.",
    icon: Upload,
  },
  {
    title: "English & 日本語",
    description:
      "Switch between English and modern Japanese resumes with one click. No outdated 履歴書 photo blocks — clean, professional 職務経歴書-style typesetting.",
    icon: Languages,
  },
  {
    title: "ATS-safe by design",
    description:
      "Single-column layouts, no graphics, no sidebars, no photo. Optimized for both human recruiters and automated screeners.",
    icon: Shield,
  },
  {
    title: "LaTeX-grade PDF",
    description:
      "Server compilation via XeLaTeX (Tectonic) using Inter, Charter, and Noto fonts. Print-ready, recruiter-ready, Overleaf-quality output.",
    icon: FileType,
  },
  {
    title: "JSON / .tex / PDF export",
    description:
      "Export structured JSON for backup, raw LaTeX source for further customization, or a finished PDF for sending.",
    icon: FileDown,
  },
  {
    title: "Real-time preview",
    description:
      "What you type appears immediately in a faithful preview of your final document. Switch templates without losing a single word.",
    icon: Wand2,
  },
];

export function Features() {
  return (
    <section id="features" className="border-t border-border/60 bg-secondary/30 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Designed for the resume actually reaching the hiring manager.
          </h2>
          <p className="mt-3 text-[15px] text-muted-foreground">
            Every detail is shaped around what gets parsed, read, and shortlisted —
            not what looks busy on Behance.
          </p>
        </motion.div>

        <motion.div
          variants={stagger(0.04)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="bg-background p-7 transition-colors hover:bg-secondary/40"
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary text-foreground">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="mt-4 text-[15px] font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
