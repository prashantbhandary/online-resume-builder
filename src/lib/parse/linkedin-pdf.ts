import type { Language, ResumeData } from "@/types/resume";
import { uid } from "@/lib/utils";
import { emptyResume } from "@/lib/sample-data";

/**
 * Heuristic LinkedIn PDF text → ResumeData parser.
 *
 * LinkedIn's "Save to PDF" output is fairly stable: sections appear in fixed
 * order, headings are on their own line, and entries follow a "Title \n
 * Company · Type \n Dates" pattern. We support both English and Japanese exports.
 */

const EN_HEADINGS = [
  "Contact",
  "Top Skills",
  "Languages",
  "Certifications",
  "Honors-Awards",
  "Honors & Awards",
  "Publications",
  "Patents",
  "Summary",
  "Experience",
  "Education",
  "Projects",
  "Skills",
  "Accomplishments",
] as const;

const JA_HEADINGS = [
  "連絡先",
  "スキル",
  "言語",
  "資格",
  "受賞",
  "出版",
  "特許",
  "概要",
  "職務経歴",
  "学歴",
  "プロジェクト",
] as const;

const ALL_HEADINGS = [...EN_HEADINGS, ...JA_HEADINGS];

export async function parseLinkedInPdfBuffer(
  buffer: Buffer,
  language: Language,
): Promise<ResumeData> {
  // pdf-parse exports a CJS function; import dynamically to avoid bundling traps.
  const pdfParse = (await import("pdf-parse")).default;
  const result = await pdfParse(buffer);
  const raw = (result.text || "").replace(/\r/g, "");
  const lines = raw.split("\n").map((l) => l.trim());

  const sections = splitSections(lines);

  const data: ResumeData = emptyResume(language);

  // Name + headline are typically on the first non-empty lines before any heading.
  const headerLines = takeHeaderLines(lines);
  if (headerLines.length > 0) {
    data.personal.fullName = headerLines[0] || "";
    data.personal.headline = headerLines[1] || "";
  }

  // Contact / location heuristics.
  const contactBlock = sections["Contact"] ?? sections["連絡先"] ?? [];
  for (const line of contactBlock) {
    if (!data.personal.email && /[\w.+-]+@[\w-]+\.[\w.-]+/.test(line)) {
      data.personal.email = line.match(/[\w.+-]+@[\w-]+\.[\w.-]+/)?.[0] ?? "";
    } else if (!data.personal.linkedin && line.toLowerCase().includes("linkedin.com/")) {
      data.personal.linkedin = line;
    } else if (!data.personal.website && /https?:\/\//i.test(line)) {
      data.personal.website = line;
    }
  }
  // LinkedIn often puts city under the headline at the top.
  const locationGuess = headerLines.find((l) =>
    /^[^@]+(,|・| - )/.test(l) && l !== data.personal.fullName && l !== data.personal.headline,
  );
  if (locationGuess) data.personal.location = locationGuess;

  // Summary
  const summary = sections["Summary"] ?? sections["概要"] ?? [];
  if (summary.length) data.summary = summary.join(" ").trim();

  // Experience
  const exp = sections["Experience"] ?? sections["職務経歴"] ?? [];
  data.experience = parseExperience(exp);

  // Education
  const edu = sections["Education"] ?? sections["学歴"] ?? [];
  data.education = parseEducation(edu);

  // Skills
  const skills =
    sections["Top Skills"] ??
    sections["Skills"] ??
    sections["スキル"] ??
    [];
  if (skills.length) {
    data.skills = [
      {
        id: uid("sk"),
        category: language === "ja" ? "スキル" : "Skills",
        items: skills
          .flatMap((s) => s.split(/[•·、,]/g))
          .map((s) => s.trim())
          .filter(Boolean),
      },
    ];
  }

  // Certifications
  const certs = sections["Certifications"] ?? sections["資格"] ?? [];
  data.certifications = parseCertifications(certs);

  // Languages
  const langs = sections["Languages"] ?? sections["言語"] ?? [];
  data.languages = parseLanguages(langs);

  // Projects
  const projects = sections["Projects"] ?? sections["プロジェクト"] ?? [];
  data.projects = parseProjects(projects);

  return data;
}

function takeHeaderLines(lines: string[]): string[] {
  const out: string[] = [];
  for (const line of lines) {
    if (!line) continue;
    if (ALL_HEADINGS.some((h) => h.toLowerCase() === line.toLowerCase())) break;
    out.push(line);
    if (out.length >= 5) break;
  }
  return out;
}

function splitSections(lines: string[]): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  let current: string | null = null;
  for (const line of lines) {
    if (!line) continue;
    const match = ALL_HEADINGS.find((h) => h.toLowerCase() === line.toLowerCase());
    if (match) {
      current = match;
      if (!out[current]) out[current] = [];
      continue;
    }
    if (current) out[current].push(line);
  }
  return out;
}

const DATE_RANGE =
  /(?<start>(?:[A-Z][a-z]+\.?\s+\d{4}|\d{4}年\d{1,2}月|\d{4}))\s*[–—\-–~〜]\s*(?<end>(?:Present|現在|[A-Z][a-z]+\.?\s+\d{4}|\d{4}年\d{1,2}月|\d{4}))/u;

function normalizeMonthYear(token: string | undefined): string {
  if (!token) return "";
  const present = /^(present|現在)$/i.test(token);
  if (present) return "";
  const en = /^([A-Za-z]+)\.?\s+(\d{4})$/.exec(token);
  if (en) {
    const map: Record<string, string> = {
      jan: "01",
      feb: "02",
      mar: "03",
      apr: "04",
      may: "05",
      jun: "06",
      jul: "07",
      aug: "08",
      sep: "09",
      sept: "09",
      oct: "10",
      nov: "11",
      dec: "12",
    };
    return `${en[2]}-${map[en[1].toLowerCase()] ?? "01"}`;
  }
  const ja = /^(\d{4})年(\d{1,2})月$/.exec(token);
  if (ja) return `${ja[1]}-${ja[2].padStart(2, "0")}`;
  const yr = /^(\d{4})$/.exec(token);
  if (yr) return `${yr[1]}-01`;
  return token;
}

function parseExperience(lines: string[]): ResumeData["experience"] {
  // Group lines into entries — each entry starts with a non-date line followed
  // by a "Company · Type" or company line, then a date range.
  const entries: ResumeData["experience"] = [];
  let buffer: string[] = [];
  const flush = () => {
    if (!buffer.length) return;
    const [role = "", companyLine = "", dateLine = "", ...rest] = buffer;
    const dateMatch = DATE_RANGE.exec(dateLine);
    const startDate = normalizeMonthYear(dateMatch?.groups?.start);
    const rawEnd = dateMatch?.groups?.end ?? "";
    const current = /^(present|現在)$/i.test(rawEnd);
    const endDate = current ? "" : normalizeMonthYear(rawEnd);
    const company = companyLine.split("·")[0]?.trim() ?? companyLine;
    const bullets = rest
      .map((r) => r.replace(/^[•·\-•]\s*/, "").trim())
      .filter((l) => l && !DATE_RANGE.test(l));
    entries.push({
      id: uid("exp"),
      company,
      role,
      location: "",
      startDate,
      endDate,
      current,
      bullets: bullets.length ? bullets : [""],
    });
    buffer = [];
  };

  for (const line of lines) {
    if (DATE_RANGE.test(line) && buffer.length >= 2) {
      buffer.push(line);
      // Don't flush yet — bullets may follow on the next lines.
    } else if (buffer.length === 0 || (buffer.length === 1 && !DATE_RANGE.test(buffer[0]))) {
      buffer.push(line);
    } else if (buffer.length >= 3 && /^(?:Page|©|LinkedIn)/i.test(line)) {
      flush();
    } else if (buffer.length >= 3 && !DATE_RANGE.test(line) && line.length > 1) {
      // It's a bullet or continuation
      buffer.push(line);
    } else {
      // unrecognized — flush previous and start fresh
      flush();
      buffer.push(line);
    }
  }
  flush();
  return entries;
}

function parseEducation(lines: string[]): ResumeData["education"] {
  const out: ResumeData["education"] = [];
  let buffer: string[] = [];
  const flush = () => {
    if (!buffer.length) return;
    const [institution = "", degree = "", dateLine = "", ...rest] = buffer;
    const m = DATE_RANGE.exec(dateLine);
    out.push({
      id: uid("edu"),
      institution,
      degree: degree.replace(/^[•·\-]\s*/, ""),
      field: "",
      location: "",
      startDate: normalizeMonthYear(m?.groups?.start),
      endDate: normalizeMonthYear(m?.groups?.end),
      details: rest.join(" ").trim() || undefined,
    });
    buffer = [];
  };
  for (const line of lines) {
    if (DATE_RANGE.test(line) && buffer.length >= 2) {
      buffer.push(line);
    } else if (buffer.length < 2) {
      buffer.push(line);
    } else if (DATE_RANGE.test(line) || /^\d{4}\s*[–—\-–]\s*\d{4}$/.test(line)) {
      buffer.push(line);
    } else if (buffer.length >= 3) {
      buffer.push(line);
    } else {
      flush();
      buffer.push(line);
    }
    if (buffer.length >= 4) flush();
  }
  flush();
  return out;
}

function parseCertifications(lines: string[]): ResumeData["certifications"] {
  const out: ResumeData["certifications"] = [];
  let current: { name?: string; issuer?: string; date?: string } | null = null;
  const flush = () => {
    if (current?.name) {
      out.push({
        id: uid("cert"),
        name: current.name,
        issuer: current.issuer ?? "",
        date: current.date,
      });
    }
    current = null;
  };
  for (const line of lines) {
    const dateMatch = /^(?:Issued|発行)?\s*([A-Z][a-z]+\.?\s+\d{4}|\d{4}年\d{1,2}月|\d{4})$/.exec(line);
    if (dateMatch) {
      if (current) current.date = normalizeMonthYear(dateMatch[1]);
      continue;
    }
    if (!current) {
      current = { name: line };
    } else if (!current.issuer) {
      current.issuer = line;
    } else {
      flush();
      current = { name: line };
    }
  }
  flush();
  return out;
}

function parseLanguages(lines: string[]): ResumeData["languages"] {
  const out: ResumeData["languages"] = [];
  for (const line of lines) {
    const m = /^([^()（）]+?)\s*[（(](.+?)[)）]$/.exec(line);
    if (m) {
      out.push({ id: uid("lng"), language: m[1].trim(), proficiency: m[2].trim() });
    } else if (line) {
      out.push({ id: uid("lng"), language: line.trim(), proficiency: "" });
    }
  }
  return out;
}

function parseProjects(lines: string[]): ResumeData["projects"] {
  const out: ResumeData["projects"] = [];
  let buffer: string[] = [];
  const flush = () => {
    if (!buffer.length) return;
    const [name = "", ...rest] = buffer;
    out.push({
      id: uid("prj"),
      name,
      role: "",
      link: rest.find((l) => /https?:\/\//.test(l)) ?? "",
      bullets: rest.filter((l) => !/https?:\/\//.test(l)).map((l) => l.replace(/^[•·\-]\s*/, "")),
    });
    buffer = [];
  };
  for (const line of lines) {
    if (DATE_RANGE.test(line)) {
      flush();
      continue;
    }
    buffer.push(line);
    if (buffer.length >= 5) flush();
  }
  flush();
  return out;
}
