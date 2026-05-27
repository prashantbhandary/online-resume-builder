"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { FormPane } from "./form-pane";
import { ResumePreview } from "@/components/preview/resume-preview";
import { useResumeStore } from "@/lib/store/resume-store";

export function Builder() {
  return (
    <Suspense fallback={null}>
      <BuilderInner />
    </Suspense>
  );
}

function BuilderInner() {
  const params = useSearchParams();
  const sample = params.get("sample");
  const loadSample = useResumeStore((s) => s.loadSample);
  const hasData =
    useResumeStore((s) => s.data.personal.fullName.length > 0 || s.data.experience.length > 0);

  // Hydrate localStorage gate — Zustand persist marks ready via subscribe; here we
  // wait one tick so SSR/CSR don't disagree.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    if (!hydrated) return;
    if (sample === "ja" && !hasData) loadSample("ja");
    if (sample === "en" && !hasData) loadSample("en");
  }, [hydrated, sample, hasData, loadSample]);

  if (!hydrated) {
    return (
      <div className="flex h-screen items-center justify-center bg-secondary/30 text-sm text-muted-foreground">
        Loading editor…
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <div className="flex flex-1 overflow-hidden">
          <FormPane />
          <ResumePreview />
        </div>
      </div>
    </div>
  );
}
