import { NextResponse } from "next/server";
import { parseLinkedInPdfBuffer } from "@/lib/parse/linkedin-pdf";
import type { Language } from "@/types/resume";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file");
  const language = (form.get("language") as Language | null) ?? "en";
  if (!(file instanceof File)) {
    return new NextResponse("Missing PDF file", { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return new NextResponse("PDF too large (>8MB)", { status: 413 });
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  try {
    const parsed = await parseLinkedInPdfBuffer(buffer, language);
    return NextResponse.json(parsed);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Could not parse PDF";
    return new NextResponse(msg, { status: 500 });
  }
}
