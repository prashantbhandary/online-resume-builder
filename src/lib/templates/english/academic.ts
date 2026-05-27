import type { ResumeData } from "@/types/resume";
import { tex, texRange } from "../escape";
import { dict } from "@/lib/i18n";

export function renderAcademicCV(d: ResumeData): string {
  const t = dict("en").sections;
  const p = d.personal;
  const paper = d.paper === "a4" ? "a4paper" : "letterpaper";

  const meta = [p.location, p.email, p.phone, p.website]
    .filter(Boolean)
    .map((x) => tex(x as string))
    .join(" \\quad\\textbullet\\quad ");

  const sections: string[] = [];

  if (d.summary) {
    sections.push(section(t.summary, `${tex(d.summary)}`));
  }

  if (d.education.length) {
    const body = d.education
      .map((e) => {
        return `\\textbf{${tex(e.institution)}} \\hfill {\\small ${texRange(e.startDate, e.endDate, false, "en")}}\\\\
{\\itshape ${tex(e.degree)}${e.field ? `, ${tex(e.field)}` : ""}}${e.gpa ? `. GPA ${tex(e.gpa)}` : ""}.${
          e.details ? `\\\\\n{\\small ${tex(e.details)}}` : ""
        }`;
      })
      .join("\n\\smallskip\n");
    sections.push(section(t.education, body));
  }

  if (d.experience.length) {
    const body = d.experience
      .map((e) => {
        const bullets = e.bullets
          .map((b) => b.trim())
          .filter(Boolean)
          .map((b) => `\\item ${tex(b)}`)
          .join("\n");
        return `\\textbf{${tex(e.role)}}, {\\itshape ${tex(e.company)}} \\hfill {\\small ${texRange(e.startDate, e.endDate, e.current, "en")}}${
          bullets ? `\n\\begin{itemize}\n${bullets}\n\\end{itemize}` : ""
        }`;
      })
      .join("\n\\smallskip\n");
    sections.push(section(t.experience, body));
  }

  if (d.projects.length) {
    const body = d.projects
      .map((pr) => {
        const bullets = pr.bullets
          .map((b) => b.trim())
          .filter(Boolean)
          .map((b) => `\\item ${tex(b)}`)
          .join("\n");
        return `\\textbf{${tex(pr.name)}}${pr.role ? `, {\\itshape ${tex(pr.role)}}` : ""}${pr.link ? ` \\hfill {\\small ${tex(pr.link)}}` : ""}${
          bullets ? `\n\\begin{itemize}\n${bullets}\n\\end{itemize}` : ""
        }`;
      })
      .join("\n\\smallskip\n");
    sections.push(section(t.projects, body));
  }

  if (d.achievements.length) {
    const items = d.achievements
      .map(
        (a) =>
          `\\item \\textbf{${tex(a.title)}}${a.date ? ` (${texRange(a.date, "", false, "en")})` : ""}${a.description ? `. ${tex(a.description)}` : ""}`,
      )
      .join("\n");
    sections.push(section(t.achievements, `\\begin{itemize}\n${items}\n\\end{itemize}`));
  }

  if (d.certifications.length) {
    const items = d.certifications
      .map(
        (c) =>
          `\\item \\textbf{${tex(c.name)}}, ${tex(c.issuer)}${c.date ? `, ${texRange(c.date, "", false, "en")}` : ""}.`,
      )
      .join("\n");
    sections.push(section(t.certifications, `\\begin{itemize}\n${items}\n\\end{itemize}`));
  }

  if (d.skills.length) {
    const lines = d.skills
      .map((g) => `{\\itshape ${tex(g.category)}:} ${tex(g.items.join(", "))}.\\\\`)
      .join("\n");
    sections.push(section(t.skills, lines));
  }

  if (d.languages.length) {
    const txt = d.languages
      .map((l) => `${tex(l.language)} (${tex(l.proficiency)})`)
      .join("; ");
    sections.push(section(t.languages, `${txt}.`));
  }

  return `\\documentclass[11pt,${paper}]{article}

\\usepackage{fontspec}
\\usepackage{geometry}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{xcolor}
\\usepackage{hyperref}

\\setmainfont{Charter}[Ligatures = TeX]

\\geometry{margin=1in}
\\setlength{\\parindent}{14pt}
\\setlength{\\parskip}{2pt}
\\pagestyle{empty}

\\definecolor{muted}{HTML}{52525b}
\\hypersetup{colorlinks=true, urlcolor=muted, linkcolor=muted}

\\titleformat{\\section}
  {\\large\\itshape}
  {}{0pt}{}[\\vspace{-2pt}\\hrule\\vspace{2pt}]
\\titlespacing*{\\section}{0pt}{14pt}{4pt}

\\setlist[itemize]{leftmargin=*, label=\\textendash, topsep=2pt, itemsep=1pt, parsep=0pt}

\\begin{document}

\\begin{center}
  {\\fontsize{22}{24}\\selectfont ${tex(p.fullName || "Your Name")}}\\\\[2pt]
  {\\itshape ${tex(p.headline || "")}}\\\\[3pt]
  {\\small\\color{muted} ${meta}}
\\end{center}\\vspace{4pt}

${sections.join("\n\n")}

\\end{document}
`;
}

function section(title: string, body: string): string {
  return `\\section*{${tex(title)}}
${body}`;
}
