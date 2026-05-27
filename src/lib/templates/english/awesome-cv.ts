import type { ResumeData } from "@/types/resume";
import { tex, texRange } from "../escape";
import { dict } from "@/lib/i18n";

export function renderAwesomeCV(d: ResumeData): string {
  const t = dict("en").sections;
  const p = d.personal;
  const paper = d.paper === "a4" ? "a4paper" : "letterpaper";

  const contactLines = [
    p.location,
    p.phone,
    p.email,
    p.website,
    p.linkedin,
    p.github,
  ]
    .filter(Boolean)
    .map((x) => tex(x as string));

  const sections: string[] = [];

  if (d.summary) {
    sections.push(section(t.summary, `{\\itshape ${tex(d.summary)}}`));
  }

  if (d.experience.length) {
    const body = d.experience
      .map((e) => {
        const bullets = e.bullets
          .map((b) => b.trim())
          .filter(Boolean)
          .map((b) => `\\item ${tex(b)}`)
          .join("\n");
        return `\\cventry{${tex(e.company)}}{${tex(e.role)}}{${tex(e.location || "")}}{${texRange(e.startDate, e.endDate, e.current, "en")}}${
          bullets ? `\n\\begin{itemize}\n${bullets}\n\\end{itemize}` : ""
        }`;
      })
      .join("\n\\smallskip\n");
    sections.push(section(t.experience, body));
  }

  if (d.education.length) {
    const body = d.education
      .map((e) => {
        const sub = [e.degree, e.field, e.gpa ? `GPA ${e.gpa}` : ""]
          .filter(Boolean)
          .map((x) => tex(x as string))
          .join(", ");
        return `\\cventry{${tex(e.institution)}}{${sub}}{${tex(e.location || "")}}{${texRange(e.startDate, e.endDate, false, "en")}}${
          e.details ? `\n{\\small\\color{muted} ${tex(e.details)}}` : ""
        }`;
      })
      .join("\n\\smallskip\n");
    sections.push(section(t.education, body));
  }

  if (d.skills.length) {
    const rows = d.skills
      .map(
        (g) =>
          `\\cvskill{${tex(g.category)}}{${tex(g.items.join(", "))}}`,
      )
      .join("\n");
    sections.push(section(t.skills, rows));
  }

  if (d.projects.length) {
    const body = d.projects
      .map((pr) => {
        const meta = [pr.role, pr.stack && pr.stack.length ? pr.stack.join(", ") : ""]
          .filter(Boolean)
          .map((x) => tex(x as string))
          .join(" / ");
        const bullets = pr.bullets
          .map((b) => b.trim())
          .filter(Boolean)
          .map((b) => `\\item ${tex(b)}`)
          .join("\n");
        return `\\cventry{${tex(pr.name)}}{${meta}}{${pr.link ? tex(pr.link) : ""}}{${texRange(pr.startDate, pr.endDate, false, "en")}}${
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
          `\\cventry{${tex(c.name)}}{\\textit{${tex(c.issuer)}}}{}{${texRange(c.date, "", false, "en")}}`,
      )
      .join("\n");
    sections.push(section(t.certifications, rows));
  }

  if (d.achievements.length) {
    const items = d.achievements
      .map(
        (a) =>
          `\\item \\textbf{${tex(a.title)}}${a.date ? ` \\textendash{} ${texRange(a.date, "", false, "en")}` : ""}${a.description ? `. ${tex(a.description)}` : ""}`,
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

\\usepackage{fontspec}
\\usepackage{geometry}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{xcolor}
\\usepackage{hyperref}
\\usepackage{tabularx}

\\setmainfont{Source Sans 3}[
  Ligatures = TeX,
  UprightFont = * Regular,
  BoldFont = * Bold,
  ItalicFont = * Italic,
]
\\setsansfont{Source Sans 3}[Ligatures = TeX]

\\geometry{margin=0.75in}
\\setlength{\\parindent}{0pt}
\\pagestyle{empty}

\\definecolor{ink}{HTML}{111111}
\\definecolor{muted}{HTML}{52525b}
\\hypersetup{colorlinks=true, urlcolor=muted, linkcolor=muted}

\\titleformat{\\section}
  {\\Large\\bfseries\\color{ink}\\MakeUppercase}
  {}{0pt}{}[\\vspace{2pt}\\titlerule]
\\titlespacing*{\\section}{0pt}{14pt}{6pt}

\\newcommand{\\cventry}[4]{%
  {\\noindent\\textbf{#1}\\hfill{\\small\\color{muted} #4}\\par
   {\\itshape #2}\\hfill{\\small\\color{muted} #3}\\par}\\vspace{1pt}%
}
\\newcommand{\\cvskill}[2]{%
  \\noindent\\begin{minipage}[t]{0.25\\linewidth}\\raggedright\\textbf{#1}\\end{minipage}%
  \\hfill\\begin{minipage}[t]{0.73\\linewidth}\\raggedright #2\\end{minipage}\\par\\vspace{2pt}%
}

\\setlist[itemize]{leftmargin=*, label=\\textbullet, topsep=2pt, itemsep=1pt, parsep=0pt}

\\begin{document}

% Header
\\begin{minipage}[t]{0.62\\linewidth}\\raggedright
  {\\fontsize{26}{28}\\selectfont ${tex((p.fullName || "Your Name").toUpperCase())}}\\\\[2pt]
  {\\large\\itshape ${tex(p.headline || "")}}
\\end{minipage}\\hfill
\\begin{minipage}[t]{0.34\\linewidth}\\raggedleft\\small\\color{muted}
  ${contactLines.join(" \\\\ ")}
\\end{minipage}\\par\\vspace{4pt}
\\noindent\\rule{\\linewidth}{1pt}

${sections.join("\n\n")}

\\end{document}
`;
}

function section(title: string, body: string): string {
  return `\\section*{${tex(title)}}
${body}`;
}
