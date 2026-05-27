# Resume Builder

A premium online resume builder for English and modern Japanese resumes.
Recruiter-accepted, ATS-friendly, LaTeX-grade exports — no signup.

- **Next.js 15** App Router · **TypeScript** · **Tailwind** · **shadcn/ui** · **Framer Motion**
- **Zustand** with localStorage autosave
- **XeLaTeX / Tectonic** compilation on the server
- **LinkedIn PDF** import via `pdf-parse`
- Four templates: Modern Minimal · Awesome-CV · Academic CV · 職務経歴書 Modern
- English and Japanese, including Noto Sans/Serif JP for native CJK rendering

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

The dev server has full functionality except PDF compilation: you need `tectonic` (or `xelatex`) installed locally for **Export → PDF** to work. `.tex` and JSON export work without any extra tooling. See **PDF compilation** below.

## Project structure

```
src/
├── app/
│   ├── layout.tsx               root layout, fonts (Inter, Noto JP)
│   ├── page.tsx                 landing page (hero, features, how, showcase, FAQ, footer)
│   ├── globals.css              design tokens, paper shadow, scrollbar styles
│   ├── builder/page.tsx         editor entry
│   └── api/
│       ├── compile/route.ts     POST .tex → PDF (Tectonic / XeLaTeX)
│       └── parse-linkedin/route.ts  POST PDF → ResumeData
├── components/
│   ├── ui/                      shadcn primitives (button, input, dialog, …)
│   ├── shared/                  Logo
│   ├── landing/                 Hero, Features, HowItWorks, Showcase, FAQ, Footer, Nav
│   ├── builder/                 Sidebar, Topbar, FormPane, ImportDialog
│   │   └── forms/               One form component per section
│   └── preview/                 Resume preview & templates (HTML, mirrors LaTeX)
│       └── templates/           modern-minimal-en, awesome-cv, academic-cv, shokumu-modern
├── lib/
│   ├── store/                   Zustand resume + UI stores
│   ├── schemas/                 Zod validation for import
│   ├── templates/               LaTeX generators (english/, japanese/)
│   ├── export/                  json, latex, pdf, parse-client
│   ├── parse/                   linkedin-pdf heuristic parser
│   ├── i18n/                    en / ja dictionaries
│   ├── motion/                  Framer Motion variants
│   ├── sample-data.ts           sample resumes (EN + JA)
│   └── utils.ts                 cn, date formatting, ids
└── types/resume.ts              ResumeData and friends
```

## Data model

Everything is one TypeScript shape (`ResumeData`) — language, template, paper size, personal info, summary, experience, education, skills, projects, certifications, achievements, languages. The same shape is the export JSON, the LaTeX generator input, and the preview's source of truth.

## PDF compilation

The `/api/compile` route shells out to a LaTeX engine — by default `tectonic`, with `xelatex` as a fallback. To enable PDF export locally:

### Option A: Tectonic (recommended)

```bash
# macOS
brew install tectonic

# Linux (Debian / Ubuntu)
curl --proto '=https' --tlsv1.2 -fsSL https://drop-sh.fullyjustified.net | sh
sudo mv tectonic /usr/local/bin/

# Verify
tectonic --version
```

Tectonic fetches LaTeX packages on first run. Subsequent compilations use a local cache (`~/.cache/Tectonic`).

### Option B: TeX Live (`xelatex`)

```bash
# macOS
brew install --cask mactex

# Debian / Ubuntu
sudo apt-get install texlive-xetex texlive-fonts-extra texlive-lang-japanese fonts-noto-cjk
```

You can force a specific engine with the `RESUME_LATEX_ENGINE` env var (`tectonic` or `xelatex`).

### Fonts

Templates assume these fonts are available to the engine:

- **Inter** — headings (English templates)
- **Charter** — body (English templates)
- **Source Sans 3** — Awesome-CV
- **Noto Sans JP / Noto Serif JP** — Japanese template

On macOS with Homebrew:

```bash
brew tap homebrew/cask-fonts
brew install --cask font-inter font-noto-sans-cjk-jp font-noto-serif-cjk-jp font-source-sans-3
```

Charter ships with macOS, MacTeX, and most TeX Live distributions. If a font is missing, the engine will fall back; the document still compiles.

## Deployment

### Docker (recommended)

The included `Dockerfile` builds a self-contained image with Tectonic and the required CJK + Inter fonts pre-installed:

```bash
docker build -t resume-builder .
docker run -p 3000:3000 resume-builder
```

First PDF compilation in a fresh container will be slower (Tectonic warms its package cache). Subsequent compilations are fast.

### Vercel

Out of the box, Vercel's default Node runtime does **not** include `tectonic` or `xelatex`. For Vercel deployment you have three options:

1. Use Vercel's [custom runtime](https://vercel.com/docs/runtimes) with a build script that installs Tectonic.
2. Route `/api/compile` to a separate compile service (Fly.io, Render, AWS Lambda with a LaTeX layer) running this same Dockerfile.
3. Skip PDF export on Vercel — `.tex` and JSON export work; users compile PDF themselves via Overleaf.

### Self-hosted Node

```bash
npm run build
RESUME_LATEX_ENGINE=tectonic npm run start
```

Make sure `tectonic` or `xelatex` is on `PATH`.

## Privacy

- No login, no account, no analytics, no tracking.
- All resume data is kept in `localStorage` under the key `online-resume-builder:v1`.
- Uploaded PDFs and `.tex` sources are processed in memory on the server and discarded immediately — no persistence.

## Roadmap

The code is already structured for these without rewrites:

- Optional auth + cloud sync (slot into the Zustand store as a second persistence target).
- More templates — add a generator in `src/lib/templates/*/`, a preview in `src/components/preview/templates/`, and register them in `topbar.tsx`.
- AI-assisted bullet rewriting (server route + per-field "improve" button).

## License

MIT.
