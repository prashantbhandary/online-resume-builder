"use client";

import type { ResumeData } from "@/types/resume";
import { renderLatex } from "@/lib/templates";
import { download } from "./json";

function fileBase(data: ResumeData): string {
  const name = (data.personal.fullName || "resume").replace(/\s+/g, "-").toLowerCase();
  return `${name}-${data.language}`;
}

export function buildTex(data: ResumeData): string {
  return renderLatex(data);
}

export function downloadTex(data: ResumeData) {
  const text = buildTex(data);
  const blob = new Blob([text], { type: "application/x-tex" });
  download(blob, `${fileBase(data)}.tex`);
}
