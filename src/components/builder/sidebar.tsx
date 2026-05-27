"use client";

import {
  User2,
  AlignLeft,
  Briefcase,
  GraduationCap,
  Hammer,
  FolderGit2,
  BadgeCheck,
  Trophy,
  Languages as LanguagesIcon,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useShallow } from "zustand/react/shallow";
import { useResumeStore } from "@/lib/store/resume-store";
import { useUIStore } from "@/lib/store/ui-store";
import { dict } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";
import type { SectionKey } from "@/types/resume";

const ICONS: Record<SectionKey, LucideIcon> = {
  personal: User2,
  summary: AlignLeft,
  experience: Briefcase,
  education: GraduationCap,
  skills: Hammer,
  projects: FolderGit2,
  certifications: BadgeCheck,
  achievements: Trophy,
  languages: LanguagesIcon,
};

const ORDER: SectionKey[] = [
  "personal",
  "summary",
  "experience",
  "education",
  "skills",
  "projects",
  "certifications",
  "achievements",
  "languages",
];

export function Sidebar() {
  const language = useResumeStore((s) => s.data.language);
  const counts = useResumeStore(
    useShallow((s) => ({
      experience: s.data.experience.length,
      education: s.data.education.length,
      skills: s.data.skills.length,
      projects: s.data.projects.length,
      certifications: s.data.certifications.length,
      achievements: s.data.achievements.length,
      languages: s.data.languages.length,
    })),
  );
  const active = useUIStore((s) => s.activeSection);
  const setActive = useUIStore((s) => s.setActiveSection);
  const t = dict(language);

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-border bg-background">
      <div className="flex h-14 items-center border-b border-border px-4">
        <Logo />
      </div>
      <nav className="flex-1 overflow-y-auto p-3 scrollbar-fine">
        <div className="px-2 pb-2 pt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Sections
        </div>
        <ul className="space-y-0.5">
          {ORDER.map((key) => {
            const Icon = ICONS[key];
            const isActive = active === key;
            const count =
              key === "personal" || key === "summary"
                ? null
                : (counts as Record<string, number>)[key];
            return (
              <li key={key}>
                <button
                  onClick={() => setActive(key)}
                  className={cn(
                    "group flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] transition-colors",
                    isActive
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-3.5 w-3.5",
                      isActive ? "text-foreground" : "text-muted-foreground",
                    )}
                  />
                  <span className="flex-1 text-left">{t.sections[key]}</span>
                  {count !== null && count > 0 && (
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-px text-[10px]",
                        isActive
                          ? "bg-ink-900 text-white"
                          : "bg-ink-100 text-muted-foreground",
                      )}
                    >
                      {count}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="border-t border-border p-3">
        <Link
          href="/"
          className="block rounded-md px-2.5 py-1.5 text-[12px] text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          ← {t.ui.backHome}
        </Link>
      </div>
    </aside>
  );
}
