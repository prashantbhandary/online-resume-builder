import type { ResumeData } from "@/types/resume";
import { labels, listBullets, range } from "./_helpers";

export function AcademicCV({ data }: { data: ResumeData }) {
  const t = labels(data);
  return (
    <div className="resume-canvas" style={{ padding: "64px 68px", fontSize: 11 }}>
      <header className="text-center">
        <h1
          className="text-ink-900"
          style={{
            fontFamily: "Charter, Georgia, serif",
            fontSize: 30,
            fontWeight: 500,
            letterSpacing: "-0.005em",
          }}
        >
          {data.personal.fullName || "Your Name"}
        </h1>
        {data.personal.headline && (
          <div
            className="mt-1 text-ink-700"
            style={{ fontStyle: "italic", fontSize: 12 }}
          >
            {data.personal.headline}
          </div>
        )}
        <div className="mt-1.5 text-ink-600" style={{ fontSize: 10 }}>
          {[
            data.personal.location,
            data.personal.email,
            data.personal.phone,
            data.personal.website,
          ]
            .filter(Boolean)
            .join("  ·  ")}
        </div>
      </header>

      {data.summary && (
        <Section title={t.summary}>
          <p className="text-ink-800" style={{ fontSize: 11, lineHeight: 1.6, textIndent: 14 }}>
            {data.summary}
          </p>
        </Section>
      )}

      {data.education.length > 0 && (
        <Section title={t.education}>
          <div className="space-y-2">
            {data.education.map((e) => (
              <div key={e.id}>
                <div className="flex items-baseline justify-between">
                  <div className="font-semibold text-ink-900">{e.institution}</div>
                  <div className="text-ink-500" style={{ fontSize: 10 }}>
                    {range(e.startDate, e.endDate, false, "en")}
                  </div>
                </div>
                <div className="italic text-ink-700">
                  {e.degree}
                  {e.field ? `, ${e.field}` : ""}
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

      {data.experience.length > 0 && (
        <Section title={t.experience}>
          <div className="space-y-3">
            {data.experience.map((e) => (
              <div key={e.id}>
                <div className="flex items-baseline justify-between gap-3">
                  <div>
                    <span className="font-semibold text-ink-900">{e.role}</span>
                    <span className="italic text-ink-700">, {e.company}</span>
                  </div>
                  <div className="text-ink-500" style={{ fontSize: 10 }}>
                    {range(e.startDate, e.endDate, e.current, "en")}
                  </div>
                </div>
                {listBullets(e.bullets).length > 0 && (
                  <ul className="mt-1 list-disc pl-4 text-ink-800" style={{ fontSize: 11, lineHeight: 1.55 }}>
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

      {data.projects.length > 0 && (
        <Section title={t.projects}>
          <div className="space-y-2">
            {data.projects.map((p) => (
              <div key={p.id}>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-semibold text-ink-900">{p.name}</span>
                    {p.role && <span className="italic text-ink-700">, {p.role}</span>}
                  </div>
                  {p.link && (
                    <div className="text-ink-500" style={{ fontSize: 10 }}>
                      {p.link}
                    </div>
                  )}
                </div>
                {listBullets(p.bullets).length > 0 && (
                  <ul className="mt-1 list-disc pl-4 text-ink-800" style={{ fontSize: 11, lineHeight: 1.55 }}>
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

      {data.achievements.length > 0 && (
        <Section title={t.achievements}>
          <ul className="list-disc pl-4 text-ink-800" style={{ fontSize: 11, lineHeight: 1.6 }}>
            {data.achievements.map((a) => (
              <li key={a.id}>
                <span className="font-semibold text-ink-900">{a.title}</span>
                {a.date && (
                  <span className="text-ink-500"> ({range(a.date, "", false, "en")})</span>
                )}
                {a.description && <span className="text-ink-700">. {a.description}</span>}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {data.certifications.length > 0 && (
        <Section title={t.certifications}>
          <ul className="list-disc pl-4 text-ink-800" style={{ fontSize: 11, lineHeight: 1.6 }}>
            {data.certifications.map((c) => (
              <li key={c.id}>
                <span className="font-semibold text-ink-900">{c.name}</span>, {c.issuer}
                {c.date ? `, ${range(c.date, "", false, "en")}` : ""}.
              </li>
            ))}
          </ul>
        </Section>
      )}

      {data.skills.length > 0 && (
        <Section title={t.skills}>
          <div className="space-y-1">
            {data.skills.map((g) => (
              <div key={g.id} className="text-ink-700" style={{ fontSize: 11 }}>
                <span className="italic">{g.category}:</span> {g.items.join(", ")}.
              </div>
            ))}
          </div>
        </Section>
      )}

      {data.languages.length > 0 && (
        <Section title={t.languages}>
          <div className="text-ink-700" style={{ fontSize: 11 }}>
            {data.languages
              .map((l) => `${l.language} (${l.proficiency})`)
              .join("; ")}
            .
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 20 }}>
      <h2
        style={{
          fontFamily: "Charter, Georgia, serif",
          fontSize: 14,
          fontStyle: "italic",
          fontWeight: 500,
          color: "#0b0b0b",
          paddingBottom: 2,
          borderBottom: "0.5px solid #a1a1aa",
          marginBottom: 8,
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
