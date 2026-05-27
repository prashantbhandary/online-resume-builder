import type { ResumeData } from "@/types/resume";
import { dict } from "@/lib/i18n";
import { formatDateRange } from "@/lib/utils";

export const labels = (d: ResumeData) => dict(d.language).sections;

export function range(start?: string, end?: string, current?: boolean, lang: "en" | "ja" = "en") {
  return formatDateRange(start, end, current, lang);
}

export function joinLinks(d: ResumeData) {
  const out: string[] = [];
  if (d.personal.email) out.push(d.personal.email);
  if (d.personal.phone) out.push(d.personal.phone);
  if (d.personal.location) out.push(d.personal.location);
  if (d.personal.website) out.push(d.personal.website);
  if (d.personal.linkedin) out.push(d.personal.linkedin);
  if (d.personal.github) out.push(d.personal.github);
  return out.join(" · ");
}

export function listBullets(s: string[]) {
  return s.map((b) => b.trim()).filter(Boolean);
}
