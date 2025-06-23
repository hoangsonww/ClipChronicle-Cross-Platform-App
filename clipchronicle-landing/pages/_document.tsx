import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head>
        {/* Primary Meta Tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="author" content="ClipChronicle Team" />
        <meta
          name="description"
          content="ClipChronicle – your clipboard’s second brain. AI-powered, local-only clipboard manager for seamless copy & paste."
        />
        <meta
          name="keywords"
          content="clipboard manager, clipboard history, AI clipboard, snippet organizer, copy paste tool, local clipboard, productivity app"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://clipchronicle.example.com" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://clipchronicle.example.com" />
        <meta
          property="og:title"
          content="ClipChronicle – Clipboard’s Second Brain"
        />
        <meta
          property="og:description"
          content="AI-powered, local-only clipboard manager to capture, organize & recall snippets instantly."
        />
        <meta
          property="og:image"
          content="https://clipchronicle.vercel.app/android-chrome-512x512.png"
        />
        <meta property="og:site_name" content="ClipChronicle" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://clipchronicle.example.com" />
        <meta
          name="twitter:title"
          content="ClipChronicle – Clipboard’s Second Brain"
        />
        <meta
          name="twitter:description"
          content="AI-powered, local-only clipboard manager to capture, organize & recall snippets instantly."
        />
        <meta
          name="twitter:image"
          content="https://clipchronicle.example.com/og-image.png"
        />
        <meta name="twitter:site" content="@ClipChronicleApp" />
        <meta name="twitter:creator" content="@ClipChronicleApp" />

        {/* Dublin Core */}
        <meta
          name="DC.title"
          content="ClipChronicle – Clipboard’s Second Brain"
        />
        <meta
          name="DC.description"
          content="AI-powered, local-only clipboard manager for seamless copy & paste."
        />
        <meta name="DC.creator" content="ClipChronicle Team" />
        <meta name="DC.publisher" content="ClipChronicle" />
        <meta name="DC.rights" content="MIT License" />

        {/* Preconnect & Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />

        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />

        {/* Sitemap */}
        <link
          rel="sitemap"
          type="application/xml"
          title="Sitemap"
          href="/sitemap.xml"
        />

        {/* Misc */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
