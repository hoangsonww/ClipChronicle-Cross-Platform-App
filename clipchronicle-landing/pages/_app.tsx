import type { AppProps } from "next/app";
import "../styles/globals.css";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Analytics } from "@vercel/analytics/next";

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Button
        onClick={scrollToTop}
        className="cursor-pointer w-12 h-12 rounded-full p-0 flex items-center justify-center bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50"
      >
        <ChevronUp className="size-6 text-white" />
      </Button>
    </motion.div>
  );
}

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
      <Analytics />
      <BackToTop />
    </>
  );
}
