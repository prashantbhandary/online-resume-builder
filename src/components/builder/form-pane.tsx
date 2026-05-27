"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/lib/store/ui-store";
import { PersonalInfoForm } from "./forms/personal-info-form";
import { SummaryForm } from "./forms/summary-form";
import { ExperienceForm } from "./forms/experience-form";
import { EducationForm } from "./forms/education-form";
import { SkillsForm } from "./forms/skills-form";
import { ProjectsForm } from "./forms/projects-form";
import { CertificationsForm } from "./forms/certifications-form";
import { AchievementsForm } from "./forms/achievements-form";
import { LanguagesForm } from "./forms/languages-form";

const SECTION_COMPONENTS = {
  personal: PersonalInfoForm,
  summary: SummaryForm,
  experience: ExperienceForm,
  education: EducationForm,
  skills: SkillsForm,
  projects: ProjectsForm,
  certifications: CertificationsForm,
  achievements: AchievementsForm,
  languages: LanguagesForm,
} as const;

export function FormPane() {
  const active = useUIStore((s) => s.activeSection);
  const Section = SECTION_COMPONENTS[active];
  return (
    <div className="flex h-full flex-1 flex-col overflow-y-auto bg-secondary/30 scrollbar-fine">
      <div className="mx-auto w-full max-w-2xl px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <Section />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
