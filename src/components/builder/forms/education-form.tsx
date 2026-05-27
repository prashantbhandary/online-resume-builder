"use client";

import { Plus } from "lucide-react";
import { useResumeStore } from "@/lib/store/resume-store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { EntryCard, Field, FieldGrid, SectionCard } from "./field";
import { EmptyState } from "./experience-form";
import { dict } from "@/lib/i18n";

export function EducationForm() {
  const data = useResumeStore((s) => s.data);
  const items = data.education;
  const t = dict(data.language);
  const add = useResumeStore((s) => s.addEducation);
  const update = useResumeStore((s) => s.updateEducation);
  const remove = useResumeStore((s) => s.removeEducation);
  const move = useResumeStore((s) => s.moveEducation);

  return (
    <SectionCard
      title={t.sections.education}
      description={
        data.language === "ja"
          ? "学位、専攻、卒業年を記載します。日本企業向けには高校以降を時系列順で記載するのが一般的です。"
          : "Most recent degree first. Include honors, GPA only if 3.5+ or culturally expected."
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
          {items.map((edu, i) => (
            <EntryCard
              key={edu.id}
              index={i}
              total={items.length}
              title={`${t.sections.education} ${i + 1}`}
              onMoveUp={() => move(edu.id, -1)}
              onMoveDown={() => move(edu.id, 1)}
              onRemove={() => remove(edu.id)}
            >
              <FieldGrid cols={2}>
                <Field label={t.fields.institution}>
                  <Input
                    value={edu.institution}
                    onChange={(e) => update(edu.id, { institution: e.target.value })}
                  />
                </Field>
                <Field label={t.fields.degree}>
                  <Input
                    value={edu.degree}
                    onChange={(e) => update(edu.id, { degree: e.target.value })}
                  />
                </Field>
                <Field label={t.fields.field} hint="optional">
                  <Input
                    value={edu.field ?? ""}
                    onChange={(e) => update(edu.id, { field: e.target.value })}
                  />
                </Field>
                <Field label={t.fields.location} hint="optional">
                  <Input
                    value={edu.location ?? ""}
                    onChange={(e) => update(edu.id, { location: e.target.value })}
                  />
                </Field>
                <Field label={t.fields.startDate}>
                  <Input
                    placeholder="2013-08"
                    value={edu.startDate}
                    onChange={(e) => update(edu.id, { startDate: e.target.value })}
                  />
                </Field>
                <Field label={t.fields.endDate}>
                  <Input
                    placeholder="2017-05"
                    value={edu.endDate}
                    onChange={(e) => update(edu.id, { endDate: e.target.value })}
                  />
                </Field>
                <Field label={t.fields.gpa} hint="optional">
                  <Input
                    value={edu.gpa ?? ""}
                    onChange={(e) => update(edu.id, { gpa: e.target.value })}
                  />
                </Field>
              </FieldGrid>
              <Field label={t.fields.details} hint="optional">
                <Textarea
                  rows={3}
                  value={edu.details ?? ""}
                  onChange={(e) => update(edu.id, { details: e.target.value })}
                />
              </Field>
            </EntryCard>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
