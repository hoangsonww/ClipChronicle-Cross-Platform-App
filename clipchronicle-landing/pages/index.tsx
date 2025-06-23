import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  ClipboardCopy,
  Brain,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Activity,
  Download,
  Github,
  Palette,
  Code2,
  ClipboardList,
  Wand,
  Users,
  MousePointerClick,
  PenSquare,
  Shield,
  ChevronsDown,
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
  "Copy → Organize → Paste",
  "Never Lose A Snippet Again",
  "Clipboard Super-Powers",
  "AI-Powered Snippet Management",
  "Local-Only, Lightning Fast",
  "Make Your Clipboard Great Again",
  "Clip Smarter, Not Harder",
  "Your Clipboard Revolution",
  "Seamless Copy, Instant Recall",
  "Elevate Your Copy Game",
  "Master Your Snippets",
  "One Clipboard to Rule Them All",
  "Paste Perfectly Every Time",
  "Organize with AI Precision",
  "Your Digital Memory Hub",
  "From Chaos to Clarity",
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

const metrics = [
  { end: 1_000_000, suffix: " +", label: "Snippets captured" },
  { end: 10, suffix: " ×", label: "Faster recall" },
  { end: null, suffix: "∞", label: "History depth" },
];

const featureCards = [
  {
    icon: Sparkles,
    title: "AI Formatting",
    desc: "Summaries, translations & refactors in one click.",
  },
  {
    icon: Star,
    title: "Favorites & Tags",
    desc: "Pin essentials, group them, retrieve instantly.",
  },
  {
    icon: Activity,
    title: "Analytics",
    desc: "Beautiful charts reveal copy patterns.",
  },
  { icon: ShieldCheck, title: "Local-Only", desc: "Data stays on-device." },
  { icon: Palette, title: "Color Picker", desc: "Grab hex/RGB & save." },
  { icon: Code2, title: "Code Blocks", desc: "Syntax-aware snippets." },
  { icon: ClipboardList, title: "Templates", desc: "One-tap canned text." },
  { icon: Wand, title: "Magic Paste", desc: "Auto-remove formatting." },
];

const workflow = [
  {
    icon: ClipboardCopy,
    step: "Copy Anything",
    text: "Text, code, or images - captured instantly.",
  },
  {
    icon: Brain,
    step: "Smart Organize",
    text: "AI tags & groups every piece.",
  },
  { icon: Search, step: "Recall Fast", text: "Search or fave. Paste. Done." },
];

const useCases = [
  {
    icon: Code2,
    title: "Developers",
    text: "Reuse code blocks & shell commands effortlessly.",
  },
  {
    icon: Palette,
    title: "Designers",
    text: "Keep colors, SVGs & tokens at your fingertips.",
  },
  {
    icon: ClipboardList,
    title: "Writers",
    text: "Clip research, quotes & outlines in one keystroke.",
  },
  {
    icon: MousePointerClick,
    title: "Marketers",
    text: "Store CTAs, ad copy & campaign UTM strings.",
  },
  {
    icon: PenSquare,
    title: "Students",
    text: "Collect study notes & references instantly.",
  },
  {
    icon: Shield,
    title: "Support Teams",
    text: "Save ticket replies & troubleshooting steps.",
  },
];

const testimonials = [
  [
    "ClipChronicle rescued a week-old SQL query in seconds. Literal life-saver.",
    "Alex • Data Engineer",
  ],
  [
    "Favorites + fuzzy search means my UX copy is never lost. Huge boost.",
    "Jordan • Product Writer",
  ],
  [
    "The local-only promise sealed the deal - no SaaS creep, just speed.",
    "Morgan • Security Lead",
  ],
  [
    "Color picker + AI formatting = chef’s kiss for design reviews.",
    "Sam • Product Designer",
  ],
  [
    "I reduced context-switching dramatically; it’s my daily driver now.",
    "Jamie • Full-Stack Dev",
  ],
  [
    "Magic Paste cleans stakeholder emails so I don’t have to. ❤️",
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
    "Windows 10+, macOS 12+ (Apple Silicon & Intel) and x64 Linux via AppImage.",
  ],
  [
    "Is the Chrome extension required?",
    "No. The desktop app tracks your system clipboard. The extension adds in-browser capture & highlighting.",
  ],
  [
    "Will it slow down my machine?",
    "Zero noticeable impact: native code, SQLite storage, ~1 % CPU on idle.",
  ],
  [
    "Is it really free?",
    "Yes. 100 % MIT-licensed open source. No hidden tiers, no ads.",
  ],
];

/* -------------------------------------------------------------------------- */
/*                                Animations                                  */
/* -------------------------------------------------------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

/* -------------------------------------------------------------------------- */
/*                              UI Components                                 */
/* -------------------------------------------------------------------------- */

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
    "relative inline-flex cursor-pointer items-center gap-2 px-6 py-3 rounded-md font-medium transition transform hover:-translate-y-0.5 focus-visible:outline-none";
  const filled =
    "bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50";
  const hollow =
    "border border-white/40 text-white hover:bg-white/10 backdrop-blur";

  const cn = `${base} ${outline ? hollow : filled} ${className}`;

  if (!href) return <button className={cn}>{children}</button>;

  // internal anchors & routes should NOT open a new tab
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
}: {
  id?: string;
  title: string;
  sub: string;
  children: React.ReactNode;
  bg?: string;
}) => (
  <section id={id} className={`${bg} py-24 px-4`}>
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="max-w-3xl mx-auto text-center mb-16"
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-white">
        {title}
      </h2>
      <p className="mt-3 text-lg text-neutral-400">{sub}</p>
    </motion.div>
    {children}
  </section>
);

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
        <meta property="og:url" content="https://clipchronicle.example.com" />
        <meta
          property="og:image"
          content="https://clipchronicle.example.com/og-image.png"
        />
        <link rel="canonical" href="https://clipchronicle.example.com" />
      </Head>

      {/* ----------------------------- Global CSS ---------------------------- */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
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
          width: 3px; /* very thin */
          height: 1em; /* match your text height */
          background-color: currentColor;
          margin-left: 1px; /* a little breathing room */
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
        /* Uniform card sizing */
        .card-uniform {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 14rem; /* 224 px */
        }
        body {
          font-family: "Inter", Arial, Helvetica, sans-serif;
        }
      `}</style>

      {/* ------------------------------- Hero -------------------------------- */}
      <header className="relative flex flex-col items-center justify-center min-h-dvh bg-neutral-950 text-white overflow-hidden">
        {/* Rotating radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,98,0,0.15),transparent_60%)] animate-subtleRotate" />
        {/* Static grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_94%,rgba(255,255,255,0.04)_94%),linear-gradient(90deg,transparent_94%,rgba(255,255,255,0.04)_94%)] bg-[size:64px_64px]" />

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl font-extrabold text-center"
        >
          ClipChronicle
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.25 }}
          className="mt-6 max-w-2xl text-lg text-center text-neutral-300"
        >
          Your clipboard’s second brain - AI organized, locally stored,
          lightning fast.
        </motion.p>

        {/* Typewriter line */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.4 }}
          className="mt-8 flex items-center justify-center text-orange-500 text-2xl font-mono h-8"
        >
          {line}
          <span className="typewriter-cursor" />
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.55 }}
          className="mt-12 flex gap-4"
        >
          <Btn>
            <Download className="size-5" />
            Download
          </Btn>
          <Btn href="https://github.com/example/clipchronicle" outline>
            <Github className="size-5" />
            GitHub
          </Btn>
        </motion.div>

        {/* Learn More anchor */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.75 }}
          className="absolute bottom-10"
        >
          <Btn
            href="#metrics"
            outline
            className="px-4 py-2 animate-bounce hover:animate-none"
          >
            <ChevronsDown className="size-6" />
            Learn&nbsp;More
          </Btn>
        </motion.div>
      </header>

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
          variants={{ show: { transition: { staggerChildren: 0.15 } } }}
          className="grid max-w-6xl mx-auto gap-6 sm:grid-cols-3"
        >
          {metrics.map(({ end, suffix, label }) => (
            <motion.li key={label} variants={fadeUp}>
              <Card className="card-uniform bg-neutral-800/60 backdrop-blur border-orange-500/30 transition hover:shadow-[0_0_20px_rgba(255,98,0,0.55)]">
                <CardContent className="p-6 text-center">
                  <span className="text-3xl font-bold text-orange-500">
                    {end !== null ? (
                      <CountUp
                        start={0}
                        end={end}
                        duration={2.25}
                        separator=" "
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
        sub="Clip, organize, and act - supercharged"
        bg="bg-neutral-950"
      >
        <div className="relative max-w-6xl mx-auto">
          <Carousel opts={{ loop: true }}>
            <CarouselContent className="-ml-6">
              {featureCards.map((f) => (
                <CarouselItem
                  key={f.title}
                  className="basis-10/12 md:basis-1/3 pl-6"
                >
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    <Card className="card-uniform bg-neutral-800/60 backdrop-blur transition hover:shadow-[0_0_20px_rgba(255,98,0,0.55)]">
                      <CardHeader className="pb-2 flex gap-3 items-center">
                        <f.icon className="size-8 text-orange-500" />
                        <CardTitle className="text-lg text-white">
                          {f.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-neutral-400">
                        {f.desc}
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

      {/* --------------------------- Workflow ------------------------------ */}
      <Section
        title="How It Works"
        sub="Three steps from chaos to clarity"
        bg="bg-neutral-900"
      >
        <motion.ol
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.15 } } }}
          className="max-w-3xl mx-auto space-y-10"
        >
          {workflow.map((w, idx) => (
            <motion.li
              key={w.step}
              variants={fadeUp}
              className="flex gap-6 items-start"
            >
              <w.icon className="size-7 text-orange-500" />
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

      {/* ---------------------------- Use-Cases ---------------------------- */}
      <Section
        title="Made for Everyone"
        sub="Whatever you build, ClipChronicle has your back"
        bg="bg-neutral-950"
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
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    <Card className="card-uniform bg-neutral-800/60 backdrop-blur transition hover:shadow-[0_0_20px_rgba(255,98,0,0.55)]">
                      <CardHeader className="pb-2 flex gap-3 items-center">
                        <u.icon className="size-8 text-orange-500" />
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

      {/* --------------------------- Testimonials --------------------------- */}
      <Section
        title="What Users Say"
        sub="Real productivity gains"
        bg="bg-neutral-900"
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
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="card-uniform bg-neutral-800/60 backdrop-blur p-6 rounded-lg border border-neutral-700 transition hover:shadow-[0_0_20px_rgba(255,98,0,0.55)]"
                  >
                    <p className="text-sm text-neutral-300 flex-grow">
                      &ldquo;{text}&rdquo;
                    </p>
                    <footer className="mt-3 text-sm text-orange-500 shrink-0">
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
        title="Frequently Asked Questions"
        sub="Everything else you might want to know"
        bg="bg-neutral-950"
      >
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
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
        title="Open-Source & Community-Driven"
        sub="Join us on GitHub and shape the roadmap"
        bg="bg-neutral-900"
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6"
        >
          <Users className="size-10 text-orange-500" />
          <p className="max-w-xl text-neutral-300 text-center">
            ClipChronicle lives on GitHub under the MIT license. We welcome pull
            requests, feature ideas, and issue reports - star the repo to
            support open development!
          </p>
          <Btn href="https://github.com/example/clipchronicle">
            <Github className="size-5" />
            Star on GitHub
          </Btn>
        </motion.div>
      </Section>

      {/* --------------------------- Download CTA --------------------------- */}
      <Section
        id="download"
        title="Ready to Clip Smarter?"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        sub={
          <span className="text-white">
            Download ClipChronicle free for your platform
          </span>
        }
        bg="bg-orange-600"
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Btn
            outline
            className="border-white/60 text-white hover:shadow-[0_0_20px_rgba(255,98,0,0.55)]"
          >
            <Download className="size-5" />
            Windows
          </Btn>
          <Btn
            outline
            className="border-white/60 text-white hover:shadow-[0_0_20px_rgba(255,98,0,0.55)]"
          >
            <Download className="size-5" />
            macOS
          </Btn>
          <Btn
            outline
            className="border-white/60 text-white hover:shadow-[0_0_20px_rgba(255,98,0,0.55)]"
          >
            <Download className="size-5" />
            Linux
          </Btn>
        </motion.div>
      </Section>

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
              href="https://github.com/example/clipchronicle"
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
