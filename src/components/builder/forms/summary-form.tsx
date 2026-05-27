"use client";

import { Textarea } from "@/components/ui/textarea";
import { useResumeStore } from "@/lib/store/resume-store";
import { SectionCard, Field } from "./field";
import { dict } from "@/lib/i18n";

export function SummaryForm() {
  const data = useResumeStore((s) => s.data);
  const setSummary = useResumeStore((s) => s.setSummary);
  const t = dict(data.language);

  return (
    <SectionCard
      title={t.sections.summary}
      description={
        data.language === "ja"
          ? "経歴・専門領域・強みを 2〜4 文で簡潔にまとめます。役職と年数を含めると効果的です。"
          : "Two to four crisp sentences. Lead with your specialty, years of experience, and what you bring."
      }
    >
      <Field label={t.fields.summary} htmlFor="summary">
        <Textarea
          id="summary"
          value={data.summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={5}
          placeholder={
            data.language === "ja"
              ? "ソフトウェアエンジニアとして 8 年以上の経験。TypeScript を中心とした Web プラットフォーム開発と分散システムの設計を専門とする。チームリードの経験あり。"
              : "Software engineer with 8+ years building large-scale web platforms. Specialized in TypeScript, distributed systems, and developer experience."
          }
        />
      </Field>
    </SectionCard>
  );
}
