"use client";

import { Plus } from "lucide-react";
import { useResumeStore } from "@/lib/store/resume-store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { EntryCard, Field, FieldGrid, SectionCard } from "./field";
import { dict } from "@/lib/i18n";

export function ExperienceForm() {
  const data = useResumeStore((s) => s.data);
  const items = data.experience;
  const t = dict(data.language);
  const add = useResumeStore((s) => s.addExperience);
  const update = useResumeStore((s) => s.updateExperience);
  const remove = useResumeStore((s) => s.removeExperience);
  const move = useResumeStore((s) => s.moveExperience);

  return (
    <SectionCard
      title={t.sections.experience}
      description={
        data.language === "ja"
          ? "実績は数値・規模・影響を意識して記載してください。動詞で始めるのが効果的です。"
          : "Use action verbs and back claims with numbers (scale, impact, %). Most recent role first."
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
          {items.map((exp, i) => (
            <EntryCard
              key={exp.id}
              index={i}
              total={items.length}
              title={`${t.sections.experience} ${i + 1}`}
              onMoveUp={() => move(exp.id, -1)}
              onMoveDown={() => move(exp.id, 1)}
              onRemove={() => remove(exp.id)}
            >
              <FieldGrid cols={2}>
                <Field label={t.fields.company}>
                  <Input
                    value={exp.company}
                    onChange={(e) => update(exp.id, { company: e.target.value })}
                  />
                </Field>
                <Field label={t.fields.role}>
                  <Input
                    value={exp.role}
                    onChange={(e) => update(exp.id, { role: e.target.value })}
                  />
                </Field>
                <Field label={t.fields.location} hint="optional">
                  <Input
                    value={exp.location ?? ""}
                    onChange={(e) => update(exp.id, { location: e.target.value })}
                  />
                </Field>
                <div />
                <Field label={t.fields.startDate}>
                  <Input
                    placeholder="2022-04"
                    value={exp.startDate}
                    onChange={(e) => update(exp.id, { startDate: e.target.value })}
                  />
                </Field>
                <Field label={t.fields.endDate} hint={exp.current ? "—" : ""}>
                  <Input
                    placeholder="2024-09"
                    value={exp.current ? "" : exp.endDate}
                    disabled={exp.current}
                    onChange={(e) => update(exp.id, { endDate: e.target.value })}
                  />
                </Field>
              </FieldGrid>

              <label className="inline-flex items-center gap-2 text-[12.5px] text-muted-foreground">
                <input
                  type="checkbox"
                  className="accent-foreground"
                  checked={exp.current}
                  onChange={(e) =>
                    update(exp.id, {
                      current: e.target.checked,
                      endDate: e.target.checked ? "" : exp.endDate,
                    })
                  }
                />
                {t.fields.current}
              </label>

              <Field
                label={t.fields.bullets}
                hint={data.language === "ja" ? "1 行ずつ" : "one per line"}
              >
                <Textarea
                  rows={5}
                  value={exp.bullets.join("\n")}
                  onChange={(e) =>
                    update(exp.id, {
                      bullets: e.target.value.split("\n"),
                    })
                  }
                  placeholder={
                    data.language === "ja"
                      ? "出品フローの再設計を主導し、CVR を 18% 改善した。"
                      : "Led rebuild of merchant onboarding — activation +18% in one quarter."
                  }
                />
              </Field>
            </EntryCard>
          ))}
        </div>
      )}
    </SectionCard>
  );
}

export function EmptyState({
  onAdd,
  text,
  actionText,
}: {
  onAdd: () => void;
  text: string;
  actionText: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-secondary/30 py-10 text-center">
      <p className="text-[13px] text-muted-foreground">{text}</p>
      <Button size="sm" variant="outline" onClick={onAdd}>
        <Plus className="h-3.5 w-3.5" /> {actionText}
      </Button>
    </div>
  );
}
