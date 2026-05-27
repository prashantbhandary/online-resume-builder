"use client";

import type { ResumeData } from "@/types/resume";
import { resumeSchema } from "@/lib/schemas/resume";

function fileBase(data: ResumeData): string {
  const name = (data.personal.fullName || "resume").replace(/\s+/g, "-").toLowerCase();
  return `${name}-${data.language}`;
}

export function exportJson(data: ResumeData) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  download(blob, `${fileBase(data)}.json`);
}

export async function importJsonFromFile(file: File): Promise<ResumeData> {
  const text = await file.text();
  const raw = JSON.parse(text);
  const parsed = resumeSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(parsed.error.errors[0]?.message ?? "Invalid resume JSON");
  }
  return parsed.data;
}

export function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
