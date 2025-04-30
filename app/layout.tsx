import { ReactNode } from "react";
import { Inter, Montserrat, Jura, Josefin_Sans } from "next/font/google";
import { Viewport } from "next";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";
import { Providers } from "./providers";
import "./globals.css";
import Script from "next/script";
import { StagingBanner } from './staging-banner'; // adjust import path if needed
import ScrollToTop from "@/components/ScrollToTop";
import type { Metadata } from "next";

const font = Inter({ subsets: ["latin"] });

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});
const jura = Jura({
  subsets: ['latin'],
  variable: '--font-jura',
});
const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-josefin-sans',
});

export const metadata: Metadata = getSEOTags({
  title: `${config.appName} | Automate Your Job Applications with AI`,
  description: `${config.appName} helps you streamline job applications and interview prep with AI.`,
  canonicalUrlRelative: "/",
});

export const viewport: Viewport = {
  // Will use the primary color of your theme to show a nice theme color in the URL bar of supported browsers
  themeColor: config.colors.main,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang='en'
      data-theme={config.colors.theme}
      className={`${font.className} ${montserrat.variable} ${jura.variable} ${josefinSans.variable}`}
      suppressHydrationWarning
    >
      {config.domainName && (
        <head>
          {/* Google tag (gtag.js) */}
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-Q03TPGL5QF" strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
             window.dataLayer = window.dataLayer || [];
             function gtag(){dataLayer.push(arguments);}
             gtag('js', new Date());

             gtag('config', 'G-Q03TPGL5QF');
           `}
          </Script>
          <Script
            type="text/javascript"
            src="//cdn.cookie-script.com/s/1ad5d807b9ce5fd6458239751c3070e0.js" // this is a placeholder, for PRE
            strategy="afterInteractive"
          />
        </head>
      )}
      <body>
        <StagingBanner />
        <Providers>
          <ScrollToTop />
          {children}
        </Providers>
      </body>
    </html>
  );
}
