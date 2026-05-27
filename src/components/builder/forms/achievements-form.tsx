"use client";

import { Plus } from "lucide-react";
import { useResumeStore } from "@/lib/store/resume-store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { EntryCard, Field, FieldGrid, SectionCard } from "./field";
import { EmptyState } from "./experience-form";
import { dict } from "@/lib/i18n";

export function AchievementsForm() {
  const data = useResumeStore((s) => s.data);
  const items = data.achievements;
  const t = dict(data.language);
  const add = useResumeStore((s) => s.addAchievement);
  const update = useResumeStore((s) => s.updateAchievement);
  const remove = useResumeStore((s) => s.removeAchievement);

  return (
    <SectionCard
      title={t.sections.achievements}
      description={
        data.language === "ja"
          ? "受賞、登壇、出版、特許など、定量的に評価できる実績を記載します。"
          : "Awards, talks, publications, patents — anything quantifiable beyond your day job."
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
          {items.map((a, i) => (
            <EntryCard
              key={a.id}
              index={i}
              total={items.length}
              title={a.title || `${t.sections.achievements} ${i + 1}`}
              onRemove={() => remove(a.id)}
            >
              <FieldGrid cols={2}>
                <Field label={t.fields.title}>
                  <Input
                    value={a.title}
                    onChange={(e) => update(a.id, { title: e.target.value })}
                  />
                </Field>
                <Field label={t.fields.date} hint="YYYY-MM">
                  <Input
                    value={a.date ?? ""}
                    onChange={(e) => update(a.id, { date: e.target.value })}
                  />
                </Field>
              </FieldGrid>
              <Field label={t.fields.description} hint="optional">
                <Textarea
                  rows={3}
                  value={a.description ?? ""}
                  onChange={(e) => update(a.id, { description: e.target.value })}
                />
              </Field>
            </EntryCard>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
