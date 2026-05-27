import { NextResponse } from "next/server";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdtemp, readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const execFileP = promisify(execFile);

interface CompileRequest {
  tex: string;
  engine?: "xelatex" | "tectonic";
}

export async function POST(req: Request) {
  let body: CompileRequest;
  try {
    body = (await req.json()) as CompileRequest;
  } catch {
    return new NextResponse("Invalid JSON body", { status: 400 });
  }

  const source = body.tex?.trim();
  if (!source) return new NextResponse("Missing `tex` source", { status: 400 });
  if (source.length > 400_000) {
    return new NextResponse("Source too large", { status: 413 });
  }

  const dir = await mkdtemp(join(tmpdir(), "resume-"));
  const texPath = join(dir, "resume.tex");
  const pdfPath = join(dir, "resume.pdf");

  try {
    await writeFile(texPath, source, "utf8");

    const preferred = body.engine ?? process.env.RESUME_LATEX_ENGINE ?? "tectonic";
    const engine = await pickEngine(preferred);

    if (!engine) {
      return new NextResponse(
        "No LaTeX engine available on the server. Install `tectonic` or `xelatex` (TeX Live) — see README.md.",
        { status: 501 },
      );
    }

    try {
      if (engine === "tectonic") {
        await execFileP(
          "tectonic",
          ["--keep-logs", "--outdir", dir, texPath],
          { timeout: 90_000, maxBuffer: 16 * 1024 * 1024 },
        );
      } else {
        // Two passes for cross-references, layout stability.
        await execFileP(
          "xelatex",
          ["-interaction=nonstopmode", "-halt-on-error", "-output-directory", dir, texPath],
          { timeout: 90_000, maxBuffer: 16 * 1024 * 1024 },
        );
        await execFileP(
          "xelatex",
          ["-interaction=nonstopmode", "-halt-on-error", "-output-directory", dir, texPath],
          { timeout: 90_000, maxBuffer: 16 * 1024 * 1024 },
        );
      }
    } catch (err) {
      const detail =
        err && typeof err === "object" && "stderr" in err
          ? String((err as { stderr?: unknown }).stderr ?? "")
          : "";
      const log = await readFile(join(dir, "resume.log"), "utf8").catch(() => "");
      const tail = (log || detail).split("\n").slice(-25).join("\n");
      return new NextResponse(`LaTeX compilation failed.\n\n${tail}`, { status: 500 });
    }

    const pdf = await readFile(pdfPath);

    return new NextResponse(pdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="resume.pdf"',
        "Cache-Control": "no-store",
      },
    });
  } finally {
    rm(dir, { recursive: true, force: true }).catch(() => {});
  }
}

async function pickEngine(preferred: string): Promise<"tectonic" | "xelatex" | null> {
  const order: ("tectonic" | "xelatex")[] =
    preferred === "xelatex" ? ["xelatex", "tectonic"] : ["tectonic", "xelatex"];
  for (const candidate of order) {
    try {
      await execFileP(candidate, ["--version"], { timeout: 5000 });
      return candidate;
    } catch {
      /* try next */
    }
  }
  return null;
}
