"use client";

import { Plus } from "lucide-react";
import { useResumeStore } from "@/lib/store/resume-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EntryCard, Field, FieldGrid, SectionCard } from "./field";
import { EmptyState } from "./experience-form";
import { dict } from "@/lib/i18n";

export function SkillsForm() {
  const data = useResumeStore((s) => s.data);
  const items = data.skills;
  const t = dict(data.language);
  const add = useResumeStore((s) => s.addSkillGroup);
  const update = useResumeStore((s) => s.updateSkillGroup);
  const remove = useResumeStore((s) => s.removeSkillGroup);

  return (
    <SectionCard
      title={t.sections.skills}
      description={
        data.language === "ja"
          ? "カテゴリごとに整理すると読みやすくなります。例: 言語、フレームワーク、インフラ。"
          : "Group by category — Languages, Frameworks, Infrastructure — so a recruiter can scan it in seconds."
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
          {items.map((group, i) => (
            <EntryCard
              key={group.id}
              index={i}
              total={items.length}
              title={group.category || `${t.sections.skills} ${i + 1}`}
              onRemove={() => remove(group.id)}
            >
              <FieldGrid cols={1}>
                <Field label={t.fields.category}>
                  <Input
                    value={group.category}
                    onChange={(e) => update(group.id, { category: e.target.value })}
                    placeholder={data.language === "ja" ? "言語" : "Languages"}
                  />
                </Field>
                <Field label={t.fields.items}>
                  <Input
                    value={group.items.join(", ")}
                    onChange={(e) =>
                      update(group.id, {
                        items: e.target.value
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      })
                    }
                    placeholder="TypeScript, Go, Python, Rust"
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
