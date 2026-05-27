import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export function formatDateRange(start?: string, end?: string, current?: boolean, lang: "en" | "ja" = "en") {
  const present = lang === "ja" ? "現在" : "Present";
  const dash = " – ";
  if (!start && !end) return "";
  const s = formatDate(start, lang);
  const e = current ? present : formatDate(end, lang);
  if (s && e) return `${s}${dash}${e}`;
  return s || e || "";
}

export function formatDate(value?: string, lang: "en" | "ja" = "en") {
  if (!value) return "";
  // Accept ISO YYYY-MM or YYYY-MM-DD; gracefully handle plain text.
  const m = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(value);
  if (!m) return value;
  const year = m[1];
  const month = Number(m[2]);
  if (lang === "ja") {
    return `${year}年${month}月`;
  }
  const monthNamesEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${monthNamesEn[month - 1]} ${year}`;
}
