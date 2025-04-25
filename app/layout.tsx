import { ReactNode } from "react";
import { Inter, Montserrat, Jura, Josefin_Sans } from "next/font/google";
import { Viewport } from "next";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";
import { Providers } from "./providers";
import "./globals.css";
import Script from "next/script";
import { StagingBanner } from './staging-banner'; // adjust import path if needed

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

export const viewport: Viewport = {
  // Will use the primary color of your theme to show a nice theme color in the URL bar of supported browsers
  themeColor: config.colors.main,
  width: "device-width",
  initialScale: 1,
};

// This adds default SEO tags to all pages in our app.
// You can override them in each page passing params to getSOTags() function.
export const metadata = getSEOTags();

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
       </head>
      )}
      <body>
        <StagingBanner />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
