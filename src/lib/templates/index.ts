import type { ResumeData } from "@/types/resume";
import { renderModernMinimal } from "./english/modern-minimal";
import { renderAwesomeCV } from "./english/awesome-cv";
import { renderAcademicCV } from "./english/academic";
import { renderShokumuModern } from "./japanese/shokumu-modern";

export function renderLatex(data: ResumeData): string {
  switch (data.template) {
    case "modern-minimal":
      return renderModernMinimal(data);
    case "awesome-cv":
      return renderAwesomeCV(data);
    case "academic":
      return renderAcademicCV(data);
    case "shokumu-modern":
      return renderShokumuModern(data);
    default:
      return renderModernMinimal(data);
  }
}
