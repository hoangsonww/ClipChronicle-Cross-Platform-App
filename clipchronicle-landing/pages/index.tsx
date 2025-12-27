import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  Activity,
  AppWindow,
  Brain,
  ChevronsDown,
  Chrome,
  CircleCheck,
  ClipboardCopy,
  ClipboardList,
  CloudOff,
  Code2,
  Database,
  Download,
  Github,
  Lock,
  MousePointerClick,
  Palette,
  PenSquare,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Terminal,
  Users,
  Wand,
  Zap,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/* -------------------------------------------------------------------------- */
/*                                   Utils                                    */
/* -------------------------------------------------------------------------- */

const CountUp = dynamic(() => import("react-countup"), { ssr: false });

const typeLines = [
  "Capture. Organize. Reuse.",
  "Your clipboard, fully searchable.",
  "Local-first productivity.",
  "AI actions for every snippet.",
  "From chaos to clarity.",
  "Clipboard management for pros.",
];

function useTypewriter(lines: string[], speed = 85) {
  const [i, setI] = useState(0);
  const [sub, setSub] = useState("");

  useEffect(() => {
    const full = lines[i];
    if (sub.length < full.length) {
      const t = setTimeout(() => setSub(full.slice(0, sub.length + 1)), speed);
      return () => clearTimeout(t);
    }
    const pause = setTimeout(() => {
      setSub("");
      setI((n) => (n + 1) % lines.length);
    }, 1600);
    return () => clearTimeout(pause);
  }, [sub, i, lines, speed]);

  return sub;
}

/* -------------------------------------------------------------------------- */
/*                                 Content                                    */
/* -------------------------------------------------------------------------- */

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Tour", href: "#tour" },
  { label: "Workflow", href: "#workflow" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Security", href: "#security" },
  { label: "FAQ", href: "#faq" },
];

const heroHighlights = [
  "Local-first storage with optional backups",
  "AI actions for cleanup, translation, and refactors",
  "Lightning search with tags, filters, and favorites",
];

const metrics = [
  { end: 1_000_000, suffix: "+", label: "Snippets captured" },
  { end: 10, suffix: "x", label: "Faster recall" },
  { end: null, suffix: "Unlimited", label: "History depth" },
];

const featureGrid = [
  {
    icon: Search,
    title: "Universal Search",
    desc: "Find any clip by keyword, app, or tag in milliseconds.",
  },
  {
    icon: Sparkles,
    title: "AI Actions",
    desc: "Summaries, translations, and refactors without context switching.",
  },
  {
    icon: ClipboardList,
    title: "Templates & Snippets",
    desc: "Save your best replies, macros, and canned responses.",
  },
  {
    icon: Star,
    title: "Favorites & Tags",
    desc: "Pin essentials, group them, and recall instantly.",
  },
  {
    icon: Wand,
    title: "Magic Paste",
    desc: "Strip formatting so every paste looks perfect.",
  },
  {
    icon: Palette,
    title: "Color Capture",
    desc: "Grab hex/RGB values and keep them for later.",
  },
  {
    icon: Activity,
    title: "Usage Insights",
    desc: "Track your workflow patterns with built-in analytics.",
  },
  {
    icon: Code2,
    title: "Code-Aware",
    desc: "Syntax-friendly blocks for developers and analysts.",
  },
];

const productTour = [
  {
    src: "/screenshots/desktop.png",
    title: "Desktop command center",
    desc: "Browse history, pin favorites, and drag-drop into any app.",
    className: "md:col-span-4 md:row-span-2 min-h-[240px]",
  },
  {
    src: "/screenshots/extension.png",
    title: "Browser capture",
    desc: "Clip highlights and snippets from the web in one click.",
    className: "md:col-span-2 min-h-[200px]",
  },
  {
    src: "/screenshots/options.png",
    title: "Workflow settings",
    desc: "Tune hotkeys, privacy, and formatting preferences.",
    className: "md:col-span-2 min-h-[200px]",
  },
  {
    src: "/screenshots/demo_thumbnail1.png",
    title: "Search & recall",
    desc: "Fuzzy search puts everything at your fingertips.",
    className: "md:col-span-3 min-h-[200px]",
  },
  {
    src: "/screenshots/demo_thumbnail2.png",
    title: "Chrome extension",
    desc: "In-browser capture and AI formatting.",
    className: "md:col-span-3 min-h-[200px]",
  },
];

const workflow = [
  {
    icon: ClipboardCopy,
    step: "Capture Anything",
    text: "Text, code, or images - every copy is saved instantly.",
  },
  {
    icon: Brain,
    step: "Organize Intelligently",
    text: "AI tags and folders keep your clipboard tidy.",
  },
  {
    icon: Search,
    step: "Recall Fast",
    text: "Search, filter, and paste without breaking focus.",
  },
];

const platformCards = [
  {
    icon: AppWindow,
    title: "Desktop app",
    text: "Native performance on macOS, Windows, and Linux.",
  },
  {
    icon: Chrome,
    title: "Browser extension",
    text: "Capture web highlights and citations in seconds.",
  },
  {
    icon: Terminal,
    title: "Power-user shortcuts",
    text: "Global hotkeys and quick actions across every app.",
  },
];

const useCases = [
  {
    icon: Code2,
    title: "Developers",
    text: "Reuse code blocks and shell commands effortlessly.",
  },
  {
    icon: Palette,
    title: "Designers",
    text: "Keep colors, SVGs, and tokens at your fingertips.",
  },
  {
    icon: ClipboardList,
    title: "Writers",
    text: "Clip research, quotes, and outlines in one keystroke.",
  },
  {
    icon: MousePointerClick,
    title: "Marketers",
    text: "Store CTAs, ad copy, and campaign UTM strings.",
  },
  {
    icon: PenSquare,
    title: "Students",
    text: "Collect study notes and references instantly.",
  },
  {
    icon: Shield,
    title: "Support Teams",
    text: "Save ticket replies and troubleshooting steps.",
  },
];

const securityPoints = [
  {
    icon: ShieldCheck,
    title: "Local-first by default",
    text: "Your clipboard history stays on device and under your control.",
  },
  {
    icon: CloudOff,
    title: "Offline ready",
    text: "Core features work without an internet connection.",
  },
  {
    icon: Lock,
    title: "Open-source transparency",
    text: "MIT-licensed source so you can audit or customize it.",
  },
  {
    icon: Database,
    title: "Lightweight storage",
    text: "SQLite-backed history for speed and reliability.",
  },
];

const testimonials = [
  [
    "ClipChronicle rescued a week-old SQL query in seconds. Literal life-saver.",
    "Alex • Data Engineer",
  ],
  [
    "Favorites plus fuzzy search means my UX copy is never lost. Huge boost.",
    "Jordan • Product Writer",
  ],
  [
    "The local-only promise sealed the deal - no SaaS creep, just speed.",
    "Morgan • Security Lead",
  ],
  [
    "Color picker and AI formatting are perfect for design reviews.",
    "Sam • Product Designer",
  ],
  [
    "I reduced context switching dramatically; it is my daily driver now.",
    "Jamie • Full-Stack Dev",
  ],
  [
    "Magic Paste cleans stakeholder emails so I do not have to.",
    "Riley • Project Manager",
  ],
];

const faq = [
  [
    "Does ClipChronicle work offline?",
    "Everything runs locally. Network is only used if you enable optional backups.",
  ],
  [
    "Which operating systems are supported?",
    "Windows 10+, macOS 12+ (Apple Silicon and Intel), and x64 Linux via AppImage.",
  ],
  [
    "Is the Chrome extension required?",
    "No. The desktop app tracks your system clipboard. The extension adds in-browser capture and highlighting.",
  ],
  [
    "Will it slow down my machine?",
    "Zero noticeable impact: native code, SQLite storage, about 1 percent CPU on idle.",
  ],
  [
    "Is it really free?",
    "Yes. 100 percent MIT-licensed open source. No hidden tiers, no ads.",
  ],
];

/* -------------------------------------------------------------------------- */
/*                                Animations                                  */
/* -------------------------------------------------------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

/* -------------------------------------------------------------------------- */
/*                              UI Components                                 */
/* -------------------------------------------------------------------------- */

const Badge = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-neutral-200 ${className}`}
  >
    {children}
  </span>
);

const Btn = ({
  children,
  href,
  outline = false,
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  outline?: boolean;
  className?: string;
}) => {
  const base =
    "relative inline-flex cursor-pointer items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60";
  const filled =
    "bg-gradient-to-br from-orange-500 via-orange-500 to-red-600 text-white shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50";
  const hollow =
    "border border-white/30 text-white hover:bg-white/10 backdrop-blur";

  const cn = `${base} ${outline ? hollow : filled} ${className}`;

  if (!href) return <button className={cn}>{children}</button>;

  const isExternal = href.startsWith("http");

  return (
    <Link
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn}
    >
      {children}
    </Link>
  );
};

const Section = ({
  id,
  title,
  sub,
  children,
  bg = "bg-neutral-900",
  kicker,
  align = "center",
  className = "",
}: {
  id?: string;
  title: string;
  sub?: React.ReactNode;
  children: React.ReactNode;
  bg?: string;
  kicker?: string;
  align?: "center" | "left";
  className?: string;
}) => {
  const alignClass =
    align === "left" ? "text-left items-start" : "text-center items-center";
  return (
    <section id={id} className={`${bg} py-24 px-4 ${className}`}>
      <motion.div
        // @ts-ignore
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className={`max-w-4xl mx-auto mb-16 flex flex-col ${alignClass}`}
      >
        {kicker ? (
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-400">
            {kicker}
          </span>
        ) : null}
        <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-white">
          {title}
        </h2>
        {sub ? (
          <div className="mt-3 text-lg text-neutral-400">{sub}</div>
        ) : null}
      </motion.div>
      {children}
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/*                                  Page                                      */
/* -------------------------------------------------------------------------- */

export default function Home() {
  const line = useTypewriter(typeLines);

  return (
    <>
      <Head>
        <title>ClipChronicle – The Ultimate Clipboard Manager</title>
        <meta
          name="description"
          content="ClipChronicle is the open-source clipboard manager that uses AI to organize everything you copy. Free, local, blazing fast."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="ClipChronicle" />
        <meta
          property="og:description"
          content="AI-powered, local-only clipboard manager that keeps every snippet within reach."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://clipchronicle.vercel.app/" />
        <meta
          property="og:image"
          content="https://clipchronicle.vercel.app/android-chrome-512x512.png"
        />
        <link rel="canonical" href="https://clipchronicle.vercel.app/" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@300..800&family=Space+Grotesk:wght@400..700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* ----------------------------- Global CSS ---------------------------- */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        :root {
          --cc-orange: 255 98 0;
          --cc-red: 255 67 43;
          --cc-amber: 255 167 71;
        }
        @keyframes blink {
          0%,
          49.9% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }
        .typewriter-cursor {
          display: inline-block;
          width: 3px;
          height: 1em;
          background-color: currentColor;
          margin-left: 1px;
          animation: blink 1s step-end infinite;
        }
        @keyframes subtleRotate {
          to {
            transform: rotate(360deg);
          }
        }
        .animate-subtleRotate {
          animation: subtleRotate 40s linear infinite;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        @keyframes floatReverse {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(14px);
          }
        }
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-float {
          animation: float 7s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: floatReverse 9s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientShift 12s ease infinite;
        }
        .card-uniform {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 16rem;
        }
        body {
          font-family: "Manrope", "Space Grotesk", sans-serif;
          background-color: #050505;
        }
        h1,
        h2,
        h3,
        h4 {
          font-family: "Space Grotesk", "Manrope", sans-serif;
          letter-spacing: -0.02em;
        }
      `}</style>

      {/* ------------------------------- Hero -------------------------------- */}
      <header className="relative flex flex-col bg-neutral-950 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(255,98,0,0.18),transparent_60%)] animate-subtleRotate" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_10%,rgba(255,157,74,0.2),transparent_45%)]" />
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_94%,rgba(255,255,255,0.05)_94%),linear-gradient(90deg,transparent_94%,rgba(255,255,255,0.05)_94%)] bg-[size:64px_64px]" />

        <motion.div
          className="absolute -top-32 -right-20 pointer-events-none h-72 w-72 rounded-full bg-orange-500/20 blur-3xl"
          animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -left-24 pointer-events-none h-80 w-80 rounded-full bg-red-500/20 blur-3xl"
          animate={{ y: [0, -20, 0], x: [0, -12, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        <nav className="relative z-20 w-full">
          <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <span className="size-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                <ClipboardCopy className="size-5 text-white" />
              </span>
              <div className="leading-tight">
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-300">
                  ClipChronicle
                </span>
                <p className="text-xs text-neutral-500">
                  Clipboard intelligence
                </p>
              </div>
            </Link>
            <div className="hidden lg:flex items-center gap-6 text-sm text-neutral-300">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-white transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-3">
              <Btn href="#download" className="px-5 py-2 text-xs">
                Get the App
              </Btn>
            </div>
          </div>
        </nav>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pt-10 pb-24 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <Badge>Open Source</Badge>
            <motion.h1
              // @ts-ignore
              variants={fadeUp}
              className="text-5xl md:text-6xl font-extrabold leading-tight"
            >
              The Clipboard Command Center
              <span className="block text-orange-400">
                for modern workflows.
              </span>
            </motion.h1>
            <motion.p
              // @ts-ignore
              variants={fadeUp}
              className="text-lg text-neutral-300 max-w-xl"
            >
              ClipChronicle is your clipboard&apos;s second brain - AI
              organized, locally stored, and lightning fast. Capture everything,
              tag instantly, and reuse on demand.
            </motion.p>
            <motion.p
              // @ts-ignore
              variants={fadeUp}
              className="flex items-center text-orange-400 text-2xl font-mono h-8"
            >
              {line}
              <span className="typewriter-cursor" />
            </motion.p>
            <motion.ul
              variants={stagger}
              className="grid gap-3 text-sm text-neutral-300"
            >
              {heroHighlights.map((text) => (
                <motion.li
                  key={text}
                  // @ts-ignore
                  variants={fadeUp}
                  className="flex items-start gap-2"
                >
                  <CircleCheck className="size-4 text-orange-400 mt-0.5" />
                  <span>{text}</span>
                </motion.li>
              ))}
            </motion.ul>
            {/* @ts-ignore */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Btn href="https://github.com/hoangsonww/ClipChronicle-Cross-Platform-App/releases/tag/v1.0.0">
                <Download className="size-5" />
                Download
              </Btn>
              <Btn
                href="https://github.com/hoangsonww/ClipChronicle-Cross-Platform-App"
                outline
              >
                <Github className="size-5" />
                GitHub
              </Btn>
            </motion.div>
            <motion.div
              // @ts-ignore
              variants={fadeUp}
              className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.2em] text-neutral-500"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-orange-400" />
                Local-first
              </span>
              <span className="flex items-center gap-2">
                <Zap className="size-4 text-orange-400" />
                Blazing fast
              </span>
              <span className="flex items-center gap-2">
                <Star className="size-4 text-orange-400" />
                MIT license
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            // @ts-ignore
            variants={fadeRight}
            initial="hidden"
            animate="show"
            className="relative"
          >
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-orange-500/20 via-transparent to-red-500/20 blur-2xl" />
            <motion.div
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/70 shadow-2xl shadow-orange-500/20"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src="/screenshots/desktop.png"
                alt="ClipChronicle desktop app"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-200">
                <span className="rounded-full bg-white/10 px-3 py-1">
                  Search • Tags • Favorites
                </span>
                <span className="rounded-full bg-orange-500/20 px-3 py-1 text-orange-200">
                  Local Only
                </span>
              </div>
            </motion.div>
            <motion.div
              className="absolute -right-4 -top-6 hidden md:flex flex-col gap-3"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="rounded-2xl border border-white/10 bg-neutral-900/70 px-4 py-3 text-xs text-neutral-200 shadow-lg shadow-orange-500/10">
                <p className="font-semibold text-white">Instant search</p>
                <p className="text-neutral-400">Find any clip in ms.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-neutral-900/70 px-4 py-3 text-xs text-neutral-200 shadow-lg shadow-orange-500/10">
                <p className="font-semibold text-white">AI cleanup</p>
                <p className="text-neutral-400">Auto format on paste.</p>
              </div>
            </motion.div>
            <motion.div
              className="absolute -left-6 -bottom-8 hidden md:flex gap-3"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src="/screenshots/demo_thumbnail1.png"
                alt="Search and recall preview"
                className="h-20 w-28 rounded-xl border border-white/10 object-cover"
              />
              <img
                src="/screenshots/demo_thumbnail2.png"
                alt="AI formatting preview"
                className="h-20 w-28 rounded-xl border border-white/10 object-cover"
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          // @ts-ignore
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30"
        >
          <Btn
            href="#metrics"
            outline
            className="px-4 py-2 animate-bounce hover:animate-none"
          >
            <ChevronsDown className="size-6" />
            Learn More
          </Btn>
        </motion.div>
      </header>

      <main>
        {/* ---------------------------- Metrics ------------------------------- */}
        <Section
          id="metrics"
          title="Trusted by Power Users"
          sub="Productivity metrics from thousands of sessions"
          bg="bg-neutral-900"
        >
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid max-w-6xl mx-auto gap-6 sm:grid-cols-3"
          >
            {metrics.map(({ end, suffix, label }) => (
              // @ts-ignore
              <motion.li key={label} variants={fadeUp}>
                <Card className="card-uniform bg-neutral-800/60 backdrop-blur border-orange-500/30 transition hover:shadow-[0_0_30px_rgba(255,98,0,0.55)]">
                  <CardContent className="p-6 text-center">
                    <span className="text-3xl font-bold text-orange-400">
                      {end !== null ? (
                        <CountUp
                          start={0}
                          end={end}
                          duration={2.25}
                          separator=","
                          suffix={suffix}
                          enableScrollSpy
                          scrollSpyOnce
                        />
                      ) : (
                        suffix
                      )}
                    </span>
                    <p className="mt-2 text-sm uppercase tracking-wide text-neutral-400">
                      {label}
                    </p>
                  </CardContent>
                </Card>
              </motion.li>
            ))}
          </motion.ul>
        </Section>

        {/* --------------------------- Features ------------------------------ */}
        <Section
          id="features"
          title="Features That Matter"
          sub="Clip, organize, and act with precision"
          bg="bg-neutral-950"
          kicker="Capabilities"
        >
          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid max-w-6xl mx-auto gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {featureGrid.map((feature) => (
              // @ts-ignore
              <motion.li key={feature.title} variants={fadeUp}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="h-full bg-neutral-800/60 backdrop-blur border border-white/10 transition">
                    <CardHeader className="pb-2 flex flex-col gap-3">
                      <div className="size-10 rounded-xl bg-orange-500/15 flex items-center justify-center">
                        <feature.icon className="size-5 text-orange-400" />
                      </div>
                      <CardTitle className="text-lg text-white">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-neutral-400">
                      {feature.desc}
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.li>
            ))}
          </motion.ul>
        </Section>

        {/* -------------------------- Product Tour --------------------------- */}
        <Section
          id="tour"
          title="Product Tour"
          sub="See ClipChronicle in action across desktop and browser"
          bg="bg-neutral-900"
          align="left"
          kicker="Screenshots"
        >
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid max-w-6xl mx-auto gap-6 md:grid-cols-6"
          >
            {productTour.map((shot) => (
              <motion.div
                key={shot.title}
                // @ts-ignore
                variants={scaleIn}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/70 shadow-lg shadow-orange-500/10 ${shot.className}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                <img
                  src={shot.src}
                  alt={shot.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/60 to-transparent p-4">
                  <p className="text-sm font-semibold text-white">
                    {shot.title}
                  </p>
                  <p className="text-xs text-neutral-300">{shot.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* --------------------------- Workflow ------------------------------ */}
        <Section
          id="workflow"
          title="How It Works"
          sub="Three steps from chaos to clarity"
          bg="bg-neutral-950"
          kicker="Workflow"
        >
          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-3xl mx-auto space-y-10"
          >
            {workflow.map((w, idx) => (
              <motion.li
                key={w.step}
                // @ts-ignore
                variants={fadeUp}
                className="flex gap-6 items-start"
              >
                <w.icon className="size-7 text-orange-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {idx + 1}. {w.step}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-400">{w.text}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </Section>

        {/* --------------------------- Platforms ----------------------------- */}
        <Section
          id="platforms"
          title="Works Everywhere"
          sub="Designed for the apps you already use"
          bg="bg-neutral-900"
          kicker="Ecosystem"
        >
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid max-w-6xl mx-auto gap-6 md:grid-cols-3"
          >
            {platformCards.map((platform) => (
              // @ts-ignore
              <motion.div key={platform.title} variants={fadeUp}>
                <Card className="h-full bg-neutral-800/60 backdrop-blur border border-white/10">
                  <CardHeader className="pb-2 flex flex-col gap-3">
                    <div className="size-10 rounded-xl bg-orange-500/15 flex items-center justify-center">
                      <platform.icon className="size-5 text-orange-400" />
                    </div>
                    <CardTitle className="text-lg text-white">
                      {platform.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-neutral-400">
                    {platform.text}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* ---------------------------- Use-Cases ---------------------------- */}
        <Section
          id="use-cases"
          title="Made for Everyone"
          sub="Whatever you build, ClipChronicle has your back"
          bg="bg-neutral-950"
          kicker="Use Cases"
        >
          <div className="relative max-w-6xl mx-auto">
            <Carousel opts={{ loop: true }}>
              <CarouselContent className="-ml-6">
                {useCases.map((u) => (
                  <CarouselItem
                    key={u.title}
                    className="basis-10/12 md:basis-1/3 pl-6"
                  >
                    <motion.div
                      // @ts-ignore
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                    >
                      <Card className="card-uniform bg-neutral-800/60 backdrop-blur transition hover:shadow-[0_0_24px_rgba(255,98,0,0.4)] border border-white/10">
                        <CardHeader className="pb-2 flex gap-3 items-center">
                          <u.icon className="size-8 text-orange-400" />
                          <CardTitle className="text-lg text-white">
                            {u.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-neutral-400">
                          {u.text}
                        </CardContent>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hover:scale-110 transition" />
              <CarouselNext className="hover:scale-110 transition" />
            </Carousel>
          </div>
        </Section>

        {/* --------------------------- Security ------------------------------ */}
        <Section
          id="security"
          title="Privacy and Performance"
          sub="Local-first by design, transparent by default"
          bg="bg-neutral-900"
          align="left"
          kicker="Trust"
        >
          <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <motion.div
              // @ts-ignore
              variants={fadeLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-white">
                Built to keep your data yours.
              </h3>
              <p className="text-neutral-300">
                ClipChronicle runs entirely on your machine with local storage
                and fast indexing. You stay in control of what gets saved, when
                it gets cleaned, and how it gets shared.
              </p>
              <div className="grid gap-3 text-sm text-neutral-300">
                {[
                  "No sign-in required to get started",
                  "Optional backups you control",
                  "Open-source roadmap and community review",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CircleCheck className="size-4 text-orange-400 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-4"
            >
              {securityPoints.map((point) => (
                // @ts-ignore
                <motion.div key={point.title} variants={fadeUp}>
                  <Card className="bg-neutral-800/60 backdrop-blur border border-white/10">
                    <CardHeader className="pb-2 flex gap-3 items-center">
                      <point.icon className="size-6 text-orange-400" />
                      <CardTitle className="text-base text-white">
                        {point.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-neutral-400">
                      {point.text}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Section>

        {/* --------------------------- Testimonials --------------------------- */}
        <Section
          title="What Users Say"
          sub="Real productivity gains from real teams"
          bg="bg-neutral-950"
          kicker="Testimonials"
        >
          <div className="relative max-w-6xl mx-auto">
            <Carousel opts={{ loop: true }}>
              <CarouselContent className="-ml-6">
                {testimonials.map(([text, name]) => (
                  <CarouselItem
                    key={name}
                    className="basis-10/12 md:basis-1/2 pl-6"
                  >
                    <motion.blockquote
                      // @ts-ignore
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="card-uniform bg-neutral-800/60 backdrop-blur p-6 rounded-lg border border-neutral-700 transition hover:shadow-[0_0_24px_rgba(255,98,0,0.4)]"
                    >
                      <p className="text-sm text-neutral-300 flex-grow">
                        &ldquo;{text}&rdquo;
                      </p>
                      <footer className="mt-3 text-sm text-orange-400 shrink-0">
                        {name}
                      </footer>
                    </motion.blockquote>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hover:scale-110 transition" />
              <CarouselNext className="hover:scale-110 transition" />
            </Carousel>
          </div>
        </Section>

        {/* ------------------------------- FAQ -------------------------------- */}
        <Section
          id="faq"
          title="Frequently Asked Questions"
          sub="Everything else you might want to know"
          bg="bg-neutral-900"
          kicker="FAQ"
        >
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            // @ts-ignore
            variants={fadeUp}
            className="max-w-4xl mx-auto"
          >
            <Accordion type="multiple" className="space-y-4">
              {faq.map(([q, a], idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="border border-neutral-700 rounded-lg backdrop-blur bg-neutral-800/60"
                >
                  <AccordionTrigger className="text-left px-4 py-3 text-white transition">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-sm text-neutral-400">
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </Section>

        {/* ------------------------- Open Source CTA -------------------------- */}
        <Section
          title="Open-Source and Community-Driven"
          sub="Join us on GitHub and shape the roadmap"
          bg="bg-neutral-950"
          kicker="Community"
        >
          <motion.div
            // @ts-ignore
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6"
          >
            <Users className="size-10 text-orange-400" />
            <p className="max-w-xl text-neutral-300 text-center">
              ClipChronicle lives on GitHub under the MIT license. We welcome
              pull requests, feature ideas, and issue reports - star the repo to
              support open development.
            </p>
            <Btn href="https://github.com/hoangsonww/ClipChronicle-Cross-Platform-App">
              <Github className="size-5" />
              Star on GitHub
            </Btn>
          </motion.div>
        </Section>

        {/* --------------------------- Download CTA --------------------------- */}
        <Section
          id="download"
          title="Ready to Clip Smarter?"
          sub={
            <span className="text-white">
              Download ClipChronicle free for your platform
            </span>
          }
          bg="bg-orange-600"
          className="animate-gradient"
        >
          <motion.div
            // @ts-ignore
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Btn
              outline
              className="border-white/60 text-white hover:shadow-[0_0_20px_rgba(255,98,0,0.55)]"
              href="https://github.com/hoangsonww/ClipChronicle-Cross-Platform-App/releases/download/v1.0.0/ClipChronicle-Native-darwin-arm64-1.0.0.zip"
            >
              <Download className="size-5" />
              Windows
            </Btn>
            <Btn
              outline
              className="border-white/60 text-white hover:shadow-[0_0_20px_rgba(255,98,0,0.55)]"
              href="https://github.com/hoangsonww/ClipChronicle-Cross-Platform-App/releases/download/v1.0.0/ClipChronicle-Native-darwin-arm64-1.0.0.zip"
            >
              <Download className="size-5" />
              macOS
            </Btn>
            <Btn
              outline
              className="border-white/60 text-white hover:shadow-[0_0_20px_rgba(255,98,0,0.55)]"
              href="https://github.com/hoangsonww/ClipChronicle-Cross-Platform-App/releases/download/v1.0.0/ClipChronicle-Native-darwin-arm64-1.0.0.zip"
            >
              <Download className="size-5" />
              Linux
            </Btn>
          </motion.div>
        </Section>
      </main>

      {/* ------------------------------ Footer ------------------------------ */}
      <footer className="bg-neutral-950 text-neutral-400 py-10 text-sm">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <span>© {new Date().getFullYear()} ClipChronicle</span>
          <nav className="flex gap-6">
            <Link
              href="https://github.com/hoangsonww"
              className="flex items-center gap-1 hover:text-white transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Users className="size-4" />
              About the Creator
            </Link>
            <Link
              href="https://github.com/hoangsonww/ClipChronicle-Cross-Platform-App"
              className="flex items-center gap-1 hover:text-white transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="size-4" />
              GitHub Repository
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
