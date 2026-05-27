"use client";

import { Plus } from "lucide-react";
import { useResumeStore } from "@/lib/store/resume-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EntryCard, Field, FieldGrid, SectionCard } from "./field";
import { EmptyState } from "./experience-form";
import { dict } from "@/lib/i18n";

export function LanguagesForm() {
  const data = useResumeStore((s) => s.data);
  const items = data.languages;
  const t = dict(data.language);
  const add = useResumeStore((s) => s.addLanguage);
  const update = useResumeStore((s) => s.updateLanguage);
  const remove = useResumeStore((s) => s.removeLanguage);

  return (
    <SectionCard
      title={t.sections.languages}
      description={
        data.language === "ja"
          ? "話せる言語と熟練度を記載します。資格スコア (TOEIC など) があれば併記してください。"
          : "Languages you speak and your proficiency. Include test scores (TOEFL, JLPT) where relevant."
      }
      action={
        <Button size="sm" variant="outline" onClick={add}>
          <Plus className="h-3.5 w-3.5" /> {t.ui.add}
        </Button>
      }
    >
      {items.length === 0 ? (
        <EmptyState onAdd={add} text={t.ui.empty} actionText={t.ui.add} />
      ) : (
        <div className="space-y-3">
          {items.map((l, i) => (
            <EntryCard
              key={l.id}
              index={i}
              total={items.length}
              title={l.language || `${t.sections.languages} ${i + 1}`}
              onRemove={() => remove(l.id)}
            >
              <FieldGrid cols={2}>
                <Field label={t.fields.language}>
                  <Input
                    value={l.language}
                    onChange={(e) => update(l.id, { language: e.target.value })}
                  />
                </Field>
                <Field label={t.fields.proficiency}>
                  <Input
                    value={l.proficiency}
                    onChange={(e) => update(l.id, { proficiency: e.target.value })}
                    placeholder={t.proficiency.join(" / ")}
                  />
                </Field>
              </FieldGrid>
            </EntryCard>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
