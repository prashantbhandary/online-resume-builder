import Link from "next/link";
import { Logo } from "@/components/shared/logo";

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center">
        <div>
          <Logo />
          <p className="mt-3 max-w-md text-[13px] leading-relaxed text-muted-foreground">
            A premium online resume builder for engineers, designers, and operators —
            generating recruiter-ready PDFs in English or 日本語.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-[13px] text-muted-foreground">
          <Link href="/builder" className="hover:text-foreground">
            Builder
          </Link>
          <Link href="#features" className="hover:text-foreground">
            Features
          </Link>
          <Link href="#how" className="hover:text-foreground">
            How it works
          </Link>
          <Link href="#showcase" className="hover:text-foreground">
            Showcase
          </Link>
          <Link href="#faq" className="hover:text-foreground">
            FAQ
          </Link>
          <Link href="/builder?sample=ja" className="hover:text-foreground">
            日本語版
          </Link>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-[12px] text-muted-foreground">
        © {new Date().getFullYear()} Resume Builder. Crafted with care. No tracking.
      </div>
    </footer>
  );
}
