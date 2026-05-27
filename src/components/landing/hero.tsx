"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Sparkles, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeUp, stagger } from "@/lib/motion/variants";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-faint [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
      />
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            variants={fadeUp}
            className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Recruiter-accepted · ATS-friendly · LaTeX-grade
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="text-balance text-4xl font-semibold tracking-tight text-foreground md:text-6xl md:leading-[1.05]"
          >
            The resume that gets you interviewed.
            <span className="block text-muted-foreground/90 font-normal mt-2 text-2xl md:text-3xl tracking-tight">
              Built in minutes. Typeset like Overleaf.
            </span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-pretty mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-base"
          >
            Upload your LinkedIn PDF or write from scratch. Edit live in a clean editor.
            Export a recruiter-ready PDF in English or Japanese — no signup, no
            templates that look like templates.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button asChild size="lg" className="min-w-[180px]">
              <Link href="/builder">
                Start for free <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-w-[180px]">
              <Link href="/builder?sample=ja">
                日本語で作成 <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-5 text-xs text-muted-foreground">
            No signup. Your data stays on your device.
          </motion.p>
        </motion.div>

        <HeroMockup />
      </div>
    </section>
  );
}

function HeroMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto mt-16 max-w-5xl"
    >
      <div className="rounded-2xl border border-border bg-background/60 p-3 shadow-soft-4 backdrop-blur">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_1.2fr]">
          <EditorMockup />
          <PaperMockup />
        </div>
      </div>
      <div
        aria-hidden
        className="absolute -inset-x-8 -bottom-10 -z-10 h-24 bg-[radial-gradient(closest-side,rgba(15,15,15,0.18),transparent)] blur-2xl"
      />
    </motion.div>
  );
}

function EditorMockup() {
  return (
    <div className="rounded-xl border border-border bg-background p-4 text-left">
      <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
        <span className="h-2 w-2 rounded-full bg-rose-300" />
        <span className="h-2 w-2 rounded-full bg-amber-300" />
        <span className="h-2 w-2 rounded-full bg-emerald-300" />
        <span className="ml-2 font-mono text-[11px]">editor · /builder</span>
      </div>
      <div className="space-y-3">
        <div className="rounded-md border border-border p-3">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
            Headline
          </div>
          <div className="mt-1 text-sm font-medium">Senior Software Engineer</div>
        </div>
        <div className="rounded-md border border-border p-3">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
            Experience · Stripe
          </div>
          <div className="mt-1 text-[13px] text-foreground/85 leading-relaxed">
            Led rebuild of merchant onboarding — activation +18% in one quarter.
          </div>
        </div>
        <div className="rounded-md border border-border p-3">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
            Skills
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["TypeScript", "Go", "Postgres", "Kubernetes", "React"].map((s) => (
              <span
                key={s}
                className="rounded-md border border-border bg-secondary px-2 py-0.5 text-[11px]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 pt-1 text-[11px] text-muted-foreground">
          <Upload className="h-3.5 w-3.5" /> Autosaved locally · 2 sec ago
        </div>
      </div>
    </div>
  );
}

function PaperMockup() {
  return (
    <div className="relative">
      <div className="paper-shadow mx-auto aspect-[1/1.294] w-full max-w-[420px] rounded-md border border-ink-200 bg-white p-7">
        <div className="border-b border-ink-200 pb-3">
          <h3 className="font-serif text-[20px] leading-tight text-ink-900">Alex Morgan</h3>
          <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-ink-500">
            Senior Software Engineer
          </div>
          <div className="mt-1 text-[10px] text-ink-500">
            alex.morgan@example.com · San Francisco, CA · alexmorgan.dev
          </div>
        </div>
        <section className="mt-3">
          <h4 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-700">
            Experience
          </h4>
          <div className="mt-2 space-y-2">
            {[
              {
                role: "Senior Software Engineer",
                co: "Stripe",
                date: "2022 — Present",
                bullets: [
                  "Led rebuild of merchant onboarding; activation +18%.",
                  "Designed internal type-safe RPC layer for 12 services.",
                ],
              },
              {
                role: "Software Engineer",
                co: "Airbnb",
                date: "2019 — 2022",
                bullets: [
                  "Owned guest review pipeline @ 2M events/day.",
                  "Migrated 300+ legacy components to typed DS.",
                ],
              },
            ].map((e) => (
              <div key={e.co} className="text-[10.5px] leading-snug text-ink-800">
                <div className="flex items-baseline justify-between gap-2">
                  <div className="font-semibold text-ink-900">{e.role}</div>
                  <div className="text-ink-500">{e.date}</div>
                </div>
                <div className="italic text-ink-700">{e.co}</div>
                <ul className="mt-1 space-y-0.5 pl-3">
                  {e.bullets.map((b) => (
                    <li key={b} className="list-disc list-outside marker:text-ink-400">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        <section className="mt-3">
          <h4 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-700">
            Education
          </h4>
          <div className="mt-1 text-[10.5px] leading-snug text-ink-800">
            <div className="flex items-baseline justify-between">
              <div className="font-semibold text-ink-900">Carnegie Mellon University</div>
              <div className="text-ink-500">2013 — 2017</div>
            </div>
            <div className="italic text-ink-700">B.S. Computer Science · GPA 3.87</div>
          </div>
        </section>
        <section className="mt-3">
          <h4 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-700">
            Skills
          </h4>
          <div className="mt-1 text-[10.5px] leading-snug text-ink-800">
            TypeScript · Go · Python · Rust · React · Next.js · AWS · Kubernetes · Postgres
          </div>
        </section>
      </div>
      <div className="pointer-events-none absolute -bottom-2 right-2 z-10 flex items-center gap-1 rounded-full border border-border bg-background/95 px-2 py-1 text-[10px] text-muted-foreground shadow-soft-1">
        <FileText className="h-3 w-3" /> XeLaTeX · Inter · Charter
      </div>
    </div>
  );
}
