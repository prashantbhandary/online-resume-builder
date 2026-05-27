"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  ResumeData,
  Language,
  TemplateId,
  PaperSize,
  ExperienceEntry,
  EducationEntry,
  SkillGroup,
  ProjectEntry,
  CertificationEntry,
  AchievementEntry,
  LanguageEntry,
  PersonalInfo,
} from "@/types/resume";
import { emptyResume, sampleResumeEN, sampleResumeJA } from "@/lib/sample-data";
import { uid } from "@/lib/utils";

interface ResumeState {
  data: ResumeData;
  lastSavedAt: number | null;
  setData: (data: ResumeData) => void;
  setLanguage: (language: Language) => void;
  setTemplate: (template: TemplateId) => void;
  setPaper: (paper: PaperSize) => void;
  setPersonal: (patch: Partial<PersonalInfo>) => void;
  setSummary: (summary: string) => void;
  // experience
  addExperience: () => void;
  updateExperience: (id: string, patch: Partial<ExperienceEntry>) => void;
  removeExperience: (id: string) => void;
  moveExperience: (id: string, direction: -1 | 1) => void;
  // education
  addEducation: () => void;
  updateEducation: (id: string, patch: Partial<EducationEntry>) => void;
  removeEducation: (id: string) => void;
  moveEducation: (id: string, direction: -1 | 1) => void;
  // skills
  addSkillGroup: () => void;
  updateSkillGroup: (id: string, patch: Partial<SkillGroup>) => void;
  removeSkillGroup: (id: string) => void;
  // projects
  addProject: () => void;
  updateProject: (id: string, patch: Partial<ProjectEntry>) => void;
  removeProject: (id: string) => void;
  moveProject: (id: string, direction: -1 | 1) => void;
  // certifications
  addCertification: () => void;
  updateCertification: (id: string, patch: Partial<CertificationEntry>) => void;
  removeCertification: (id: string) => void;
  // achievements
  addAchievement: () => void;
  updateAchievement: (id: string, patch: Partial<AchievementEntry>) => void;
  removeAchievement: (id: string) => void;
  // languages
  addLanguage: () => void;
  updateLanguage: (id: string, patch: Partial<LanguageEntry>) => void;
  removeLanguage: (id: string) => void;
  // bulk
  loadSample: (language: Language) => void;
  reset: (language?: Language) => void;
  importData: (data: ResumeData) => void;
}

function moveItem<T extends { id: string }>(arr: T[], id: string, dir: -1 | 1): T[] {
  const idx = arr.findIndex((x) => x.id === id);
  if (idx === -1) return arr;
  const target = idx + dir;
  if (target < 0 || target >= arr.length) return arr;
  const copy = arr.slice();
  const [item] = copy.splice(idx, 1);
  copy.splice(target, 0, item);
  return copy;
}

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      data: sampleResumeEN(),
      lastSavedAt: null,
      setData: (data) => set({ data, lastSavedAt: Date.now() }),
      setLanguage: (language) =>
        set((s) => ({
          data: {
            ...s.data,
            language,
            template:
              language === "ja" && s.data.template !== "shokumu-modern"
                ? "shokumu-modern"
                : language === "en" && s.data.template === "shokumu-modern"
                  ? "modern-minimal"
                  : s.data.template,
            paper: language === "ja" ? "a4" : s.data.paper,
          },
          lastSavedAt: Date.now(),
        })),
      setTemplate: (template) =>
        set((s) => ({ data: { ...s.data, template }, lastSavedAt: Date.now() })),
      setPaper: (paper) => set((s) => ({ data: { ...s.data, paper }, lastSavedAt: Date.now() })),
      setPersonal: (patch) =>
        set((s) => ({
          data: { ...s.data, personal: { ...s.data.personal, ...patch } },
          lastSavedAt: Date.now(),
        })),
      setSummary: (summary) => set((s) => ({ data: { ...s.data, summary }, lastSavedAt: Date.now() })),

      addExperience: () =>
        set((s) => ({
          data: {
            ...s.data,
            experience: [
              ...s.data.experience,
              {
                id: uid("exp"),
                company: "",
                role: "",
                location: "",
                startDate: "",
                endDate: "",
                current: false,
                bullets: [""],
              },
            ],
          },
          lastSavedAt: Date.now(),
        })),
      updateExperience: (id, patch) =>
        set((s) => ({
          data: {
            ...s.data,
            experience: s.data.experience.map((e) => (e.id === id ? { ...e, ...patch } : e)),
          },
          lastSavedAt: Date.now(),
        })),
      removeExperience: (id) =>
        set((s) => ({
          data: { ...s.data, experience: s.data.experience.filter((e) => e.id !== id) },
          lastSavedAt: Date.now(),
        })),
      moveExperience: (id, direction) =>
        set((s) => ({
          data: { ...s.data, experience: moveItem(s.data.experience, id, direction) },
          lastSavedAt: Date.now(),
        })),

      addEducation: () =>
        set((s) => ({
          data: {
            ...s.data,
            education: [
              ...s.data.education,
              {
                id: uid("edu"),
                institution: "",
                degree: "",
                field: "",
                location: "",
                startDate: "",
                endDate: "",
                details: "",
              },
            ],
          },
          lastSavedAt: Date.now(),
        })),
      updateEducation: (id, patch) =>
        set((s) => ({
          data: {
            ...s.data,
            education: s.data.education.map((e) => (e.id === id ? { ...e, ...patch } : e)),
          },
          lastSavedAt: Date.now(),
        })),
      removeEducation: (id) =>
        set((s) => ({
          data: { ...s.data, education: s.data.education.filter((e) => e.id !== id) },
          lastSavedAt: Date.now(),
        })),
      moveEducation: (id, direction) =>
        set((s) => ({
          data: { ...s.data, education: moveItem(s.data.education, id, direction) },
          lastSavedAt: Date.now(),
        })),

      addSkillGroup: () =>
        set((s) => ({
          data: {
            ...s.data,
            skills: [...s.data.skills, { id: uid("sk"), category: "", items: [] }],
          },
          lastSavedAt: Date.now(),
        })),
      updateSkillGroup: (id, patch) =>
        set((s) => ({
          data: {
            ...s.data,
            skills: s.data.skills.map((g) => (g.id === id ? { ...g, ...patch } : g)),
          },
          lastSavedAt: Date.now(),
        })),
      removeSkillGroup: (id) =>
        set((s) => ({
          data: { ...s.data, skills: s.data.skills.filter((g) => g.id !== id) },
          lastSavedAt: Date.now(),
        })),

      addProject: () =>
        set((s) => ({
          data: {
            ...s.data,
            projects: [
              ...s.data.projects,
              {
                id: uid("prj"),
                name: "",
                role: "",
                link: "",
                startDate: "",
                endDate: "",
                bullets: [""],
                stack: [],
              },
            ],
          },
          lastSavedAt: Date.now(),
        })),
      updateProject: (id, patch) =>
        set((s) => ({
          data: {
            ...s.data,
            projects: s.data.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
          },
          lastSavedAt: Date.now(),
        })),
      removeProject: (id) =>
        set((s) => ({
          data: { ...s.data, projects: s.data.projects.filter((p) => p.id !== id) },
          lastSavedAt: Date.now(),
        })),
      moveProject: (id, direction) =>
        set((s) => ({
          data: { ...s.data, projects: moveItem(s.data.projects, id, direction) },
          lastSavedAt: Date.now(),
        })),

      addCertification: () =>
        set((s) => ({
          data: {
            ...s.data,
            certifications: [
              ...s.data.certifications,
              { id: uid("cert"), name: "", issuer: "", date: "", link: "" },
            ],
          },
          lastSavedAt: Date.now(),
        })),
      updateCertification: (id, patch) =>
        set((s) => ({
          data: {
            ...s.data,
            certifications: s.data.certifications.map((c) =>
              c.id === id ? { ...c, ...patch } : c,
            ),
          },
          lastSavedAt: Date.now(),
        })),
      removeCertification: (id) =>
        set((s) => ({
          data: {
            ...s.data,
            certifications: s.data.certifications.filter((c) => c.id !== id),
          },
          lastSavedAt: Date.now(),
        })),

      addAchievement: () =>
        set((s) => ({
          data: {
            ...s.data,
            achievements: [
              ...s.data.achievements,
              { id: uid("ach"), title: "", date: "", description: "" },
            ],
          },
          lastSavedAt: Date.now(),
        })),
      updateAchievement: (id, patch) =>
        set((s) => ({
          data: {
            ...s.data,
            achievements: s.data.achievements.map((a) => (a.id === id ? { ...a, ...patch } : a)),
          },
          lastSavedAt: Date.now(),
        })),
      removeAchievement: (id) =>
        set((s) => ({
          data: { ...s.data, achievements: s.data.achievements.filter((a) => a.id !== id) },
          lastSavedAt: Date.now(),
        })),

      addLanguage: () =>
        set((s) => ({
          data: {
            ...s.data,
            languages: [
              ...s.data.languages,
              { id: uid("lng"), language: "", proficiency: "" },
            ],
          },
          lastSavedAt: Date.now(),
        })),
      updateLanguage: (id, patch) =>
        set((s) => ({
          data: {
            ...s.data,
            languages: s.data.languages.map((l) => (l.id === id ? { ...l, ...patch } : l)),
          },
          lastSavedAt: Date.now(),
        })),
      removeLanguage: (id) =>
        set((s) => ({
          data: { ...s.data, languages: s.data.languages.filter((l) => l.id !== id) },
          lastSavedAt: Date.now(),
        })),

      loadSample: (language) =>
        set({
          data: language === "ja" ? sampleResumeJA() : sampleResumeEN(),
          lastSavedAt: Date.now(),
        }),
      reset: (language = "en") => set({ data: emptyResume(language), lastSavedAt: Date.now() }),
      importData: (data) => set({ data, lastSavedAt: Date.now() }),
    }),
    {
      name: "online-resume-builder:v1",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);
