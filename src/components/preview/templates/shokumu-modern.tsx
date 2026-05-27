import type { ResumeData } from "@/types/resume";
import { labels, listBullets, range } from "./_helpers";

export function ShokumuModern({ data }: { data: ResumeData }) {
  const t = labels(data);
  return (
    <div
      className="resume-canvas lang-ja"
      style={{ padding: "52px 56px", fontSize: 11, lineHeight: 1.55 }}
    >
      <header className="border-b border-ink-900 pb-3">
        <h1
          className="text-ink-900"
          style={{
            fontFamily: "var(--font-noto-jp), sans-serif",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "0.02em",
          }}
        >
          職務経歴書
        </h1>
        <div className="mt-2 flex items-end justify-between">
          <div>
            <div
              className="text-ink-900"
              style={{
                fontFamily: "var(--font-noto-jp), sans-serif",
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              {data.personal.fullName || "氏名"}
            </div>
            {data.personal.headline && (
              <div
                className="text-ink-700"
                style={{ fontSize: 11.5, marginTop: 2 }}
              >
                {data.personal.headline}
              </div>
            )}
          </div>
          <div className="text-right text-ink-700" style={{ fontSize: 10 }}>
            {data.personal.location && <div>{data.personal.location}</div>}
            {data.personal.email && <div>{data.personal.email}</div>}
            {data.personal.phone && <div>{data.personal.phone}</div>}
            {data.personal.website && <div>{data.personal.website}</div>}
            {data.personal.linkedin && <div>{data.personal.linkedin}</div>}
            {data.personal.github && <div>{data.personal.github}</div>}
          </div>
        </div>
      </header>

      {data.summary && (
        <JpSection title={t.summary}>
          <p className="text-ink-800" style={{ fontSize: 11, lineHeight: 1.7 }}>
            {data.summary}
          </p>
        </JpSection>
      )}

      {data.experience.length > 0 && (
        <JpSection title={t.experience}>
          <div className="space-y-3">
            {data.experience.map((e) => (
              <div key={e.id} className="border-l-2 border-ink-300 pl-3">
                <div className="flex items-baseline justify-between">
                  <div
                    className="text-ink-900"
                    style={{
                      fontFamily: "var(--font-noto-jp), sans-serif",
                      fontWeight: 700,
                      fontSize: 12,
                    }}
                  >
                    {e.company}
                  </div>
                  <div className="text-ink-500" style={{ fontSize: 10 }}>
                    {range(e.startDate, e.endDate, e.current, "ja")}
                    {e.location ? `  ${e.location}` : ""}
                  </div>
                </div>
                <div className="text-ink-700" style={{ fontSize: 11 }}>
                  {e.role}
                </div>
                {listBullets(e.bullets).length > 0 && (
                  <ul className="mt-1 list-disc pl-4 text-ink-800" style={{ fontSize: 11, lineHeight: 1.7 }}>
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
        </JpSection>
      )}

      {data.skills.length > 0 && (
        <JpSection title={t.skills}>
          <table style={{ width: "100%", fontSize: 11, lineHeight: 1.75 }}>
            <tbody>
              {data.skills.map((g) => (
                <tr key={g.id}>
                  <td
                    className="align-top font-semibold text-ink-900"
                    style={{
                      fontFamily: "var(--font-noto-jp), sans-serif",
                      width: 110,
                      paddingRight: 12,
                    }}
                  >
                    {g.category}
                  </td>
                  <td className="text-ink-700">{g.items.join(" / ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </JpSection>
      )}

      {data.projects.length > 0 && (
        <JpSection title={t.projects}>
          <div className="space-y-3">
            {data.projects.map((p) => (
              <div key={p.id}>
                <div className="flex items-baseline justify-between">
                  <div
                    className="text-ink-900"
                    style={{ fontFamily: "var(--font-noto-jp), sans-serif", fontWeight: 700 }}
                  >
                    {p.name}
                    {p.role && (
                      <span className="ml-2 text-ink-700" style={{ fontWeight: 400 }}>
                        {p.role}
                      </span>
                    )}
                  </div>
                  {p.link && (
                    <div className="text-ink-500" style={{ fontSize: 10 }}>
                      {p.link}
                    </div>
                  )}
                </div>
                {p.stack && p.stack.length > 0 && (
                  <div className="text-ink-500" style={{ fontSize: 10 }}>
                    {p.stack.join(" / ")}
                  </div>
                )}
                {listBullets(p.bullets).length > 0 && (
                  <ul className="mt-1 list-disc pl-4 text-ink-800" style={{ fontSize: 11, lineHeight: 1.7 }}>
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
        </JpSection>
      )}

      {data.certifications.length > 0 && (
        <JpSection title={t.certifications}>
          <div className="space-y-1">
            {data.certifications.map((c) => (
              <div key={c.id} className="flex items-baseline justify-between" style={{ fontSize: 11 }}>
                <div>
                  <span
                    className="text-ink-900"
                    style={{ fontFamily: "var(--font-noto-jp), sans-serif", fontWeight: 700 }}
                  >
                    {c.name}
                  </span>
                  <span className="text-ink-700">  {c.issuer}</span>
                </div>
                <div className="text-ink-500" style={{ fontSize: 10 }}>
                  {range(c.date, "", false, "ja")}
                </div>
              </div>
            ))}
          </div>
        </JpSection>
      )}

      {data.education.length > 0 && (
        <JpSection title={t.education}>
          <div className="space-y-1">
            {data.education.map((e) => (
              <div key={e.id} className="flex items-baseline justify-between" style={{ fontSize: 11 }}>
                <div>
                  <span
                    className="text-ink-900"
                    style={{ fontFamily: "var(--font-noto-jp), sans-serif", fontWeight: 700 }}
                  >
                    {e.institution}
                  </span>
                  <span className="text-ink-700">  {e.degree}{e.field ? `  ${e.field}` : ""}</span>
                </div>
                <div className="text-ink-500" style={{ fontSize: 10 }}>
                  {range(e.startDate, e.endDate, false, "ja")}
                </div>
              </div>
            ))}
          </div>
        </JpSection>
      )}

      {data.achievements.length > 0 && (
        <JpSection title={t.achievements}>
          <ul className="list-disc pl-4 text-ink-800" style={{ fontSize: 11, lineHeight: 1.7 }}>
            {data.achievements.map((a) => (
              <li key={a.id} className="marker:text-ink-400">
                <span
                  className="text-ink-900"
                  style={{ fontFamily: "var(--font-noto-jp), sans-serif", fontWeight: 700 }}
                >
                  {a.title}
                </span>
                {a.date && (
                  <span className="text-ink-500">  {range(a.date, "", false, "ja")}</span>
                )}
                {a.description && <span className="text-ink-700">  {a.description}</span>}
              </li>
            ))}
          </ul>
        </JpSection>
      )}

      {data.languages.length > 0 && (
        <JpSection title={t.languages}>
          <div className="text-ink-700" style={{ fontSize: 11 }}>
            {data.languages
              .map((l) => `${l.language} (${l.proficiency})`)
              .join(" / ")}
          </div>
        </JpSection>
      )}
    </div>
  );
}

function JpSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 18 }}>
      <h2
        className="text-ink-900"
        style={{
          fontFamily: "var(--font-noto-jp), sans-serif",
          fontSize: 12.5,
          fontWeight: 700,
          letterSpacing: "0.08em",
          paddingBottom: 4,
          marginBottom: 8,
          borderBottom: "1px solid #18181b",
          display: "inline-block",
          paddingRight: 12,
        }}
      >
        ■ {title}
      </h2>
      {children}
    </section>
  );
}
