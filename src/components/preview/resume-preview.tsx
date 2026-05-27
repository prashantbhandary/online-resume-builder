"use client";

import { useEffect, useRef, useState } from "react";
import { useResumeStore } from "@/lib/store/resume-store";
import { useUIStore } from "@/lib/store/ui-store";
import { ModernMinimalEN } from "./templates/modern-minimal-en";
import { AwesomeCV } from "./templates/awesome-cv";
import { AcademicCV } from "./templates/academic-cv";
import { ShokumuModern } from "./templates/shokumu-modern";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ResumePreview() {
  const data = useResumeStore((s) => s.data);
  const zoom = useUIStore((s) => s.previewZoom);
  const setZoom = useUIStore((s) => s.setPreviewZoom);

  return (
    <div className="flex h-full w-[640px] shrink-0 flex-col border-l border-border bg-ink-50/60">
      <div className="flex h-10 items-center justify-between border-b border-border bg-background px-3">
        <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Live preview
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setZoom(zoom - 0.1)}
            aria-label="Zoom out"
          >
            <Minus className="h-3.5 w-3.5" />
          </Button>
          <span className="w-12 text-center text-[11px] tabular-nums text-muted-foreground">
            {Math.round(zoom * 100)}%
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setZoom(zoom + 0.1)}
            aria-label="Zoom in"
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto scrollbar-fine">
        <ZoomCanvas zoom={zoom}>
          <Paper paper={data.paper}>
            {data.template === "modern-minimal" && <ModernMinimalEN data={data} />}
            {data.template === "awesome-cv" && <AwesomeCV data={data} />}
            {data.template === "academic" && <AcademicCV data={data} />}
            {data.template === "shokumu-modern" && <ShokumuModern data={data} />}
          </Paper>
        </ZoomCanvas>
      </div>
    </div>
  );
}

function ZoomCanvas({ zoom, children }: { zoom: number; children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [contentSize, setContentSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!innerRef.current) return;
    const ro = new ResizeObserver(() => {
      if (!innerRef.current) return;
      const rect = innerRef.current.getBoundingClientRect();
      setContentSize({ w: rect.width, h: rect.height });
    });
    ro.observe(innerRef.current);
    return () => ro.disconnect();
  }, [zoom]);

  return (
    <div ref={wrapRef} className="flex justify-center p-6">
      <div
        style={{
          width: contentSize.w * zoom || undefined,
          height: contentSize.h * zoom || undefined,
        }}
      >
        <div
          ref={innerRef}
          style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
          className="origin-top-left"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function Paper({
  paper,
  children,
}: {
  paper: "letter" | "a4";
  children: React.ReactNode;
}) {
  // Letter: 8.5 x 11 in = 816 x 1056 px @ 96dpi
  // A4: 8.27 x 11.69 in = 794 x 1123 px @ 96dpi
  const dims =
    paper === "letter"
      ? { w: 816, minH: 1056 }
      : { w: 794, minH: 1123 };
  return (
    <div
      className="paper-shadow bg-white"
      style={{ width: dims.w, minHeight: dims.minH }}
    >
      {children}
    </div>
  );
}
