import type { ResumeData } from "@/types/resume";
import { tex, texRange } from "../escape";
import { dict } from "@/lib/i18n";

export function renderShokumuModern(d: ResumeData): string {
  const t = dict("ja").sections;
  const p = d.personal;
  const paper = "a4paper"; // Japanese resumes always A4

  const contactLines = [p.location, p.email, p.phone, p.website, p.linkedin, p.github]
    .filter(Boolean)
    .map((x) => tex(x as string));

  const sections: string[] = [];

  if (d.summary) {
    sections.push(section(t.summary, tex(d.summary)));
  }

  if (d.experience.length) {
    const body = d.experience
      .map((e) => {
        const bullets = e.bullets
          .map((b) => b.trim())
          .filter(Boolean)
          .map((b) => `\\item ${tex(b)}`)
          .join("\n");
        return `\\jpentry{${tex(e.company)}}{${tex(e.role)}}{${tex(e.location || "")}}{${texRange(e.startDate, e.endDate, e.current, "ja")}}${
          bullets ? `\n\\begin{itemize}\n${bullets}\n\\end{itemize}` : ""
        }`;
      })
      .join("\n\\medskip\n");
    sections.push(section(t.experience, body));
  }

  if (d.skills.length) {
    const rows = d.skills
      .map(
        (g) =>
          `\\textbf{${tex(g.category)}} & ${tex(g.items.join(" / "))} \\\\`,
      )
      .join("\n");
    sections.push(
      section(
        t.skills,
        `\\begin{tabular}{@{}p{0.2\\linewidth} p{0.76\\linewidth}@{}}\n${rows}\n\\end{tabular}`,
      ),
    );
  }

  if (d.projects.length) {
    const body = d.projects
      .map((pr) => {
        const head = `\\textbf{${tex(pr.name)}}${pr.role ? ` \\quad ${tex(pr.role)}` : ""}`;
        const stack = pr.stack && pr.stack.length ? `{\\small\\color{muted} ${tex(pr.stack.join(" / "))}}\\par` : "";
        const bullets = pr.bullets
          .map((b) => b.trim())
          .filter(Boolean)
          .map((b) => `\\item ${tex(b)}`)
          .join("\n");
        return `${head}\\hfill{\\small\\color{muted} ${pr.link ? tex(pr.link) : ""}}\\par
${stack}${bullets ? `\\begin{itemize}\n${bullets}\n\\end{itemize}` : ""}`;
      })
      .join("\n\\medskip\n");
    sections.push(section(t.projects, body));
  }

  if (d.certifications.length) {
    const rows = d.certifications
      .map(
        (c) =>
          `\\textbf{${tex(c.name)}} \\quad ${tex(c.issuer)} \\hfill {\\small\\color{muted} ${texRange(c.date, "", false, "ja")}}\\par`,
      )
      .join("\n");
    sections.push(section(t.certifications, rows));
  }

  if (d.education.length) {
    const rows = d.education
      .map(
        (e) =>
          `\\textbf{${tex(e.institution)}} \\quad ${tex(e.degree)}${e.field ? `  ${tex(e.field)}` : ""} \\hfill {\\small\\color{muted} ${texRange(e.startDate, e.endDate, false, "ja")}}\\par${
            e.details ? `\n{\\small\\color{muted} ${tex(e.details)}}\\par` : ""
          }`,
      )
      .join("\n");
    sections.push(section(t.education, rows));
  }

  if (d.achievements.length) {
    const items = d.achievements
      .map(
        (a) =>
          `\\item \\textbf{${tex(a.title)}}${a.date ? `  ${texRange(a.date, "", false, "ja")}` : ""}${a.description ? `  ${tex(a.description)}` : ""}`,
      )
      .join("\n");
    sections.push(section(t.achievements, `\\begin{itemize}\n${items}\n\\end{itemize}`));
  }

  if (d.languages.length) {
    const txt = d.languages.map((l) => `${tex(l.language)} (${tex(l.proficiency)})`).join(" / ");
    sections.push(section(t.languages, txt));
  }

  return `\\documentclass[11pt,${paper}]{article}

\\usepackage{fontspec}
\\usepackage{xeCJK}
\\usepackage{geometry}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{xcolor}
\\usepackage{hyperref}

\\setmainfont{Noto Serif JP}[
  Ligatures = TeX,
]
\\setsansfont{Noto Sans JP}[
  Ligatures = TeX,
]
\\setCJKmainfont{Noto Serif JP}
\\setCJKsansfont{Noto Sans JP}
\\setCJKmonofont{Noto Sans Mono CJK JP}

\\geometry{margin=20mm}
\\setlength{\\parindent}{0pt}
\\setlength{\\parskip}{2pt}
\\pagestyle{empty}

\\definecolor{ink}{HTML}{18181b}
\\definecolor{muted}{HTML}{52525b}
\\hypersetup{colorlinks=true, urlcolor=muted, linkcolor=muted}

\\titleformat{\\section}
  {\\sffamily\\large\\bfseries\\color{ink}}
  {}{0pt}{\\hspace{-2pt}■\\hspace{4pt}}[\\vspace{2pt}\\hrule]
\\titlespacing*{\\section}{0pt}{14pt}{6pt}

\\newcommand{\\jpentry}[4]{%
  {\\sffamily\\bfseries #1}\\hfill{\\small\\color{muted} #4 \\, #3}\\par
  {#2}\\par
}

\\setlist[itemize]{leftmargin=*, label=\\textendash, topsep=2pt, itemsep=1pt, parsep=0pt}

\\begin{document}

% Document title
{\\sffamily\\fontsize{18}{20}\\bfseries 職務経歴書}\\par\\vspace{4pt}\\hrule\\vspace{8pt}

% Identity block
\\begin{minipage}[t]{0.55\\linewidth}\\raggedright
  {\\sffamily\\fontsize{14}{16}\\bfseries ${tex(p.fullName || "氏名")}}\\\\[2pt]
  {${tex(p.headline || "")}}
\\end{minipage}\\hfill
\\begin{minipage}[t]{0.42\\linewidth}\\raggedleft\\small\\color{muted}
  ${contactLines.join(" \\\\ ")}
\\end{minipage}\\par\\vspace{4pt}

${sections.join("\n\n")}

\\end{document}
`;
}

function section(title: string, body: string): string {
  return `\\section*{${tex(title)}}
${body}`;
}
