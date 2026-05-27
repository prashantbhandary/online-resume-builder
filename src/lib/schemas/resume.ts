import { z } from "zod";

export const personalSchema = z.object({
  fullName: z.string().min(1, "Required"),
  headline: z.string().min(1, "Required"),
  email: z.string().email("Invalid email").or(z.literal("")),
  phone: z.string().optional().default(""),
  location: z.string().optional().default(""),
  website: z.string().url().or(z.literal("")).optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
});

export const experienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1),
  role: z.string().min(1),
  location: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  current: z.boolean(),
  bullets: z.array(z.string()),
});

export const educationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1),
  degree: z.string().min(1),
  field: z.string().optional(),
  location: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  details: z.string().optional(),
  gpa: z.string().optional(),
});

export const skillGroupSchema = z.object({
  id: z.string(),
  category: z.string().min(1),
  items: z.array(z.string()),
});

export const projectSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  role: z.string().optional(),
  link: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  bullets: z.array(z.string()),
  stack: z.array(z.string()).optional(),
});

export const certificationSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  issuer: z.string().min(1),
  date: z.string().optional(),
  link: z.string().optional(),
});

export const achievementSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  date: z.string().optional(),
  description: z.string().optional(),
});

export const languageSchema = z.object({
  id: z.string(),
  language: z.string().min(1),
  proficiency: z.string().min(1),
});

export const resumeSchema = z.object({
  language: z.enum(["en", "ja"]),
  template: z.enum(["modern-minimal", "awesome-cv", "academic", "shokumu-modern"]),
  paper: z.enum(["letter", "a4"]),
  personal: personalSchema,
  summary: z.string(),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  skills: z.array(skillGroupSchema),
  projects: z.array(projectSchema),
  certifications: z.array(certificationSchema),
  achievements: z.array(achievementSchema),
  languages: z.array(languageSchema),
});

export type ResumeSchema = z.infer<typeof resumeSchema>;
