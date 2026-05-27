import type { ResumeData } from "@/types/resume";
import { labels, listBullets, range } from "./_helpers";

export function AwesomeCV({ data }: { data: ResumeData }) {
  const t = labels(data);
  const accent = "#262626";
  return (
    <div className="resume-canvas" style={{ padding: "52px 60px", fontSize: 11 }}>
      <header className="flex items-end justify-between border-b-2 pb-3" style={{ borderColor: accent }}>
        <div>
          <h1
            style={{
              fontSize: 30,
              fontWeight: 300,
              letterSpacing: "0.04em",
              color: "#111",
              lineHeight: 1.05,
            }}
          >
            {(data.personal.fullName || "Your Name").toUpperCase()}
          </h1>
          {data.personal.headline && (
            <div
              className="text-ink-700"
              style={{ fontSize: 12.5, fontWeight: 500, marginTop: 4 }}
            >
              {data.personal.headline}
            </div>
          )}
        </div>
        <div
          className="text-right text-ink-700"
          style={{ fontSize: 10, lineHeight: 1.55 }}
        >
          {data.personal.location && <div>{data.personal.location}</div>}
          {data.personal.phone && <div>{data.personal.phone}</div>}
          {data.personal.email && <div>{data.personal.email}</div>}
          {data.personal.website && <div>{data.personal.website}</div>}
          {data.personal.linkedin && <div>{data.personal.linkedin}</div>}
          {data.personal.github && <div>{data.personal.github}</div>}
        </div>
      </header>

      {data.summary && (
        <Section title={t.summary}>
          <p className="text-ink-800" style={{ fontSize: 11, lineHeight: 1.55, fontStyle: "italic" }}>
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
                  <div className="font-semibold text-ink-900" style={{ fontSize: 12 }}>
                    {e.company}
                  </div>
                  <div className="text-ink-500" style={{ fontSize: 10 }}>
                    {range(e.startDate, e.endDate, e.current, "en")}
                  </div>
                </div>
                <div className="flex items-baseline justify-between gap-3 italic">
                  <span className="text-ink-700">{e.role}</span>
                  {e.location && <span className="text-ink-500">{e.location}</span>}
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
                  <div className="font-semibold text-ink-900">{e.institution}</div>
                  <div className="text-ink-500" style={{ fontSize: 10 }}>
                    {range(e.startDate, e.endDate, false, "en")}
                  </div>
                </div>
                <div className="italic text-ink-700">
                  {e.degree}
                  {e.field ? ` · ${e.field}` : ""}
                  {e.gpa ? ` · GPA ${e.gpa}` : ""}
                </div>
                {e.details && (
                  <div className="text-ink-700" style={{ fontSize: 10.5 }}>
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
          <table style={{ width: "100%", fontSize: 11, lineHeight: 1.6 }}>
            <tbody>
              {data.skills.map((g) => (
                <tr key={g.id}>
                  <td
                    className="align-top text-right font-semibold text-ink-900"
                    style={{ width: 130, paddingRight: 14 }}
                  >
                    {g.category}
                  </td>
                  <td className="text-ink-700">{g.items.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      )}

      {data.projects.length > 0 && (
        <Section title={t.projects}>
          <div className="space-y-3">
            {data.projects.map((p) => (
              <div key={p.id}>
                <div className="flex items-baseline justify-between">
                  <div className="font-semibold text-ink-900">{p.name}</div>
                  {p.link && (
                    <div className="text-ink-500" style={{ fontSize: 10 }}>
                      {p.link}
                    </div>
                  )}
                </div>
                {(p.role || p.stack?.length) && (
                  <div className="italic text-ink-700">
                    {p.role}
                    {p.role && p.stack?.length ? " · " : ""}
                    {p.stack?.join(", ")}
                  </div>
                )}
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
          {data.certifications.map((c) => (
            <div key={c.id} className="flex items-baseline justify-between" style={{ fontSize: 11 }}>
              <div>
                <span className="font-semibold text-ink-900">{c.name}</span>
                <span className="italic text-ink-700"> · {c.issuer}</span>
              </div>
              <div className="text-ink-500" style={{ fontSize: 10 }}>
                {range(c.date, "", false, "en")}
              </div>
            </div>
          ))}
        </Section>
      )}

      {data.achievements.length > 0 && (
        <Section title={t.achievements}>
          <ul className="list-disc pl-4 text-ink-800" style={{ fontSize: 11, lineHeight: 1.5 }}>
            {data.achievements.map((a) => (
              <li key={a.id} className="marker:text-ink-400">
                <span className="font-semibold text-ink-900">{a.title}</span>
                {a.date && <span className="text-ink-500"> · {range(a.date, "", false, "en")}</span>}
                {a.description && <span className="text-ink-700"> — {a.description}</span>}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {data.languages.length > 0 && (
        <Section title={t.languages}>
          <div className="text-ink-700" style={{ fontSize: 11 }}>
            {data.languages.map((l) => `${l.language} (${l.proficiency})`).join(" · ")}
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
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#0b0b0b",
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
