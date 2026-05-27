"use client";

import { Input } from "@/components/ui/input";
import { useResumeStore } from "@/lib/store/resume-store";
import { Field, FieldGrid, SectionCard } from "./field";
import { dict } from "@/lib/i18n";

export function PersonalInfoForm() {
  const data = useResumeStore((s) => s.data);
  const set = useResumeStore((s) => s.setPersonal);
  const t = dict(data.language);
  const p = data.personal;

  return (
    <SectionCard
      title={t.sections.personal}
      description={
        data.language === "ja"
          ? "氏名・連絡先・SNS リンクは履歴書/職務経歴書の冒頭に表示されます。"
          : "Your name, contact details, and online presence appear at the top of the resume."
      }
    >
      <FieldGrid cols={2}>
        <Field label={t.fields.fullName} htmlFor="fullName">
          <Input
            id="fullName"
            value={p.fullName}
            onChange={(e) => set({ fullName: e.target.value })}
            placeholder={data.language === "ja" ? "田中 拓海" : "Alex Morgan"}
          />
        </Field>
        <Field label={t.fields.headline} htmlFor="headline">
          <Input
            id="headline"
            value={p.headline}
            onChange={(e) => set({ headline: e.target.value })}
            placeholder={
              data.language === "ja" ? "シニアソフトウェアエンジニア" : "Senior Software Engineer"
            }
          />
        </Field>
        <Field label={t.fields.email} htmlFor="email">
          <Input
            id="email"
            type="email"
            value={p.email}
            onChange={(e) => set({ email: e.target.value })}
            placeholder="alex@example.com"
          />
        </Field>
        <Field label={t.fields.phone} htmlFor="phone">
          <Input
            id="phone"
            value={p.phone}
            onChange={(e) => set({ phone: e.target.value })}
            placeholder="+1 415 555 0142"
          />
        </Field>
        <Field label={t.fields.location} htmlFor="location">
          <Input
            id="location"
            value={p.location}
            onChange={(e) => set({ location: e.target.value })}
            placeholder={data.language === "ja" ? "東京都" : "San Francisco, CA"}
          />
        </Field>
        <Field label={t.fields.website} htmlFor="website" hint="optional">
          <Input
            id="website"
            value={p.website ?? ""}
            onChange={(e) => set({ website: e.target.value })}
            placeholder="https://yourname.dev"
          />
        </Field>
        <Field label={t.fields.linkedin} htmlFor="linkedin" hint="optional">
          <Input
            id="linkedin"
            value={p.linkedin ?? ""}
            onChange={(e) => set({ linkedin: e.target.value })}
            placeholder="linkedin.com/in/yourname"
          />
        </Field>
        <Field label={t.fields.github} htmlFor="github" hint="optional">
          <Input
            id="github"
            value={p.github ?? ""}
            onChange={(e) => set({ github: e.target.value })}
            placeholder="github.com/yourname"
          />
        </Field>
      </FieldGrid>
    </SectionCard>
  );
}
