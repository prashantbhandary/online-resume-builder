import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2 text-[15px] font-semibold tracking-tight text-foreground",
        className,
      )}
    >
      <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-md bg-ink-900 text-white shadow-soft-2 transition-transform group-hover:rotate-[-4deg]">
        <span className="text-[11px] font-bold leading-none">R</span>
      </span>
      <span>Resume</span>
      <span className="text-muted-foreground/70 font-normal text-[13px]">/ builder</span>
    </Link>
  );
}
