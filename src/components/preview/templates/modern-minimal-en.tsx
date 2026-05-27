import type { ResumeData } from "@/types/resume";
import { joinLinks, labels, listBullets, range } from "./_helpers";

export function ModernMinimalEN({ data }: { data: ResumeData }) {
  const t = labels(data);
  return (
    <div className="resume-canvas" style={{ padding: "56px 60px", fontSize: 11 }}>
      <header className="border-b border-ink-300 pb-3">
        <h1
          className="text-ink-900"
          style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.1 }}
        >
          {data.personal.fullName || "Your Name"}
        </h1>
        {data.personal.headline && (
          <div
            className="mt-0.5 text-ink-700"
            style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}
          >
            {data.personal.headline}
          </div>
        )}
        <div className="mt-1.5 text-ink-600" style={{ fontSize: 10.5 }}>
          {joinLinks(data)}
        </div>
      </header>

      {data.summary && (
        <Section title={t.summary}>
          <p className="text-ink-800" style={{ fontSize: 11, lineHeight: 1.5 }}>
            {data.summary}
          </p>
        </Section>
      )}

      {data.experience.length > 0 && (
        <Section title={t.experience}>
          <div className="space-y-3">
            {data.experience.map((e) => (
              <div key={e.id}>
                <div className="flex items-baseline justify-between gap-3">
                  <div>
                    <span className="font-semibold text-ink-900" style={{ fontSize: 11.5 }}>
                      {e.role}
                    </span>
                    <span className="text-ink-700"> · {e.company}</span>
                  </div>
                  <div className="text-ink-500" style={{ fontSize: 10 }}>
                    {range(e.startDate, e.endDate, e.current, "en")}
                    {e.location ? ` · ${e.location}` : ""}
                  </div>
                </div>
                {listBullets(e.bullets).length > 0 && (
                  <ul className="mt-1 list-disc pl-4 text-ink-800" style={{ fontSize: 11, lineHeight: 1.5 }}>
                    {listBullets(e.bullets).map((b, i) => (
                      <li key={i} className="marker:text-ink-400">
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {data.education.length > 0 && (
        <Section title={t.education}>
          <div className="space-y-2">
            {data.education.map((e) => (
              <div key={e.id}>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-semibold text-ink-900">{e.institution}</span>
                    <span className="text-ink-700">
                      {" "}
                      · {e.degree}
                      {e.field ? `, ${e.field}` : ""}
                    </span>
                  </div>
                  <div className="text-ink-500" style={{ fontSize: 10 }}>
                    {range(e.startDate, e.endDate, false, "en")}
                    {e.location ? ` · ${e.location}` : ""}
                  </div>
                </div>
                {(e.details || e.gpa) && (
                  <div className="text-ink-700" style={{ fontSize: 10.5 }}>
                    {e.gpa && <span>GPA {e.gpa}</span>}
                    {e.gpa && e.details && " · "}
                    {e.details}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {data.skills.length > 0 && (
        <Section title={t.skills}>
          <div className="space-y-1">
            {data.skills.map((g) => (
              <div key={g.id} className="flex gap-2" style={{ fontSize: 11 }}>
                <span className="w-28 shrink-0 font-semibold text-ink-800">{g.category}</span>
                <span className="text-ink-700">{g.items.join(" · ")}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {data.projects.length > 0 && (
        <Section title={t.projects}>
          <div className="space-y-3">
            {data.projects.map((p) => (
              <div key={p.id}>
                <div className="flex items-baseline justify-between gap-3">
                  <div>
                    <span className="font-semibold text-ink-900">{p.name}</span>
                    {p.role && <span className="text-ink-700"> · {p.role}</span>}
                    {p.link && (
                      <span className="ml-2 text-ink-500" style={{ fontSize: 10 }}>
                        {p.link}
                      </span>
                    )}
                  </div>
                  {p.stack && p.stack.length > 0 && (
                    <div className="text-ink-500" style={{ fontSize: 10 }}>
                      {p.stack.join(", ")}
                    </div>
                  )}
                </div>
                {listBullets(p.bullets).length > 0 && (
                  <ul className="mt-1 list-disc pl-4 text-ink-800" style={{ fontSize: 11, lineHeight: 1.5 }}>
                    {listBullets(p.bullets).map((b, i) => (
                      <li key={i} className="marker:text-ink-400">
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {data.certifications.length > 0 && (
        <Section title={t.certifications}>
          <div className="space-y-1">
            {data.certifications.map((c) => (
              <div key={c.id} className="flex items-baseline justify-between" style={{ fontSize: 11 }}>
                <div>
                  <span className="font-semibold text-ink-900">{c.name}</span>
                  <span className="text-ink-700"> · {c.issuer}</span>
                </div>
                <div className="text-ink-500" style={{ fontSize: 10 }}>
                  {range(c.date, "", false, "en")}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {data.achievements.length > 0 && (
        <Section title={t.achievements}>
          <ul className="list-disc pl-4 text-ink-800" style={{ fontSize: 11, lineHeight: 1.5 }}>
            {data.achievements.map((a) => (
              <li key={a.id} className="marker:text-ink-400">
                <span className="font-semibold text-ink-900">{a.title}</span>
                {a.date && (
                  <span className="text-ink-500"> · {range(a.date, "", false, "en")}</span>
                )}
                {a.description && <span className="text-ink-700"> — {a.description}</span>}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {data.languages.length > 0 && (
        <Section title={t.languages}>
          <div className="text-ink-700" style={{ fontSize: 11 }}>
            {data.languages
              .map((l) => `${l.language} (${l.proficiency})`)
              .join(" · ")}
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 18 }}>
      <h2
        className="text-ink-800"
        style={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          paddingBottom: 4,
          borderBottom: "1px solid #d4d4d8",
          marginBottom: 8,
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
