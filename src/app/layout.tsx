import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-jp",
  display: "swap",
});

const notoJpSerif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-jp-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://resume.local"),
  title: {
    default: "Resume — A premium online resume builder",
    template: "%s · Resume",
  },
  description:
    "Build recruiter-accepted, ATS-friendly resumes in English or Japanese. Upload your LinkedIn PDF or write from scratch — export to LaTeX, PDF, or JSON.",
  openGraph: {
    title: "Resume — A premium online resume builder",
    description:
      "Recruiter-accepted ATS resumes in English or Japanese. LaTeX-grade export. No signup.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${notoJp.variable} ${notoJpSerif.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <TooltipProvider delayDuration={150} skipDelayDuration={0}>
          {children}
        </TooltipProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
