import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { Preloader } from "@/components/layout/preloader";
import { IntroProvider } from "@/components/providers/IntroProvider";
import { Cursor } from "@/components/ui/Cursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { introBootScript } from "@/lib/intro-state";
import { site } from "@/lib/tokens";
import "./globals.css";
import "./awx.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s — AWXFORGE",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
    locale: "en_US",
    siteName: site.name,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-svh bg-bg font-sans text-ink">
        <script dangerouslySetInnerHTML={{ __html: introBootScript }} />
        <noscript>
          <style>{`#preloader{display:none !important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <IntroProvider>
          <Preloader />
          <div id="site-shell">
            <SmoothScroll>
              <ScrollProgress />
              <Cursor />
              <a href="#main" className="skip-link">
                Skip to content
              </a>
              <SiteHeader />
              {children}
            </SmoothScroll>
          </div>
        </IntroProvider>
      </body>
    </html>
  );
}
