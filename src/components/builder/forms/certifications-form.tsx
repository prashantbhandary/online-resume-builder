"use client";

import { Plus } from "lucide-react";
import { useResumeStore } from "@/lib/store/resume-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EntryCard, Field, FieldGrid, SectionCard } from "./field";
import { EmptyState } from "./experience-form";
import { dict } from "@/lib/i18n";

export function CertificationsForm() {
  const data = useResumeStore((s) => s.data);
  const items = data.certifications;
  const t = dict(data.language);
  const add = useResumeStore((s) => s.addCertification);
  const update = useResumeStore((s) => s.updateCertification);
  const remove = useResumeStore((s) => s.removeCertification);

  return (
    <SectionCard
      title={t.sections.certifications}
      description={
        data.language === "ja"
          ? "業務に関連する資格を発行機関と取得年とともに記載します。"
          : "Industry-relevant credentials, with issuer and year."
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
          {items.map((c, i) => (
            <EntryCard
              key={c.id}
              index={i}
              total={items.length}
              title={c.name || `${t.sections.certifications} ${i + 1}`}
              onRemove={() => remove(c.id)}
            >
              <FieldGrid cols={2}>
                <Field label={t.fields.name}>
                  <Input value={c.name} onChange={(e) => update(c.id, { name: e.target.value })} />
                </Field>
                <Field label={t.fields.issuer}>
                  <Input
                    value={c.issuer}
                    onChange={(e) => update(c.id, { issuer: e.target.value })}
                  />
                </Field>
                <Field label={t.fields.date} hint="YYYY-MM">
                  <Input
                    value={c.date ?? ""}
                    onChange={(e) => update(c.id, { date: e.target.value })}
                  />
                </Field>
                <Field label={t.fields.link} hint="optional">
                  <Input
                    value={c.link ?? ""}
                    onChange={(e) => update(c.id, { link: e.target.value })}
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
