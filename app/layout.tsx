import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://parvathyvidhu.dev"),
  title: {
    default: "Parvathy Vidhu — Co-Founder of Aethra Digital Solutions & Full Stack Developer",
    template: "%s | Parvathy Vidhu",
  },
  description:
    "Portfolio of Parvathy Vidhu, Co-Founder of Aethra Digital Solutions (aethrasolutions.in) and Full Stack Developer crafting calm, fast, and beautiful web experiences.",
  keywords: [
    "Parvathy Vidhu",
    "Aethra Digital Solutions",
    "aethrasolutions.in",
    "Co-Founder Aethra Digital Solutions",
    "Full Stack Developer",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "Web Developer Kerala",
  ],
  authors: [{ name: "Parvathy Vidhu", url: "https://parvathyvidhu.dev" }],
  creator: "Parvathy Vidhu",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://parvathyvidhu.dev",
    title: "Parvathy Vidhu — Co-Founder of Aethra Digital Solutions & Full Stack Developer",
    description:
      "Portfolio of Parvathy Vidhu, Co-Founder of Aethra Digital Solutions (aethrasolutions.in) and Full Stack Developer crafting calm, fast, and beautiful digital products.",
    siteName: "Parvathy Vidhu Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parvathy Vidhu — Co-Founder of Aethra Digital Solutions & Full Stack Developer",
    description:
      "Portfolio of Parvathy Vidhu, Co-Founder of Aethra Digital Solutions (aethrasolutions.in) and Full Stack Developer crafting calm, fast, and beautiful digital products.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F2FF" },
    { media: "(prefers-color-scheme: dark)", color: "#090710" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const storedTheme = localStorage.getItem('pv_theme');
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (storedTheme === 'dark' || (!storedTheme && systemDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="grain antialiased">{children}</body>
    </html>
  );
}
