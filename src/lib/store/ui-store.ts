"use client";

import { create } from "zustand";
import type { SectionKey } from "@/types/resume";

interface UIState {
  activeSection: SectionKey;
  setActiveSection: (s: SectionKey) => void;
  previewZoom: number;
  setPreviewZoom: (z: number) => void;
  isExporting: boolean;
  setExporting: (v: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeSection: "personal",
  setActiveSection: (s) => set({ activeSection: s }),
  previewZoom: 0.78,
  setPreviewZoom: (z) => set({ previewZoom: Math.max(0.4, Math.min(1.4, z)) }),
  isExporting: false,
  setExporting: (v) => set({ isExporting: v }),
}));
