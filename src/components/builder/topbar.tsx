"use client";

import { useState } from "react";
import { useResumeStore } from "@/lib/store/resume-store";
import { useUIStore } from "@/lib/store/ui-store";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ImportDialog } from "@/components/builder/import-dialog";
import {
  Check,
  ChevronDown,
  Download,
  FileDown,
  FileJson,
  FileType,
  Globe,
  Loader2,
  MoreHorizontal,
  Upload,
} from "lucide-react";
import { dict } from "@/lib/i18n";
import type { Language, TemplateId } from "@/types/resume";
import { exportJson, importJsonFromFile } from "@/lib/export/json";
import { downloadTex } from "@/lib/export/latex";
import { downloadPdf } from "@/lib/export/pdf";
import { toast } from "sonner";

const TEMPLATES: { id: TemplateId; label: string; language: Language }[] = [
  { id: "modern-minimal", label: "Modern Minimal", language: "en" },
  { id: "awesome-cv", label: "Awesome-CV", language: "en" },
  { id: "academic", label: "Academic CV", language: "en" },
  { id: "shokumu-modern", label: "職務経歴書 — Modern", language: "ja" },
];

export function Topbar() {
  const data = useResumeStore((s) => s.data);
  const setLanguage = useResumeStore((s) => s.setLanguage);
  const setTemplate = useResumeStore((s) => s.setTemplate);
  const setPaper = useResumeStore((s) => s.setPaper);
  const loadSample = useResumeStore((s) => s.loadSample);
  const reset = useResumeStore((s) => s.reset);
  const importData = useResumeStore((s) => s.importData);
  const lastSavedAt = useResumeStore((s) => s.lastSavedAt);
  const exporting = useUIStore((s) => s.isExporting);
  const setExporting = useUIStore((s) => s.setExporting);
  const t = dict(data.language);
  const [importOpen, setImportOpen] = useState(false);

  const availableTemplates = TEMPLATES.filter((t) => t.language === data.language);

  async function handleJsonImport(file: File) {
    try {
      const json = await importJsonFromFile(file);
      importData(json);
      toast.success("Imported");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid file";
      toast.error(`Import failed: ${msg}`);
    }
  }

  async function handlePdfExport() {
    setExporting(true);
    try {
      await downloadPdf(data);
      toast.success("PDF ready");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Compile failed";
      toast.error(msg);
    } finally {
      setExporting(false);
    }
  }

  return (
    <>
      <header className="flex h-14 items-center justify-between gap-3 border-b border-border bg-background px-5">
        <div className="flex items-center gap-2">
          <SaveIndicator lastSavedAt={lastSavedAt} t={t.ui} />
        </div>

        <div className="flex items-center gap-2">
          {/* Language */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Select value={data.language} onValueChange={(v) => setLanguage(v as Language)}>
                  <SelectTrigger className="h-8 w-[120px] text-[13px]">
                    <Globe className="mr-1 h-3.5 w-3.5 opacity-70" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TooltipTrigger>
            <TooltipContent>{t.ui.language}</TooltipContent>
          </Tooltip>

          {/* Template */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Select
                  value={data.template}
                  onValueChange={(v) => setTemplate(v as TemplateId)}
                >
                  <SelectTrigger className="h-8 w-[200px] text-[13px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTemplates.map((tpl) => (
                      <SelectItem key={tpl.id} value={tpl.id}>
                        {tpl.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TooltipTrigger>
            <TooltipContent>{t.ui.template}</TooltipContent>
          </Tooltip>

          {/* Paper */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Select
                  value={data.paper}
                  onValueChange={(v) => setPaper(v as "letter" | "a4")}
                >
                  <SelectTrigger className="h-8 w-[100px] text-[13px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="letter">US Letter</SelectItem>
                    <SelectItem value="a4">A4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TooltipTrigger>
            <TooltipContent>{t.ui.paper}</TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Import */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Upload className="h-3.5 w-3.5" /> Import
                <ChevronDown className="h-3 w-3 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>From</DropdownMenuLabel>
              <DropdownMenuItem onSelect={() => setImportOpen(true)}>
                <FileType className="h-4 w-4" /> {t.ui.importLinkedIn}
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "application/json";
                  input.onchange = () => {
                    const file = input.files?.[0];
                    if (file) handleJsonImport(file);
                  };
                  input.click();
                }}
              >
                <FileJson className="h-4 w-4" /> {t.ui.importJson}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => loadSample(data.language)}>
                {t.ui.loadSample}
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => reset(data.language)}>
                {t.ui.clearAll}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Export */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm">
                <Download className="h-3.5 w-3.5" /> Export
                <ChevronDown className="h-3 w-3 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                disabled={exporting}
                onSelect={(e) => {
                  e.preventDefault();
                  handlePdfExport();
                }}
              >
                {exporting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <FileDown className="h-4 w-4" />
                )}
                {exporting ? t.ui.compiling : t.ui.exportPdf}
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => downloadTex(data)}>
                <FileType className="h-4 w-4" /> {t.ui.exportTex}
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => exportJson(data)}>
                <FileJson className="h-4 w-4" /> {t.ui.exportJson}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => loadSample("en")}>
                Load English sample
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => loadSample("ja")}>
                Load Japanese sample
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <ImportDialog open={importOpen} onOpenChange={setImportOpen} />
    </>
  );
}

function SaveIndicator({
  lastSavedAt,
  t,
}: {
  lastSavedAt: number | null;
  t: ReturnType<typeof dict>["ui"];
}) {
  if (!lastSavedAt) return null;
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-1 text-[11px] text-muted-foreground">
      <Check className="h-3 w-3 text-emerald-600" />
      {t.saved}
    </div>
  );
}
