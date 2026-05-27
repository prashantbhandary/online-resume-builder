import type { ResumeData } from "@/types/resume";
import { uid } from "@/lib/utils";

export const emptyResume = (language: ResumeData["language"] = "en"): ResumeData => ({
  language,
  template: language === "ja" ? "shokumu-modern" : "modern-minimal",
  paper: language === "ja" ? "a4" : "letter",
  personal: {
    fullName: "",
    headline: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  achievements: [],
  languages: [],
});

export const sampleResumeEN = (): ResumeData => ({
  language: "en",
  template: "modern-minimal",
  paper: "letter",
  personal: {
    fullName: "Alex Morgan",
    headline: "Senior Software Engineer",
    email: "alex.morgan@example.com",
    phone: "+1 (415) 555-0142",
    location: "San Francisco, CA",
    website: "https://alexmorgan.dev",
    linkedin: "linkedin.com/in/alexmorgan",
    github: "github.com/alexmorgan",
  },
  summary:
    "Software engineer with 8+ years building large-scale web platforms. Specialized in TypeScript, distributed systems, and developer experience. Shipped products used by millions and led teams of 4–10 engineers.",
  experience: [
    {
      id: uid("exp"),
      company: "Stripe",
      role: "Senior Software Engineer",
      location: "San Francisco, CA",
      startDate: "2022-04",
      endDate: "",
      current: true,
      bullets: [
        "Led rebuild of the merchant onboarding flow, lifting activation conversion by 18% within one quarter.",
        "Designed an internal type-safe RPC layer adopted by 12 services, cutting integration time from days to hours.",
        "Mentored 4 engineers; two were promoted within 12 months.",
      ],
    },
    {
      id: uid("exp"),
      company: "Airbnb",
      role: "Software Engineer",
      location: "San Francisco, CA",
      startDate: "2019-06",
      endDate: "2022-03",
      current: false,
      bullets: [
        "Owned guest review pipeline serving 2M+ events/day; reduced p99 latency by 40% via batched fan-out.",
        "Migrated 300+ legacy components to a typed design system without measurable regression.",
      ],
    },
    {
      id: uid("exp"),
      company: "Linear",
      role: "Founding Engineer",
      location: "Remote",
      startDate: "2017-08",
      endDate: "2019-05",
      current: false,
      bullets: [
        "Built realtime sync engine using CRDT-inspired primitives; foundation for the issue tracker UX.",
        "Shaped the first hiring loop; helped grow engineering from 3 to 15.",
      ],
    },
  ],
  education: [
    {
      id: uid("edu"),
      institution: "Carnegie Mellon University",
      degree: "B.S. Computer Science",
      field: "Systems concentration",
      location: "Pittsburgh, PA",
      startDate: "2013-08",
      endDate: "2017-05",
      details: "Dean's List 6 semesters. Undergraduate TA for 15-213.",
      gpa: "3.87 / 4.0",
    },
  ],
  skills: [
    { id: uid("sk"), category: "Languages", items: ["TypeScript", "Go", "Python", "Rust"] },
    { id: uid("sk"), category: "Frameworks", items: ["React", "Next.js", "Node.js", "gRPC"] },
    { id: uid("sk"), category: "Infrastructure", items: ["AWS", "Kubernetes", "Postgres", "Kafka"] },
  ],
  projects: [
    {
      id: uid("prj"),
      name: "openrouter-cli",
      role: "Creator",
      link: "github.com/alexmorgan/openrouter-cli",
      bullets: [
        "Terminal client for routing prompts across LLM providers; 4.2k GitHub stars.",
        "Published as an npm package with zero runtime dependencies.",
      ],
      stack: ["TypeScript", "Bun"],
    },
  ],
  certifications: [
    { id: uid("cert"), name: "AWS Solutions Architect — Professional", issuer: "Amazon Web Services", date: "2023-09" },
  ],
  achievements: [
    {
      id: uid("ach"),
      title: "Speaker, React Conf 2023",
      date: "2023-10",
      description: "Talk on type-safe RPC patterns for full-stack TypeScript.",
    },
  ],
  languages: [
    { id: uid("lng"), language: "English", proficiency: "Native" },
    { id: uid("lng"), language: "Spanish", proficiency: "Professional working" },
  ],
});

export const sampleResumeJA = (): ResumeData => ({
  language: "ja",
  template: "shokumu-modern",
  paper: "a4",
  personal: {
    fullName: "田中 拓海",
    headline: "シニアソフトウェアエンジニア",
    email: "takumi.tanaka@example.com",
    phone: "090-1234-5678",
    location: "東京都港区",
    website: "https://takumi.dev",
    linkedin: "linkedin.com/in/takumi",
    github: "github.com/takumi",
  },
  summary:
    "Web サービスのバックエンド・フロントエンド開発に 8 年以上従事。TypeScript と Go を中心に、大規模分散システムの設計および開発者体験の改善を専門としています。4〜10 名規模のチームリードを経験。",
  experience: [
    {
      id: uid("exp"),
      company: "メルカリ株式会社",
      role: "シニアソフトウェアエンジニア",
      location: "東京都港区",
      startDate: "2022-04",
      endDate: "",
      current: true,
      bullets: [
        "出品フロー再設計をリードし、四半期内にコンバージョン率を 18% 改善。",
        "社内向け型安全 RPC レイヤを設計し、12 サービスで採用。統合工数を数日から数時間に短縮。",
        "エンジニア 4 名のメンタリングを担当し、うち 2 名を 12 ヶ月以内に昇進へ導いた。",
      ],
    },
    {
      id: uid("exp"),
      company: "株式会社サイバーエージェント",
      role: "ソフトウェアエンジニア",
      location: "東京都渋谷区",
      startDate: "2019-06",
      endDate: "2022-03",
      current: false,
      bullets: [
        "1 日 200 万件以上のイベントを処理するレビュー基盤を担当し、p99 レイテンシを 40% 削減。",
        "レガシーコンポーネント 300 件以上を型付きデザインシステムへ移行。",
      ],
    },
  ],
  education: [
    {
      id: uid("edu"),
      institution: "東京大学",
      degree: "工学部 情報工学科 学士",
      field: "システム情報専攻",
      location: "東京都文京区",
      startDate: "2013-04",
      endDate: "2017-03",
      details: "成績優秀につき学部長賞を受賞。",
    },
  ],
  skills: [
    { id: uid("sk"), category: "言語", items: ["TypeScript", "Go", "Python", "Rust"] },
    { id: uid("sk"), category: "フレームワーク", items: ["React", "Next.js", "Node.js", "gRPC"] },
    { id: uid("sk"), category: "インフラ", items: ["AWS", "Kubernetes", "Postgres", "Kafka"] },
  ],
  projects: [
    {
      id: uid("prj"),
      name: "openrouter-cli",
      role: "作者",
      link: "github.com/takumi/openrouter-cli",
      bullets: [
        "複数 LLM プロバイダへリクエストを振り分けるターミナル CLI。GitHub スター 4.2k。",
        "依存ゼロの npm パッケージとして公開。",
      ],
      stack: ["TypeScript", "Bun"],
    },
  ],
  certifications: [
    { id: uid("cert"), name: "AWS Certified Solutions Architect — Professional", issuer: "Amazon Web Services", date: "2023-09" },
  ],
  achievements: [
    {
      id: uid("ach"),
      title: "React Conf 2023 登壇",
      date: "2023-10",
      description: "TypeScript における型安全 RPC パターンについて講演。",
    },
  ],
  languages: [
    { id: uid("lng"), language: "日本語", proficiency: "ネイティブ" },
    { id: uid("lng"), language: "英語", proficiency: "ビジネスレベル (TOEIC 920)" },
  ],
});
