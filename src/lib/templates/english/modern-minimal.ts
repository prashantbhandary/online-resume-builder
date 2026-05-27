import type { ResumeData } from "@/types/resume";
import { tex, texRange } from "../escape";
import { dict } from "@/lib/i18n";

export function renderModernMinimal(d: ResumeData): string {
  const t = dict("en").sections;
  const p = d.personal;
  const paper = d.paper === "a4" ? "a4paper" : "letterpaper";

  const links = [p.email, p.phone, p.location, p.website, p.linkedin, p.github]
    .filter(Boolean)
    .map((x) => tex(x as string))
    .join(" \\textperiodcentered{} ");

  const sections: string[] = [];

  if (d.summary) {
    sections.push(section(t.summary, `${tex(d.summary)}`));
  }

  if (d.experience.length) {
    const body = d.experience
      .map((e) => {
        const head = `\\textbf{${tex(e.role)}} \\textperiodcentered{} ${tex(e.company)}`;
        const meta = `${texRange(e.startDate, e.endDate, e.current, "en")}${e.location ? " \\textperiodcentered{} " + tex(e.location) : ""}`;
        const bullets = e.bullets
          .map((b) => b.trim())
          .filter(Boolean)
          .map((b) => `\\item ${tex(b)}`)
          .join("\n");
        return `\\entry{${head}}{${meta}}${
          bullets ? `\n\\begin{itemize}\n${bullets}\n\\end{itemize}` : ""
        }`;
      })
      .join("\n\\smallskip\n");
    sections.push(section(t.experience, body));
  }

  if (d.education.length) {
    const body = d.education
      .map((e) => {
        const head = `\\textbf{${tex(e.institution)}} \\textperiodcentered{} ${tex(e.degree)}${
          e.field ? `, ${tex(e.field)}` : ""
        }`;
        const meta = `${texRange(e.startDate, e.endDate, false, "en")}${e.location ? " \\textperiodcentered{} " + tex(e.location) : ""}`;
        const meta2 = [
          e.gpa ? `GPA ${tex(e.gpa)}` : "",
          e.details ? tex(e.details) : "",
        ]
          .filter(Boolean)
          .join(" \\textperiodcentered{} ");
        return `\\entry{${head}}{${meta}}${meta2 ? `\n\\smallnote{${meta2}}` : ""}`;
      })
      .join("\n\\smallskip\n");
    sections.push(section(t.education, body));
  }

  if (d.skills.length) {
    const rows = d.skills
      .map(
        (g) =>
          `\\textbf{${tex(g.category)}} & ${tex(g.items.join(" \\textperiodcentered{} "))}`,
      )
      .map((r) => `${r} \\\\`)
      .join("\n");
    const body = `\\begin{tabular}{@{}p{0.22\\linewidth} p{0.74\\linewidth}@{}}\n${rows}\n\\end{tabular}`;
    sections.push(section(t.skills, body));
  }

  if (d.projects.length) {
    const body = d.projects
      .map((pr) => {
        const head = `\\textbf{${tex(pr.name)}}${pr.role ? ` \\textperiodcentered{} ${tex(pr.role)}` : ""}`;
        const meta = pr.link ? tex(pr.link) : "";
        const stack = pr.stack && pr.stack.length ? `\\smallnote{${tex(pr.stack.join(", "))}}` : "";
        const bullets = pr.bullets
          .map((b) => b.trim())
          .filter(Boolean)
          .map((b) => `\\item ${tex(b)}`)
          .join("\n");
        return `\\entry{${head}}{${meta}}${stack ? `\n${stack}` : ""}${
          bullets ? `\n\\begin{itemize}\n${bullets}\n\\end{itemize}` : ""
        }`;
      })
      .join("\n\\smallskip\n");
    sections.push(section(t.projects, body));
  }

  if (d.certifications.length) {
    const rows = d.certifications
      .map(
        (c) =>
          `\\entry{\\textbf{${tex(c.name)}} \\textperiodcentered{} ${tex(c.issuer)}}{${texRange(c.date, "", false, "en")}}`,
      )
      .join("\n");
    sections.push(section(t.certifications, rows));
  }

  if (d.achievements.length) {
    const items = d.achievements
      .map(
        (a) =>
          `\\item \\textbf{${tex(a.title)}}${a.date ? ` \\textperiodcentered{} ${texRange(a.date, "", false, "en")}` : ""}${a.description ? ` -- ${tex(a.description)}` : ""}`,
      )
      .join("\n");
    sections.push(section(t.achievements, `\\begin{itemize}\n${items}\n\\end{itemize}`));
  }

  if (d.languages.length) {
    const txt = d.languages
      .map((l) => `${tex(l.language)} (${tex(l.proficiency)})`)
      .join(" \\textperiodcentered{} ");
    sections.push(section(t.languages, txt));
  }

  return `\\documentclass[11pt,${paper}]{article}

% Encoding & fonts (XeLaTeX)
\\usepackage{fontspec}
\\usepackage{geometry}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{xcolor}
\\usepackage{hyperref}

\\setmainfont{Charter}[
  UprightFont = *-Roman,
  BoldFont = *-Bold,
  ItalicFont = *-Italic,
  BoldItalicFont = *-BoldItalic,
  Ligatures = TeX,
]
\\setsansfont{Inter}[
  Ligatures = TeX,
]

\\geometry{margin=0.85in}
\\setlength{\\parindent}{0pt}
\\pagestyle{empty}

% Section heading
\\titleformat{\\section}
  {\\sffamily\\fontsize{9.5}{10}\\bfseries\\MakeUppercase}
  {}{0pt}{}[\\vspace{2pt}\\hrule]
\\titlespacing*{\\section}{0pt}{14pt}{6pt}

\\definecolor{muted}{HTML}{52525b}
\\hypersetup{colorlinks=true, urlcolor=muted, linkcolor=muted}

\\newcommand{\\entry}[2]{%
  \\noindent\\begin{minipage}[t]{0.72\\linewidth}\\raggedright #1\\end{minipage}%
  \\hfill\\begin{minipage}[t]{0.26\\linewidth}\\raggedleft\\small\\color{muted} #2\\end{minipage}\\vspace{1pt}\\par
}
\\newcommand{\\smallnote}[1]{{\\small\\color{muted} #1\\par}}

\\setlist[itemize]{leftmargin=*, label=\\textendash, topsep=2pt, itemsep=1pt, parsep=0pt}

\\begin{document}

% Header
\\begin{center}
  {\\sffamily\\fontsize{20}{22}\\bfseries ${tex(p.fullName || "Your Name")}}\\\\[2pt]
  {\\sffamily\\fontsize{9}{10}\\selectfont\\MakeUppercase{${tex(p.headline || "")}}}\\\\[3pt]
  {\\small\\color{muted} ${links}}
\\end{center}
\\vspace{4pt}\\hrule\\vspace{-6pt}

${sections.join("\n\n")}

\\end{document}
`;
}

function section(title: string, body: string): string {
  return `\\section*{${tex(title)}}
${body}`;
}
