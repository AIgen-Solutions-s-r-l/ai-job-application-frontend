import { ReactNode } from "react";
import config from "@/config";
import { getSEOTags } from "@/libs/seo";
import type { Metadata } from "next";

export const metadata: Metadata = getSEOTags({
  title: `Sign up | ${config.appName}`,
  description: `Create an account to access personalized career support with ${config.appName}.`,
  canonicalUrlRelative: "/signup",
});

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
