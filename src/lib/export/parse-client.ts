"use client";

import type { Language, ResumeData } from "@/types/resume";

export async function parseLinkedInPdfClient(
  file: File,
  language: Language,
): Promise<ResumeData> {
  const form = new FormData();
  form.append("file", file);
  form.append("language", language);
  const res = await fetch("/api/parse-linkedin", { method: "POST", body: form });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Parse failed (${res.status})`);
  }
  return (await res.json()) as ResumeData;
}
