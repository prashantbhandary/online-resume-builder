"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, FileText } from "lucide-react";
import { toast } from "sonner";
import { useResumeStore } from "@/lib/store/resume-store";
import { parseLinkedInPdfClient } from "@/lib/export/parse-client";

export function ImportDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const importData = useResumeStore((s) => s.importData);
  const currentLang = useResumeStore((s) => s.data.language);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  async function handleImport() {
    if (!file) return;
    setBusy(true);
    try {
      const parsed = await parseLinkedInPdfClient(file, currentLang);
      importData(parsed);
      toast.success("Imported from LinkedIn PDF");
      onOpenChange(false);
      setFile(null);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Could not parse PDF";
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import from LinkedIn PDF</DialogTitle>
          <DialogDescription>
            On LinkedIn, open your profile → <em>More</em> → <em>Save to PDF</em>. Drop the file below.
            We extract sections into the editor — review and tidy before exporting.
          </DialogDescription>
        </DialogHeader>

        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            const f = e.dataTransfer.files?.[0];
            if (f && f.type === "application/pdf") setFile(f);
            else toast.error("Please drop a PDF file");
          }}
          className={
            "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 text-center transition-colors " +
            (dragOver
              ? "border-foreground/50 bg-secondary/60"
              : "border-border bg-secondary/30 hover:bg-secondary/60")
          }
        >
          <Upload className="h-6 w-6 text-muted-foreground" />
          <div className="text-sm font-medium">
            {file ? file.name : "Drop PDF here, or click to choose"}
          </div>
          <div className="text-xs text-muted-foreground">
            English or Japanese PDFs supported. Parsed locally on the server.
          </div>
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setFile(f);
            }}
          />
        </label>

        {file && (
          <div className="flex items-center gap-2 rounded-md border border-border bg-secondary/50 px-3 py-2 text-[13px]">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="flex-1 truncate">{file.name}</span>
            <span className="text-muted-foreground">{(file.size / 1024).toFixed(0)} KB</span>
          </div>
        )}

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={busy}>
            Cancel
          </Button>
          <Button onClick={handleImport} disabled={!file || busy}>
            {busy && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {busy ? "Parsing…" : "Import"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
