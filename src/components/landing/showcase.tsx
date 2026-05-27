"use client";

import { motion } from "framer-motion";

const samples = [
  {
    tag: "Modern Minimal — English",
    title: "Alex Morgan",
    role: "Senior Software Engineer",
    lines: [
      "Led merchant onboarding rebuild — activation +18%",
      "Designed internal type-safe RPC layer for 12 services",
      "Mentored 4 engineers; 2 promoted within 12 months",
    ],
    rule: "Inter · Charter · single-column",
    lang: "en" as const,
  },
  {
    tag: "Awesome-CV — English",
    title: "Sara Chen",
    role: "Engineering Manager",
    lines: [
      "Built engineering org of 28 across 4 squads",
      "Cut weekly incident count 62% over 8 months",
      "Owns hiring pipeline; 9 hires last year",
    ],
    rule: "Roboto · Source Sans · two-tone",
    lang: "en" as const,
  },
  {
    tag: "職務経歴書 modern — 日本語",
    title: "田中 拓海",
    role: "シニアソフトウェアエンジニア",
    lines: [
      "出品フロー再設計をリードし CVR +18% を達成",
      "型安全 RPC レイヤを設計し 12 サービスで採用",
      "4 名のメンタリングを実施、2 名昇進",
    ],
    rule: "Noto Sans JP · Noto Serif JP",
    lang: "ja" as const,
  },
];

export function Showcase() {
  return (
    <section
      id="showcase"
      className="border-t border-border/60 bg-gradient-to-b from-secondary/40 via-secondary/20 to-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Templates that look hand-typeset, not generated.
          </h2>
          <p className="mt-3 text-[15px] text-muted-foreground">
            Inspired by Awesome-CV, AltaCV, and modern 職務経歴書 conventions —
            stripped of decoration, kept readable.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {samples.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.55,
                delay: i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group"
            >
              <div className="paper-shadow mx-auto aspect-[1/1.294] w-full max-w-[340px] rounded-md border border-ink-200 bg-white p-6 transition-transform duration-500 will-change-transform group-hover:-translate-y-1">
                <div className="border-b border-ink-200 pb-2">
                  <div
                    className={
                      s.lang === "ja"
                        ? "font-jpserif text-[18px] text-ink-900"
                        : "font-serif text-[18px] text-ink-900"
                    }
                  >
                    {s.title}
                  </div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-ink-500">
                    {s.role}
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-ink-700">
                    {s.lang === "ja" ? "職務経歴" : "Experience"}
                  </div>
                  <ul className="mt-1 space-y-1 pl-3 text-[10.5px] leading-snug text-ink-800">
                    {s.lines.map((b) => (
                      <li
                        key={b}
                        className={
                          (s.lang === "ja" ? "font-jpserif " : "") +
                          "list-disc list-outside marker:text-ink-400"
                        }
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-3 text-center">
                <div className="text-[11px] font-mono tracking-wide text-muted-foreground">
                  {s.tag}
                </div>
                <div className="text-[11px] text-muted-foreground/80">{s.rule}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
