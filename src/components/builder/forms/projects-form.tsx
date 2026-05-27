"use client";

import { Plus } from "lucide-react";
import { useResumeStore } from "@/lib/store/resume-store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { EntryCard, Field, FieldGrid, SectionCard } from "./field";
import { EmptyState } from "./experience-form";
import { dict } from "@/lib/i18n";

export function ProjectsForm() {
  const data = useResumeStore((s) => s.data);
  const items = data.projects;
  const t = dict(data.language);
  const add = useResumeStore((s) => s.addProject);
  const update = useResumeStore((s) => s.updateProject);
  const remove = useResumeStore((s) => s.removeProject);
  const move = useResumeStore((s) => s.moveProject);

  return (
    <SectionCard
      title={t.sections.projects}
      description={
        data.language === "ja"
          ? "OSS、副業、社内プロジェクトなど、実績として誇れるものを記載してください。"
          : "Side projects, open source, internal tools — anything that demonstrates how you build."
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
          {items.map((proj, i) => (
            <EntryCard
              key={proj.id}
              index={i}
              total={items.length}
              title={proj.name || `${t.sections.projects} ${i + 1}`}
              onMoveUp={() => move(proj.id, -1)}
              onMoveDown={() => move(proj.id, 1)}
              onRemove={() => remove(proj.id)}
            >
              <FieldGrid cols={2}>
                <Field label={t.fields.name}>
                  <Input
                    value={proj.name}
                    onChange={(e) => update(proj.id, { name: e.target.value })}
                  />
                </Field>
                <Field label={t.fields.role} hint="optional">
                  <Input
                    value={proj.role ?? ""}
                    onChange={(e) => update(proj.id, { role: e.target.value })}
                  />
                </Field>
                <Field label={t.fields.link} hint="optional">
                  <Input
                    value={proj.link ?? ""}
                    onChange={(e) => update(proj.id, { link: e.target.value })}
                    placeholder="github.com/yourname/project"
                  />
                </Field>
                <Field label={t.fields.stack} hint="optional">
                  <Input
                    value={(proj.stack ?? []).join(", ")}
                    onChange={(e) =>
                      update(proj.id, {
                        stack: e.target.value
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      })
                    }
                    placeholder="TypeScript, Next.js, Postgres"
                  />
                </Field>
              </FieldGrid>
              <Field
                label={t.fields.bullets}
                hint={data.language === "ja" ? "1 行ずつ" : "one per line"}
              >
                <Textarea
                  rows={4}
                  value={proj.bullets.join("\n")}
                  onChange={(e) =>
                    update(proj.id, { bullets: e.target.value.split("\n") })
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
