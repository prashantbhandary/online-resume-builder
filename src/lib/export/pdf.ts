"use client";

import type { ResumeData } from "@/types/resume";
import { renderLatex } from "@/lib/templates";
import { download } from "./json";

function fileBase(data: ResumeData): string {
  const name = (data.personal.fullName || "resume").replace(/\s+/g, "-").toLowerCase();
  return `${name}-${data.language}`;
}

export async function downloadPdf(data: ResumeData): Promise<void> {
  const tex = renderLatex(data);
  const res = await fetch("/api/compile", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ tex, engine: "xelatex" }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `PDF compile failed (${res.status})`);
  }
  const blob = await res.blob();
  download(blob, `${fileBase(data)}.pdf`);
}
