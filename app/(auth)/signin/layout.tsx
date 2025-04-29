import { ReactNode } from "react";
import config from "@/config";
import { getSEOTags } from "@/libs/seo";
import type { Metadata } from "next";

export const metadata: Metadata = getSEOTags({
  title: `Sign in to ${config.appName}`,
  description: `Access your account to manage your job applications and career support with ${config.appName}.`,
  canonicalUrlRelative: "/signin",
});

export const dynamic = "force-dynamic";

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}