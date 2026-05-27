/**
 * Escape strings safely for LaTeX.
 * Order matters — backslash must be first.
 */
export function tex(input: string | undefined | null): string {
  if (!input) return "";
  return input
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/&/g, "\\&")
    .replace(/%/g, "\\%")
    .replace(/\$/g, "\\$")
    .replace(/#/g, "\\#")
    .replace(/_/g, "\\_")
    .replace(/\{/g, "\\{")
    .replace(/\}/g, "\\}")
    .replace(/~/g, "\\textasciitilde{}")
    .replace(/\^/g, "\\textasciicircum{}")
    // Preserve user newlines as paragraph breaks where applicable
    .replace(/\r\n/g, "\n");
}

export function texMulti(lines: string[]): string {
  return lines.map((l) => tex(l)).join(" \\\\ ");
}

/** Format date range for LaTeX with the right phrase for the resume language. */
export function texRange(
  start?: string,
  end?: string,
  current?: boolean,
  lang: "en" | "ja" = "en",
): string {
  const fmt = (v?: string) => {
    if (!v) return "";
    const m = /^(\d{4})-(\d{2})/.exec(v);
    if (!m) return v;
    const year = m[1];
    const month = Number(m[2]);
    if (lang === "ja") return `${year}年${month}月`;
    return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][month - 1] + " " + year;
  };
  const present = lang === "ja" ? "現在" : "Present";
  const s = fmt(start);
  const e = current ? present : fmt(end);
  if (s && e) return `${s} -- ${e}`;
  return s || e || "";
}
