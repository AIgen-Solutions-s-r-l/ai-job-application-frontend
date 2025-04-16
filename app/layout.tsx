import { ReactNode } from "react";
import { Inter, Montserrat, Jura, Josefin_Sans } from "next/font/google";
import { Viewport } from "next";
import PlausibleProvider from "next-plausible";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";
import { Providers } from "./providers";
import "./globals.css";

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
  // Log NODE_ENV to help diagnose Stripe pricing issues
  console.log('🔍 [RootLayout] NODE_ENV:', process.env.NODE_ENV);
  return (
    <html
      lang='en'
      data-theme={config.colors.theme}
      className={`${font.className} ${montserrat.variable} ${jura.variable} ${josefinSans.variable}`}
      suppressHydrationWarning
    >
      {config.domainName && (
        <head>
          <PlausibleProvider domain={config.domainName} />
        </head>
      )}
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
